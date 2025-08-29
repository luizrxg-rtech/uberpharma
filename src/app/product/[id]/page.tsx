"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from 'react';
import { Product } from '@/types';
import { useCart } from '@/contexts/cart-context';
import { useCartSidebar } from '@/contexts/cart-sidebar-context';
import { useNavigationLoading } from '@/hooks/use-navigation-loading';
import {
  Container,
  VStack,
  HStack,
  Text,
  Image,
  Button,
  Badge,
  Grid,
  GridItem,
  Box
} from '@chakra-ui/react';
import { IconShoppingCart, IconArrowLeft } from '@tabler/icons-react';
import productsData from '@/data/products.json';

export default function ProductPage() {
  const { id } = useParams();
  const { addItem } = useCart();
  const { openSidebar } = useCartSidebar();
  const { navigateWithLoading } = useNavigationLoading();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundProduct = productsData.find(p => p.id === id);
    setProduct(foundProduct || null);
    setLoading(false);
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addItem(product);
      }
      openSidebar();
    }
  };

  const handleBackClick = () => {
    navigateWithLoading('/');
  };

  const handleQuantityChange = (value: string) => {
    const newQuantity = parseInt(value) || 1;
    setQuantity(Math.max(1, Math.min(newQuantity, product?.quantity || 1)));
  };

  if (loading) {
    return (
      <Container maxW="7xl" py={8}>
        <Text>Carregando...</Text>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container maxW="7xl" py={8}>
        <VStack gap={4}>
          <Text fontSize="xl">Produto não encontrado</Text>
          <Button onClick={handleBackClick}>
            <IconArrowLeft className="mr-2" size={16} />
            Voltar à página inicial
          </Button>
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="7xl" py={8}>
      <VStack gap={8} align="stretch">
        <HStack gap={2} color="muted.foreground">
          <Button variant="ghost" size="sm" onClick={handleBackClick}>
            Início
          </Button>
          <Text>/</Text>
          <Text>{product.category}</Text>
          <Text>/</Text>
          <Text color="foreground">{product.name}</Text>
        </HStack>

        <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={8}>
          <GridItem>
            <VStack gap={4}>
              <Box position="relative" w="100%" aspectRatio={1} overflow="hidden" borderRadius="lg" bg="gray.50">
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
                    top={4}
                    right={4}
                    colorScheme="gray"
                    fontSize="sm"
                  >
                    Fora de Estoque
                  </Badge>
                )}
              </Box>
            </VStack>
          </GridItem>

          <GridItem>
            <VStack gap={6} align="stretch">
              <VStack gap={2} align="stretch">
                <Text fontSize="sm" color="muted.foreground" textTransform="uppercase">
                  {product.category}
                </Text>
                <Text fontSize="3xl" fontWeight="bold" lineHeight="1.2">
                  {product.name}
                </Text>
                <Text fontSize="2xl" fontWeight="bold" color="primary.600">
                  R$ {product.price.toFixed(2)}
                </Text>
              </VStack>

              <Text fontSize="lg" color="muted.foreground" lineHeight="1.6">
                {product.description}
              </Text>

              <VStack gap={4} align="stretch">
                <HStack gap={4} align="center">
                  <Text fontWeight="medium">Quantidade:</Text>
                  <HStack gap={2}>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1 || !product.inStock}
                    >
                      -
                    </Button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => handleQuantityChange(e.target.value)}
                      min={1}
                      max={product.quantity}
                      disabled={!product.inStock}
                      className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
                      disabled={quantity >= product.quantity || !product.inStock}
                    >
                      +
                    </Button>
                  </HStack>
                </HStack>

                <Text fontSize="sm" color="muted.foreground">
                  {product.inStock
                    ? `${product.quantity} unidades disponíveis`
                    : 'Produto indisponível'
                  }
                </Text>

                <Button
                  size="lg"
                  colorScheme="primary"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  width="100%"
                >
                  <IconShoppingCart className="mr-2" size={20} />
                  {product.inStock ? 'Adicionar ao Carrinho' : 'Indisponível'}
                </Button>
              </VStack>

              <VStack gap={2} align="stretch" pt={4} borderTop="1px solid" borderColor="border">
                <Text fontWeight="medium">Informações do produto:</Text>
                <Text fontSize="sm" color="muted.foreground">
                  • Produto natural e terapêutico
                </Text>
                <Text fontSize="sm" color="muted.foreground">
                  • Categoria: {product.category}
                </Text>
                <Text fontSize="sm" color="muted.foreground">
                  • Código: {product.id}
                </Text>
              </VStack>
            </VStack>
          </GridItem>
        </Grid>
      </VStack>
    </Container>
  );
}
