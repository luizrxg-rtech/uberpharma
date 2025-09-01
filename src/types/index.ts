export interface Product {
  id: string
  name: string
  description: string
  price: number
  weight: number
  measure: Measure
  image_url?: string
  category: string
  stock: number
  created_at: string
  updated_at: string
}

export interface ImageUploadResult {
  url: string
  path: string
}

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

export interface CartItem {
  id: string
  product: Product
  quantity: number
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  quantity: number
  price_at_time: number
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  user_id: string
  items: CartItem[]
  total: number
  status: 'pending' | 'completed' | 'cancelled'
  created_at: string
}

export enum Categories {
  BEM_ESTAR = "Bem-estar",
  COSMECEUTICOS = "Cosmecêuticos",
  DERMATOLOGICOS = "Dermatológicos",
  ESPORTES = "Esportes",
  HIGIENE_PESSOAL = "Higiene Pessoal",
  SUPLEMENTOS = "Suplementos"
}

export enum Measures {
  GRAM = "g",
  KILOGRAM = "kg",
  MILLILITER = "ml",
  LITER = "l"
}

export type Measure = typeof Measures[keyof typeof Measures];