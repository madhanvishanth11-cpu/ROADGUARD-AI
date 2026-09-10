import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { supabase, hasSupabase } from '../services/db/supabaseClient';
import type { UserProfile } from '../types';

interface AuthContextType {
  user: any;
  profile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (fullName: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USER_KEY = 'roadguard_mock_user';
const MOCK_PROFILES_KEY = 'roadguard_mock_profiles';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      if (!hasSupabase) {
        // Mock Auth Flow
        const storedUser = localStorage.getItem(MOCK_USER_KEY);
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          
          const profiles: UserProfile[] = JSON.parse(localStorage.getItem(MOCK_PROFILES_KEY) || '[]');
          const userProfile = profiles.find(p => p.id === parsedUser.id);
          if (userProfile) setProfile(userProfile);
        }
        setLoading(false);
        return;
      }

      // Supabase Auth Flow
      const { data: { session } } = await supabase!.auth.getSession();
      setUser(session?.user ?? null);
      if (session?.user) {
        await loadProfile(session.user.id);
      }
      setLoading(false);

      const { data: { subscription } } = supabase!.auth.onAuthStateChange(async (_event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          await loadProfile(session.user.id);
        } else {
          setProfile(null);
        }
        setLoading(false);
      });

      return () => {
        subscription.unsubscribe();
      };
    };

    initializeAuth();
  }, []);

  const loadProfile = async (userId: string) => {
    if (!hasSupabase) return;
    try {
      const { data, error } = await supabase!.from('profiles').select('*').eq('id', userId).single();
      if (!error && data) {
        setProfile(data as UserProfile);
      }
    } catch (err) {
      console.error('Failed to load profile', err);
    }
  };

  const signIn = async (email: string, password: string) => {
    if (!hasSupabase) {
      // Mock Sign In
      if (email === 'authority@demo.com' && password === 'password') {
        const mockAuthUser = { id: 'auth-123', email, role: 'authenticated' };
        const mockProfile: UserProfile = {
          id: mockAuthUser.id,
          full_name: 'Demo Authority',
          email,
          role: 'AUTHORITY',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        localStorage.setItem(MOCK_USER_KEY, JSON.stringify(mockAuthUser));
        
        const existingProfiles = JSON.parse(localStorage.getItem(MOCK_PROFILES_KEY) || '[]');
        if (!existingProfiles.find((p: any) => p.id === mockAuthUser.id)) {
          localStorage.setItem(MOCK_PROFILES_KEY, JSON.stringify([...existingProfiles, mockProfile]));
        }
        
        setUser(mockAuthUser);
        setProfile(mockProfile);
        return;
      }
      
      const profiles: UserProfile[] = JSON.parse(localStorage.getItem(MOCK_PROFILES_KEY) || '[]');
      const existingUser = profiles.find(p => p.email === email);
      if (existingUser && password === 'password') {
        const mockUser = { id: existingUser.id, email };
        localStorage.setItem(MOCK_USER_KEY, JSON.stringify(mockUser));
        setUser(mockUser);
        setProfile(existingUser);
        return;
      }
      
      throw new Error('Invalid login credentials');
    }

    const { error } = await supabase!.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    if (!hasSupabase) {
      // Mock Sign Up
      const existingProfiles: UserProfile[] = JSON.parse(localStorage.getItem(MOCK_PROFILES_KEY) || '[]');
      if (existingProfiles.find(p => p.email === email)) {
        throw new Error('User already exists');
      }

      const mockUser = { id: `user-${Date.now()}`, email };
      const newProfile: UserProfile = {
        id: mockUser.id,
        full_name: fullName,
        email,
        role: 'CITIZEN',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      localStorage.setItem(MOCK_PROFILES_KEY, JSON.stringify([...existingProfiles, newProfile]));
      localStorage.setItem(MOCK_USER_KEY, JSON.stringify(mockUser));
      setUser(mockUser);
      setProfile(newProfile);
      return;
    }

    const { data, error } = await supabase!.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: 'CITIZEN'
        }
      }
    });
    if (error) throw error;
    
    // Automatically create profile on successful sign up if trigger isn't set up
    if (data.user) {
      const { error: profileError } = await supabase!.from('profiles').insert({
        id: data.user.id,
        full_name: fullName,
        email: email,
        role: 'CITIZEN'
      });
      if (!profileError) {
        await loadProfile(data.user.id);
      }
    }
  };

  const signOut = async () => {
    if (!hasSupabase) {
      localStorage.removeItem(MOCK_USER_KEY);
      setUser(null);
      setProfile(null);
      return;
    }
    const { error } = await supabase!.auth.signOut();
    if (error) throw error;
  };

  const updateProfile = async (fullName: string) => {
    if (!user) throw new Error('Not authenticated');

    if (!hasSupabase) {
      if (profile) {
        const updatedProfile = { ...profile, full_name: fullName, updated_at: new Date().toISOString() };
        setProfile(updatedProfile);
        const profiles: UserProfile[] = JSON.parse(localStorage.getItem(MOCK_PROFILES_KEY) || '[]');
        const idx = profiles.findIndex(p => p.id === user.id);
        if (idx !== -1) {
          profiles[idx] = updatedProfile;
          localStorage.setItem(MOCK_PROFILES_KEY, JSON.stringify(profiles));
        }
      }
      return;
    }

    const { error } = await supabase!.from('profiles').update({
      full_name: fullName,
      updated_at: new Date().toISOString()
    }).eq('id', user.id);
    if (error) throw error;
    await loadProfile(user.id);
  };

  const resetPassword = async (email: string) => {
    if (!hasSupabase) {
      // Mock: Do nothing but simulate success
      await new Promise(r => setTimeout(r, 500));
      return;
    }
    const { error } = await supabase!.auth.resetPasswordForEmail(email);
    if (error) throw error;
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signIn, signUp, signOut, updateProfile, resetPassword }}>
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
