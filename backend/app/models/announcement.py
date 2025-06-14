from sqlalchemy import Column, Integer, String, Text, DateTime, Enum, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database.database import Base
import enum

class PriorityEnum(str, enum.Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    URGENT = "urgent"

class Announcement(Base):
    __tablename__ = "announcements"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    priority = Column(Enum(PriorityEnum), default=PriorityEnum.MEDIUM)
    
    # Author information
    created_by = Column(Integer, ForeignKey("employees.id"), nullable=False)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    
    # Visibility
    is_active = Column(Boolean, default=True)
    expires_at = Column(DateTime, nullable=True)
    
    # Target audience
    target_departments = Column(String, nullable=True)  # JSON string of departments
    target_roles = Column(String, nullable=True)  # JSON string of roles
    
    # Relationships
    author = relationship("Employee", back_populates="announcements")

# Add to Employee model
from app.models.employee import Employee
Employee.announcements = relationship("Announcement", back_populates="author")