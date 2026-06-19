import React, { createContext, useContext, useEffect, useState } from 'react';
import { account } from '@/services/appwrite';
import type { Models } from 'appwrite';

export type Role = 'super_admin' | 'admin' | 'analyst' | 'researcher' | 'viewer';

interface CustomPreferences extends Models.Preferences {
  role?: Role;
  kyc_status?: string;
  institution?: string;
  requestedRole?: string;
  id_file_id?: string;
}

export type AuthUser = Models.User<CustomPreferences>;

interface AuthContextType {
  user: AuthUser | null;
  role: Role;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    try {
      const currentAccount = await account.get();
      setUser(currentAccount);
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }

  const login = async (email: string, pass: string) => {
    await account.createEmailPasswordSession(email, pass);
    await checkUser();
  };

  const logout = async () => {
    await account.deleteSession('current');
    setUser(null);
  };

  const role = user?.prefs?.role || 'viewer';

  return (
    <AuthContext.Provider value={{ user, role, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
