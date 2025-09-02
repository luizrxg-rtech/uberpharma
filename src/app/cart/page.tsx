'use client';

import { useCart } from '@/contexts/cart-context';
import { useRouter } from 'next/navigation';
import {
  Container,
  VStack,
  HStack,
  Text,
  Image,
  Button,
  Box,
  Flex,
  Spacer
} from '@chakra-ui/react';
import { IconTrash, IconShoppingBag, IconArrowLeft } from '@tabler/icons-react';

export default function CartPage() {
  const { items, total, updateQuantity, removeItem, clearCart } = useCart();
  const router = useRouter();

  const handleBackClick = () => {
    router.push('/');
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    updateQuantity(id, quantity);
  };

  const handleRemoveItem = (id: string) => {
    removeItem(id);
  };

  const handleCheckout = () => {
    alert('Funcionalidade de checkout em desenvolvimento!');
  };

  if (items.length === 0) {
    return (
      <Container maxW="7xl" py={8}>
        <VStack gap={6} py={12}>
          <IconShoppingBag size={64} color="gray" />
          <Text fontSize="2xl" fontWeight="bold">
            Sua sacola está vazia
          </Text>
          <Text color="muted.foreground" textAlign="center">
            Adicione alguns produtos à sua sacola para continuar
          </Text>
          <Button onClick={handleBackClick} colorScheme="primary">
            <IconArrowLeft className="mr-2" size={16} />
            Continuar Comprando
          </Button>
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="7xl" py={8}>
      <VStack gap={8} align="stretch">
        <HStack justify="space-between" align="center">
          <Text fontSize="3xl" fontWeight="bold">
            Minha sacola
          </Text>
          <Button variant="outline" onClick={handleBackClick}>
            <IconArrowLeft className="mr-2" size={16} />
            Continuar Comprando
          </Button>
        </HStack>

        <Flex direction={{ base: "column", lg: "row" }} gap={8}>
          <VStack flex={1} gap={4} align="stretch">
            {items.map((item) => (
              <Box key={item.id} bg="card" p={4} borderRadius="lg" className="border" >
                <HStack gap={4} align="start">
                  <Image
                    src={item.product.image_url}
                    alt={item.product.name}
                    boxSize="100px"
                    objectFit="cover"
                    borderRadius="md"
                    loading="lazy"
                  />

                  <VStack flex={1} gap={2} align="stretch">
                    <Text fontWeight="semibold" fontSize="lg">
                      {item.product.name}
                    </Text>
                    <Text fontSize="sm" color="muted.foreground">
                      {item.product.category}
                    </Text>
                    <Text fontWeight="bold" color="primary.600">
                      R$ {item.product.price.toFixed(2)}
                    </Text>
                  </VStack>

                  <VStack gap={2} align="end" minW="150px">
                    <HStack gap={2}>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                        min={1}
                        max={item.quantity}
                        className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        colorScheme="red"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <IconTrash size={16} />
                      </Button>
                    </HStack>
                    <Text fontWeight="bold">
                      R$ {(item.product.price * item.quantity).toFixed(2)}
                    </Text>
                  </VStack>
                </HStack>
              </Box>
            ))}

            <HStack justify="space-between" pt={4}>
              <Button variant="outline" colorScheme="red" onClick={clearCart}>
                Limpar sacola
              </Button>
              <Spacer />
            </HStack>
          </VStack>

          <Box minW="300px" bg="card" p={6} borderRadius="lg" className="border"  h="fit-content">
            <VStack gap={4} align="stretch">
              <Text fontSize="xl" fontWeight="bold">
                Resumo do Pedido
              </Text>

              <Box h="1px" bg="border" />

              <HStack justify="space-between">
                <Text>Subtotal:</Text>
                <Text fontWeight="semibold">R$ {total.toFixed(2)}</Text>
              </HStack>

              <HStack justify="space-between">
                <Text>Frete:</Text>
                <Text fontWeight="semibold" color="green.500">Grátis</Text>
              </HStack>

              <Box h="1px" bg="border" />

              <HStack justify="space-between">
                <Text fontSize="lg" fontWeight="bold">Total:</Text>
                <Text fontSize="lg" fontWeight="bold" color="primary.600">
                  R$ {total.toFixed(2)}
                </Text>
              </HStack>

              <Button size="lg" colorScheme="primary" w="full" onClick={handleCheckout}>
                Finalizar Compra
              </Button>

              <Text fontSize="sm" color="muted.foreground" textAlign="center">
                Pagamento seguro e entrega garantida
              </Text>
            </VStack>
          </Box>
        </Flex>
      </VStack>
    </Container>
  );
}
