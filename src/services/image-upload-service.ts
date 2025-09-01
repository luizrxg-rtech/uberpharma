import { supabase } from '@/utils/supabase'
import { ImageUploadResult } from '@/types'

export class ImageUploadService {
  private static readonly BUCKET_NAME = 'product-images'

  static async uploadImage(file: File): Promise<ImageUploadResult> {
    try {
      // Gerar nome único para o arquivo
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `products/${fileName}`

      // Upload do arquivo para o Supabase Storage
      const { data, error } = await supabase.storage
        .from(this.BUCKET_NAME)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (error) {
        throw new Error(`Erro no upload: ${error.message}`)
      }

      // Obter a URL pública da imagem
      const { data: publicUrl } = supabase.storage
        .from(this.BUCKET_NAME)
        .getPublicUrl(filePath)

      return {
        url: publicUrl.publicUrl,
        path: filePath
      }
    } catch (error) {
      console.error('Erro no upload da imagem:', error)
      throw error
    }
  }

  static async deleteImage(filePath: string): Promise<void> {
    try {
      const { error } = await supabase.storage
        .from(this.BUCKET_NAME)
        .remove([filePath])

      if (error) {
        throw new Error(`Erro ao deletar imagem: ${error.message}`)
      }
    } catch (error) {
      console.error('Erro ao deletar imagem:', error)
      throw error
    }
  }

  static async updateProductImage(productId: string, imageUrl: string, imagePath?: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('products')
        .update({
          image_url: imageUrl,
          image_path: imagePath || null,
          updated_at: new Date().toISOString()
        })
        .eq('id', productId)

      if (error) {
        throw new Error(`Erro ao atualizar produto: ${error.message}`)
      }
    } catch (error) {
      console.error('Erro ao atualizar produto:', error)
      throw error
    }
  }

  static async deleteProductImageFromStorage(productId: string): Promise<void> {
    try {
      // Buscar o caminho da imagem no banco
      const { data: product, error: fetchError } = await supabase
        .from('products')
        .select('image_path')
        .eq('id', productId)
        .single()

      if (fetchError) {
        throw new Error(`Erro ao buscar produto: ${fetchError.message}`)
      }

      // Se existe um caminho de imagem, deletar do storage
      if (product?.image_path) {
        await this.deleteImage(product.image_path)
      }

      // Limpar URLs no banco
      await this.updateProductImage(productId, '', undefined)
    } catch (error) {
      console.error('Erro ao deletar imagem do produto:', error)
      throw error
    }
  }
}
