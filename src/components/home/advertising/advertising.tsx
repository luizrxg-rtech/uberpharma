import {Text, VStack} from "@chakra-ui/react";
import CategoriesGrid from "./categories-grid";
import Banner from "./banner";

export default function Advertising() {

  return (
    <VStack gap={6}>
      <Text
        color="fg"
        fontSize="6xl"
        fontWeight="bold"
        pb={10}
      >
        Tudo que você precisa está aqui
      </Text>
      <CategoriesGrid />
      <Banner />
    </VStack>
  )
}