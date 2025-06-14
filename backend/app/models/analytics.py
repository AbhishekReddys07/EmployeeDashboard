from sqlalchemy import Column, Integer, String, Float, DateTime, Date, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database.database import Base

class CompanyMetrics(Base):
    __tablename__ = "company_metrics"
    
    id = Column(Integer, primary_key=True, index=True)
    date = Column(Date, nullable=False)
    
    # Financial Metrics
    revenue = Column(Float, default=0.0)
    profit = Column(Float, default=0.0)
    expenses = Column(Float, default=0.0)
    
    # Employee Metrics
    total_employees = Column(Integer, default=0)
    active_employees = Column(Integer, default=0)
    new_hires = Column(Integer, default=0)
    
    # Performance Metrics
    productivity_score = Column(Float, default=0.0)
    customer_satisfaction = Column(Float, default=0.0)
    
    created_at = Column(DateTime, default=func.now())

class DepartmentMetrics(Base):
    __tablename__ = "department_metrics"
    
    id = Column(Integer, primary_key=True, index=True)
    department = Column(String, nullable=False)
    date = Column(Date, nullable=False)
    
    # Department Performance
    revenue_contribution = Column(Float, default=0.0)
    employee_count = Column(Integer, default=0)
    productivity_score = Column(Float, default=0.0)
    target_achievement = Column(Float, default=0.0)
    
    # Project Metrics
    projects_completed = Column(Integer, default=0)
    projects_ongoing = Column(Integer, default=0)
    
    created_at = Column(DateTime, default=func.now())

class EmployeePerformance(Base):
    __tablename__ = "employee_performance"
    
    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, ForeignKey("employees.id"), nullable=False)
    evaluation_date = Column(Date, nullable=False)
    
    # Performance Scores (1-10 scale)
    technical_skills = Column(Float, default=0.0)
    communication = Column(Float, default=0.0)
    teamwork = Column(Float, default=0.0)
    leadership = Column(Float, default=0.0)
    problem_solving = Column(Float, default=0.0)
    
    # Overall Score
    overall_score = Column(Float, default=0.0)
    
    # Goals and Achievements
    goals_achieved = Column(Integer, default=0)
    goals_total = Column(Integer, default=0)
    
    # Comments
    manager_comments = Column(String, nullable=True)
    self_assessment = Column(String, nullable=True)
    
    # Relationships
    employee = relationship("Employee")
    
    created_at = Column(DateTime, default=func.now())