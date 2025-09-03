import {Badge, Flex, IconButton} from "@chakra-ui/react";
import {IconShoppingBag} from "@tabler/icons-react";
import {useCart} from "@/contexts/cart-context";
import {useCartSidebar} from "@/contexts/cart-sidebar-context";

export default function CartButton() {
  const {itemCount} = useCart();
  const {toggleSidebar} = useCartSidebar();

  return (
    <IconButton
      onClick={toggleSidebar}
      position="relative"
      variant="subtle"
      p={2}
    >
      <IconShoppingBag size={20} />
      {itemCount > 0 && (
        <Badge
          position="absolute"
          top="-2"
          right="-2"
          borderRadius="full"
          variant="solid"
          minW="20px"
          h="20px"

        >
          <Flex
            align="center"
            justify="center"
            fontSize="xs"
            fontWeight="bold"
            ml="1px"
          >
            {itemCount}
          </Flex>
        </Badge>
      )}
    </IconButton>
  )
}