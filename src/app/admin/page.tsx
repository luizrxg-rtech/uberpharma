'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import ImageUploader from '@/components/ui/image-uploader'
import { ProductService } from '@/services/product-service'
import {Measure, Product} from "@/types/product/types";
import {ImageUploadResult} from "@/types/misc/types";
import {Categories, Measures} from "@/types/product/enums";

interface EditFormData {
  name: string
  description: string
  line: string
  price: string
  weight: string
  measure: Measure | ''
  category: Category
  stock: string
}

interface EditingProduct extends Product {
  isEditing?: boolean
}

export default function AdminPage() {
  const [products, setProducts] = useState<EditingProduct[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [imageResult, setImageResult] = useState<ImageUploadResult | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    line: '',
    price: '',
    weight: '',
    measure: '' as Measure | '',
    category: '',
    stock: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [editingProductId, setEditingProductId] = useState<string | null>(null)
  const [editFormData, setEditFormData] = useState<EditFormData>({
    name: '',
    description: '',
    line: '',
    price: '',
    weight: '',
    measure: '' as Measure | '',
    category: '',
    stock: ''
  })

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      const productsData = await ProductService.getAllProducts()
      setProducts(productsData.map(p => ({ ...p, isEditing: false })))
    } catch (error) {
      console.error('Erro ao carregar produtos:', error)
      alert('Erro ao carregar produtos')
    }
  }

  const handleImageUploaded = (result: ImageUploadResult | null) => {
    setImageResult(result)

    if (result && selectedProduct) {
      setSelectedProduct(prev => prev ? {
        ...prev,
        image_url: result.url
      } : null)
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      line: '',
      price: '',
      weight: '',
      measure: '' as Measure | '',
      category: '',
      stock: ''
    })
    setImageResult(null)
    setSelectedProduct(null)
  }

  const handleCreateProduct = async () => {
    if (!formData.name || !formData.price || !formData.category || !formData.weight || !formData.measure) {
      alert('Por favor, preencha os campos obrigatórios: nome, preço, categoria, peso e medida')
      return
    }

    setIsLoading(true)

    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        line: formData.line,
        price: parseFloat(formData.price),
        weight: parseFloat(formData.weight),
        measure: formData.measure as Measure,
        category: formData.category,
        stock: parseInt(formData.stock) || 0,
        image_url: imageResult?.url || ''
      }

      await ProductService.createProduct(productData)

      resetForm()
      await loadProducts()
      alert('Produto criado com sucesso!')

    } catch (error) {
      console.error('Erro ao criar produto:', error)
      alert('Erro ao criar produto. Verifique o console para mais detalhes.')
    } finally {
      setIsLoading(false)
    }
  }

  const startEditing = (product: Product) => {
    setEditingProductId(product.id)
    setEditFormData({
      name: product.name,
      description: product.description || '',
      line: product.line || '',
      price: product.price.toString(),
      weight: product.weight.toString(),
      measure: product.measure,
      category: product.category,
      stock: product.stock.toString()
    })
  }

  const cancelEditing = () => {
    setEditingProductId(null)
    setEditFormData({
      name: '',
      description: '',
      line: '',
      price: '',
      weight: '',
      measure: '' as Measure | '',
      category: '',
      stock: ''
    })
  }

  const handleUpdateProduct = async (productId: string) => {
    const formData = editFormData

    if (!formData.name || !formData.line || !formData.price || !formData.category || !formData.weight || !formData.measure) {
      alert('Por favor, preencha os campos obrigatórios: nome, preço, categoria, peso e medida')
      return
    }

    setIsLoading(true)

    try {
      const updateData = {
        name: formData.name,
        description: formData.description,
        line: formData.line,
        price: parseFloat(formData.price),
        weight: parseFloat(formData.weight),
        measure: formData.measure as Measure,
        category: formData.category,
        stock: parseInt(formData.stock) || 0
      }

      await ProductService.updateProduct(productId, updateData)

      setEditingProductId(null)
      setEditFormData({
        name: '',
        description: '',
        line: '',
        price: '',
        weight: '',
        measure: '' as Measure | '',
        category: '',
        stock: ''
      })
      await loadProducts()
      alert('Produto atualizado com sucesso!')

    } catch (error) {
      console.error('Erro ao atualizar produto:', error)
      alert('Erro ao atualizar produto. Verifique o console para mais detalhes.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteProduct = async (productId: string, productName: string) => {
    if (!confirm(`Tem certeza que deseja excluir o produto "${productName}"?`)) {
      return
    }

    setIsLoading(true)

    try {
      const success = await ProductService.deleteProduct(productId)

      if (success) {
        await loadProducts()
        alert('Produto excluído com sucesso!')
      } else {
        alert('Erro ao excluir produto')
      }

    } catch (error) {
      console.error('Erro ao excluir produto:', error)
      alert('Erro ao excluir produto. Verifique o console para mais detalhes.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex flex-col mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 mx-auto">Administração de Produtos</h1>

      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-6">Criar Novo Produto</h2>

        <div className="space-y-4">
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Linha do Produto *
            </label>
            <input
              type="text"
              value={formData.line}
              onChange={(e) => setFormData(prev => ({ ...prev, line: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite o nome do produto"
            />
          </div>

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
              {Object.values(Categories).map((category, index) => {
                return (
                  <option
                    key={index}
                    value={category}
                  >
                    {category}
                  </option>
                )
              })}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Peso *
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.weight}
              onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite o peso do produto"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Medida *
            </label>
            <select
              value={formData.measure}
              onChange={(e) => setFormData(prev => ({ ...prev, measure: e.target.value as Measure }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecione a medida</option>
              {Object.values(Measures).map((measure, index) => {
                return (
                  <option
                    key={index}
                    value={measure}
                  >
                    {measure}
                  </option>
                )
              })}
            </select>
          </div>

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

          <button
            onClick={handleCreateProduct}
            disabled={isLoading || !formData.name || !formData.line || !formData.price || !formData.category || !formData.weight || !formData.measure}
            className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
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

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6">Produtos Cadastrados</h2>

        {products.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>Nenhum produto cadastrado ainda.</p>
            <p className="text-sm mt-2">Crie o primeiro produto usando o formulário acima.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4">Imagem</th>
                  <th className="text-left py-3 px-4">Nome</th>
                  <th className="text-left py-3 px-4">Categoria</th>
                  <th className="text-left py-3 px-4">Preço</th>
                  <th className="text-left py-3 px-4">Estoque</th>
                  <th className="text-left py-3 px-4">Peso</th>
                  <th className="text-left py-3 px-4">Medida</th>
                  <th className="text-left py-3 px-4">Ações</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      {product.image_url ? (
                        <div className="w-12 h-12 relative">
                          <Image
                            src={product.image_url}
                            alt={product.name}
                            fill
                            className="object-cover rounded"
                            sizes="48px"
                            loading="lazy"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                          <span className="text-xs text-gray-500">Sem imagem</span>
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {editingProductId === product.id ? (
                        <input
                          type="text"
                          value={editFormData.name || ''}
                          onChange={(e) => setEditFormData(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      ) : (
                        <div>
                          <p className="font-medium">{product.name}</p>
                          {product.description && (
                            <p className="text-sm text-gray-500 truncate max-w-xs">
                              {product.description}
                            </p>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {editingProductId === product.id ? (
                        <input
                          type="text"
                          value={editFormData.line || ''}
                          onChange={(e) => setEditFormData(prev => ({ ...prev, line: e.target.value }))}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      ) : (
                        <div>
                          <p className="font-medium">{product.line}</p>
                          {product.line && (
                            <p className="text-sm text-gray-500 truncate max-w-xs">
                              {product.line}
                            </p>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {editingProductId === product.id ? (
                        <select
                          value={editFormData.category || ''}
                          onChange={(e) => setEditFormData(prev => ({ ...prev, category: e.target.value }))}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                          {Object.values(Categories).map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      ) : (
                        <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                          {product.category}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {editingProductId === product.id ? (
                        <input
                          type="number"
                          step="0.01"
                          value={editFormData.price || ''}
                          onChange={(e) => setEditFormData(prev => ({ ...prev, price: e.target.value }))}
                          className="w-20 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      ) : (
                        <span className="font-medium">
                          R$ {product.price.toFixed(2)}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {editingProductId === product.id ? (
                        <input
                          type="number"
                          value={editFormData.stock || ''}
                          onChange={(e) => setEditFormData(prev => ({ ...prev, stock: e.target.value }))}
                          className="w-16 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      ) : (
                        <span className={`inline-block px-2 py-1 rounded text-xs ${
                          product.stock > 10 
                            ? 'bg-green-100 text-green-800'
                            : product.stock > 0 
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {product.stock} unidades
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {editingProductId === product.id ? (
                        <input
                          type="number"
                          step="0.01"
                          value={editFormData.weight || ''}
                          onChange={(e) => setEditFormData(prev => ({ ...prev, weight: e.target.value }))}
                          className="w-20 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      ) : (
                        <span className="font-medium">
                          {product.weight}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {editingProductId === product.id ? (
                        <select
                          value={editFormData.measure || ''}
                          onChange={(e) => setEditFormData(prev => ({ ...prev, measure: e.target.value as Measure }))}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                          {Object.values(Measures).map((measure, index) => {
                            return (
                              <option
                                key={index}
                                value={measure}
                              >
                                {measure}
                              </option>
                            )
                          })}
                        </select>
                      ) : (
                        <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                          {product.measure}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {editingProductId === product.id ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleUpdateProduct(product.id)}
                            disabled={isLoading}
                            className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 disabled:opacity-50"
                          >
                            Salvar
                          </button>
                          <button
                            onClick={cancelEditing}
                            disabled={isLoading}
                            className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600 disabled:opacity-50"
                          >
                            Cancelar
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            onClick={() => startEditing(product)}
                            disabled={isLoading}
                            className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 disabled:opacity-50"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id, product.name)}
                            disabled={isLoading}
                            className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 disabled:opacity-50"
                          >
                            Excluir
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
