import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Calendar, Download, Filter } from 'lucide-react';

const Analytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  const analyticsData = {
    monthly: [
      { name: 'Jan', revenue: 180000, profit: 45000, employees: 45, productivity: 85 },
      { name: 'Feb', revenue: 220000, profit: 58000, employees: 48, productivity: 88 },
      { name: 'Mar', revenue: 280000, profit: 72000, employees: 50, productivity: 92 },
      { name: 'Apr', revenue: 320000, profit: 89000, employees: 52, productivity: 90 },
      { name: 'May', revenue: 380000, profit: 102000, employees: 55, productivity: 94 },
      { name: 'Jun', revenue: 420000, profit: 125000, employees: 58, productivity: 96 }
    ],
    quarterly: [
      { name: 'Q1 2023', revenue: 680000, profit: 175000, employees: 48, productivity: 88 },
      { name: 'Q2 2023', revenue: 1120000, profit: 316000, employees: 55, productivity: 93 },
      { name: 'Q3 2023', revenue: 1280000, profit: 358000, employees: 62, productivity: 91 },
      { name: 'Q4 2023', revenue: 1450000, profit: 412000, employees: 68, productivity: 95 }
    ]
  };

  const departmentPerformance = [
    { department: 'Technology', target: 100000, achieved: 125000, efficiency: 95 },
    { department: 'Sales', target: 200000, achieved: 185000, efficiency: 88 },
    { department: 'Marketing', target: 80000, achieved: 92000, efficiency: 91 },
    { department: 'HR', target: 50000, achieved: 48000, efficiency: 85 },
    { department: 'Finance', target: 60000, achieved: 65000, efficiency: 92 }
  ];

  const currentData = analyticsData[selectedPeriod as keyof typeof analyticsData];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Advanced Analytics</h1>
        <div className="flex space-x-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="monthly">Monthly View</option>
            <option value="quarterly">Quarterly View</option>
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue', value: '$4.2M', change: '+15.3%', color: 'text-green-600' },
          { label: 'Net Profit', value: '$1.1M', change: '+12.8%', color: 'text-green-600' },
          { label: 'Employee Count', value: '68', change: '+8.7%', color: 'text-blue-600' },
          { label: 'Avg Productivity', value: '92%', change: '+4.2%', color: 'text-purple-600' }
        ].map((metric, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-sm font-medium text-gray-600">{metric.label}</h3>
            <div className="flex items-end justify-between mt-2">
              <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
              <span className={`text-sm font-medium ${metric.color}`}>
                {metric.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trends */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue & Profit Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={currentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={3} name="Revenue" />
              <Line type="monotone" dataKey="profit" stroke="#10B981" strokeWidth={3} name="Profit" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Productivity Trends */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Employee Productivity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={currentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="productivity" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Department Performance */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Department Performance Analysis</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Department</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Target</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Achieved</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Performance</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Efficiency</th>
              </tr>
            </thead>
            <tbody>
              {departmentPerformance.map((dept, index) => {
                const performance = ((dept.achieved / dept.target) * 100).toFixed(1);
                const isOverTarget = dept.achieved >= dept.target;
                
                return (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 font-medium text-gray-900">{dept.department}</td>
                    <td className="py-4 px-4 text-gray-600">${dept.target.toLocaleString()}</td>
                    <td className="py-4 px-4 text-gray-600">${dept.achieved.toLocaleString()}</td>
                    <td className="py-4 px-4">
                      <span className={`font-semibold ${isOverTarget ? 'text-green-600' : 'text-red-600'}`}>
                        {performance}%
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-3">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${dept.efficiency}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-700">{dept.efficiency}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;