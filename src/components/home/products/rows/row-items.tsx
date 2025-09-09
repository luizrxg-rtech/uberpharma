import {Product} from "@/types/product/types";
import {HStack} from "@chakra-ui/react";
import {ProductCard} from "@/components/ui/product-card";
import {repeat} from "@/utils/repeat";

interface RowItemsProps {
  products?: Product[],
  loading: boolean,
}

export default function RowItems({
  products,
  loading
}: RowItemsProps) {

  return (
    <HStack
      w="full"
      height="fit-content"
      gap={6}
    >
      {(products || repeat(6))
        .map((product, index) => {
          return (
            <ProductCard
              key={index}
              product={product}
              loading={loading}
            />
          )
        })
      }
    </HStack>
  )
}