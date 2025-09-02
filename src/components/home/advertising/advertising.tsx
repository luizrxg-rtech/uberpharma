import {Text, VStack} from "@chakra-ui/react";
import CategoriesGrid from "./categories-grid";
import Banner from "./banner";

export default function Advertising() {

  return (
    <VStack gap={16} py={44}>
      <Text color="fg" fontSize="6xl" fontWeight="bold" lineHeight="1.2">
        Tudo que você precisa está aqui
      </Text>
      <CategoriesGrid />
      <Banner />
    </VStack>
  )
}