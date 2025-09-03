'use client';

import {useCart} from '@/contexts/cart-context';
import {useRouter} from 'next/navigation';
import {Button, HStack, Image, SimpleGrid, Text, VStack} from '@chakra-ui/react';
import {IconArrowLeft, IconShoppingBagX, IconX} from '@tabler/icons-react';
import QuantityInput from "@/components/ui/quantity-input";

export default function CartPage() {
  const {items, total, updateQuantity, removeItem, clearCart} = useCart();
  const router = useRouter();

  const handleBackClick = () => {
    router.push('/');
  };

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
    alert('Funcionalidade de checkout em desenvolvimento!');
  };

  if (items.length === 0) {
    return (
      <VStack
        gap={6}
        py={12}
        maxW="7xl"
        mx="auto"
      >
        <IconShoppingBagX
          size={64}
          color="gray"
        />
        <Text
          fontSize="2xl"
          fontWeight="bold"
        >
          Sua sacola está vazia
        </Text>
        <Text
          color="fg.muted"
          textAlign="center"
        >
          Adicione alguns produtos à sua sacola para continuar
        </Text>
        <Button
          onClick={handleBackClick}
          colorScheme="primary"
        >
          <IconArrowLeft
            className="mr-2"
            size={16}
          />
          Continuar Comprando
        </Button>
      </VStack>
    );
  }

  return (
    <VStack
      gap={8}
      align="stretch"
      maxW="7xl"
      mx="auto"
    >
      <HStack
        justify="space-between"
        align="center"
      >
        <Text
          fontSize="3xl"
          fontWeight="bold"
        >
          Minha sacola
        </Text>
        <Button
          variant="outline"
          onClick={handleBackClick}
        >
          <IconArrowLeft
            className="mr-2"
            size={16}
          />
          Continuar Comprando
        </Button>
      </HStack>

      <SimpleGrid
        columns={6}
        gap={8}
      >
        <VStack
          flex={1}
          gap={4}
          align="stretch"
          className="col-span-4"
        >
          {items.map((item) => (
            <HStack
              key={item.id}
              pb={4}
              gap={4}
              align="start"
              w="full"
              h="fit-content"
              className="border-b"
            >
              <Image
                src={item.product.image_url}
                alt={item.product.name}
                boxSize="100px"
                objectFit="cover"
                borderRadius="md"
                loading="lazy"
              />
              <VStack
                align="start"
                justify="space-between"
                w="full"
                h="full"
              >
                <VStack
                  flex={1}
                  gap={2}
                  align="stretch"
                >
                  <Text
                    fontWeight="semibold"
                    fontSize="lg"
                  >
                    {item.product.name}
                  </Text>
                  <Text
                    fontSize="sm"
                    color="fg.muted"
                  >
                    {item.product.category}
                  </Text>
                </VStack>

                <HStack
                  align="end"
                  w="full"
                  justify="space-between"
                >
                  <QuantityInput
                    item={item}
                    handleQuantityChange={handleQuantityChange}
                    handleRemoveItem={handleRemoveItem}
                  />
                  <Text fontWeight="bold">
                    R$ {(item.product.price * item.quantity).toFixed(2)}
                  </Text>
                </HStack>
              </VStack>
            </HStack>
          ))}

          <HStack
            justify="space-between"
            pt={4}
          >
            <Button
              variant="subtle"
              colorScheme="red"
              onClick={clearCart}
            >
              <IconX size={16} />
              Limpar sacola
            </Button>
          </HStack>
        </VStack>

        <VStack
          gap={4}
          align="stretch"
          className="col-span-2"
          bg="bg.subtle"
          w="full"
          h="fit-content"
          borderRadius="3xl"
          p={8}
        >
          <Text
            fontSize="xl"
            fontWeight="bold"
            className="border-b"
            pb={4}
          >
            Resumo do Pedido
          </Text>

          <HStack justify="space-between">
            <Text>Subtotal</Text>
            <Text fontWeight="semibold">R$ {total.toFixed(2)}</Text>
          </HStack>

          <HStack justify="space-between">
            <Text>Frete</Text>
            <Text
              fontWeight="semibold"
              color="green.600"
            >
              Grátis
            </Text>
          </HStack>

          <HStack
            justify="space-between"
            className="border-t"
            pt={4}
          >
            <Text
              fontSize="lg"
              fontWeight="bold"
            >
              Total
            </Text>
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
      </SimpleGrid>
    </VStack>
  );
}
