import { supabase } from '@/utils/supabase'

export class ImageUploadService {
  private static readonly BUCKET_NAME = 'product-images'
  private static readonly MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
  private static readonly ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

  static async uploadImage(file: File, productSku: string): Promise<string> {
    // Validar arquivo
    if (!this.ALLOWED_TYPES.includes(file.type)) {
      throw new Error('Tipo de arquivo não suportado. Use JPEG, PNG ou WebP.')
    }

    if (file.size > this.MAX_FILE_SIZE) {
      throw new Error('Arquivo muito grande. Tamanho máximo: 5MB.')
    }

    // Gerar nome único para o arquivo
    const fileExt = file.name.split('.').pop()
    const fileName = `${productSku}_${Date.now()}.${fileExt}`
    const filePath = `products/${fileName}`

    try {
      // Upload do arquivo
      const { data, error } = await supabase.storage
        .from(this.BUCKET_NAME)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (error) {
        console.error('Erro no upload:', error)
        throw new Error('Erro ao fazer upload da imagem.')
      }

      // Obter URL pública da imagem
      const { data: urlData } = supabase.storage
        .from(this.BUCKET_NAME)
        .getPublicUrl(filePath)

      return urlData.publicUrl
    } catch (error) {
      console.error('Erro no upload:', error)
      throw new Error('Erro ao fazer upload da imagem.')
    }
  }

  static async deleteImage(imageUrl: string): Promise<void> {
    try {
      // Extrair o path da URL
      const url = new URL(imageUrl)
      const pathParts = url.pathname.split('/')
      const bucketIndex = pathParts.findIndex(part => part === this.BUCKET_NAME)

      if (bucketIndex === -1) {
        console.warn('URL da imagem não parece ser do bucket correto')
        return
      }

      const filePath = pathParts.slice(bucketIndex + 1).join('/')

      const { error } = await supabase.storage
        .from(this.BUCKET_NAME)
        .remove([filePath])

      if (error) {
        console.error('Erro ao deletar imagem:', error)
        // Não lançar erro para não interromper outras operações
      }
    } catch (error) {
      console.error('Erro ao deletar imagem:', error)
      // Não lançar erro para não interromper outras operações
    }
  }

  static async updateImage(oldImageUrl: string, newFile: File, productSku: string): Promise<string> {
    try {
      // Upload da nova imagem
      const newImageUrl = await this.uploadImage(newFile, productSku)

      // Deletar imagem antiga (sem aguardar para não bloquear)
      this.deleteImage(oldImageUrl).catch(console.error)

      return newImageUrl
    } catch (error) {
      throw error
    }
  }
}
