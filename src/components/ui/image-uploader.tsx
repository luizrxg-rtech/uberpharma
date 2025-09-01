
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Imagem do Produto
      </label>

      {/* Preview da imagem */}
      {preview && (
        <div className="relative inline-block">
          <img
            src={preview}
            alt="Preview do produto"
            className="w-32 h-32 object-cover rounded-lg border border-gray-300"
          />
          {!disabled && (
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              disabled={uploading}
            >
              ×
            </button>
          )}
          {uploading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
              <div className="text-white text-sm">Enviando...</div>
            </div>
          )}
        </div>
      )}

      {/* Botões de ação */}
      <div className="flex gap-3">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileSelect}
          className="hidden"
          disabled={disabled || uploading}
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled || uploading}
          className={`px-4 py-2 text-sm font-medium rounded-md border transition-colors ${
            disabled || uploading
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-300'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500'
          }`}
        >
          {uploading ? 'Enviando...' : (preview ? 'Alterar Imagem' : 'Escolher Imagem')}
        </button>

        {preview && !disabled && (
          <button
            type="button"
            onClick={handleRemoveImage}
            disabled={uploading}
            className={`px-4 py-2 text-sm font-medium rounded-md border transition-colors ${
              uploading
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-300'
                : 'bg-white text-red-600 border-red-300 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500'
            }`}
          >
            Remover
          </button>
        )}
      </div>

      {/* Informações sobre o upload */}
      <p className="text-xs text-gray-500">
        Formatos aceitos: JPEG, PNG, WebP. Tamanho máximo: 5MB.
      </p>
    </div>
  )
}
import { useState, useRef } from 'react'
import { ImageUploadService } from '@/services/image-upload-service'

interface ImageUploaderProps {
  currentImageUrl?: string
  onImageUploaded: (imageUrl: string) => void
  productSku: string
  disabled?: boolean
}

export default function ImageUploader({
  currentImageUrl,
  onImageUploaded,
  productSku,
  disabled = false
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(currentImageUrl || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Mostrar preview imediatamente
    const previewUrl = URL.createObjectURL(file)
    setPreview(previewUrl)

    setUploading(true)

    try {
      let imageUrl: string

      if (currentImageUrl && currentImageUrl !== '') {
        // Atualizar imagem existente
        imageUrl = await ImageUploadService.updateImage(currentImageUrl, file, productSku)
      } else {
        // Upload nova imagem
        imageUrl = await ImageUploadService.uploadImage(file, productSku)
      }

      onImageUploaded(imageUrl)

      // Limpar preview temporário e usar URL real
      URL.revokeObjectURL(previewUrl)
      setPreview(imageUrl)

    } catch (error: any) {
      alert(`Erro no upload: ${error.message}`)

      // Reverter preview em caso de erro
      setPreview(currentImageUrl || null)
      URL.revokeObjectURL(previewUrl)
    } finally {
      setUploading(false)
      // Limpar input para permitir re-upload do mesmo arquivo
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleRemoveImage = () => {
    setPreview(null)
    onImageUploaded('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }
