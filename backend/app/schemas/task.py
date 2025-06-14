from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from app.models.task import TaskStatusEnum, TaskPriorityEnum

class TaskBase(BaseModel):
    title: str
    description: str
    priority: TaskPriorityEnum = TaskPriorityEnum.MEDIUM
    due_date: datetime
    estimated_hours: Optional[int] = None

class TaskCreate(TaskBase):
    assigned_to: int

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[TaskStatusEnum] = None
    priority: Optional[TaskPriorityEnum] = None
    due_date: Optional[datetime] = None
    actual_hours: Optional[int] = None
    completion_notes: Optional[str] = None

class TaskResponse(TaskBase):
    id: int
    status: TaskStatusEnum
    assigned_to: int
    assigned_by: int
    completed_date: Optional[datetime] = None
    created_at: datetime
    actual_hours: Optional[int] = None
    completion_notes: Optional[str] = None
    assignee_name: Optional[str] = None
    assigner_name: Optional[str] = None
    
    class Config:
        from_attributes = True