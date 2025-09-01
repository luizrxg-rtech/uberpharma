'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, AuthState } from '@/types';
import { supabase } from '@/utils/supabase';
import { UserService } from '@/services/user-service';
import type { User as SupabaseUser } from '@supabase/supabase-js';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false
  });
  const [loading, setLoading] = useState(true);

  const mapSupabaseUser = async (supabaseUser: SupabaseUser): Promise<User> => {
    const profile = await UserService.getCurrentUserProfile();

    return {
      id: supabaseUser.id,
      email: supabaseUser.email || '',
      name: profile?.name || supabaseUser.email?.split('@')[0] || 'Usuário',
      isLoggedIn: true
    };
  };

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (session?.user) {
          const user = await mapSupabaseUser(session.user);
          setAuthState({
            user,
            isAuthenticated: true
          });
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const user = await mapSupabaseUser(session.user);
          setAuthState({
            user,
            isAuthenticated: true
          });
        } else {
          setAuthState({
            user: null,
            isAuthenticated: false
          });
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (data.user) {

        try {
          const user = await mapSupabaseUser(data.user);

          setAuthState({
            user,
            isAuthenticated: true
          });

          return { success: true };
        } catch (mapError) {
          return { success: false, error: 'Erro ao processar dados do usuário' };
        }
      }

      return { success: false, error: 'Dados de usuário não recebidos' };
    } catch (error) {
      return { success: false, error: 'Erro interno do servidor' };
    }
  };

  const register = async (email: string, password: string, name: string): Promise<{ success: boolean; error?: string }> => {
    try {

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name
          }
        }
      });


      if (error) {
        return { success: false, error: error.message };
      }

      if (data.user) {
        try {
          await UserService.upsertUserProfile({
            email,
            name: name
          });

          const user = await mapSupabaseUser(data.user);

          setAuthState({
            user,
            isAuthenticated: true
          });

          return { success: true };
        } catch (profileError) {
          console.error('Erro ao criar perfil:', profileError);
          return { success: false, error: 'Erro ao criar perfil do usuário' };
        }
      }

      return { success: false, error: 'Erro ao criar usuário' };
    } catch (error) {
      return { success: false, error: 'Erro interno do servidor' };
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await supabase.auth.signOut();
      setAuthState({
        user: null,
        isAuthenticated: false
      });
    } catch (error) {
    }
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      logout,
      register,
      loading
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
