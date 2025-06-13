import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { Calendar, Filter, Download, TrendingUp, Users, DollarSign, Target } from 'lucide-react';

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('6months');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  // Mock data
  const revenueData = [
    { month: 'Jul', revenue: 58000, profit: 12000, expenses: 46000 },
    { month: 'Aug', revenue: 62000, profit: 14000, expenses: 48000 },
    { month: 'Sep', revenue: 65000, profit: 15000, expenses: 50000 },
    { month: 'Oct', revenue: 72000, profit: 18000, expenses: 54000 },
    { month: 'Nov', revenue: 68000, profit: 16000, expenses: 52000 },
    { month: 'Dec', revenue: 85000, profit: 22000, expenses: 63000 },
  ];

  const departmentPerformance = [
    { department: 'Engineering', revenue: 250000, employees: 45, efficiency: 92 },
    { department: 'Sales', revenue: 180000, employees: 28, efficiency: 87 },
    { department: 'Marketing', revenue: 120000, employees: 18, efficiency: 89 },
    { department: 'Finance', revenue: 80000, employees: 8, efficiency: 94 },
    { department: 'HR', revenue: 60000, employees: 12, efficiency: 91 },
  ];

  const customerData = [
    { segment: 'Enterprise', value: 45, color: '#3b82f6' },
    { segment: 'SMB', value: 35, color: '#10b981' },
    { segment: 'Startup', value: 20, color: '#f59e0b' },
  ];

  const employeeGrowth = [
    { month: 'Jul', hires: 5, departures: 2, total: 98 },
    { month: 'Aug', hires: 8, departures: 3, total: 103 },
    { month: 'Sep', hires: 6, departures: 1, total: 108 },
    { month: 'Oct', hires: 4, departures: 2, total: 110 },
    { month: 'Nov', hires: 3, departures: 4, total: 109 },
    { month: 'Dec', hires: 7, departures: 1, total: 115 },
  ];

  const projectMetrics = [
    { status: 'Completed', count: 18, percentage: 75 },
    { status: 'In Progress', count: 4, percentage: 17 },
    { status: 'Delayed', count: 2, percentage: 8 },
  ];

  const MetricCard: React.FC<{
    title: string;
    value: string;
    change: number;
    icon: React.ReactNode;
    color: string;
  }> = ({ title, value, change, icon, color }) => (
    <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          <div className="flex items-center mt-2">
            <TrendingUp className={`h-4 w-4 mr-1 ${change > 0 ? 'text-green-500' : 'text-red-500'}`} />
            <span className={`text-sm font-medium ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change > 0 ? '+' : ''}{change}%
            </span>
            <span className="text-sm text-gray-500 ml-1">vs last period</span>
          </div>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-1">Comprehensive business insights and metrics</p>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="1year">Last Year</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Revenue"
          value="$410K"
          change={12.5}
          icon={<DollarSign className="h-6 w-6 text-white" />}
          color="bg-blue-500"
        />
        <MetricCard
          title="Net Profit"
          value="$97K"
          change={18.3}
          icon={<TrendingUp className="h-6 w-6 text-white" />}
          color="bg-green-500"
        />
        <MetricCard
          title="Team Size"
          value="115"
          change={5.5}
          icon={<Users className="h-6 w-6 text-white" />}
          color="bg-purple-500"
        />
        <MetricCard
          title="Project Success"
          value="92%"
          change={3.2}
          icon={<Target className="h-6 w-6 text-white" />}
          color="bg-orange-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Trends */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Revenue Analysis</h2>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600">Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">Profit</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-gray-600">Expenses</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
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
              <Area
                type="monotone"
                dataKey="revenue"
                stackId="1"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.1}
              />
              <Area
                type="monotone"
                dataKey="profit"
                stackId="2"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.1}
              />
              <Area
                type="monotone"
                dataKey="expenses"
                stackId="3"
                stroke="#ef4444"
                fill="#ef4444"
                fillOpacity={0.1}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Customer Segments */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Customer Segments</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={customerData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {customerData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-4">
            {customerData.map((entry) => (
              <div key={entry.segment} className="text-center">
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  ></div>
                  <span className="text-sm font-medium text-gray-900">{entry.segment}</span>
                </div>
                <span className="text-lg font-bold text-gray-900">{entry.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Department Performance */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Department Revenue</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentPerformance} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" stroke="#6b7280" />
              <YAxis dataKey="department" type="category" stroke="#6b7280" width={80} />
              <Tooltip
                formatter={(value) => [`$${(value as number / 1000).toFixed(0)}K`, 'Revenue']}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="revenue" fill="#3b82f6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Employee Growth */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Employee Growth</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={employeeGrowth}>
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
                dataKey="total"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="hires"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="departures"
                stroke="#ef4444"
                strokeWidth={2}
                dot={{ fill: '#ef4444', strokeWidth: 2, r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-gray-600">Total Employees</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">New Hires</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-gray-600">Departures</span>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Project Performance Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projectMetrics.map((metric) => (
            <div key={metric.status} className="text-center p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">{metric.status}</h3>
              <div className="text-3xl font-bold text-blue-600 mb-2">{metric.count}</div>
              <div className="text-sm text-gray-600">{metric.percentage}% of total</div>
              <div className="mt-3 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${metric.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;