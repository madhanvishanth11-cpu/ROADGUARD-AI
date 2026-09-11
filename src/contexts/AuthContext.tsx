import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export type Role = 'PUBLIC' | 'ADMIN';

export interface User {
  id: string;
  email: string;
  role: Role;
  name: string;
}

interface AuthContextType {
  user: User | null;
  loginPublic: (email: string, pass: string) => boolean;
  loginAdmin: (email: string, pass: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('roadguard_mock_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const loginPublic = (email: string, pass: string) => {
    if (email === 'demo@roadguard.ai' && pass === 'RoadGuard@123') {
      const publicUser: User = { id: 'public-demo', email, role: 'PUBLIC', name: 'Demo Citizen' };
      setUser(publicUser);
      localStorage.setItem('roadguard_mock_user', JSON.stringify(publicUser));
      return true;
    }
    return false;
  };

  const loginAdmin = (email: string, pass: string) => {
    if (email === 'admin@roadguard.ai' && pass === 'Admin@123') {
      const adminUser: User = { id: 'admin-demo', email, role: 'ADMIN', name: 'Demo Officer' };
      setUser(adminUser);
      localStorage.setItem('roadguard_mock_user', JSON.stringify(adminUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('roadguard_mock_user');
  };

  return (
    <AuthContext.Provider value={{ user, loginPublic, loginAdmin, logout }}>
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
