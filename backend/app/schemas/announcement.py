from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from app.models.announcement import PriorityEnum

class AnnouncementBase(BaseModel):
    title: str
    content: str
    priority: PriorityEnum = PriorityEnum.MEDIUM
    target_departments: Optional[str] = None
    target_roles: Optional[str] = None
    expires_at: Optional[datetime] = None

class AnnouncementCreate(AnnouncementBase):
    pass

class AnnouncementUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    priority: Optional[PriorityEnum] = None
    target_departments: Optional[str] = None
    target_roles: Optional[str] = None
    expires_at: Optional[datetime] = None
    is_active: Optional[bool] = None

class AnnouncementResponse(AnnouncementBase):
    id: int
    created_by: int
    created_at: datetime
    updated_at: datetime
    is_active: bool
    author_name: Optional[str] = None
    
    class Config:
        from_attributes = True