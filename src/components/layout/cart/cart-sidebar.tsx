'use client';

import {useCart} from '@/contexts/cart-context';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import {Box, Button, Flex, HStack, IconButton, Image, Text, VStack} from '@chakra-ui/react';
import {IconShoppingBag, IconShoppingBagX, IconTrash, IconX} from '@tabler/icons-react';
import {useCartSidebar} from "@/contexts/cart-sidebar-context";
import QuantityInput from "@/components/ui/quantity-input";

export default function CartSidebar() {
  const {items, total, updateQuantity, removeItem} = useCart();
  const {isOpen, closeSidebar} = useCartSidebar();
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

  const handleQuantityChange = (id: string, quantity: string | number) => {
    let newQuantity = quantity;
    if (typeof quantity === "string") {
      newQuantity = parseInt(quantity) || 1;
    }
    updateQuantity(id, newQuantity as number);
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
        overflow="hidden"
        style={{
          transform: isAnimating ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <VStack
          gap={0}
          align="stretch"
          height="full"
        >
          <HStack
            justify="space-between"
            align="center"
            p={4.5}
          >
            <HStack>
              <IconShoppingBag size={20} />
              <Text
                fontSize="lg"
                fontWeight="bold"
              >
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

          <Flex
            flex={1}
            direction="column"
          >
            {items.length === 0 ? (
              <VStack
                gap={4}
                justify="center"
                flex={1}
              >
                <IconShoppingBagX
                  size={48}
                  color="gray"
                />
                <Text
                  fontSize="lg"
                  fontWeight="medium"
                  textAlign="center"
                >
                  Sua sacola está vazia
                </Text>
                <Text
                  fontSize="sm"
                  color="fg.muted"
                  textAlign="center"
                >
                  Adicione alguns produtos para continuar
                </Text>
              </VStack>
            ) : (
              <VStack
                gap={0}
                align="stretch"
                flex={1}
              >
                <Box
                  flex={1}
                  overflowY="auto"
                  p={4}
                >
                  <VStack
                    gap={8}
                    align="stretch"
                  >
                    {items.map((item, index) => (
                      <HStack
                        key={item.id}
                        pb={8}
                        gap={3}
                        align="stretch"
                        className={index === items.length - 1 ? "" : "border-b"}
                        style={{
                          opacity: isAnimating ? 1 : 0,
                          transform: isAnimating ? 'translateY(0)' : 'translateY(20px)',
                          transition: `opacity 300ms ease-in-out ${index * 50}ms, transform 300ms ease-in-out ${index * 50}ms`
                        }}
                      >
                        <Image
                          src={item.product.image_url}
                          alt={item.product.name}
                          boxSize="90px"
                          objectFit="cover"
                          borderRadius="md"
                          loading="lazy"
                        />
                        <VStack
                          align="start"
                          justify="space-between"
                          h="full"
                        >
                          <HStack
                            align="start"
                            justify="space-between"
                          >
                            <VStack
                              align="start"
                            >
                              <Text
                                fontWeight="medium"
                                fontSize="sm"
                                lineClamp={2}
                              >
                                {item.product.name}
                              </Text>
                              <Text
                                fontWeight="medium"
                                color="fg.muted"
                                fontSize="xs"
                                lineClamp={1}
                              >
                                {item.product.category}
                              </Text>
                            </VStack>
                            <IconButton
                              variant="plain"
                              p={0}
                              h={6}
                              w={6}
                              color="fg"
                              title="Remover item"
                              onClick={() => handleRemoveItem(item.id)}
                            >
                              <IconTrash size={6} />
                            </IconButton>
                          </HStack>
                          <HStack
                            align="end"
                            justify="space-between"
                            w="full"
                          >
                            <Text
                              fontWeight="bold"
                              fontSize="sm"
                            >
                              R$ {(item.product.price * item.quantity).toFixed(2)}
                            </Text>
                            <QuantityInput
                              item={item}
                              handleQuantityChange={handleQuantityChange}
                              handleRemoveItem={handleRemoveItem}
                            />
                          </HStack>
                        </VStack>
                      </HStack>
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
                  <VStack
                    gap={4}
                    align="stretch"
                  >
                    <HStack justify="space-between">
                      <Text
                        fontSize="lg"
                        fontWeight="bold"
                      >Total:</Text>
                      <Text
                        fontSize="lg"
                        fontWeight="bold"
                        color="primary.600"
                      >
                        R$ {total.toFixed(2)}
                      </Text>
                    </HStack>

                    <Button
                      size="lg"
                      colorScheme="primary"
                      w="full"
                      onClick={handleCheckout}
                    >
                      Finalizar compra
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
