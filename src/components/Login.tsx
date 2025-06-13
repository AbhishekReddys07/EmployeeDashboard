import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Building2, User, Lock, AlertCircle } from 'lucide-react';

const Login: React.FC = () => {
  const { login, isLoading } = useAuth();
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showDemo, setShowDemo] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = await login(employeeId, password);
    if (!success) {
      setError('Invalid employee ID or password');
    }
  };

  const demoCredentials = [
    { employeeId: 'EMP001', role: 'Admin', name: 'John Doe' },
    { employeeId: 'EMP002', role: 'HR', name: 'Sarah Johnson' },
    { employeeId: 'EMP003', role: 'Tech', name: 'Mike Chen' },
    { employeeId: 'EMP004', role: 'Finance', name: 'Lisa Smith' },
    { employeeId: 'EMP005', role: 'Intern', name: 'Tom Wilson' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <Building2 className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">TechCorp</h1>
          <p className="text-gray-600">Employee Dashboard Login</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700 mb-2">
                Employee ID
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  id="employeeId"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your employee ID"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <span className="text-sm text-red-700">{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={() => setShowDemo(!showDemo)}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              {showDemo ? 'Hide' : 'Show'} Demo Credentials
            </button>
            
            {showDemo && (
              <div className="mt-3 p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600 mb-3">Use any of these credentials (password: password123):</p>
                <div className="space-y-2">
                  {demoCredentials.map((cred) => (
                    <div key={cred.employeeId} className="flex justify-between text-xs">
                      <span className="font-mono">{cred.employeeId}</span>
                      <span className="text-gray-600">{cred.role} - {cred.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;