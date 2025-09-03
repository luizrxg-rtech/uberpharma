"use client"

import {VStack} from "@chakra-ui/react";
import Row from "./row/row";
import Filter from "./filter";
import {useEffect, useState} from "react";
import {Category, Product} from "@/types/product/types";
import {ProductService} from "@/services/product-service";

const CUSTOM_LINE = "Mais vendidos"

const PRODUCTS_PER_ROW = 6;

export default function Products() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[] | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const lines = [CUSTOM_LINE, ...Array.from(new Set(products?.map(product => product.line)))];

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const fetchedProducts: Product[] = await ProductService.getAllProducts();

      setProducts(fetchedProducts);
    } catch (error) {
      setError('Erro ao carregar produtos. Tente novamente. ');
      console.error('Erro ao carregar produtos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (error) {
    return null
  }

  return (
    <VStack
      w="full"
      pt={44} gap={10}
    >
      <Filter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      {lines.map((line, index) => {
        const lineProducts = products;

        if (line === CUSTOM_LINE) {
          lineProducts?.sort((a, b) => a.stock > b.stock ? 1 : -1)
        } else {
          lineProducts?.filter(product => product.line === line)
        }

        const processedProducts = lineProducts
          ?.filter(product => selectedCategory === null || product.category === selectedCategory)
          .slice(0, PRODUCTS_PER_ROW);

        return (
          <Row
            key={index}
            line={line}
            products={processedProducts}
            loading={loading}
          />
        )
      })}
    </VStack>
  )
}