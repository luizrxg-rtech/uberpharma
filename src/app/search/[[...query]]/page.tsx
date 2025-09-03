'use client';

import {useParams} from "next/navigation";
import {useEffect, useState} from 'react';
import {Product} from '@/types/product/types';
import {ProductCard} from '@/components/ui/product-card';
import {SegmentedControl, SegmentOption} from '@/components/ui/segmented-control';
import {Container, SimpleGrid, Spinner, Text, VStack} from '@chakra-ui/react';
import {ProductService} from '@/services/product-service';

export default function SearchPage() {
  const params = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const query = params?.query as string[] | undefined;
  const searchQuery = query && query.length > 0 ? decodeURIComponent(query[0]) : '';
  const isSearchRoute = Boolean(searchQuery);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        let fetchedProducts: Product[];

        if (searchQuery) {
          fetchedProducts = await ProductService.searchProducts(searchQuery);
        } else {
          fetchedProducts = await ProductService.getAllProducts();
        }

        setProducts(fetchedProducts);
      } catch (error) {
        setError('Erro ao carregar produtos. Tente novamente. ');
        console.error('Erro ao carregar produtos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery]);

  useEffect(() => {
    let filtered = products;

    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory]);

  const categories = Array.from(new Set(products.map(product => product.category)));

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const getPageTitle = () => {
    if (isSearchRoute) {
      return `Resultados da busca por "${searchQuery}"`;
    }
    return 'Todos os Produtos';
  };

  const getEmptyStateMessage = () => {
    if (isSearchRoute) {
      return `Nenhum produto encontrado para "${searchQuery}"`;
    }
    return 'Nenhum produto encontrado';
  };

  const categoryOptions: SegmentOption[] = [
    { label: "Todas", value: "" },
    ...categories.map(category => ({
      label: category,
      value: category
    }))
  ];

  if (error) {
    return (
      <Container maxW="7xl" py={8}>
        <VStack gap={8} align="center" minH="400px" justify="center">
          <Text color="red.500" fontSize="lg">{error}</Text>
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="7xl" py={8}>
      <VStack gap={8} align="stretch">
        <VStack gap={4} align="center">
          <Text fontSize="3xl" fontWeight="bold" textAlign="center">
            {getPageTitle()}
          </Text>
          <Text fontSize="lg" color="muted.foreground" textAlign="center">
            {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''} {isSearchRoute ? 'encontrado' : 'disponível'}{filteredProducts.length !== 1 ? (isSearchRoute ? 's' : 'eis') : ''}
          </Text>
        </VStack>

        {categories.length > 0 && (
          <VStack
            gap={4}
            wrap="wrap"
            align="center"
            className="w-full"
          >
            <Text fontSize="xl" fontWeight="semibold">Categorias</Text>
            <SegmentedControl
              value={selectedCategory}
              onChange={handleCategoryChange}
              options={categoryOptions}
              size="sm"
              colorScheme="blue"
              className="w-fit"
            />
          </VStack>
        )}

        {filteredProducts.length === 0 ? (
          <VStack gap={4} py={12}>
            <Text fontSize="lg" textAlign="center" color="muted.foreground">
              {getEmptyStateMessage()}
            </Text>
            <Text textAlign="center" color="muted.foreground">
              Tente buscar com outras palavras-chave ou navegue por nossas categorias
            </Text>
          </VStack>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} gap={6}>
            {filteredProducts.map((product) => (
              <ProductCard
                loading={loading}
                key={product.id}
                product={product}
              />
            ))}
          </SimpleGrid>
        )}
      </VStack>
    </Container>
  );
}
