export interface User {
  id: string
  email: string
  name: string
  role?: 'admin' | 'user'
  isLoggedIn?: boolean
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
}