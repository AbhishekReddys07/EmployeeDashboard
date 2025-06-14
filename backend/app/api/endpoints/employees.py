from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database.database import get_db
from app.schemas.employee import EmployeeCreate, EmployeeUpdate, EmployeeResponse
from app.models.employee import Employee, RoleEnum, StatusEnum
from app.api.deps import get_current_employee, require_hr_or_admin, require_super_admin
from app.core.security import get_password_hash, generate_password, generate_employee_id
from app.services.notification_service import send_welcome_email

router = APIRouter()

@router.post("/", response_model=EmployeeResponse)
async def create_employee(
    employee_data: EmployeeCreate,
    db: Session = Depends(get_db),
    current_employee: Employee = Depends(require_hr_or_admin)
):
    # Check if email already exists
    if db.query(Employee).filter(Employee.email == employee_data.email).first():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Generate employee ID and password
    employee_id = generate_employee_id(employee_data.department)
    password = employee_data.password or generate_password()
    
    # Ensure unique employee ID
    while db.query(Employee).filter(Employee.employee_id == employee_id).first():
        employee_id = generate_employee_id(employee_data.department)
    
    # Create employee
    db_employee = Employee(
        employee_id=employee_id,
        email=employee_data.email,
        full_name=employee_data.full_name,
        hashed_password=get_password_hash(password),
        phone_number=employee_data.phone_number,
        role=employee_data.role,
        department=employee_data.department,
        designation=employee_data.designation,
        manager_id=employee_data.manager_id,
        team_leader_id=employee_data.team_leader_id,
        status=StatusEnum.ACTIVE
    )
    
    db.add(db_employee)
    db.commit()
    db.refresh(db_employee)
    
    # Send welcome email with credentials
    try:
        await send_welcome_email(
            email=employee_data.email,
            full_name=employee_data.full_name,
            employee_id=employee_id,
            password=password
        )
    except Exception as e:
        # Log error but don't fail the creation
        print(f"Failed to send welcome email: {e}")
    
    return db_employee

@router.get("/", response_model=List[EmployeeResponse])
def get_employees(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    department: Optional[str] = None,
    role: Optional[RoleEnum] = None,
    status: Optional[StatusEnum] = None,
    db: Session = Depends(get_db),
    current_employee: Employee = Depends(get_current_employee)
):
    query = db.query(Employee)
    
    # Apply filters
    if department:
        query = query.filter(Employee.department == department)
    if role:
        query = query.filter(Employee.role == role)
    if status:
        query = query.filter(Employee.status == status)
    
    # Role-based access control
    if current_employee.role not in [RoleEnum.HR, RoleEnum.ADMIN, RoleEnum.SUPER_ADMIN]:
        # Regular employees can only see their department colleagues
        query = query.filter(Employee.department == current_employee.department)
    
    employees = query.offset(skip).limit(limit).all()
    return employees

@router.get("/me", response_model=EmployeeResponse)
def get_current_employee_info(
    current_employee: Employee = Depends(get_current_employee)
):
    return current_employee

@router.get("/{employee_id}", response_model=EmployeeResponse)
def get_employee(
    employee_id: int,
    db: Session = Depends(get_db),
    current_employee: Employee = Depends(get_current_employee)
):
    employee = db.query(Employee).filter(Employee.id == employee_id).first()
    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found"
        )
    
    # Check permissions
    if (current_employee.id != employee_id and 
        current_employee.role not in [RoleEnum.HR, RoleEnum.ADMIN, RoleEnum.SUPER_ADMIN] and
        current_employee.department != employee.department):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to view this employee"
        )
    
    return employee

@router.put("/{employee_id}", response_model=EmployeeResponse)
def update_employee(
    employee_id: int,
    employee_update: EmployeeUpdate,
    db: Session = Depends(get_db),
    current_employee: Employee = Depends(require_hr_or_admin)
):
    employee = db.query(Employee).filter(Employee.id == employee_id).first()
    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found"
        )
    
    # Update fields
    update_data = employee_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(employee, field, value)
    
    db.commit()
    db.refresh(employee)
    return employee

@router.patch("/{employee_id}/status")
def update_employee_status(
    employee_id: int,
    status: StatusEnum,
    db: Session = Depends(get_db),
    current_employee: Employee = Depends(require_hr_or_admin)
):
    employee = db.query(Employee).filter(Employee.id == employee_id).first()
    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found"
        )
    
    employee.status = status
    db.commit()
    
    return {"message": f"Employee status updated to {status.value}"}

@router.delete("/{employee_id}")
def delete_employee(
    employee_id: int,
    db: Session = Depends(get_db),
    current_employee: Employee = Depends(require_super_admin)
):
    employee = db.query(Employee).filter(Employee.id == employee_id).first()
    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found"
        )
    
    # Soft delete by setting status to inactive
    employee.status = StatusEnum.INACTIVE
    db.commit()
    
    return {"message": "Employee deactivated successfully"}

@router.get("/departments/list")
def get_departments(
    db: Session = Depends(get_db),
    current_employee: Employee = Depends(get_current_employee)
):
    departments = db.query(Employee.department).distinct().all()
    return [dept[0] for dept in departments]

@router.get("/hierarchy/{employee_id}")
def get_employee_hierarchy(
    employee_id: int,
    db: Session = Depends(get_db),
    current_employee: Employee = Depends(get_current_employee)
):
    employee = db.query(Employee).filter(Employee.id == employee_id).first()
    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found"
        )
    
    hierarchy = {
        "employee": employee,
        "manager": employee.manager,
        "team_leader": employee.team_leader,
        "subordinates": db.query(Employee).filter(
            (Employee.manager_id == employee_id) | 
            (Employee.team_leader_id == employee_id)
        ).all()
    }
    
    return hierarchy