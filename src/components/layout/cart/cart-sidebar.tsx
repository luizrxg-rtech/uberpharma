'use client';

import { useCart } from '@/contexts/cart-context';
import { useNavigationLoading } from '@/hooks/use-navigation-loading';
import { useEffect, useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Image,
  Button,
  Flex,
  Spacer
} from '@chakra-ui/react';
import { IconTrash, IconShoppingBag, IconX } from '@tabler/icons-react';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { items, total, updateQuantity, removeItem } = useCart();
  const { navigateWithLoading } = useNavigationLoading();
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
    onClose();
    navigateWithLoading('/cart');
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
        onClick={onClose}
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
        width="400px"
        maxWidth="90vw"
        bg="background"
        borderLeft="1px solid"
        borderColor="border"
        zIndex={1000}
        overflowY="auto"
        style={{
          transform: isAnimating ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <VStack gap={0} align="stretch" height="100%">
          <HStack justify="space-between" align="center" p={4} borderBottom="1px solid" borderColor="border">
            <Text fontSize="lg" fontWeight="bold">
              Carrinho ({items.length})
            </Text>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <IconX size={20} />
            </Button>
          </HStack>

          <Flex flex={1} direction="column">
            {items.length === 0 ? (
              <VStack gap={4} justify="center" flex={1} p={6}>
                <IconShoppingBag size={48} color="gray" />
                <Text fontSize="lg" fontWeight="medium" textAlign="center">
                  Seu carrinho está vazio
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
                        border="1px solid"
                        borderColor="border"
                        style={{
                          opacity: isAnimating ? 1 : 0,
                          transform: isAnimating ? 'translateY(0)' : 'translateY(20px)',
                          transition: `opacity 300ms ease-in-out ${index * 50}ms, transform 300ms ease-in-out ${index * 50}ms`
                        }}
                      >
                        <HStack gap={3} align="start">
                          <Image
                            src={item.image}
                            alt={item.name}
                            boxSize="60px"
                            objectFit="cover"
                            borderRadius="md"
                          />

                          <VStack flex={1} gap={1} align="stretch">
                            <Text fontWeight="medium" fontSize="sm" lineClamp={2}>
                              {item.name}
                            </Text>
                            <Text fontSize="xs" color="muted.foreground">
                              {item.category}
                            </Text>
                            <Text fontWeight="bold" color="primary.600" fontSize="sm">
                              R$ {item.price.toFixed(2)}
                            </Text>
                          </VStack>

                          <VStack gap={2} align="end" minW="80px">
                            <HStack gap={1}>
                              <Button
                                size="xs"
                                variant="outline"
                                onClick={() => handleQuantityChange(item.id, Math.max(1, item.cartQuantity - 1))}
                                disabled={item.cartQuantity <= 1}
                              >
                                -
                              </Button>
                              <Text fontSize="sm" minW="20px" textAlign="center">
                                {item.cartQuantity}
                              </Text>
                              <Button
                                size="xs"
                                variant="outline"
                                onClick={() => handleQuantityChange(item.id, Math.min(item.quantity, item.cartQuantity + 1))}
                                disabled={item.cartQuantity >= item.quantity}
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
                              R$ {(item.price * item.cartQuantity).toFixed(2)}
                            </Text>
                          </VStack>
                        </HStack>
                      </Box>
                    ))}
                  </VStack>
                </Box>

                <Box
                  p={4}
                  borderTop="1px solid"
                  borderColor="border"
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
                      width="100%"
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
