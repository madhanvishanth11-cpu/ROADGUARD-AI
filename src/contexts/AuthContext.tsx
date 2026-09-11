import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { UserProfile } from '../types';

interface AuthContextType {
  user: any;
  profile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (fullName: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USER_KEY = 'roadguard_demo_auth';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = () => {
      const storedUser = localStorage.getItem(DEMO_USER_KEY);
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setProfile({
          id: parsedUser.id,
          full_name: 'Demo Citizen',
          email: parsedUser.email,
          role: 'CITIZEN',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    // Simulate network delay
    await new Promise(r => setTimeout(r, 800));

    if (email === 'demo@roadguard.ai' && password === 'RoadGuard@123') {
      const demoUser = { id: 'demo-citizen-123', email };
      localStorage.setItem(DEMO_USER_KEY, JSON.stringify(demoUser));
      setUser(demoUser);
      setProfile({
        id: demoUser.id,
        full_name: 'Demo Citizen',
        email: demoUser.email,
        role: 'CITIZEN',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
      return;
    }
    
    throw new Error('Invalid demo email or password.');
  };

  const signOut = async () => {
    localStorage.removeItem(DEMO_USER_KEY);
    setUser(null);
    setProfile(null);
  };

  const updateProfile = async (fullName: string) => {
    if (profile) {
      setProfile({ ...profile, full_name: fullName });
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signIn, signOut, updateProfile }}>
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
