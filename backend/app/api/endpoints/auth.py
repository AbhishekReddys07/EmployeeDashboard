from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.schemas.employee import EmployeeLogin, EmployeeLoginResponse, PasswordReset
from app.models.employee import Employee
from app.core.security import verify_password, create_access_token, generate_otp
from app.services.notification_service import send_otp_email, send_otp_sms
from datetime import datetime, timedelta
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

@router.post("/login", response_model=EmployeeLoginResponse)
async def login(
    login_data: EmployeeLogin,
    db: Session = Depends(get_db)
):
    # Find employee
    employee = db.query(Employee).filter(
        Employee.employee_id == login_data.employee_id
    ).first()
    
    if not employee:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid employee ID or password"
        )
    
    # Check if employee is active
    if employee.status != "active":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Employee account is not active"
        )
    
    # Verify password
    if not verify_password(login_data.password, employee.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid employee ID or password"
        )
    
    # Check if OTP is required (for certain roles or security settings)
    otp_required = employee.role in ["admin", "super_admin", "finance"]
    
    if otp_required and not login_data.otp_code:
        # Generate and send OTP
        otp_code = generate_otp()
        employee.otp_code = otp_code
        employee.otp_expires_at = datetime.utcnow() + timedelta(minutes=10)
        db.commit()
        
        # Send OTP via email and SMS
        try:
            await send_otp_email(employee.email, otp_code, employee.full_name)
            if employee.phone_number:
                await send_otp_sms(employee.phone_number, otp_code)
        except Exception as e:
            logger.error(f"Failed to send OTP: {e}")
        
        raise HTTPException(
            status_code=status.HTTP_202_ACCEPTED,
            detail="OTP sent to your email and phone. Please provide OTP to complete login."
        )
    
    # Verify OTP if provided
    if otp_required and login_data.otp_code:
        if not employee.otp_code or employee.otp_code != login_data.otp_code:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid OTP"
            )
        
        if employee.otp_expires_at < datetime.utcnow():
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="OTP has expired"
            )
        
        # Clear OTP after successful verification
        employee.otp_code = None
        employee.otp_expires_at = None
        db.commit()
    
    # Create access token
    access_token = create_access_token(data={"sub": employee.employee_id})
    
    return EmployeeLoginResponse(
        access_token=access_token,
        token_type="bearer",
        employee=employee
    )

@router.post("/request-otp")
async def request_otp(
    employee_id: str,
    db: Session = Depends(get_db)
):
    employee = db.query(Employee).filter(
        Employee.employee_id == employee_id
    ).first()
    
    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found"
        )
    
    # Generate OTP
    otp_code = generate_otp()
    employee.otp_code = otp_code
    employee.otp_expires_at = datetime.utcnow() + timedelta(minutes=10)
    db.commit()
    
    # Send OTP
    try:
        await send_otp_email(employee.email, otp_code, employee.full_name)
        if employee.phone_number:
            await send_otp_sms(employee.phone_number, otp_code)
    except Exception as e:
        logger.error(f"Failed to send OTP: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to send OTP"
        )
    
    return {"message": "OTP sent successfully"}

@router.post("/reset-password")
async def reset_password(
    reset_data: PasswordReset,
    db: Session = Depends(get_db)
):
    employee = db.query(Employee).filter(
        Employee.employee_id == reset_data.employee_id
    ).first()
    
    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found"
        )
    
    # Verify OTP
    if not employee.otp_code or employee.otp_code != reset_data.otp_code:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid OTP"
        )
    
    if employee.otp_expires_at < datetime.utcnow():
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="OTP has expired"
        )
    
    # Update password
    from app.core.security import get_password_hash
    employee.hashed_password = get_password_hash(reset_data.new_password)
    employee.otp_code = None
    employee.otp_expires_at = None
    db.commit()
    
    return {"message": "Password reset successfully"}