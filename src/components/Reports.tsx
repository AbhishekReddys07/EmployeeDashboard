import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Download, FileText, Calendar, Filter, BarChart3, Users, DollarSign, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';

const Reports: React.FC = () => {
  const { user } = useAuth();
  const [selectedMonth, setSelectedMonth] = useState(format(new Date(), 'yyyy-MM'));
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [reportType, setReportType] = useState('monthly');

  const reportTemplates = [
    {
      id: 'revenue',
      title: 'Revenue Report',
      description: 'Detailed revenue analysis with monthly breakdowns',
      icon: <DollarSign className="h-6 w-6 text-green-500" />,
      color: 'bg-green-50 border-green-200',
      access: ['admin', 'finance']
    },
    {
      id: 'performance',
      title: 'Performance Review',
      description: 'Employee and department performance metrics',
      icon: <TrendingUp className="h-6 w-6 text-blue-500" />,
      color: 'bg-blue-50 border-blue-200',
      access: ['admin', 'hr']
    },
    {
      id: 'hr',
      title: 'HR Analytics',
      description: 'Hiring, retention, and employee satisfaction data',
      icon: <Users className="h-6 w-6 text-purple-500" />,
      color: 'bg-purple-50 border-purple-200',
      access: ['admin', 'hr']
    },
    {
      id: 'financial',
      title: 'Financial Summary',
      description: 'Profit & loss, expenses, and budget analysis',
      icon: <BarChart3 className="h-6 w-6 text-orange-500" />,
      color: 'bg-orange-50 border-orange-200',
      access: ['admin', 'finance']
    }
  ];

  const recentReports = [
    {
      id: '1',
      title: 'December 2023 Revenue Report',
      type: 'revenue',
      createdAt: '2024-01-02T10:00:00Z',
      size: '2.3 MB',
      format: 'PDF'
    },
    {
      id: '2',
      title: 'Q4 2023 Performance Review',
      type: 'performance',
      createdAt: '2024-01-01T15:30:00Z',
      size: '1.8 MB',
      format: 'Excel'
    },
    {
      id: '3',
      title: 'HR Analytics - December 2023',
      type: 'hr',
      createdAt: '2023-12-31T09:15:00Z',
      size: '1.2 MB',
      format: 'PDF'
    },
    {
      id: '4',
      title: 'Financial Summary - Q4 2023',
      type: 'financial',
      createdAt: '2023-12-30T14:45:00Z',
      size: '3.1 MB',
      format: 'Excel'
    }
  ];

  const departments = [
    { value: 'all', label: 'All Departments' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'sales', label: 'Sales' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'hr', label: 'Human Resources' },
    { value: 'finance', label: 'Finance' }
  ];

  const hasAccess = (reportAccess: string[]) => {
    return user?.role === 'admin' || reportAccess.includes(user?.role || '');
  };

  const generateReport = (reportId: string, format: 'pdf' | 'excel') => {
    // Simulate report generation
    const reportName = reportTemplates.find(r => r.id === reportId)?.title || 'Report';
    const fileName = `${reportName}_${selectedMonth}.${format === 'pdf' ? 'pdf' : 'xlsx'}`;
    
    // In a real app, this would trigger a download
    alert(`Generating ${fileName}...`);
  };

  const downloadReport = (reportId: string) => {
    // Simulate report download
    alert(`Downloading report ${reportId}...`);
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileText className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
            <p className="text-gray-600 mt-1">Generate and download business reports</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Report Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="month" className="block text-sm font-medium text-gray-700 mb-2">
              Month/Period
            </label>
            <input
              type="month"
              id="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
              Department
            </label>
            <select
              id="department"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {departments.map((dept) => (
                <option key={dept.value} value={dept.value}>
                  {dept.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="reportType" className="block text-sm font-medium text-gray-700 mb-2">
              Report Type
            </label>
            <select
              id="reportType"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
        </div>
      </div>

      {/* Report Templates */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Generate New Report</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reportTemplates.map((template) => (
            <div
              key={template.id}
              className={`rounded-xl p-6 border transition-all duration-200 ${
                hasAccess(template.access)
                  ? `${template.color} hover:shadow-md cursor-pointer`
                  : 'bg-gray-50 border-gray-200 opacity-50'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="mt-1">{template.icon}</div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{template.title}</h3>
                  <p className="text-gray-600 mb-4">{template.description}</p>
                  
                  {hasAccess(template.access) ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => generateReport(template.id, 'pdf')}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                      >
                        <Download className="h-4 w-4" />
                        PDF
                      </button>
                      <button
                        onClick={() => generateReport(template.id, 'excel')}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                      >
                        <Download className="h-4 w-4" />
                        Excel
                      </button>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500">
                      Access restricted to: {template.access.join(', ')}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Reports */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Reports</h2>
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Report Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Size
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Format
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentReports.map((report) => {
                  const template = reportTemplates.find(t => t.id === report.type);
                  const canDownload = template ? hasAccess(template.access) : false;
                  
                  return (
                    <tr key={report.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          {template?.icon}
                          <div>
                            <div className="text-sm font-medium text-gray-900">{report.title}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                          {report.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {format(new Date(report.createdAt), 'MMM dd, yyyy')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {report.size}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {report.format}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {canDownload ? (
                          <button
                            onClick={() => downloadReport(report.id)}
                            className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                          >
                            <Download className="h-4 w-4" />
                            Download
                          </button>
                        ) : (
                          <span className="text-gray-400">No Access</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {recentReports.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No reports generated yet</h3>
          <p className="text-gray-500">Generate your first report using the templates above.</p>
        </div>
      )}
    </div>
  );
};

export default Reports;