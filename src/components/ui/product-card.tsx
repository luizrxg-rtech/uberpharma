'use client';

import {Product} from '@/types/product/types';
import {useRouter} from 'next/navigation';
import {Box, HStack, Skeleton, SkeletonText, Text, VStack} from '@chakra-ui/react';
import Image from 'next/image';
import {IconTagFilled} from "@tabler/icons-react";

interface ProductCardProps {
  product?: Product | undefined;
  loading: boolean;
}

export function ProductCard({
  product,
  loading
}: ProductCardProps) {
  const router = useRouter();

  const handleProductClick = () => {
    if (product) router.push(`/product/${product.id}`);
  };

  if (loading) {
    return (
      <VStack
        onClick={handleProductClick}
        minW="193px"
        maxW="193px"
        align="stretch"
        gap={2}
      >
        <Skeleton
          h="193px"
          w="193px"
          borderRadius="3xl"
        />
        <Box mt={2}>
          <SkeletonText
            noOfLines={2}
          />
        </Box>
        <SkeletonText
          noOfLines={2}
        />
      </VStack>
    )
  }

  return (
    <VStack
      className="cursor-pointer hover:scale-95 transition-all duration-300"
      onClick={handleProductClick}
      minW="193px"
      maxW="193px"
      align="stretch"
      position="relative"
      gap={2}
    >
      <Box
        position="absolute"
        top="4"
        right="4"
        bg="fg/40"
        color="bg"
        borderRadius="full"
        px={3}
        py={1}
        fontSize="xs"
        fontWeight="bold"
        w="60px"
      >
        <Text justifySelf="center">
          {product?.weight}{product?.measure}
        </Text>
      </Box>
      <Image
        src={product?.image_url || '/mock1.png'}
        alt={product?.name || ""}
        width={193}
        height={193}
        className="rounded-3xl"
        loading="lazy"
      />

      <Text
        fontSize="sm"
        fontWeight="medium"
        lineHeight="1.2"
        lineClamp="2"
        mt={2}
      >
        {product?.name}
      </Text>

      <VStack
        align="start"
        gap={2}
      >
        <Text
          fontSize="md"
          fontWeight="bold"
          lineHeight="1.2"
        >
          R$ {product?.price.toFixed(2)}
        </Text>
        <HStack align="center">
          <IconTagFilled color="green" size={14} />
          <Text
            fontSize="xs"
            fontWeight="semibold"
            color="green"
            lineHeight="1.2"
          >
            10% OFF no PIX
          </Text>
        </HStack>
      </VStack>
    </VStack>
  );
}
