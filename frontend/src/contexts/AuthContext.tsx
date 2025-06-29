import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '../types';
import { mockLogin, mockGoogleLogin, getUserData, removeAuthToken, isAuthenticated } from '../utils/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing authentication on mount
    if (isAuthenticated()) {
      const userData = getUserData();
      setUser(userData);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    try {
      const userData = await mockLogin(email, password);
      setUser(userData);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async (): Promise<void> => {
    setLoading(true);
    try {
      const userData = await mockGoogleLogin();
      setUser(userData);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = (): void => {
    removeAuthToken();
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    login,
    loginWithGoogle,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};