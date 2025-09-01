import { supabase, Product } from '@/utils/supabase'

export class AdminProductService {
  static async createProduct(productData: {
    sku: number
    name: string
    description: string
    price: number
    image: string
    category: string
    quantity: number
  }): Promise<Product | null> {
    const { data, error } = await supabase
      .from('products')
      .insert(productData)
      .select()
      .single()

    if (error) {
      throw error
    }

    return data
  }

  static async updateProduct(id: string, productData: Partial<{
    sku: number
    name: string
    description: string
    price: number
    image: string
    category: string
    quantity: number
  }>): Promise<Product | null> {
    const { data, error } = await supabase
      .from('products')
      .update(productData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      throw error
    }

    return data
  }

  static async deleteProduct(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)

    return !error
  }

  static async getAllProductsForAdmin(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      throw error
    }

    return data || []
  }

  static async checkSkuExists(sku: number, excludeId?: string): Promise<boolean> {
    let query = supabase
      .from('products')
      .select('id')
      .eq('sku', sku)

    if (excludeId) {
      query = query.neq('id', excludeId)
    }

    const { data, error } = await query

    if (error) {
      return false
    }

    return data.length > 0
  }
}
