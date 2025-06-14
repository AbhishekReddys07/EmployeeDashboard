# Employee Dashboard Backend

A comprehensive Python FastAPI backend for the Employee Dashboard system with role-based access control, real-time analytics, and automated notifications.

## Features

### 🔐 Authentication & Security
- **Secure Login**: Employee ID + Password with optional OTP
- **Role-Based Access Control**: 6 role levels (Intern, HR, Tech, Finance, Admin, Super Admin)
- **JWT Token Authentication**: Secure API access with token expiration
- **OTP Verification**: Email and SMS OTP for sensitive operations
- **Password Security**: Bcrypt hashing with secure password generation

### 👥 Employee Management
- **Profile Management**: Complete employee lifecycle management
- **Hierarchy Support**: Manager and team leader relationships
- **Department Organization**: Multi-department structure
- **Status Management**: Active/Inactive/Suspended employee states
- **Automated Onboarding**: Welcome emails with credentials

### 📊 Analytics & Reporting
- **Real-time Dashboards**: Company and department-level metrics
- **Performance Tracking**: Individual and team performance analytics
- **Financial Analytics**: Revenue, profit, and expense tracking
- **Custom Reports**: PDF and Excel report generation
- **Data Visualization**: Charts and graphs for insights

### 📢 Communication
- **Announcements**: Company-wide and targeted announcements
- **Goal Management**: Individual and team goal tracking
- **Task Assignment**: Task management with notifications
- **Support System**: Ticketing system with priority levels

### 🔔 Notifications
- **Email Notifications**: Welcome emails, OTP, task assignments
- **SMS Integration**: Twilio integration for SMS notifications
- **WhatsApp Support**: WhatsApp API integration (configurable)
- **Real-time Updates**: WebSocket support for live updates

## Technology Stack

- **Framework**: FastAPI 0.104.1
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Authentication**: JWT with python-jose
- **Password Hashing**: Passlib with bcrypt
- **Email**: FastMail with SMTP support
- **SMS**: Twilio integration
- **Reports**: ReportLab (PDF) and OpenPyXL (Excel)
- **Background Tasks**: Celery with Redis
- **Database Migrations**: Alembic

## Installation & Setup

### Prerequisites
- Python 3.8+
- PostgreSQL 12+
- Redis (for background tasks)

### 1. Clone and Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Environment Configuration
```bash
cp .env.example .env
# Edit .env with your configuration
```

### 3. Database Setup
```bash
# Create PostgreSQL database
createdb employee_dashboard

# Run migrations
alembic upgrade head
```

### 4. Start the Server
```bash
# Development
python run.py

# Production
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## API Documentation

Once running, access the interactive API documentation:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## Key API Endpoints

### Authentication
- `POST /api/auth/login` - Employee login with optional OTP
- `POST /api/auth/request-otp` - Request OTP for verification
- `POST /api/auth/reset-password` - Password reset with OTP

### Employee Management
- `GET /api/employees/` - List employees (role-based filtering)
- `POST /api/employees/` - Create new employee (HR/Admin only)
- `GET /api/employees/me` - Get current employee profile
- `PUT /api/employees/{id}` - Update employee (HR/Admin only)
- `PATCH /api/employees/{id}/status` - Update employee status

### Analytics & Reports
- `GET /api/analytics/dashboard` - Dashboard metrics
- `GET /api/analytics/department/{dept}` - Department analytics
- `POST /api/reports/generate` - Generate custom reports
- `GET /api/reports/download/{report_id}` - Download reports

## Role-Based Permissions

| Feature | Intern | HR | Tech | Finance | Admin | Super Admin |
|---------|--------|----|----- |---------|-------|-------------|
| View Dashboard | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| View Analytics | ❌ | ✅ | ❌ | ✅ | ✅ | ✅ |
| Manage Employees | ❌ | ✅ | ❌ | ❌ | ✅ | ✅ |
| Create Announcements | ❌ | ✅ | ❌ | ❌ | ✅ | ✅ |
| Generate Reports | ❌ | ✅ | ❌ | ✅ | ✅ | ✅ |
| System Settings | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| Delete Employees | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |

## Database Schema

### Core Tables
- **employees**: User profiles and authentication
- **announcements**: Company announcements
- **goals**: Individual and team goals
- **tasks**: Task management and assignment
- **support_tickets**: Help desk and support system
- **company_metrics**: Financial and operational metrics
- **department_metrics**: Department-specific analytics
- **employee_performance**: Performance evaluations

## Security Features

### Data Protection
- **Password Hashing**: Bcrypt with salt
- **JWT Tokens**: Secure token-based authentication
- **Role Validation**: Endpoint-level permission checks
- **Input Validation**: Pydantic schema validation
- **SQL Injection Protection**: SQLAlchemy ORM

### Access Control
- **Role-Based Access**: 6-tier permission system
- **Resource Ownership**: Users can only access their data
- **Admin Restrictions**: Super Admin required for deletions
- **Session Management**: Token expiration and refresh

## Deployment

### Docker Deployment
```bash
# Build image
docker build -t employee-dashboard-api .

# Run with docker-compose
docker-compose up -d
```

### Environment Variables
```env
DATABASE_URL=postgresql://user:pass@localhost:5432/employee_dashboard
SECRET_KEY=your-super-secret-key
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
REDIS_URL=redis://localhost:6379/0
```

## Monitoring & Logging

- **Health Checks**: `/health` endpoint for monitoring
- **Structured Logging**: JSON formatted logs
- **Error Tracking**: Global exception handling
- **Performance Metrics**: Request timing and database queries

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

This project is licensed under the MIT License.