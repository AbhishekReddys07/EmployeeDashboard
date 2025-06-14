from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, ForeignKey, Enum, Float
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database.database import Base
import enum

class RoleEnum(str, enum.Enum):
    INTERN = "intern"
    HR = "hr"
    TECH = "tech"
    FINANCE = "finance"
    ADMIN = "admin"
    SUPER_ADMIN = "super_admin"

class StatusEnum(str, enum.Enum):
    ACTIVE = "active"
    INACTIVE = "inactive"
    SUSPENDED = "suspended"

class Employee(Base):
    __tablename__ = "employees"
    
    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    full_name = Column(String, nullable=False)
    hashed_password = Column(String, nullable=False)
    phone_number = Column(String, nullable=True)
    
    # Role and Department
    role = Column(Enum(RoleEnum), nullable=False)
    department = Column(String, nullable=False)
    designation = Column(String, nullable=False)
    
    # Hierarchy
    manager_id = Column(Integer, ForeignKey("employees.id"), nullable=True)
    team_leader_id = Column(Integer, ForeignKey("employees.id"), nullable=True)
    
    # Status and Dates
    status = Column(Enum(StatusEnum), default=StatusEnum.ACTIVE)
    hire_date = Column(DateTime, default=func.now())
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    
    # Profile Information
    profile_picture = Column(String, nullable=True)
    address = Column(Text, nullable=True)
    emergency_contact = Column(String, nullable=True)
    
    # OTP for login
    otp_code = Column(String, nullable=True)
    otp_expires_at = Column(DateTime, nullable=True)
    
    # Relationships
    manager = relationship("Employee", remote_side=[id], foreign_keys=[manager_id])
    team_leader = relationship("Employee", remote_side=[id], foreign_keys=[team_leader_id])
    
    # Performance metrics
    performance_score = Column(Float, default=0.0)
    tasks_completed = Column(Integer, default=0)
    tasks_pending = Column(Integer, default=0)