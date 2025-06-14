from sqlalchemy import Column, Integer, String, Text, DateTime, Enum, ForeignKey, Float
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database.database import Base
import enum

class GoalStatusEnum(str, enum.Enum):
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    OVERDUE = "overdue"
    CANCELLED = "cancelled"

class GoalTypeEnum(str, enum.Enum):
    INDIVIDUAL = "individual"
    TEAM = "team"
    DEPARTMENT = "department"
    COMPANY = "company"

class Goal(Base):
    __tablename__ = "goals"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    goal_type = Column(Enum(GoalTypeEnum), default=GoalTypeEnum.INDIVIDUAL)
    
    # Progress and Status
    progress_percentage = Column(Float, default=0.0)
    status = Column(Enum(GoalStatusEnum), default=GoalStatusEnum.PENDING)
    
    # Dates
    start_date = Column(DateTime, default=func.now())
    target_date = Column(DateTime, nullable=False)
    completed_date = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    
    # Assignment
    assigned_to = Column(Integer, ForeignKey("employees.id"), nullable=False)
    created_by = Column(Integer, ForeignKey("employees.id"), nullable=False)
    
    # Metrics
    target_value = Column(Float, nullable=True)
    current_value = Column(Float, default=0.0)
    unit = Column(String, nullable=True)  # e.g., "sales", "projects", "hours"
    
    # Relationships
    assignee = relationship("Employee", foreign_keys=[assigned_to])
    creator = relationship("Employee", foreign_keys=[created_by])