'use client';

import {useCart} from '@/contexts/cart-context';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import {Box, Button, Flex, HStack, IconButton, Image, Text, VStack,} from '@chakra-ui/react';
import {IconShoppingBag, IconShoppingBagX, IconTrash, IconX} from '@tabler/icons-react';
import {useCartSidebar} from "@/contexts/cart-sidebar-context";

export default function CartSidebar() {
  const { items, total, updateQuantity, removeItem } = useCart();
  const { isOpen, closeSidebar } = useCartSidebar();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [isOpen]);

  const handleQuantityChange = (id: string, quantity: number) => {
    updateQuantity(id, quantity);
  };

  const handleRemoveItem = (id: string) => {
    removeItem(id);
  };

  const handleCheckout = () => {
    closeSidebar();
    router.push('/cart');
  };

  if (!isVisible) return null;

  return (
    <>
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="blackAlpha.500"
        zIndex={999}
        onClick={closeSidebar}
        style={{
          opacity: isAnimating ? 1 : 0,
          transition: 'opacity 300ms ease-in-out'
        }}
      />

      <Box
        position="fixed"
        top={0}
        right={0}
        bottom={0}
        w="400px"
        maxW="90vw"
        bg="background"
        className="border-l"
        zIndex={1000}
        overflowY="auto"
        style={{
          transform: isAnimating ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <VStack gap={0} align="stretch" height="full">
          <HStack justify="space-between" align="center" p={4.5} className="border-b" >
            <HStack>
              <IconShoppingBag size={20} />
              <Text fontSize="lg" fontWeight="bold">
                Sacola
              </Text>
            </HStack>
            <IconButton
              variant="subtle"
              onClick={closeSidebar}
              position="relative"
              bg="transparent"
              color="fg"
              borderRadius="full"
              _hover={{
                bg: "bg.emphasized"
              }}
              p={2}
            >
              <IconX size={20} />
            </IconButton>
          </HStack>

          <Flex flex={1} direction="column">
            {items.length === 0 ? (
              <VStack gap={4} justify="center" flex={1} p={6}>
                <IconShoppingBagX size={48} color="gray" />
                <Text fontSize="lg" fontWeight="medium" textAlign="center">
                  Sua sacola está vazia
                </Text>
                <Text fontSize="sm" color="muted.foreground" textAlign="center">
                  Adicione alguns produtos para continuar
                </Text>
              </VStack>
            ) : (
              <VStack gap={0} align="stretch" flex={1}>
                <Box flex={1} overflowY="auto" p={4}>
                  <VStack gap={4} align="stretch">
                    {items.map((item, index) => (
                      <Box
                        key={item.id}
                        bg="card"
                        p={3}
                        borderRadius="md"
                        className="border"
                        
                        style={{
                          opacity: isAnimating ? 1 : 0,
                          transform: isAnimating ? 'translateY(0)' : 'translateY(20px)',
                          transition: `opacity 300ms ease-in-out ${index * 50}ms, transform 300ms ease-in-out ${index * 50}ms`
                        }}
                      >
                        <HStack gap={3} align="start">
                          <Image
                            src={item.product.image_url}
                            alt={item.product.name}
                            boxSize="60px"
                            objectFit="cover"
                            borderRadius="md"
                            loading="lazy"
                          />

                          <VStack flex={1} gap={1} align="stretch">
                            <Text fontWeight="medium" fontSize="sm" lineClamp={2}>
                              {item.product.name}
                            </Text>
                            <Text fontSize="xs" color="muted.foreground">
                              {item.product.category}
                            </Text>
                            <Text fontWeight="bold" color="primary.600" fontSize="sm">
                              R$ {item.product.price.toFixed(2)}
                            </Text>
                          </VStack>

                          <VStack gap={2} align="end" minW="80px">
                            <HStack gap={1}>
                              <Button
                                size="xs"
                                variant="outline"
                                onClick={() => handleQuantityChange(item.id, Math.max(1, item.quantity - 1))}
                                disabled={item.quantity <= 1}
                              >
                                -
                              </Button>
                              <Text fontSize="sm" minW="20px" textAlign="center">
                                {item.quantity}
                              </Text>
                              <Button
                                size="xs"
                                variant="outline"
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              >
                                +
                              </Button>
                            </HStack>

                            <Button
                              size="xs"
                              variant="ghost"
                              colorScheme="red"
                              onClick={() => handleRemoveItem(item.id)}
                            >
                              <IconTrash size={14} />
                            </Button>

                            <Text fontWeight="bold" fontSize="sm">
                              R$ {(item.product.price * item.quantity).toFixed(2)}
                            </Text>
                          </VStack>
                        </HStack>
                      </Box>
                    ))}
                  </VStack>
                </Box>

                <Box
                  p={4}
                  className="border-t"
                  
                  bg="card"
                  style={{
                    opacity: isAnimating ? 1 : 0,
                    transform: isAnimating ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'opacity 300ms ease-in-out 200ms, transform 300ms ease-in-out 200ms'
                  }}
                >
                  <VStack gap={4} align="stretch">
                    <HStack justify="space-between">
                      <Text fontSize="lg" fontWeight="bold">Total:</Text>
                      <Text fontSize="lg" fontWeight="bold" color="primary.600">
                        R$ {total.toFixed(2)}
                      </Text>
                    </HStack>

                    <Button
                      size="lg"
                      colorScheme="primary"
                      w="full"
                      onClick={handleCheckout}
                    >
                      Finalizar Compra
                    </Button>
                  </VStack>
                </Box>
              </VStack>
            )}
          </Flex>
        </VStack>
      </Box>
    </>
  );
}
