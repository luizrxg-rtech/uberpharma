import {Product} from "@/types/product/types";
import {VStack} from "@chakra-ui/react";
import RowItems from "./row-items";
import RowHeader from "./row-header";

interface RowProps {
  line: string
  products: Product[] | undefined,
  loading?: boolean,
  handleClickLine(): void,
}

export default function Row({
  line,
  products,
  loading = false,
  handleClickLine
}: RowProps) {

  if (products?.length === 0) {
    return null;
  }

  return (
    <VStack
      align="start"
      gap={5}
      maxW="7xl"
      w="full"
    >
      <RowHeader
        line={line}
        loading={loading}
        handleClickLine={handleClickLine}
      />
      <RowItems
        products={products}
        loading={loading}
      />
    </VStack>
  )
}