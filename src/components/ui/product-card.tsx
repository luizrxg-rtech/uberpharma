'use client';

import { Product } from '@/types';
import { useCart } from '@/contexts/cart-context';
import { useCartSidebar } from '@/contexts/cart-sidebar-context';
import { useNavigationLoading } from '@/hooks/use-navigation-loading';
import { Button, Text, Image, VStack, HStack, Badge, Box } from '@chakra-ui/react';
import { IconPlus } from '@tabler/icons-react';
import { MouseEvent } from 'react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { openSidebar } = useCartSidebar();
  const { navigateWithLoading } = useNavigationLoading();

  const handleAddToCart = (e: MouseEvent) => {
    e.stopPropagation();
    addItem(product);
    openSidebar();
  };

  const handleProductClick = () => {
    navigateWithLoading(`/product/${product.id}`);
  };

  return (
    <Box
      className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
      onClick={handleProductClick}
      bg="card"
      borderRadius="lg"
      border="1px solid"
      borderColor="border"
      overflow="hidden"
    >
      <VStack gap={4} align="stretch" p={4}>
        <Box position="relative" aspectRatio={1} overflow="hidden" borderRadius="md">
          <Image
            src={product.image}
            alt={product.name}
            objectFit="cover"
            width="100%"
            height="100%"
          />
          {!product.inStock && (
            <Badge
              position="absolute"
              top={2}
              right={2}
              colorScheme="gray"
            >
              Fora de Estoque
            </Badge>
          )}
        </Box>

        <VStack gap={2} align="stretch">
          <Text fontSize="sm" color="muted.foreground" textTransform="uppercase">
            {product.category}
          </Text>
          <Text fontWeight="semibold" lineHeight="1.2">
            {product.name}
          </Text>
          <Text fontSize="sm" color="muted.foreground" lineClamp={2}>
            {product.description}
          </Text>
        </VStack>

        <HStack justify="space-between" align="center">
          <Text fontSize="lg" fontWeight="bold">
            R$ {product.price.toFixed(2)}
          </Text>
          <Button
            size="sm"
            colorScheme="primary"
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            <IconPlus className="mr-1" size={16} />
            Adicionar
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}
