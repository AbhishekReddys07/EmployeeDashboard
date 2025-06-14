import React, { useState } from 'react';
import { Download, FileText, Calendar, Filter, Printer } from 'lucide-react';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

const Reports: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState('monthly');
  const [selectedPeriod, setSelectedPeriod] = useState('current');

  const reportTypes = [
    { id: 'monthly', name: 'Monthly Performance Report', description: 'Comprehensive monthly business metrics' },
    { id: 'quarterly', name: 'Quarterly Review Report', description: 'Quarterly analysis and insights' },
    { id: 'hr', name: 'HR Analytics Report', description: 'Employee performance and HR metrics' },
    { id: 'finance', name: 'Financial Summary Report', description: 'Revenue, profit, and financial analysis' },
    { id: 'sales', name: 'Sales Performance Report', description: 'Sales metrics and team performance' }
  ];

  const mockReportData = {
    monthly: {
      title: 'Monthly Performance Report - January 2024',
      sections: [
        { name: 'Revenue Analysis', data: { total: '$420,000', growth: '+15.3%' } },
        { name: 'Profit Margins', data: { net: '$125,000', margin: '29.8%' } },
        { name: 'Employee Metrics', data: { count: 58, productivity: '94%' } },
        { name: 'Project Status', data: { active: 24, completed: 18 } }
      ]
    },
    quarterly: {
      title: 'Quarterly Review Report - Q4 2023',
      sections: [
        { name: 'Business Growth', data: { revenue: '$1.45M', growth: '+22.1%' } },
        { name: 'Market Position', data: { share: '12.5%', rank: '3rd' } },
        { name: 'Team Expansion', data: { hired: 12, retention: '92%' } },
        { name: 'Goals Achievement', data: { completed: '87%', onTrack: '91%' } }
      ]
    }
  };

  const generatePDF = (reportType: string) => {
    const doc = new jsPDF();
    const report = mockReportData[reportType as keyof typeof mockReportData];
    
    // Header
    doc.setFontSize(20);
    doc.text(report.title, 20, 30);
    
    // Date
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 45);
    
    // Sections
    let yPosition = 60;
    report.sections.forEach((section, index) => {
      doc.setFontSize(14);
      doc.text(section.name, 20, yPosition);
      
      doc.setFontSize(11);
      Object.entries(section.data).forEach(([key, value]) => {
        yPosition += 15;
        doc.text(`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`, 30, yPosition);
      });
      
      yPosition += 20;
    });
    
    doc.save(`${reportType}-report-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const generateExcel = (reportType: string) => {
    const report = mockReportData[reportType as keyof typeof mockReportData];
    const workbook = XLSX.utils.book_new();
    
    const data = [
      [report.title],
      [`Generated on: ${new Date().toLocaleDateString()}`],
      [''],
      ...report.sections.flatMap(section => [
        [section.name],
        ...Object.entries(section.data).map(([key, value]) => [`  ${key}`, value]),
        ['']
      ])
    ];
    
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');
    XLSX.writeFile(workbook, `${reportType}-report-${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const previewReport = (reportType: string) => {
    const report = mockReportData[reportType as keyof typeof mockReportData];
    const content = `
      ${report.title}
      Generated on: ${new Date().toLocaleDateString()}
      
      ${report.sections.map(section => `
        ${section.name}:
        ${Object.entries(section.data).map(([key, value]) => `  • ${key}: ${value}`).join('\n')}
      `).join('\n')}
    `;
    
    alert(content);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
        <div className="flex space-x-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="current">Current Period</option>
            <option value="previous">Previous Period</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>
      </div>

      {/* Report Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportTypes.map((reportType) => (
          <div key={reportType.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{reportType.name}</h3>
                <p className="text-sm text-gray-600">{reportType.description}</p>
              </div>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => previewReport(reportType.id)}
                className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span className="text-sm">Preview</span>
              </button>
              <button
                onClick={() => generatePDF(reportType.id)}
                className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span className="text-sm">PDF</span>
              </button>
              <button
                onClick={() => generateExcel(reportType.id)}
                className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span className="text-sm">Excel</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">24</div>
            <div className="text-sm text-gray-600">Reports Generated</div>
            <div className="text-xs text-gray-500">This Month</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">94%</div>
            <div className="text-sm text-gray-600">Data Accuracy</div>
            <div className="text-xs text-gray-500">System Wide</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">2.1s</div>
            <div className="text-sm text-gray-600">Avg Generation</div>
            <div className="text-xs text-gray-500">Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">156</div>
            <div className="text-sm text-gray-600">Downloads</div>
            <div className="text-xs text-gray-500">Last 30 Days</div>
          </div>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Reports</h3>
        <div className="space-y-4">
          {[
            { name: 'Monthly Performance - December 2023', date: '2024-01-05', type: 'PDF', size: '2.4 MB' },
            { name: 'HR Analytics - Q4 2023', date: '2024-01-03', type: 'Excel', size: '1.8 MB' },
            { name: 'Financial Summary - December 2023', date: '2024-01-02', type: 'PDF', size: '3.1 MB' },
            { name: 'Sales Performance - Q4 2023', date: '2023-12-30', type: 'Excel', size: '2.2 MB' }
          ].map((report, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-medium text-gray-900">{report.name}</p>
                  <p className="text-sm text-gray-500">{report.date} • {report.type} • {report.size}</p>
                </div>
              </div>
              <button className="flex items-center space-x-2 px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <Download className="w-4 h-4" />
                <span className="text-sm">Download</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;