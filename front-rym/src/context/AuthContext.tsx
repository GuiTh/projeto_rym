import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { login as loginService, register as registerService, logout as logoutService } from '../services/authService';

interface User {
  token: string;
  [key: string]: any; // Adicione outras propriedades do usuário conforme necessário
}

interface AuthContextProps {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ token });
    }
  }, []);

  const login = async (userName: string, password: string) => {
    const data = await loginService({ userName, password });
    localStorage.setItem('token', data.token);
    setUser(data.user);
  };

  const register = async (userName: string, email: string, password: string) => {
    const data = await registerService({ userName, email, password });
    localStorage.setItem('token', data.token);
    setUser(data.user);
  };

  const logout = () => {
    logoutService();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
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
