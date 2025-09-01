'use client'

import { useState } from 'react'
import ImageUploader from '@/components/ui/image-uploader'
import { ImageUploadResult, Product } from '@/types'
import { ProductService } from '@/services/product-service'

export default function AdminPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [imageResult, setImageResult] = useState<ImageUploadResult | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: ''
  })
  const [isCreating, setIsCreating] = useState(false)

  const handleImageUploaded = (result: ImageUploadResult | null) => {
    setImageResult(result)

    if (result && selectedProduct) {
      // Atualizar o produto local com a nova URL da imagem
      setSelectedProduct(prev => prev ? {
        ...prev,
        image_url: result.url
      } : null)
    }
  }

  const handleCreateProduct = async () => {
    if (!formData.name || !formData.price || !formData.category) {
      alert('Por favor, preencha os campos obrigatórios: nome, preço e categoria')
      return
    }

    setIsCreating(true)

    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        stock: parseInt(formData.stock) || 0,
        image_url: imageResult?.url || ''
      }

      const newProduct = await ProductService.createProduct(productData)

      console.log('Produto criado com sucesso:', newProduct)

      // Limpar formulário
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: ''
      })
      setImageResult(null)

      alert('Produto criado com sucesso!')

    } catch (error) {
      console.error('Erro ao criar produto:', error)
      alert('Erro ao criar produto. Verifique o console para mais detalhes.')
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Administração de Produtos</h1>

      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6">Criar Novo Produto</h2>

        <div className="space-y-4">
          {/* Nome do produto */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome do Produto *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite o nome do produto"
            />
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descrição
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Descrição do produto"
            />
          </div>

          {/* Preço e Estoque */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preço (R$) *
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Estoque
              </label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData(prev => ({ ...prev, stock: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
          </div>

          {/* Categoria */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Categoria *
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecione uma categoria</option>
              <option value="medicamentos">Medicamentos</option>
              <option value="vitaminas">Vitaminas</option>
              <option value="cosmeticos">Cosméticos</option>
              <option value="higiene">Higiene</option>
              <option value="suplementos">Suplementos</option>
            </select>
          </div>

          {/* Upload de imagem */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Imagem do Produto
            </label>
            <ImageUploader
              onImageUploaded={handleImageUploaded}
              currentImageUrl={selectedProduct?.image_url}
              productId={selectedProduct?.id}
              maxSizeInMB={5}
            />
          </div>

          {imageResult && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-700">
                <strong>Imagem carregada com sucesso!</strong>
              </p>
              <p className="text-xs text-green-600 mt-1 break-all">
                URL: {imageResult.url}
              </p>
            </div>
          )}

          {/* Botão de criar */}
          <button
            onClick={handleCreateProduct}
            disabled={isCreating || !formData.name || !formData.price || !formData.category}
            className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isCreating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Criando Produto...
              </>
            ) : (
              'Criar Produto'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
