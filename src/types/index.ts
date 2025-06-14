export interface User {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  role: 'intern' | 'hr' | 'tech' | 'finance' | 'admin';
  department: string;
  avatar?: string;
}

export interface DashboardMetric {
  title: string;
  value: string;
  change: number;
  icon: string;
  color: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  priority: 'low' | 'medium' | 'high';
  author: string;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  deadline: string;
  progress: number;
  status: 'in-progress' | 'completed' | 'overdue';
  assignedTo: string;
}

export interface SupportTicket {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in-progress' | 'closed';
  createdAt: string;
  createdBy: string;
}

export interface ChartData {
  name: string;
  value: number;
  month?: string;
  revenue?: number;
  profit?: number;
  expenses?: number;
}