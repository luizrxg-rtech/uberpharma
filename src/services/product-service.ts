import { supabase, Product } from '@/utils/supabase'

export class ProductService {
  static async getAllProducts(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('name', { ascending: true })

    if (error) {
      throw error
    }

    return data || []
  }

  static async getProductById(id: string): Promise<Product | null> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      return null
    }

    return data
  }

  static async getProductsByCategory(category: string): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category)
      .order('name', { ascending: true })

    if (error) {
      throw error
    }

    return data || []
  }

  static async searchProducts(query: string): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
      .order('name', { ascending: true })

    if (error) {
      throw error
    }

    return data || []
  }

  static async getCategories(): Promise<string[]> {
    const { data, error } = await supabase
      .from('products')
      .select('category')

    if (error) {
      throw error
    }

    const uniqueCategories = [...new Set(data?.map(item => item.category) || [])]
    return uniqueCategories
  }

  static async updateProductQuantity(id: string, quantity: number): Promise<boolean> {
    const { error } = await supabase
      .from('products')
      .update({ quantity })
      .eq('id', id)

    if (error) {
      return false
    }

    return true
  }

  static async checkProductAvailability(id: string, requestedQuantity: number): Promise<boolean> {
    const product = await this.getProductById(id)
    return product ? product.quantity >= requestedQuantity : false
  }
}
