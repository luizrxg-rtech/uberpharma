import { supabase } from '@/utils/supabase'
import { Product } from '@/types'
import { ImageUploadService } from './image-upload-service'

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
    try {
      const { data: product } = await supabase
        .from('products')
        .select('image')
        .eq('id', id)
        .single()

      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id)

      if (error) {
        throw error
      }

      if (product?.image) {
        ImageUploadService.deleteImage(product.image).catch(console.error)
      }

      return true
    } catch (error) {
      console.error('Erro ao deletar produto:', error)
      return false
    }
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
