import {supabase} from '@/utils/supabase'
import {Order, OrderItem} from '@/types/order/types'
import {Product} from '@/types/product/types'

export class OrderService {
  static async createOrder(
    items: { product: Product; quantity: number }[],
    shippingAddress: string
  ): Promise<Order | null> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const totalAmount = items.reduce((total, item) => {
      return total + (item.product.price * item.quantity)
    }, 0)

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: user.id,
        total_amount: totalAmount,
        shipping_address: shippingAddress,
        status: 'pending'
      })
      .select()
      .single()

    if (orderError) {
      return null
    }

    const orderItems = items.map(item => ({
      order_id: order.id,
      product_id: item.product.id,
      quantity: item.quantity,
      price_at_time: item.product.price
    }))

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems)

    if (itemsError) {
      await supabase.from('orders').delete().eq('id', order.id)
      return null
    }

    for (const item of items) {
      await supabase
        .from('products')
        .update({ quantity: item.product.stock - item.quantity })
        .eq('id', item.product.id)
    }

    return order
  }

  static async getUserOrders(): Promise<Order[]> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return []

    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      return []
    }

    return data || []
  }

  static async getOrderDetails(orderId: string): Promise<{
    order: Order | null;
    items: (OrderItem & { product: Product })[]
  }> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { order: null, items: [] }

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .eq('user_id', user.id)
      .single()

    if (orderError) {
      return { order: null, items: [] }
    }

    const { data: items, error: itemsError } = await supabase
      .from('order_items')
      .select(`
        *,
        products (*)
      `)
      .eq('order_id', orderId)

    if (itemsError) {
      return { order, items: [] }
    }

    const formattedItems = items?.map(item => ({
      ...item,
      product: item.products as Product
    })) || []

    return { order, items: formattedItems }
  }

  static async updateOrderStatus(orderId: string, status: Order['status']): Promise<boolean> {
    const { error } = await supabase
      .from('orders')
      .update({
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', orderId)

    return !error;
  }

  static async cancelOrder(orderId: string): Promise<boolean> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return false

    const { error } = await supabase
      .from('orders')
      .update({
        status: 'cancelled',
        updated_at: new Date().toISOString()
      })
      .eq('id', orderId)
      .eq('user_id', user.id)
      .eq('status', 'pending')

    return !error;
  }

  static async getOrderStatistics(): Promise<{
    total: number;
    pending: number;
    processing: number;
    shipped: number;
    delivered: number;
    cancelled: number;
  }> {
    const { data, error } = await supabase
      .from('orders')
      .select('status')

    if (error) {
      return {
        total: 0,
        pending: 0,
        processing: 0,
        shipped: 0,
        delivered: 0,
        cancelled: 0
      }
    }

    const initialStats = {
      total: 0,
      pending: 0,
      processing: 0,
      shipped: 0,
      delivered: 0,
      cancelled: 0
    }

    return data?.reduce((acc, order) => {
      acc.total++
      if (order.status === 'pending') acc.pending++
      else if (order.status === 'processing') acc.processing++
      else if (order.status === 'shipped') acc.shipped++
      else if (order.status === 'delivered') acc.delivered++
      else if (order.status === 'cancelled') acc.cancelled++
      return acc
    }, initialStats) || initialStats
  }
}
