import {HStack, IconButton, Input} from "@chakra-ui/react";
import {IconMinus, IconPlus} from "@tabler/icons-react";
import {CartItem} from "@/types/cart/types";

interface QuantityInputProps {
  item: CartItem,
  handleQuantityChange: (id: string, quantity: string | number) => void,
  handleRemoveItem: (id: string) => void,
}

export default function QuantityInput({
  item,
  handleQuantityChange,
  handleRemoveItem
}: QuantityInputProps) {

  return (
    <HStack gap={2}>
      <IconButton
        size="sm"
        variant="ghost"
        w={8}
        h={6}
        onClick={() => {
          if (item.quantity === 1) {
            handleRemoveItem(item.id)
          } else {
            handleQuantityChange(item.id, Math.max(1, item.quantity - 1))
          }
        }}
      >
        <IconMinus size={16} />
      </IconButton>
      <Input
        type="number"
        textAlign="center"
        value={item.quantity}
        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
        min={1}
        max={item.product.stock}
        disabled={item.product.stock === 0}
        w={8}
        h={6}
        className="border"
      />
      <IconButton
        size="sm"
        variant="ghost"
        w={8}
        h={6}
        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
      >
        <IconPlus size={16} />
      </IconButton>
    </HStack>
  )
}