import { DashboardMetric, Announcement, Goal, SupportTicket, ChartData } from '../types';

export const dashboardMetrics: DashboardMetric[] = [
  {
    title: 'Total Revenue',
    value: '$2.4M',
    change: 12.5,
    icon: 'DollarSign',
    color: 'text-green-500'
  },
  {
    title: 'Monthly Profit',
    value: '$340K',
    change: 8.2,
    icon: 'TrendingUp',
    color: 'text-blue-500'
  },
  {
    title: 'Active Projects',
    value: '24',
    change: -2.1,
    icon: 'Briefcase',
    color: 'text-orange-500'
  },
  {
    title: 'Team Performance',
    value: '94%',
    change: 5.7,
    icon: 'Users',
    color: 'text-purple-500'
  }
];

export const revenueData: ChartData[] = [
  { name: 'Jan', revenue: 180000, profit: 45000, expenses: 135000 },
  { name: 'Feb', revenue: 220000, profit: 58000, expenses: 162000 },
  { name: 'Mar', revenue: 280000, profit: 72000, expenses: 208000 },
  { name: 'Apr', revenue: 320000, profit: 89000, expenses: 231000 },
  { name: 'May', revenue: 380000, profit: 102000, expenses: 278000 },
  { name: 'Jun', revenue: 420000, profit: 125000, expenses: 295000 }
];

export const departmentData: ChartData[] = [
  { name: 'Technology', value: 35 },
  { name: 'Sales', value: 28 },
  { name: 'Marketing', value: 20 },
  { name: 'HR', value: 10 },
  { name: 'Finance', value: 7 }
];

export const performanceData: ChartData[] = [
  { name: 'Q1', value: 85 },
  { name: 'Q2', value: 92 },
  { name: 'Q3', value: 88 },
  { name: 'Q4', value: 95 }
];

export const announcements: Announcement[] = [
  {
    id: '1',
    title: 'Q2 Results Announcement',
    content: 'We are pleased to announce that we have exceeded our Q2 targets by 15%. Great work everyone!',
    date: '2024-01-15',
    priority: 'high',
    author: 'CEO Office'
  },
  {
    id: '2',
    title: 'New Employee Wellness Program',
    content: 'Starting next month, we are launching a comprehensive wellness program including gym memberships and mental health support.',
    date: '2024-01-12',
    priority: 'medium',
    author: 'Human Resources'
  },
  {
    id: '3',
    title: 'Office Renovation Update',
    content: 'The renovation of the 3rd floor will begin next week. Temporary workspaces have been arranged.',
    date: '2024-01-10',
    priority: 'low',
    author: 'Facilities'
  }
];

export const goals: Goal[] = [
  {
    id: '1',
    title: 'Implement New CRM System',
    description: 'Deploy and train staff on the new customer relationship management system',
    deadline: '2024-02-28',
    progress: 75,
    status: 'in-progress',
    assignedTo: 'Technology Team'
  },
  {
    id: '2',
    title: 'Increase Customer Satisfaction',
    description: 'Achieve 95% customer satisfaction rating through improved service quality',
    deadline: '2024-03-31',
    progress: 60,
    status: 'in-progress',
    assignedTo: 'Customer Service'
  },
  {
    id: '3',
    title: 'Launch Marketing Campaign',
    description: 'Execute Q1 digital marketing campaign for new product launch',
    deadline: '2024-01-31',
    progress: 100,
    status: 'completed',
    assignedTo: 'Marketing Team'
  }
];

export const supportTickets: SupportTicket[] = [
  {
    id: '1',
    title: 'Login Issues with HR Portal',
    description: 'Unable to access the HR portal since yesterday. Getting authentication errors.',
    priority: 'high',
    status: 'in-progress',
    createdAt: '2024-01-15',
    createdBy: 'john.doe@company.com'
  },
  {
    id: '2',
    title: 'Request for Equipment Upgrade',
    description: 'Current laptop is running slow and affecting productivity. Need hardware upgrade.',
    priority: 'medium',
    status: 'open',
    createdAt: '2024-01-14',
    createdBy: 'jane.smith@company.com'
  },
  {
    id: '3',
    title: 'Expense Report Submission Problem',
    description: 'The expense report form is not accepting PDF attachments.',
    priority: 'low',
    status: 'closed',
    createdAt: '2024-01-13',
    createdBy: 'mike.johnson@company.com'
  }
];