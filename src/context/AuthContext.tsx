import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (employeeId: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    employeeId: 'EMP001',
    name: 'John Smith',
    email: 'john.smith@company.com',
    role: 'admin',
    department: 'Administration'
  },
  {
    id: '2',
    employeeId: 'EMP002',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    role: 'hr',
    department: 'Human Resources'
  },
  {
    id: '3',
    employeeId: 'EMP003',
    name: 'Mike Chen',
    email: 'mike.chen@company.com',
    role: 'tech',
    department: 'Technology'
  },
  {
    id: '4',
    employeeId: 'EMP004',
    name: 'Emily Davis',
    email: 'emily.davis@company.com',
    role: 'finance',
    department: 'Finance'
  },
  {
    id: '5',
    employeeId: 'EMP005',
    name: 'Alex Wilson',
    email: 'alex.wilson@company.com',
    role: 'intern',
    department: 'Technology'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (employeeId: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication - in real app, this would call Python backend
    const foundUser = mockUsers.find(u => u.employeeId === employeeId);
    
    if (foundUser && password === 'password123') {
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};