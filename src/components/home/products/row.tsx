import {Product} from "@/types/product/types";
import {Button, HStack, Text, VStack} from "@chakra-ui/react";
import {ProductCard} from "@/components/ui/product-card";
import {IconChevronRight} from "@tabler/icons-react";

interface RowProps {
  line: string
  products: Product[],
}

export default function Row({
  line,
  products,
}: RowProps) {

  if (products.length === 0) {
    return null;
  }

  return (
    <VStack
      align="start"
      gap={5}
      maxW="7xl"
      w="full"
    >
      <HStack
        justify="space-between"
        w="full"
      >
        <Text
          fontWeight="bold"
          fontSize="2xl"
        >
          {line}
        </Text>
        <Button
          onClick={() => {}}
          rounded="full"
          fontWeight="semibold"
          variant="plain"
          ml="auto"
        >
          Ver todas
          <IconChevronRight size={16} />
        </Button>
      </HStack>
      <HStack
        w="full"
        height="fit-content"
        gap={6}
      >
        {products
          .map((product, index) => {
            return (
              <ProductCard
                key={index}
                product={product}
              />
            )
          })
        }
      </HStack>
    </VStack>
  )
}