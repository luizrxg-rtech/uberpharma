'use client';

import { useState, useEffect, useCallback } from 'react';
import { VStack, HStack, Box, Text, Spinner } from '@chakra-ui/react';
import { RadioGroup } from '@chakra-ui/react';
import { Shipping } from '@/types/checkout/types';

interface ShippingOptionsProps {
  shipping: Shipping;
  onChange: (shipping: Shipping) => void;
  zipCode: string;
}

interface ShippingOption {
  method: string;
  name: string;
  price: number;
  estimatedDays: number;
  description: string;
}

export default function ShippingOptions({ shipping, onChange, zipCode }: ShippingOptionsProps) {
  const [options, setOptions] = useState<ShippingOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);

  const calculateShipping = useCallback(async () => {
    setIsLoading(true);
    setHasCalculated(false);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const shippingOptions: ShippingOption[] = [
        {
          method: 'standard',
          name: 'Entrega Padrão',
          price: 15.90,
          estimatedDays: 7,
          description: 'Entrega em até 7 dias úteis'
        },
        {
          method: 'express',
          name: 'Entrega Expressa',
          price: 25.90,
          estimatedDays: 3,
          description: 'Entrega em até 3 dias úteis'
        },
        {
          method: 'sedex',
          name: 'SEDEX',
          price: 35.90,
          estimatedDays: 1,
          description: 'Entrega no próximo dia útil'
        }
      ];

      setOptions(shippingOptions);
      setHasCalculated(true);

    } catch (error) {
      console.error('Erro ao calcular frete:', error);
      const fallbackOptions: ShippingOption[] = [
        {
          method: 'standard',
          name: 'Entrega Padrão',
          price: 15.90,
          estimatedDays: 7,
          description: 'Entrega em até 7 dias úteis'
        }
      ];
      setOptions(fallbackOptions);
      setHasCalculated(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (hasCalculated && options.length > 0 && !shipping.method) {
      onChange(options[0]);
    }
  }, [hasCalculated, options, shipping.method, onChange]);

  useEffect(() => {
    if (zipCode && zipCode.replace(/\D/g, '').length === 8) {
      calculateShipping();
    } else {
      setOptions([]);
      setHasCalculated(false);
    }
  }, [zipCode, calculateShipping]);

  const handleShippingChange = (method: string) => {
    const selectedOption = options.find(option => option.method === method);
    if (selectedOption) {
      onChange({
        method: selectedOption.method,
        price: selectedOption.price,
        estimatedDays: selectedOption.estimatedDays
      });
    }
  };

  if (!zipCode || zipCode.replace(/\D/g, '').length !== 8) {
    return (
      <Box p={4} bg="gray.50" borderRadius="md" textAlign="center">
        <Text color="gray.600">
          Preencha o CEP no endereço de entrega para calcular o frete
        </Text>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box p={8} textAlign="center">
        <Spinner size="lg" color="blue.500" />
        <Text mt={4} color="gray.600">
          Calculando opções de frete...
        </Text>
      </Box>
    );
  }

  if (options.length === 0) {
    return (
      <Box p={4} bg="red.50" borderRadius="md" textAlign="center">
        <Text color="red.600">
          Não foi possível calcular o frete para este CEP
        </Text>
      </Box>
    );
  }

  return (
    <RadioGroup.Root
      w="full"
      value={shipping.method}
      onValueChange={(details) => {
        if (details.value) {
          handleShippingChange(details.value);
        }
      }}
    >
      <VStack gap={3} align="stretch" w="full">
        {options.map((option) => (
          <Box
            key={option.method}
            p={4}
            border="1px"
            borderColor={shipping.method === option.method ? 'blue.500' : 'gray.200'}
            borderRadius="md"
            bg={shipping.method === option.method ? 'blue.50' : 'white'}
            cursor="pointer"
            onClick={() => handleShippingChange(option.method)}
          >
            <HStack justify="space-between" align="start">
              <HStack gap={3}>
                <RadioGroup.Item value={option.method}>
                  <RadioGroup.ItemControl />
                  <RadioGroup.ItemText>
                    <VStack align="start" gap={1}>
                      <Text fontWeight="semibold">{option.name}</Text>
                      <Text fontSize="sm" color="gray.600">
                        {option.description}
                      </Text>
                    </VStack>
                  </RadioGroup.ItemText>
                </RadioGroup.Item>
              </HStack>

              <VStack align="end" gap={1}>
                <Text fontWeight="bold" color="green.600">
                  {option.price === 0 ? 'Grátis' : `R$ ${option.price.toFixed(2)}`}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {option.estimatedDays} dia{option.estimatedDays > 1 ? 's' : ''} út{option.estimatedDays > 1 ? 'eis' : 'il'}
                </Text>
              </VStack>
            </HStack>
          </Box>
        ))}
      </VStack>
    </RadioGroup.Root>
  );
}
