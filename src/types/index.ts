export interface User {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  role: 'intern' | 'hr' | 'tech' | 'finance' | 'admin';
  department: string;
  avatar?: string;
}

export interface DashboardMetrics {
  revenue: {
    current: number;
    previous: number;
    growth: number;
  };
  profit: {
    current: number;
    previous: number;
    growth: number;
  };
  employees: number;
  projects: number;
}

export interface ChartData {
  name: string;
  value: number;
  growth?: number;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  priority: 'low' | 'medium' | 'high';
  date: string;
  author: string;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  progress: number;
  deadline: string;
  assignedTo: string;
  status: 'pending' | 'in-progress' | 'completed';
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in-progress' | 'resolved';
  createdAt: string;
  createdBy: string;
}