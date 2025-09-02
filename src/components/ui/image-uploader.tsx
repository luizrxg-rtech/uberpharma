'use client'

import {useState, useRef, useCallback, ChangeEvent, MouseEvent} from 'react'
import { ImageUploadService } from '@/services/image-upload-service'
import { ImageUploadResult } from '@/types/misc/types'

interface ImageUploaderProps {
  onImageUploaded: (result: ImageUploadResult | null) => void
  currentImageUrl?: string
  productId?: string
  disabled?: boolean
  accept?: string
  maxSizeInMB?: number
}

export default function ImageUploader({
  onImageUploaded,
  currentImageUrl,
  productId,
  disabled = false,
  accept = 'image/*',
  maxSizeInMB = 5
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(currentImageUrl || null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateFile = useCallback((file: File): string | null => {
    if (!file.type.startsWith('image/')) {
      return 'Por favor, selecione apenas arquivos de imagem.'
    }

    const maxSizeInBytes = maxSizeInMB * 1024 * 1024
    if (file.size > maxSizeInBytes) {
      return `O arquivo deve ter no máximo ${maxSizeInMB}MB.`
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      return 'Formato não suportado. Use JPEG, PNG, WebP ou GIF.'
    }

    return null
  }, [maxSizeInMB])

  const handleFileSelect = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setError(null)

    const validationError = validateFile(file)
    if (validationError) {
      setError(validationError)
      return
    }

    setUploading(true)

    try {
      const previewUrl = URL.createObjectURL(file)
      setPreview(previewUrl)

      const uploadResult = await ImageUploadService.uploadImage(file)

      if (productId) {
        await ImageUploadService.updateProductImage(productId, uploadResult.url, uploadResult.path)
      }

      onImageUploaded(uploadResult)

      URL.revokeObjectURL(previewUrl)

      setPreview(uploadResult.url)

    } catch (error) {
      console.error('Erro no upload:', error)
      setError(error instanceof Error ? error.message : 'Erro desconhecido no upload')
      setPreview(currentImageUrl || null)
      onImageUploaded(null)
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleRemoveImage = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()

    setError(null)
    setUploading(true)

    try {
      if (productId) {
        await ImageUploadService.updateProductImage(productId, '', '')
      }

      setPreview(null)
      onImageUploaded(null)

    } catch (error) {
      console.error('Erro ao remover imagem:', error)
      setError(error instanceof Error ? error.message : 'Erro ao remover imagem')
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleClick = () => {
    if (!disabled && !uploading) {
      fileInputRef.current?.click()
    }
  }

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
        disabled={disabled || uploading}
      />

      <div
        onClick={handleClick}
        className={`
          relative border-2 border-dashed rounded-lg p-6 text-center transition-colors
          ${preview ? 'border-green-300 bg-green-50' : 'border-gray-300 bg-gray-50'}
          ${disabled || uploading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:border-gray-400'}
        `}
      >
        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="max-w-full max-h-64 mx-auto rounded-lg shadow-md"
            />
            {!uploading && (
              <button
                onClick={(e) => {
                  handleRemoveImage(e)
                }}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
                disabled={disabled}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        ) : (
          <div className="py-8">
            <svg
              className="mx-auto h-12 w-12 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <p className="text-sm text-gray-600 mb-2">
              {uploading ? 'Fazendo upload...' : 'Clique para selecionar uma imagem'}
            </p>
            <p className="text-xs text-gray-400">
              JPEG, PNG, WebP ou GIF (máx. {maxSizeInMB}MB)
            </p>
          </div>
        )}

        {uploading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 rounded-lg flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
              <span className="text-sm text-gray-600">Enviando...</span>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {preview && !uploading && (
        <div className="mt-2 text-xs text-gray-500 text-center">
          Imagem carregada com sucesso
        </div>
      )}
    </div>
  )
}
