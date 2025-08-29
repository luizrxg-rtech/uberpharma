import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Product {
  id: string
  sku: number
  name: string
  description: string
  price: number
  image: string
  category: string
  quantity: number
  created_at?: string
  updated_at?: string
}

export interface User {
  id: string
  email: string
  full_name: string
  phone?: string
  address?: string
  city?: string
  state?: string
  zip_code?: string
  created_at?: string
  updated_at?: string
}

export interface Order {
  id: string
  user_id: string
  total_amount: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  shipping_address: string
  created_at?: string
  updated_at?: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  quantity: number
  price_at_time: number
  created_at?: string
  product?: Product
}
