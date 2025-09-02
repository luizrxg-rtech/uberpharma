import {CartItem} from "@/types/cart/types";

export interface Order {
  id: string
  user_id: string
  items: CartItem[]
  total: number
  status: 'pending' | 'completed' | 'cancelled'
  created_at: string
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