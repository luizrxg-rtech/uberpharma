'use client';

import { useState } from 'react';
import { VStack, HStack, Box, Text, Separator, Image, Button } from '@chakra-ui/react';
import { CartItem } from '@/types/cart/types';
import { CheckoutData, Coupon } from '@/types/checkout/types';
import { TextField } from '@/components/ui/text-field';
import { toaster } from "@/components/ui/toaster";

interface OrderSummaryProps {
  items: CartItem[];
  checkoutData: CheckoutData;
  currentStep: number;
  coupon?: Coupon;
  onApplyCoupon: (coupon: Coupon) => void;
  onRemoveCoupon: () => void;
}

export default function OrderSummary({ items, checkoutData, currentStep, coupon, onApplyCoupon, onRemoveCoupon }: OrderSummaryProps) {
  const [couponCode, setCouponCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validCoupons = [
    { code: 'DESCONTO10', discount: 10, type: 'percentage' as const },
    { code: 'FRETE15', discount: 15, type: 'fixed' as const },
    { code: 'BEMVINDO20', discount: 20, type: 'percentage' as const },
    { code: 'SAVE25', discount: 25, type: 'fixed' as const }
  ];

  const formatPrice = (price: number) => {
    return `R$ ${price.toFixed(2).replace('.', ',')}`;
  };

  const hasValidAddress = checkoutData.address.street && checkoutData.address.number &&
                         checkoutData.address.neighborhood && checkoutData.address.city &&
                         checkoutData.address.state && checkoutData.address.zipCode;

  const hasValidPayment = checkoutData.paymentMethod.type &&
                         (checkoutData.paymentMethod.type !== 'credit_card' ||
                          (checkoutData.paymentMethod.cardNumber && checkoutData.paymentMethod.cardName));

  const hasValidShipping = checkoutData.shipping.method && hasValidAddress;

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      toaster.warning({
        title: 'Código inválido',
        description: 'Digite um código de cupom válido.',
      });
      return;
    }

    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const foundCoupon = validCoupons.find(
        c => c.code.toLowerCase() === couponCode.toLowerCase()
      );

      if (foundCoupon) {
        onApplyCoupon(foundCoupon);
        setCouponCode('');
      } else {
        toaster.warning({
          title: 'Cupom inválido',
          description: 'O código informado não é válido ou expirou.',
        });
      }
    } catch (error) {
      toaster.error({
        title: 'Erro',
        description: 'Não foi possível validar o cupom. Tente novamente.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveCoupon = () => {
    onRemoveCoupon();
    setCouponCode('');
  };

  return (
    <Box position="sticky" top={4}>
      <Box p={6} bg="gray.50" borderRadius="lg" border="1px" borderColor="gray.200">
        <Text fontSize="lg" fontWeight="bold" mb={4}>
          Resumo do Pedido
        </Text>

        <VStack gap={4} align="stretch">
          <Box>
            <Text fontSize="md" fontWeight="semibold" mb={3}>
              Produtos ({items.length})
            </Text>
            <VStack gap={3} align="stretch">
              {items.map((item) => (
                <HStack key={item.id} gap={3} align="start">
                  <Box
                    w={12}
                    h={12}
                    bg="white"
                    borderRadius="md"
                    border="1px"
                    borderColor="gray.200"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    overflow="hidden"
                  >
                    {item.product.image_url ? (
                      <Image
                        src={item.product.image_url}
                        alt={item.product.name}
                        objectFit="cover"
                        w="full"
                        h="full"
                      />
                    ) : (
                      <Text fontSize="xs" color="gray.400" textAlign="center">
                        Sem imagem
                      </Text>
                    )}
                  </Box>
                  
                  <VStack flex={1} align="start" gap={1}>
                    <Text fontSize="sm" fontWeight="medium" lineHeight="short">
                      {item.product.name}
                    </Text>
                    <HStack justify="space-between" w="full">
                      <Text fontSize="xs" color="gray.600">
                        Qtd: {item.quantity}
                      </Text>
                      <Text fontSize="sm" fontWeight="semibold">
                        {formatPrice(item.product.price * item.quantity)}
                      </Text>
                    </HStack>
                  </VStack>
                </HStack>
              ))}
            </VStack>
          </Box>


          <VStack gap={4} align="stretch">
            {hasValidAddress && currentStep >= 1 && (
              <>
                <Separator />
                <Box>
                  <Text fontSize="sm" fontWeight="medium" mb={1}>
                    Endereço de Entrega
                  </Text>
                  <Text fontSize="xs" color="gray.600" lineHeight="short">
                    {checkoutData.address.street}, {checkoutData.address.number}
                    {checkoutData.address.complement && `, ${checkoutData.address.complement}`}
                    <br />
                    {checkoutData.address.neighborhood} - {checkoutData.address.city}, {checkoutData.address.state}
                    <br />
                    CEP {checkoutData.address.zipCode}
                  </Text>
                </Box>
              </>
            )}

            {hasValidPayment && currentStep >= 2 && (
              <Box>
                <Text fontSize="sm" fontWeight="medium" mb={1}>
                  Forma de Pagamento
                </Text>
                <Text fontSize="sm" color="gray.600">
                  {checkoutData.paymentMethod.type === 'pix' && 'PIX'}
                  {checkoutData.paymentMethod.type === 'credit_card' &&
                    `Cartão de Crédito ${checkoutData.paymentMethod.installments ?
                      `(${checkoutData.paymentMethod.installments}x)` : ''}`
                  }
                  {checkoutData.paymentMethod.type === 'boleto' && 'Boleto Bancário'}
                </Text>
              </Box>
            )}

            {hasValidShipping && currentStep >= 3 && (
              <Box>
                <Text fontSize="sm" fontWeight="medium" mb={1}>
                  Entrega
                </Text>
                <Text fontSize="sm" color="gray.600">
                  {checkoutData.shipping.estimatedDays} dia{checkoutData.shipping.estimatedDays > 1 ? 's' : ''} útil{checkoutData.shipping.estimatedDays > 1 ? 'is' : ''}
                </Text>
              </Box>
            )}

            <Separator />

            <VStack gap={4} align="stretch">
              <Text fontSize="sm" fontWeight="medium">
                Cupom de Desconto
              </Text>

              <HStack>
                <TextField
                  value={couponCode}
                  onChange={setCouponCode}
                  placeholder="Digite seu cupom"
                  size="sm"
                />

                {coupon ? (
                  <Button
                    size="sm"
                    variant="ghost"
                    colorScheme="red"
                    onClick={handleRemoveCoupon}
                  >
                    Remover
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    colorScheme="blue"
                    onClick={handleApplyCoupon}
                    loading={isLoading}
                    loadingText="Validando..."
                    disabled={!couponCode.trim()}
                  >
                    Aplicar
                  </Button>
                )}
              </HStack>

              {coupon && (
                <Box p={3} bg="green.50" borderRadius="md" border="1px" borderColor="green.200">
                  <VStack align="start" gap={1}>
                    <Text fontSize="sm" fontWeight="semibold" color="green.700">
                      Cupom aplicado: {coupon.code}
                    </Text>
                    <Text fontSize="xs" color="green.600">
                      Desconto de {coupon.type === 'percentage'
                      ? `${coupon.discount}%`
                      : `R$ ${coupon.discount.toFixed(2)}`
                    }
                    </Text>
                  </VStack>
                </Box>
              )}
            </VStack>

            <Separator />

            <HStack justify="space-between">
              <Text fontSize="sm" color="gray.600">
                Subtotal
              </Text>
              <Text fontSize="sm">
                {formatPrice(checkoutData.subtotal)}
              </Text>
            </HStack>

            {hasValidShipping && (
              <HStack justify="space-between">
                <Text fontSize="sm" color="gray.600">
                  Frete
                </Text>
                <Text fontSize="sm">
                  {checkoutData.shippingCost === 0
                    ? 'Grátis'
                    : formatPrice(checkoutData.shippingCost)
                  }
                </Text>
              </HStack>
            )}

            {checkoutData.discount > 0 && (
              <HStack justify="space-between">
                <Text fontSize="sm" color="green.600">
                  Desconto
                </Text>
                <Text fontSize="sm" color="green.600">
                  -{formatPrice(checkoutData.discount)}
                </Text>
              </HStack>
            )}

            <Separator />

            <HStack justify="space-between">
              <Text fontSize="lg" fontWeight="bold">
                Total
              </Text>
              <Text fontSize="lg" fontWeight="bold" color="blue.600">
                {formatPrice(hasValidShipping ? checkoutData.total : checkoutData.subtotal)}
              </Text>
            </HStack>
          </VStack>
        </VStack>
      </Box>
    </Box>
  );
}
