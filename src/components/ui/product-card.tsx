'use client';

import { Product } from '@/types/product/types';
import { useCart } from '@/contexts/cart-context';
import { useCartSidebar } from '@/contexts/cart-sidebar-context';
import { useRouter } from 'next/navigation';
import { Button, Text, Image, VStack, HStack, Badge, Box } from '@chakra-ui/react';
import { IconPlus } from '@tabler/icons-react';
import { MouseEvent } from 'react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { openSidebar } = useCartSidebar();
  const router = useRouter();

  const handleAddToCart = (e: MouseEvent) => {
    e.stopPropagation();
    addItem(product);
    openSidebar();
  };

  const handleProductClick = () => {
    router.push(`/product/${product.id}`);
  };

  return (
    <Box
      className="border cursor-pointer hover:shadow-lg transition-shadow duration-200"
      onClick={handleProductClick}
      bg="card"
      borderRadius="lg"
      overflow="hidden"
    >
      <VStack gap={4} align="stretch" p={4}>
        <Box position="relative" aspectRatio={1} overflow="hidden" borderRadius="md">
          <Image
            src={product.image_url}
            alt={product.name}
            objectFit="cover"
            width="100%"
            height="100%"
            loading="lazy"
          />
          {product.stock === 0 && (
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

        <Text fontWeight="semibold" lineHeight="1.2">
          {product.name}
        </Text>

        <HStack justify="space-between" align="center">
          <Text fontSize="lg" fontWeight="bold">
            R$ {product.price.toFixed(2)}
          </Text>
          <Button
            size="sm"
            colorScheme="primary"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            <IconPlus className="mr-1" size={16} />
            Adicionar
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}
