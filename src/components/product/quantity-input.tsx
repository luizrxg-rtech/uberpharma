import {HStack, IconButton, Input, Text} from "@chakra-ui/react";
import {Product} from "@/types/product/types";
import {IconMinus, IconPlus} from "@tabler/icons-react";

interface QuantityInputProps {
  quantity: number,
  product: Product,
  handleQuantityChange: (quantity: number | string) => void,
}

export default function QuantityInput({
  quantity,
  product,
  handleQuantityChange
}: QuantityInputProps) {

  return (
    <HStack align="center">
      <Text fontWeight="medium">Quantidade</Text>
      <HStack gap={2}>
        <IconButton
          size="sm"
          variant="ghost"
          onClick={() => {
            handleQuantityChange(Math.max(1, quantity - 1))}
          }
        >
          <IconMinus size={16} />
        </IconButton>
        <Input
          type="number"
          variant="subtle"
          textAlign="center"
          value={quantity}
          onChange={(e) => handleQuantityChange(e.target.value)}
          min={1}
          max={product.stock}
          disabled={product.stock === 0}
          w={16}
          px={2}
          py={1}
        />
        <IconButton
          size="sm"
          variant="ghost"
          onClick={() => handleQuantityChange(Math.min(product.stock, quantity + 1))}
        >
          <IconPlus size={16} />
        </IconButton>
      </HStack>
    </HStack>
  )
}