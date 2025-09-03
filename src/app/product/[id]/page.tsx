"use client";

import {useParams, useRouter} from "next/navigation";
import {useEffect, useState} from 'react';
import {Product} from '@/types/product/types';
import {useCart} from '@/contexts/cart-context';
import {useCartSidebar} from '@/contexts/cart-sidebar-context';
import {Box, Button, HStack, Image, SimpleGrid, Text, VStack} from '@chakra-ui/react';
import {IconShoppingBagPlus, IconTagFilled} from '@tabler/icons-react';
import {ProductService} from '@/services/product-service';
import QuantityInput from "@/components/product/quantity-input";
import {AnimatePresence, motion} from "motion/react";
import LoadingContent from "@/components/product/loading-content";
import NotFoundContent from "@/components/product/not-found-content";
import {toaster} from "@/components/ui/toaster";

export default function ProductPage() {
  const {id} = useParams();
  const {addItem} = useCart();
  const {openSidebar} = useCartSidebar();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const foundProduct = await ProductService.getProductById(id as string);
        setProduct(foundProduct);
      } catch (error) {
        setError('Erro ao carregar produto. Tente novamente. ');
        console.error('Erro ao carregar produto:', error);
        toaster.error({
          title: 'Erro ao carregar produto. Tente novamente.',
          closable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addItem(product);
      }
      openSidebar();
    }
  };

  const handleHomeClick = () => {
    router.push('/');
  };

  const handleBackClick = () => {
    router.back();
  };

  const handleQuantityChange = (quantity: string | number) => {
    let newQuantity = quantity;
    if (typeof quantity === "string") {
      newQuantity = parseInt(quantity) || 1;
    }
    setQuantity(Math.max(1, Math.min(newQuantity as number, product?.stock || 1)));
  };

  if (loading) {
    return <LoadingContent />
  }

  if (!product) {
    return <NotFoundContent handleBackClick={handleBackClick} handleHomeClick={handleHomeClick} />
  }

  return (
    <SimpleGrid
      columns={2}
      gap={8}
      w="full"
      maxW="7xl"
      mx="auto"
    >
      <AnimatePresence mode="wait">
        <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <Box
            position="relative"
            w="full"
            aspectRatio={1}
            overflow="hidden"
            borderRadius="lg"
            bg="gray.50"
          >
            <Image
              src={product.image_url}
              alt={product.name}
              objectFit="cover"
              width="100%"
              height="100%"
              loading="lazy"
              borderRadius="3xl"
              aspectRatio={1}
            />
          </Box>
        </motion.div>
      </AnimatePresence>

      <VStack
        align="start"
      >
        <Text
          fontSize="sm"
          color="fg.muted"
          fontWeight="medium"
          textTransform="uppercase"
        >
          {product.category}
        </Text>
        <Text
          fontSize="3xl"
          fontWeight="bold"
        >
          {product.name}
        </Text>
        <Text
          mt={4}
          fontSize="4xl"
          fontWeight="medium"
          color="primary.600"
        >
          R$ {product.price.toFixed(2)}
        </Text>
        <HStack align="center">
          <IconTagFilled
            color="green"
            size={14}
          />
          <Text
            fontSize="md"
            fontWeight="semibold"
            color="green"
          >
            10% OFF no PIX
          </Text>
        </HStack>

        <VStack
          gap={2}
          mt={6}
          align="stretch"
          w="full"
        >
          <Text
            fontSize="sm"
            fontWeight="medium"
            color="fg.muted"
          >
            {product.stock > 0
              ? `${product.stock} unidades disponíveis`
              : 'Produto indisponível'
            }
          </Text>
          <QuantityInput
            quantity={quantity}
            product={product}
            handleQuantityChange={handleQuantityChange}
          />

          <Button
            size="lg"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            mt={4}
            w="full"
          >
            <IconShoppingBagPlus size={20} />
            {product.stock > 0 ? 'Adicionar à sacola' : 'Indisponível'}
          </Button>
        </VStack>

        <Box
          pt={4}
          mt={4}
          fontSize="lg"
          className="border-t text-muted-foreground"
          lineHeight="1.6"
          data-html-content
          dangerouslySetInnerHTML={{__html: product.description}}
        />
      </VStack>
    </SimpleGrid>
  );
}
