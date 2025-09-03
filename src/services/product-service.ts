import {supabase} from '@/utils/supabase'
import {Category, Product} from '@/types/product/types'

export class ProductService {
  static async createProduct(productData: {
    name: string
    description: string
    price: number
    category: Category
    stock: number
    image_url?: string
  }): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .insert({
        ...productData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single()

    if (error) {
      console.error('Erro ao criar produto:', error)
      throw new Error(`Erro ao criar produto: ${error.message}`)
    }

    return data
  }

  static async getAllProducts(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Erro ao buscar produtos:', error)
      throw new Error(`Erro ao buscar produtos: ${error.message}`)
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
      console.error('Erro ao buscar produto:', error)
      return null
    }

    return data
  }

  static async updateProduct(id: string, productData: Partial<{
    name: string
    description: string
    price: number
    category: Category
    stock: number
    image_url: string
  }>): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .update({
        ...productData,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Erro ao atualizar produto:', error)
      throw new Error(`Erro ao atualizar produto: ${error.message}`)
    }

    return data
  }

  static async deleteProduct(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Erro ao deletar produto:', error)
      return false
    }

    return true
  }

  static async getProductsByCategory(category: Category): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category)
      .order('name', { ascending: true })

    if (error) {
      console.error('Erro ao buscar produtos por categoria:', error)
      throw new Error(`Erro ao buscar produtos por categoria: ${error.message}`)
    }

    return data || []
  }

  static async searchProducts(query: string): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .or(`name.ilike.%${query}%, description.ilike.%${query}%`)
      .order('name', { ascending: true })

    if (error) {
      console.error('Erro ao buscar produtos:', error)
      throw new Error(`Erro ao buscar produtos: ${error.message}`)
    }

    return data || []
  }
}
