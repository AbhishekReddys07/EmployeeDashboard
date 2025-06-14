from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.core.security import verify_token
from app.models.employee import Employee, RoleEnum
from typing import List

security = HTTPBearer()

def get_current_employee(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
) -> Employee:
    token = credentials.credentials
    employee_id = verify_token(token)
    
    employee = db.query(Employee).filter(Employee.employee_id == employee_id).first()
    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found"
        )
    
    if employee.status != "active":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Employee account is not active"
        )
    
    return employee

def require_roles(allowed_roles: List[RoleEnum]):
    def role_checker(current_employee: Employee = Depends(get_current_employee)):
        if current_employee.role not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Insufficient permissions"
            )
        return current_employee
    return role_checker

# Role-specific dependencies
def require_admin(current_employee: Employee = Depends(get_current_employee)):
    if current_employee.role not in [RoleEnum.ADMIN, RoleEnum.SUPER_ADMIN]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required"
        )
    return current_employee

def require_hr_or_admin(current_employee: Employee = Depends(get_current_employee)):
    if current_employee.role not in [RoleEnum.HR, RoleEnum.ADMIN, RoleEnum.SUPER_ADMIN]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="HR or Admin access required"
        )
    return current_employee

def require_super_admin(current_employee: Employee = Depends(get_current_employee)):
    if current_employee.role != RoleEnum.SUPER_ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Super Admin access required"
        )
    return current_employee