'use client';

import { useState } from 'react';
import { HStack, VStack, Box, Text, Button } from '@chakra-ui/react';
import { Coupon } from '@/types/checkout/types';
import { TextField } from '@/components/ui/text-field';
import {toaster} from "@/components/ui/toaster";

interface CouponFormProps {
  coupon?: Coupon;
  onApply: (coupon: Coupon) => void;
  onRemove: () => void;
}

export default function CouponForm({ coupon, onApply, onRemove }: CouponFormProps) {
  const [couponCode, setCouponCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validCoupons = [
    { code: 'DESCONTO10', discount: 10, type: 'percentage' as const },
    { code: 'FRETE15', discount: 15, type: 'fixed' as const },
    { code: 'BEMVINDO20', discount: 20, type: 'percentage' as const },
    { code: 'SAVE25', discount: 25, type: 'fixed' as const }
  ];

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
        onApply(foundCoupon);
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
    onRemove();
  };

  return (
    <Box>
      <Text fontSize="lg" fontWeight="semibold" mb={4}>
        Cupom de Desconto
      </Text>

      {coupon ? (
        <Box p={4} bg="green.50" borderRadius="md" border="1px" borderColor="green.200">
          <HStack justify="space-between" align="center">
            <VStack align="start" gap={1}>
              <Text fontWeight="semibold" color="green.700">
                Cupom aplicado: {coupon.code}
              </Text>
              <Text fontSize="sm" color="green.600">
                Desconto de {coupon.type === 'percentage'
                  ? `${coupon.discount}%`
                  : `R$ ${coupon.discount.toFixed(2)}`
                }
              </Text>
            </VStack>
            <Button
              size="sm"
              variant="ghost"
              colorScheme="red"
              onClick={handleRemoveCoupon}
            >
              Remover
            </Button>
          </HStack>
        </Box>
      ) : (
        <VStack gap={3} align="stretch">
          <HStack gap={2}>
            <TextField
              placeholder="Digite o código do cupom"
              value={couponCode}
              onChange={setCouponCode}
            />
            <Button
              colorScheme="blue"
              onClick={handleApplyCoupon}
              loading={isLoading}
              loadingText="Validando..."
              disabled={!couponCode.trim()}
            >
              Aplicar
            </Button>
          </HStack>
        </VStack>
      )}
    </Box>
  );
}
