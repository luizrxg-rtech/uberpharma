'use client';

import {
  VStack,
  HStack,
  Box,
  Text,
  Grid,
  GridItem,
  SimpleGrid,
  Button,
  Select,
  Portal,
  createListCollection
} from '@chakra-ui/react';
import {PaymentMethod} from '@/types/checkout/types';
import {TextField} from '@/components/ui/text-field';
import {IconReceipt, IconCreditCard} from '@tabler/icons-react';
import {IconPix} from '@/components/ui/icons';

interface PaymentFormProps {
  paymentMethod: PaymentMethod;
  onChange: (paymentMethod: PaymentMethod) => void;
}

const optionsParcelas = createListCollection({
  items: [
    {
      value: "1",
      label: "1x à vista"
    },
    {
      value: "2",
      label: "2x sem juros"
    },
    {
      value: "3",
      label: "3x sem juros"
    },
    {
      value: "6",
      label: "6x sem juros"
    },
    {
      value: "12",
      label: "12x sem juros"
    },
  ]
})

export default function PaymentForm({paymentMethod, onChange}: PaymentFormProps) {
  const handleTypeChange = (value: string) => {
    const type = value as 'pix' | 'credit_card' | 'boleto';
    onChange({
      type,
      ...(value !== 'credit_card' && {
        cardNumber: undefined,
        cardName: undefined,
        expiryDate: undefined,
        cvv: undefined,
        installments: undefined
      })
    });
  };

  const handleCardFieldChange = (field: keyof PaymentMethod, value: string | number) => {
    onChange({
      ...paymentMethod,
      [field]: value
    });
  };

  return (
    <VStack gap={6} align="stretch">
      <SimpleGrid columns={3} gap={4} w="full">
        <Button
          variant={paymentMethod.type === "pix" ? "solid" : "subtle"}
          onClick={() => handleTypeChange("pix")}
        >
          <HStack gap={3}>
            <IconPix size={24} />
            <VStack align="start" gap={1}>
              <Text fontWeight="semibold">PIX</Text>
            </VStack>
          </HStack>
        </Button>

        <Button
          variant={paymentMethod.type === "credit_card" ? "solid" : "subtle"}
          onClick={() => handleTypeChange("credit_card")}
        >
          <HStack gap={3}>
            <IconCreditCard size={24} />
            <VStack align="start" gap={1}>
              <Text fontWeight="semibold">Cartão de Crédito</Text>
            </VStack>
          </HStack>
        </Button>

        <Button
          variant={paymentMethod.type === "boleto" ? "solid" : "subtle"}
          onClick={() => handleTypeChange("boleto")}
        >
          <HStack gap={3}>
            <IconReceipt size={24} />
            <VStack align="start" gap={1}>
              <Text fontWeight="semibold">Boleto Bancário</Text>
            </VStack>
          </HStack>
        </Button>
      </SimpleGrid>

      {paymentMethod.type === 'credit_card' && (
        <Box>
          <Text fontSize="lg" fontWeight="semibold" mb={4}>
            Dados do Cartão
          </Text>

          <VStack gap={4} align="stretch" w="full">
            <TextField
              label="Número do Cartão"
              placeholder="0000 0000 0000 0000"
              value={paymentMethod.cardNumber || ''}
              onChange={(value: string) => handleCardFieldChange('cardNumber', value)}
              mask="9999 9999 9999 9999"
              required
            />

            <TextField
              label="Nome no Cartão"
              placeholder="Nome como impresso no cartão"
              value={paymentMethod.cardName || ''}
              onChange={(value: string) => handleCardFieldChange('cardName', value)}
              required
            />

            <Grid templateColumns={{base: '1fr', md: '1fr 1fr 1fr'}} gap={4}>
              <GridItem>
                <TextField
                  label="Validade"
                  placeholder="MM/AA"
                  value={paymentMethod.expiryDate || ''}
                  onChange={(value: string) => handleCardFieldChange('expiryDate', value)}
                  mask="99/99"
                  required
                />
              </GridItem>

              <GridItem>
                <TextField
                  label="CVV"
                  placeholder="123"
                  value={paymentMethod.cvv || ''}
                  onChange={(value: string) => handleCardFieldChange('cvv', value)}
                  mask="999"
                  required
                />
              </GridItem>

              <GridItem>
                <Select.Root
                  value={[paymentMethod?.installments?.toString() || '1']}
                  onValueChange={(details) => handleCardFieldChange('installments', parseInt(details.value[0]))}
                  variant="subtle"
                  collection={optionsParcelas}
                >
                  <Select.Label>Parcelas</Select.Label>
                  <Select.Control>
                    <Select.Trigger>
                      <Select.ValueText placeholder="Selecione as parcelas" />
                      <Select.Indicator />
                    </Select.Trigger>
                  </Select.Control>
                  <Portal>
                    <Select.Positioner>
                      <Select.Content>
                        {optionsParcelas.items.map((parcela) => (
                          <Select.Item
                            item={parcela}
                            key={parcela.value}
                          >
                            <Select.ItemText>{parcela.label}</Select.ItemText>
                            <Select.ItemIndicator />
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Positioner>
                  </Portal>
                </Select.Root>
              </GridItem>
            </Grid>
          </VStack>
        </Box>
      )}

      {paymentMethod.type === 'pix' && (
        <Box p={4} bg="blue.50" borderRadius="md">
          <HStack
            gap={2}
            color="blue.700"
          >
            <IconPix size={16} />
            <Text fontSize="sm">
              Após confirmar o pedido, você receberá o código PIX para pagamento instantâneo.
            </Text>
          </HStack>
        </Box>
      )}

      {paymentMethod.type === 'boleto' && (
        <Box p={4} bg="blue.50" borderRadius="md">
          <HStack
            gap={2}
            color="blue.700"
          >
            <IconReceipt size={16} />
            <Text fontSize="sm">
              O boleto será gerado após a confirmação do pedido e enviado por e-mail.
            </Text>
          </HStack>
        </Box>
      )}
    </VStack>
  );
}
