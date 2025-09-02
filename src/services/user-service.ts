import { supabase } from '@/utils/supabase'
import { User, Order, OrderItem } from '@/types'

export class UserService {
  static async getCurrentUserProfile(): Promise<User | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return null

      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          return null
        }
        return null
      }

      return data
    } catch (error) {
      return null
    }
  }

  static async upsertUserProfile(profile: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        console.error('Usuário não autenticado ao tentar criar perfil')
        return null
      }

      const { data, error } = await supabase
        .from('users')
        .upsert({
          id: user.id,
          ...profile,
          updated_at: new Date().toISOString()
        })
        .select()
        .single()

      if (error) {
        console.error('Erro ao criar perfil do usuário:', error)
        throw error
      }

      return data
    } catch (error) {
      console.error('Erro no upsertUserProfile:', error)
      throw error
    }
  }

  static async updateUserProfile(updates: Partial<Omit<User, 'id' | 'created_at'>>): Promise<User | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return null

      const { data, error } = await supabase
        .from('users')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)
        .select()
        .single()

      if (error) {
        return null
      }

      return data
    } catch (error) {
      return null
    }
  }
}
