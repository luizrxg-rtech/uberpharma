'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, AuthState } from '@/types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'uberpharma_user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false
  });

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(STORAGE_KEY);
      if (savedUser) {
        const user = JSON.parse(savedUser);
        setAuthState({
          user,
          isAuthenticated: true
        });
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (email && password.length >= 6) {
      const user: User = {
        id: Date.now().toString(),
        email,
        name: email.split('@')[0],
        isLoggedIn: true
      };

      setAuthState({
        user,
        isAuthenticated: true
      });

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } catch (error) {
        console.error('Failed to save user to localStorage:', error);
      }

      return true;
    }

    return false;
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (email && password.length >= 6 && name) {
      const user: User = {
        id: Date.now().toString(),
        email,
        name,
        isLoggedIn: true
      };

      setAuthState({
        user,
        isAuthenticated: true
      });

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } catch (error) {
        console.error('Failed to save user to localStorage:', error);
      }

      return true;
    }

    return false;
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false
    });

    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to remove user from localStorage:', error);
    }
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      logout,
      register
    }}>
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
