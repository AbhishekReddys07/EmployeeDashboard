import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (employeeId: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: User[] = [
  {
    id: '1',
    employeeId: 'EMP001',
    name: 'John Doe',
    email: 'john.doe@techcorp.com',
    role: 'admin',
    department: 'Management'
  },
  {
    id: '2',
    employeeId: 'EMP002',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@techcorp.com',
    role: 'hr',
    department: 'Human Resources'
  },
  {
    id: '3',
    employeeId: 'EMP003',
    name: 'Mike Chen',
    email: 'mike.chen@techcorp.com',
    role: 'tech',
    department: 'Engineering'
  },
  {
    id: '4',
    employeeId: 'EMP004',
    name: 'Lisa Smith',
    email: 'lisa.smith@techcorp.com',
    role: 'finance',
    department: 'Finance'
  },
  {
    id: '5',
    employeeId: 'EMP005',
    name: 'Tom Wilson',
    email: 'tom.wilson@techcorp.com',
    role: 'intern',
    department: 'Engineering'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth
    const storedUser = localStorage.getItem('employee_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (employeeId: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.employeeId === employeeId);
    
    if (foundUser && password === 'password123') {
      setUser(foundUser);
      localStorage.setItem('employee_user', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('employee_user');
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