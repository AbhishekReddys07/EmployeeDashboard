from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from app.models.goal import GoalStatusEnum, GoalTypeEnum

class GoalBase(BaseModel):
    title: str
    description: str
    goal_type: GoalTypeEnum = GoalTypeEnum.INDIVIDUAL
    target_date: datetime
    target_value: Optional[float] = None
    unit: Optional[str] = None

class GoalCreate(GoalBase):
    assigned_to: int

class GoalUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    progress_percentage: Optional[float] = None
    status: Optional[GoalStatusEnum] = None
    target_date: Optional[datetime] = None
    current_value: Optional[float] = None
    target_value: Optional[float] = None

class GoalResponse(GoalBase):
    id: int
    progress_percentage: float
    status: GoalStatusEnum
    current_value: float
    assigned_to: int
    created_by: int
    start_date: datetime
    created_at: datetime
    assignee_name: Optional[str] = None
    creator_name: Optional[str] = None
    
    class Config:
        from_attributes = True