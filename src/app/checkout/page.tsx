'use client';

import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {Box, Button, Grid, GridItem, HStack, Separator, Text, VStack} from '@chakra-ui/react';
import {
  IconCheck,
  IconChevronLeft,
  IconChevronRight,
  IconClipboardCheck,
  IconCreditCard,
  IconMapPin,
  IconTruck
} from '@tabler/icons-react';
import {toaster} from '@/components/ui/toaster';
import {useCart} from '@/contexts/cart-context';
import {Address, CheckoutData, Coupon, PaymentMethod, Shipping} from '@/types/checkout/types';
import AddressForm from '@/components/checkout/address-form';
import PaymentForm from '@/components/checkout/payment-form';
import ShippingOptions from '@/components/checkout/shipping-options';
import OrderSummary from '@/components/checkout/order-summary';
import OrderSuccess from '@/components/checkout/order-success';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart } = useCart();
  
  const [checkoutData, setCheckoutData] = useState<CheckoutData>({
    address: {
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
      zipCode: ''
    },
    paymentMethod: {
      type: 'pix'
    },
    shipping: {
      method: 'standard',
      price: 0,
      estimatedDays: 5
    },
    total: 0,
    subtotal: 0,
    shippingCost: 0,
    discount: 0
  });

  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    if (items.length === 0 && !showSuccess) {
      router.push('/cart');
      return;
    }

    const subtotal = total;
    const shippingCost = checkoutData.shipping.price;
    const discount = checkoutData.coupon?.type === 'percentage' 
      ? (subtotal * (checkoutData.coupon.discount / 100))
      : (checkoutData.coupon?.discount || 0);
    
    const finalTotal = subtotal + shippingCost - discount;

    setCheckoutData((prev: CheckoutData) => ({
      ...prev,
      subtotal,
      shippingCost,
      discount,
      total: finalTotal
    }));
  }, [items, total, checkoutData.shipping.price, checkoutData.coupon, router, showSuccess]);

  const handleAddressChange = (address: Address) => {
    setCheckoutData((prev: CheckoutData) => ({ ...prev, address }));
  };

  const handlePaymentChange = (paymentMethod: PaymentMethod) => {
    setCheckoutData((prev: CheckoutData) => ({ ...prev, paymentMethod }));
  };

  const handleShippingChange = (shipping: Shipping) => {
    setCheckoutData((prev: CheckoutData) => ({ ...prev, shipping }));
  };

  const handleCouponApply = (coupon: Coupon) => {
    setCheckoutData((prev: CheckoutData) => ({ ...prev, coupon }));
    toaster.success({
      title: 'Cupom aplicado!',
      description: `Desconto de ${coupon.type === 'percentage' ? `${coupon.discount}%` : `R$ ${coupon.discount.toFixed(2)}`} aplicado.`,
    });
  };

  const handleCouponRemove = () => {
    setCheckoutData((prev: CheckoutData) => ({ ...prev, coupon: undefined }));
    toaster.info({
      title: 'Cupom removido',
    });
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        const { address } = checkoutData;
        return !!(address.street && address.number && address.neighborhood && 
                 address.city && address.state && address.zipCode);
      case 2:
        const { paymentMethod } = checkoutData;
        if (paymentMethod.type === 'credit_card') {
          return !!(paymentMethod.cardNumber && paymentMethod.cardName && 
                   paymentMethod.expiryDate && paymentMethod.cvv);
        }
        return true;
      case 3:
        return !!checkoutData.shipping.method;
      default:
        return true;
    }
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev: number) => Math.min(prev + 1, 4));
    } else {
      toaster.error({
        title: 'Dados incompletos',
        description: 'Por favor, preencha todos os campos obrigatórios.',
      });
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev: number) => Math.max(prev - 1, 1));
  };

  const handleFinishOrder = async () => {
    if (!validateStep(currentStep)) {
      toaster.error({
        title: 'Dados incompletos',
        description: 'Por favor, verifique todos os dados antes de finalizar.',
      });
      return;
    }

    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate a mock order ID
      const generatedOrderId = `ORD-${Date.now().toString().slice(-6)}`;
      setOrderId(generatedOrderId);

      // Clear cart and show success illustration
      clearCart();
      setShowSuccess(true);
    } catch (error) {
      console.error('Erro ao processar pedido:', error);
      toaster.error({
        title: 'Erro ao processar pedido',
        description: 'Tente novamente em alguns instantes.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStepTitle = (step: number): string => {
    switch (step) {
      case 1: return 'Endereço de Entrega';
      case 2: return 'Forma de Pagamento';
      case 3: return 'Opções de Frete';
      case 4: return 'Resumo do Pedido';
      default: return '';
    }
  };

  const getStepIcon = (step: number) => {
    const iconSize = 20;

    if (step < currentStep) {
      return <IconCheck size={iconSize} />;
    }

    switch (step) {
      case 1: return <IconMapPin size={iconSize} />;
      case 2: return <IconCreditCard size={iconSize} />;
      case 3: return <IconTruck size={iconSize} />;
      case 4: return <IconClipboardCheck size={iconSize} />;
      default: return null;
    }
  };

  const handleContinueShopping = () => {
    setShowSuccess(false);
    router.push('/');
  };

  return (
    <VStack
      maxW="7xl"
      mx="auto"
      align="stretch"
    >
      <HStack
        mb={8}
        gap={4}
        justify="stretch"
        w="full"
      >
        {[1, 2, 3, 4].map((step) => (
          <HStack key={step} gap={2} w="full">
            <Box
              minW={12}
              minH={12}
              borderRadius="full"
              bg={currentStep >= step ? 'brand.500' : 'gray.200'}
              color={currentStep >= step ? 'white' : 'gray.500'}
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontSize="sm"
              fontWeight="bold"
              transition="all 0.2s"
            >
              {getStepIcon(step)}
            </Box>
            <Text
              className="whitespace-nowrap"
              fontSize="sm"
              fontWeight={currentStep >= step ? "bold" : "normal"}
              color={currentStep >= step ? 'brand.500' : 'gray.500'}
            >
              {getStepTitle(step)}
            </Text>
            {step < 4 && <Box h={0.5} bg="gray.200" w="full"/>}
          </HStack>
        ))}
      </HStack>

      <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={8}>
        <GridItem>
          <VStack align="stretch" w="full" gap={8}>
              <Text fontSize="xl" fontWeight="bold">
                {getStepTitle(currentStep)}
              </Text>
            <VStack align="stretch">
              {currentStep === 1 && (
                <AddressForm
                  address={checkoutData.address}
                  onChange={handleAddressChange}
                />
              )}
              
              {currentStep === 2 && (
                <PaymentForm
                  paymentMethod={checkoutData.paymentMethod}
                  onChange={handlePaymentChange}
                />
              )}
              
              {currentStep === 3 && (
                <ShippingOptions
                  shipping={checkoutData.shipping}
                  onChange={handleShippingChange}
                  zipCode={checkoutData.address.zipCode}
                />
              )}
              
              {currentStep === 4 && (
                <VStack gap={4} align="stretch">
                  <Text fontWeight="semibold">Endereço de Entrega</Text>
                  <VStack align="start">
                    <Text fontSize="sm" color="gray.600">
                      {checkoutData.address.street}, {checkoutData.address.number}
                      {checkoutData.address.complement && `, ${checkoutData.address.complement}`}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      {checkoutData.address.neighborhood} - {checkoutData.address.city}, {checkoutData.address.state}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      CEP: {checkoutData.address.zipCode}
                    </Text>
                  </VStack>

                  <Separator />

                  <Text fontWeight="semibold">Forma de Pagamento</Text>
                  <Text fontSize="sm" color="gray.600">
                    {checkoutData.paymentMethod.type === 'pix' && 'PIX'}
                    {checkoutData.paymentMethod.type === 'credit_card' && 'Cartão de Crédito'}
                    {checkoutData.paymentMethod.type === 'boleto' && 'Boleto Bancário'}
                  </Text>

                  <Separator />

                  <Text fontWeight="semibold">Frete</Text>
                  <Text fontSize="sm" color="gray.600">
                    {checkoutData.shipping.method} - Entrega em até {checkoutData.shipping.estimatedDays} dias úteis
                  </Text>
                </VStack>
              )}

              <Separator mt={8}/>

              <HStack justify="space-between" mt={6}>
                {currentStep > 1 ?
                  <Button
                    variant="subtle"
                    onClick={handlePrevStep}
                    disabled={currentStep === 1}
                  >
                    <IconChevronLeft size={16} />
                    Voltar
                  </Button> : <Box />
                }

                {currentStep < 4 ? (
                  <Button
                    colorScheme="blue"
                    onClick={handleNextStep}
                  >
                    Próximo
                    <IconChevronRight size={16} />
                  </Button>
                ) : (
                  <Button 
                    colorScheme="green" 
                    onClick={handleFinishOrder}
                    loading={isLoading}
                  >
                    {isLoading ? 'Processando...' : 'Finalizar Pedido'}
                  </Button>
                )}
              </HStack>
            </VStack>
          </VStack>
        </GridItem>

        <GridItem>
          <OrderSummary 
            items={items}
            checkoutData={checkoutData}
            currentStep={currentStep}
            coupon={checkoutData.coupon}
            onApplyCoupon={handleCouponApply}
            onRemoveCoupon={handleCouponRemove}
          />
        </GridItem>
      </Grid>

      {showSuccess && (
        <Box
          position="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="blackAlpha.600"
          zIndex={1000}
          display="flex"
          alignItems="center"
          justifyContent="center"
          p={4}
        >
          <OrderSuccess
            orderId={orderId}
            total={checkoutData.total}
            estimatedDays={checkoutData.shipping.estimatedDays}
            onContinueShopping={handleContinueShopping}
          />
        </Box>
      )}
    </VStack>
  );
}
