"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from 'react';
import { Product } from '@/types/product/types';
import { useCart } from '@/contexts/cart-context';
import { useCartSidebar } from '@/contexts/cart-sidebar-context';
import { useRouter } from 'next/navigation';
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
  Box,
  Spinner
} from '@chakra-ui/react';
import { IconShoppingCart, IconArrowLeft } from '@tabler/icons-react';
import { ProductService } from '@/services/product-service';

export default function ProductPage() {
  const { id } = useParams();
  const { addItem } = useCart();
  const { openSidebar } = useCartSidebar();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const foundProduct = await ProductService.getProductById(id as string);
        setProduct(foundProduct);
      } catch (error) {
        setError('Erro ao carregar produto. Tente novamente. ');
        console.error('Erro ao carregar produto:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
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
    router.push('/');
  };

  const handleQuantityChange = (value: string) => {
    const newQuantity = parseInt(value) || 1;
    setQuantity(Math.max(1, Math.min(newQuantity, product?.stock || 1)));
  };

  if (loading) {
    return (
      <Container maxW="7xl" py={8}>
        <VStack gap={8} align="center" minH="400px" justify="center">
          <Spinner size="xl" />
          <Text>Carregando produto...</Text>
        </VStack>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxW="7xl" py={8}>
        <VStack gap={8} align="center" minH="400px" justify="center">
          <Text color="red.500" fontSize="lg">{error}</Text>
          <Button onClick={handleBackClick}>
            <IconArrowLeft className="mr-2" size={16} />
            Voltar à página inicial
          </Button>
        </VStack>
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
              <Box position="relative" w="full" aspectRatio={1} overflow="hidden" borderRadius="lg" bg="gray.50">
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

              <VStack gap={4} align="stretch">
                <HStack gap={4} align="center">
                  <Text fontWeight="medium">Quantidade:</Text>
                  <HStack gap={2}>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1 || product.stock === 0}
                    >
                      -
                    </Button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => handleQuantityChange(e.target.value)}
                      min={1}
                      max={product.stock}
                      disabled={product.stock === 0}
                      className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      disabled={quantity >= product.stock || product.stock === 0}
                    >
                      +
                    </Button>
                  </HStack>
                </HStack>

                <Text fontSize="sm" color="muted.foreground">
                  {product.stock > 0
                    ? `${product.stock} unidades disponíveis`
                    : 'Produto indisponível'
                  }
                </Text>

                <Button
                  size="lg"
                  colorScheme="primary"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  w="full"
                >
                  <IconShoppingCart className="mr-2" size={20} />
                  {product.stock > 0 ? 'Adicionar à sacola' : 'Indisponível'}
                </Button>
              </VStack>

              <VStack gap={2} align="stretch" pt={4} className="border-t" >
                <Box
                  fontSize="lg"
                  className="text-muted-foreground"
                  lineHeight="1.6"
                  data-html-content
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </VStack>
            </VStack>
          </GridItem>
        </Grid>
      </VStack>
    </Container>
  );
}
