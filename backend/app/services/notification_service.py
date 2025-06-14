from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from twilio.rest import Client
from app.core.config import settings
from typing import List
import logging

logger = logging.getLogger(__name__)

# Email configuration
conf = ConnectionConfig(
    MAIL_USERNAME=settings.MAIL_USERNAME,
    MAIL_PASSWORD=settings.MAIL_PASSWORD,
    MAIL_FROM=settings.MAIL_FROM,
    MAIL_PORT=settings.MAIL_PORT,
    MAIL_SERVER=settings.MAIL_SERVER,
    MAIL_FROM_NAME=settings.MAIL_FROM_NAME,
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True
)

# Twilio client
twilio_client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN) if settings.TWILIO_ACCOUNT_SID else None

async def send_welcome_email(email: str, full_name: str, employee_id: str, password: str):
    """Send welcome email with login credentials"""
    html_content = f"""
    <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #2563eb;">Welcome to Employee Dashboard!</h2>
                
                <p>Dear {full_name},</p>
                
                <p>Welcome to our company! Your employee account has been created successfully.</p>
                
                <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="margin-top: 0; color: #1e40af;">Your Login Credentials:</h3>
                    <p><strong>Employee ID:</strong> {employee_id}</p>
                    <p><strong>Temporary Password:</strong> {password}</p>
                    <p><strong>Dashboard URL:</strong> <a href="http://localhost:3000">http://localhost:3000</a></p>
                </div>
                
                <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b;">
                    <p style="margin: 0;"><strong>Important:</strong> Please change your password after your first login for security purposes.</p>
                </div>
                
                <p>If you have any questions or need assistance, please contact the HR department.</p>
                
                <p>Best regards,<br>HR Team</p>
            </div>
        </body>
    </html>
    """
    
    message = MessageSchema(
        subject="Welcome to Employee Dashboard - Login Credentials",
        recipients=[email],
        body=html_content,
        subtype="html"
    )
    
    fm = FastMail(conf)
    await fm.send_message(message)

async def send_otp_email(email: str, otp_code: str, full_name: str):
    """Send OTP via email"""
    html_content = f"""
    <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #2563eb;">Login Verification Code</h2>
                
                <p>Dear {full_name},</p>
                
                <p>Your verification code for logging into the Employee Dashboard is:</p>
                
                <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
                    <h1 style="color: #1e40af; font-size: 32px; letter-spacing: 8px; margin: 0;">{otp_code}</h1>
                </div>
                
                <p>This code will expire in 10 minutes. If you didn't request this code, please ignore this email.</p>
                
                <p>Best regards,<br>Security Team</p>
            </div>
        </body>
    </html>
    """
    
    message = MessageSchema(
        subject="Employee Dashboard - Verification Code",
        recipients=[email],
        body=html_content,
        subtype="html"
    )
    
    fm = FastMail(conf)
    await fm.send_message(message)

async def send_otp_sms(phone_number: str, otp_code: str):
    """Send OTP via SMS using Twilio"""
    if not twilio_client:
        logger.warning("Twilio not configured, skipping SMS")
        return
    
    try:
        message = twilio_client.messages.create(
            body=f"Your Employee Dashboard verification code is: {otp_code}. Valid for 10 minutes.",
            from_=settings.TWILIO_PHONE_NUMBER,
            to=phone_number
        )
        logger.info(f"SMS sent successfully: {message.sid}")
    except Exception as e:
        logger.error(f"Failed to send SMS: {e}")
        raise

async def send_task_notification(email: str, full_name: str, task_title: str, due_date: str):
    """Send task assignment notification"""
    html_content = f"""
    <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #2563eb;">New Task Assigned</h2>
                
                <p>Dear {full_name},</p>
                
                <p>A new task has been assigned to you:</p>
                
                <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="margin-top: 0; color: #1e40af;">{task_title}</h3>
                    <p><strong>Due Date:</strong> {due_date}</p>
                </div>
                
                <p>Please log in to the Employee Dashboard to view the complete task details.</p>
                
                <p>Best regards,<br>Management Team</p>
            </div>
        </body>
    </html>
    """
    
    message = MessageSchema(
        subject=f"New Task Assigned: {task_title}",
        recipients=[email],
        body=html_content,
        subtype="html"
    )
    
    fm = FastMail(conf)
    await fm.send_message(message)

async def send_announcement_notification(emails: List[str], title: str, content: str):
    """Send announcement notification to multiple recipients"""
    html_content = f"""
    <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #2563eb;">Company Announcement</h2>
                
                <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="margin-top: 0; color: #1e40af;">{title}</h3>
                    <p>{content}</p>
                </div>
                
                <p>Please log in to the Employee Dashboard for more details.</p>
                
                <p>Best regards,<br>Management Team</p>
            </div>
        </body>
    </html>
    """
    
    message = MessageSchema(
        subject=f"Company Announcement: {title}",
        recipients=emails,
        body=html_content,
        subtype="html"
    )
    
    fm = FastMail(conf)
    await fm.send_message(message)