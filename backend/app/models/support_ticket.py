from sqlalchemy import Column, Integer, String, Text, DateTime, Enum, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database.database import Base
import enum

class TicketStatusEnum(str, enum.Enum):
    OPEN = "open"
    IN_PROGRESS = "in_progress"
    RESOLVED = "resolved"
    CLOSED = "closed"
    REOPENED = "reopened"

class TicketPriorityEnum(str, enum.Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    URGENT = "urgent"

class TicketCategoryEnum(str, enum.Enum):
    TECHNICAL = "technical"
    HR = "hr"
    FINANCE = "finance"
    GENERAL = "general"
    FEEDBACK = "feedback"

class SupportTicket(Base):
    __tablename__ = "support_tickets"
    
    id = Column(Integer, primary_key=True, index=True)
    ticket_number = Column(String, unique=True, nullable=False)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    
    # Classification
    category = Column(Enum(TicketCategoryEnum), default=TicketCategoryEnum.GENERAL)
    priority = Column(Enum(TicketPriorityEnum), default=TicketPriorityEnum.MEDIUM)
    status = Column(Enum(TicketStatusEnum), default=TicketStatusEnum.OPEN)
    
    # Assignment
    created_by = Column(Integer, ForeignKey("employees.id"), nullable=False)
    assigned_to = Column(Integer, ForeignKey("employees.id"), nullable=True)
    
    # Dates
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    resolved_at = Column(DateTime, nullable=True)
    
    # Resolution
    resolution_notes = Column(Text, nullable=True)
    is_anonymous = Column(Boolean, default=False)
    
    # Relationships
    creator = relationship("Employee", foreign_keys=[created_by])
    assignee = relationship("Employee", foreign_keys=[assigned_to])