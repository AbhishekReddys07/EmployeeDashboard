from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime
from app.models.employee import RoleEnum, StatusEnum

class EmployeeBase(BaseModel):
    email: EmailStr
    full_name: str
    phone_number: Optional[str] = None
    role: RoleEnum
    department: str
    designation: str
    manager_id: Optional[int] = None
    team_leader_id: Optional[int] = None

class EmployeeCreate(EmployeeBase):
    password: Optional[str] = None  # Will be auto-generated if not provided

class EmployeeUpdate(BaseModel):
    email: Optional[EmailStr] = None
    full_name: Optional[str] = None
    phone_number: Optional[str] = None
    role: Optional[RoleEnum] = None
    department: Optional[str] = None
    designation: Optional[str] = None
    manager_id: Optional[int] = None
    team_leader_id: Optional[int] = None
    status: Optional[StatusEnum] = None

class EmployeeResponse(EmployeeBase):
    id: int
    employee_id: str
    status: StatusEnum
    hire_date: datetime
    created_at: datetime
    performance_score: float
    tasks_completed: int
    tasks_pending: int
    
    class Config:
        from_attributes = True

class EmployeeLogin(BaseModel):
    employee_id: str
    password: str
    otp_code: Optional[str] = None

class EmployeeLoginResponse(BaseModel):
    access_token: str
    token_type: str
    employee: EmployeeResponse

class PasswordReset(BaseModel):
    employee_id: str
    new_password: str
    otp_code: str