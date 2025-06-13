import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Briefcase,
  Award,
  Calendar,
  Bell
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { format } from 'date-fns';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  // Mock data
  const revenueData = [
    { month: 'Jan', revenue: 65000, profit: 15000 },
    { month: 'Feb', revenue: 72000, profit: 18000 },
    { month: 'Mar', revenue: 68000, profit: 16000 },
    { month: 'Apr', revenue: 85000, profit: 22000 },
    { month: 'May', revenue: 92000, profit: 25000 },
    { month: 'Jun', revenue: 98000, profit: 28000 }
  ];

  const departmentData = [
    { department: 'Engineering', employees: 45, performance: 92 },
    { department: 'Sales', employees: 28, performance: 87 },
    { department: 'Marketing', employees: 18, performance: 89 },
    { department: 'HR', employees: 12, performance: 94 },
    { department: 'Finance', employees: 8, performance: 91 }
  ];

  const pieData = [
    { name: 'Completed', value: 78, color: '#10B981' },
    { name: 'In Progress', value: 15, color: '#F59E0B' },
    { name: 'Pending', value: 7, color: '#EF4444' }
  ];

  const metrics = {
    revenue: { current: 98000, previous: 92000, growth: 6.5 },
    profit: { current: 28000, previous: 25000, growth: 12 },
    employees: 111,
    projects: 24
  };

  const recentAnnouncements = [
    {
      id: '1',
      title: 'Q2 All-Hands Meeting',
      date: '2024-01-15',
      priority: 'high' as const
    },
    {
      id: '2',
      title: 'New Employee Benefits',
      date: '2024-01-14',
      priority: 'medium' as const
    },
    {
      id: '3',
      title: 'Office Renovation Update',
      date: '2024-01-13',
      priority: 'low' as const
    }
  ];

  const MetricCard: React.FC<{
    title: string;
    value: string;
    growth?: number;
    icon: React.ReactNode;
    color: string;
  }> = ({ title, value, growth, icon, color }) => (
    <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {growth !== undefined && (
            <div className="flex items-center mt-2">
              {growth > 0 ? (
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
              )}
              <span className={`text-sm font-medium ${growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {Math.abs(growth)}%
              </span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );

  const getPriorityColor = (priority: string) => {
    const colors = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800'
    };
    return colors[priority as keyof typeof colors];
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name?.split(' ')[0]}!
          </h1>
          <p className="text-gray-600 mt-1">Here's what's happening at TechCorp today</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-gray-500">Today</p>
            <p className="font-semibold text-gray-900">{format(new Date(), 'MMM dd, yyyy')}</p>
          </div>
          <Calendar className="h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Monthly Revenue"
          value={`$${(metrics.revenue.current / 1000).toFixed(0)}K`}
          growth={metrics.revenue.growth}
          icon={<DollarSign className="h-6 w-6 text-white" />}
          color="bg-blue-500"
        />
        <MetricCard
          title="Monthly Profit"
          value={`$${(metrics.profit.current / 1000).toFixed(0)}K`}
          growth={metrics.profit.growth}
          icon={<TrendingUp className="h-6 w-6 text-white" />}
          color="bg-green-500"
        />
        <MetricCard
          title="Total Employees"
          value={metrics.employees.toString()}
          icon={<Users className="h-6 w-6 text-white" />}
          color="bg-purple-500"
        />
        <MetricCard
          title="Active Projects"
          value={metrics.projects.toString()}
          icon={<Briefcase className="h-6 w-6 text-white" />}
          color="bg-orange-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue & Profit Chart */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Revenue & Profit Trends</h2>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600">Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">Profit</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="profit"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ fill: '#10b981', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Project Status */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Project Status</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-4">
            {pieData.map((entry) => (
              <div key={entry.name} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: entry.color }}
                ></div>
                <span className="text-sm text-gray-600">{entry.name}</span>
                <span className="text-sm font-semibold text-gray-900">{entry.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Department Performance */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Department Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="department" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="performance" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Announcements */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-6">
            <Bell className="h-5 w-5 text-blue-500" />
            <h2 className="text-xl font-semibold text-gray-900">Recent Announcements</h2>
          </div>
          <div className="space-y-4">
            {recentAnnouncements.map((announcement) => (
              <div key={announcement.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">{announcement.title}</h3>
                    <p className="text-sm text-gray-500">{format(new Date(announcement.date), 'MMM dd, yyyy')}</p>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getPriorityColor(announcement.priority)}`}>
                    {announcement.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm py-2">
            View All Announcements
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;