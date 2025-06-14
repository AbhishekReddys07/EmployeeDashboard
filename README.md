# 🧑‍💼 Employee Dashboard – Full Stack (React + Python FastAPI)

A modern, responsive and feature-rich Employee Dashboard built using **React** (frontend) and **FastAPI** (Python backend), designed to manage internal employee operations, analytics, performance tracking, and reporting.

> 📌 **Currently hosted with mock/dummy data and public credentials for demo/testing purposes.**
> ✅ Open to contributions and cloning for learning or extension.

---

## 🚀 Features

### 🔐 Secure Login & Role-Based Access
- Login using **Employee ID** + **Password** (with optional OTP via Email/SMS)
- **Role-based Access**: Intern, HR, Tech Team, Finance, Admin, Super Admin
- JWT authentication with session expiration
- OTP login using **Twilio** (configurable)

### 📊 Dashboard & Analytics
- Company Revenue (Monthly/Quarterly)
- Profit & Loss Overview
- Department-Wise Growth
- Employee Performance Metrics
- Target vs Achievement Charts
- Real-Time Updates (via Supabase)

### 📢 Announcements & Goals
- Company Announcements (view/add/edit by Admin/HR)
- Team Goals, Deadlines & Success Trackers
- Individual progress indicators

### 📈 Interactive Charts & Reporting
- Bar, Line, Pie Charts using Chart.js
- Dynamic data visualization
- Downloadable Reports in **PDF** (ReportLab) & **Excel** (OpenPyXL)
- Reports: Performance, HR, Sales, Finance

### ✅ Task Management
- Assigned Tasks (view, submit)
- Manager Notifications on submission
- View Reporting Manager, Team Lead, Designation

### 🛠 Admin & Access Controls
- Create & Manage Employee Profiles
- Set Manager, Department, Designation
- Activate/Deactivate Employees
- Only Super Admin can delete employees

### 💬 Support & Feedback
- Raise Issues / Create Support Tickets
- Anonymous Suggestions or Feedback

---

## 🧪 Demo Credentials

Login here: **[http://localhost:5173](http://localhost:5173)** (Frontend)

> ✅ Backend runs on: [http://localhost:8000/docs](http://localhost:8000/docs)

| Role          | Employee ID | Password     |
|---------------|-------------|--------------|
| Super Admin   | ADMIN001    | admin123     |
| HR Manager    | HR001       | password123  |
| Tech Lead     | TECH001     | password123  |
| Finance       | FIN001      | password123  |
| Intern        | INT001      | password123  |

---

## 🧰 Tech Stack

- **Frontend**: React + TypeScript, Vite, TailwindCSS, Chart.js
- **Backend**: FastAPI (Python), PostgreSQL, SQLAlchemy, Alembic
- **Auth**: JWT, Bcrypt, Twilio OTP
- **Reports**: ReportLab, OpenPyXL
- **Async**: Celery, Redis
- **Others**: Supabase (optional real-time sync), Swagger UI, dotenv, role-based middleware

---

## ⚙️ Getting Started

### 1️⃣ Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt

# Set up PostgreSQL DB
createdb employee_dashboard

# Configure environment
cp .env.example .env
# Fill in DB credentials, Twilio keys, etc.

# Run migrations
alembic upgrade head

# Create default admin and seed data
python create_admin.py

# Start server
python run.py
```

Backend runs at: [http://localhost:8000](http://localhost:8000)

---

### 2️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: [http://localhost:5173](http://localhost:5173)

---

## 📂 Project Structure

```
├── backend/
│   ├── app/
│   │   ├── api/endpoints/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── core/ (config, security)
│   │   └── main.py
│   ├── database/
│   ├── alembic/
│   └── run.py
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── context/AuthContext.tsx
    │   ├── data/mockData.ts
    │   └── App.tsx
```

---

## 🧪 Testing Guide

```bash
# Backend Tests
python test_api.py
```

Use **Swagger UI** at: [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 🛡 Security Notes

- Passwords are hashed using **Bcrypt**
- All protected endpoints require **JWT**
- Role checks are enforced at controller level
- CORS properly configured for secure frontend-backend communication

---

## 🌐 Live Deployment 

The app is designed to be hosted on platforms like:
- **Render / Railway / Heroku** (Backend)
- **Vercel / Github Pages/ Netlify** (Frontend)
live hosted links : :https://13employeedashboard2025.netlify.app/,
 https://abhishekreddys07.github.io/EmployeeDashboard/                                                                                                                        
Deployment scripts will be added shortly.

---

## 🤝 Contributing

1. Fork this repository
2. Create your feature branch (`git checkout -b feature/awesome`)
3. Commit your changes (`git commit -am 'Add awesome feature'`)
4. Push to the branch (`git push origin feature/awesome`)
5. Open a Pull Request

---

## 📄 License

MIT License

---

## 📬 Contact

Feel free to connect on [LinkedIn: www.linkedin.com/in/72a925253abhi] or raise issues in this repo!

---

**Built with ❤️ using FastAPI + React**
