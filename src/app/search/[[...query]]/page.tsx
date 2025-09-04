'use client';

import {useParams} from "next/navigation";
import {useEffect, useState} from 'react';
import {Product} from '@/types/product/types';
import {ProductCard} from '@/components/ui/product-card';
import {Container, SimpleGrid, SkeletonText, Text, VStack} from '@chakra-ui/react';
import {ProductService} from '@/services/product-service';
import {IconSearch} from "@tabler/icons-react";
import * as sea from "node:sea";
import {CUSTOM_LINE} from "@/components/home/products/products";
import {load} from "next/dist/compiled/@edge-runtime/primitives/load";
import {repeat} from "@/utils/repeat";

export default function SearchPage() {
  const params = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const query = params?.query as string[] | undefined;
  const isLineSearch = query && query?.length > 1;

  let searchQuery: string = ""

  if (query) {
    if (query.length === 1) {
      searchQuery = decodeURIComponent(query[0])
    } else {
      searchQuery = decodeURIComponent(query[1])
    }
  }

  const isSearchRoute = Boolean(searchQuery) && !isLineSearch;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        let fetchedProducts: Product[];

        if (searchQuery && !isLineSearch) {
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
  }, [isLineSearch, searchQuery]);

  useEffect(() => {
    let filtered = products;

    if (searchQuery && searchQuery != CUSTOM_LINE) {
      filtered = filtered.filter(product => product.line === searchQuery);
    } else {
      filtered = filtered.slice(0, 12).sort((a, b) => b.stock - a.stock);
    }

    setFilteredProducts(filtered);
  }, [searchQuery, isLineSearch, products]);

  const getEmptyStateMessage = () => {
    if (isSearchRoute) {
      return `Nenhum produto encontrado para "${searchQuery}"`;
    }
    return 'Nenhum produto encontrado';
  };

  const getSearchText = () => {
    if (isSearchRoute) {
      return `Mostrando ${filteredProducts?.length} produto${filteredProducts?.length !== 1 ? 's' : ''} encontrado${filteredProducts?.length !== 1 ? 's' : ''}`
    } else if (isLineSearch) {
      if (searchQuery !== CUSTOM_LINE) {
        return `Mostrando produtos da linha ${searchQuery}`
      } else {
        return `Mostrando produtos ${CUSTOM_LINE.toLowerCase()}`
      }
    } else {
      return "Mostrando todos os produtos"
    }
  };

  if (error) {
    return (
      <Container
        maxW="7xl"
        py={8}
      >
        <VStack
          gap={8}
          align="center"
          minH="400px"
          justify="center"
        >
          <Text
            color="red.500"
            fontSize="lg"
          >
            {error}
          </Text>
        </VStack>
      </Container>
    );
  }

  if (filteredProducts.length === 0 && !loading) {
    return (
      <VStack
        gap={4}
        py={12}
      >
        <VStack
          w="200px"
          h="200px"
          bg="brand.50"
          borderRadius="full"
          align="center"
          justify="center"
          position="relative"
          overflow="hidden"
          my={10}
        >
          <VStack
            w="120px"
            h="120px"
            bg="brand.100"
            borderRadius="full"
            align="center"
            justify="center"
          >
            <IconSearch
              size={48}
              className="text-background"
            />
          </VStack>
        </VStack>
        <Text
          fontSize="lg"
          textAlign="center"
          color="fg.muted"
        >
          {getEmptyStateMessage()}
        </Text>
        <Text
          textAlign="center"
          color="fg.muted"
        >
          Tente buscar com outras palavras-chave
        </Text>
      </VStack>
    )
  }

  if (loading) {
    return (
      <VStack
        gap={8}
        align="start"
        maxW="7xl"
        mx="auto"
      >
        <SkeletonText
          width="400px"
          height="22px"
          noOfLines={1}
        />
        <SimpleGrid
          columns={6}
          gapX={6}
          gapY={12}
        >
          {repeat(12).map((product, index) => (
            <ProductCard
              key={index}
              loading={loading}
              product={product}
            />
          ))}
        </SimpleGrid>
      </VStack>
    )
  }

  return (
    <VStack
      gap={8}
      align="start"
      maxW="7xl"
      mx="auto"
    >
      <Text
        fontSize="lg"
        color="fg.muted"
        textAlign="start"
        w="fit"
      >
        {getSearchText()}
      </Text>
      <SimpleGrid
        columns={6}
        gapX={6}
        gapY={12}
      >
        {filteredProducts.map((product, index) => (
          <ProductCard
            key={index}
            loading={loading}
            product={product}
          />
        ))}
      </SimpleGrid>
    </VStack>
  );
}
