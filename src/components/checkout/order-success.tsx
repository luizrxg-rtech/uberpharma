'use client';

import { VStack, HStack, Box, Text, Button } from '@chakra-ui/react';
import {IconCheck, IconPackage, IconShoppingBag, IconTruck} from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

interface OrderSuccessProps {
  orderId?: string | null;
  total: number;
  estimatedDays: number;
  onContinueShopping: () => void;
}

export default function OrderSuccess({ orderId, total, estimatedDays, onContinueShopping }: OrderSuccessProps) {
  const router = useRouter();

  const formatPrice = (price: number) => {
    return `R$ ${price.toFixed(2).replace('.', ',')}`;
  };

  return (
    <VStack
      gap={8}
      align="center"
      justify="center"
      p={12}
      bg="white"
      borderRadius="2xl"
      border="1px"
      borderColor="green.200"
      boxShadow="xl"
      textAlign="center"
      maxW="md"
      mx="auto"
    >
      <Box position="relative">
        <Box
          w={24}
          h={24}
          borderRadius="full"
          bg="green.100"
          display="flex"
          alignItems="center"
          justifyContent="center"
          position="relative"
          animation="pulse 2s infinite"
        >
          <Box
            w={16}
            h={16}
            borderRadius="full"
            bg="green.500"
            display="flex"
            alignItems="center"
            justifyContent="center"
            animation="bounce 1s ease-in-out infinite"
          >
            <IconCheck size={32} color="white" strokeWidth={3} />
          </Box>
        </Box>

        <Box
          position="absolute"
          top={-2}
          right={-2}
          w={8}
          h={8}
          borderRadius="full"
          bg="blue.500"
          display="flex"
          alignItems="center"
          justifyContent="center"
          animation="float 3s ease-in-out infinite"
        >
          <IconPackage size={16} color="white" />
        </Box>

        <Box
          position="absolute"
          bottom={-2}
          left={-2}
          w={8}
          h={8}
          borderRadius="full"
          bg="orange.500"
          display="flex"
          alignItems="center"
          justifyContent="center"
          animation="float 3s ease-in-out infinite 1s"
        >
          <IconTruck size={16} color="white" />
        </Box>
      </Box>

      <VStack gap={4} align="center">
        <Text
          fontSize="2xl"
          fontWeight="bold"
          color="green.600"
          lineHeight="shorter"
        >
          Pedido realizado com sucesso! 🎉
        </Text>

        <Text fontSize="md" color="gray.600" maxW="sm">
          Seu pedido foi processado e você receberá um e-mail com todos os detalhes em breve.
        </Text>
      </VStack>

      <VStack gap={3} w="full">
        <Button
          colorScheme="blue"
          size="lg"
          w="full"
          onClick={onContinueShopping}
        >
          <IconShoppingBag size={16} />
          Continuar comprando
        </Button>
      </VStack>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes bounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>
    </VStack>
  );
}
