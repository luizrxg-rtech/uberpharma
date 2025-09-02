import {Link, SimpleGrid, Text, VStack} from "@chakra-ui/react";
import Image from "next/image";
import {Categories} from "@/types/product/enums";

export default function CategoriesGrid() {

  return (
    <SimpleGrid
      columns={3}
      gap={6}
      w="full"
      h="full"
    >
      {Object.values(Categories).map((category, index) => {
        return (
          <Link
            key={index}
            bg="bg.muted"
            w="full"
            height="360px"
            position="relative"
            borderRadius="4xl"
            href={`#${category.toLowerCase().replace('-', "")}`}
            className="decoration-none group"
          >
            <VStack
              gap={2}
              p={24}
              className="pointer-events-none"
            >
              <Image
                src={"/ilustracao-" + category + ".png"}
                alt={"Ilustração da categoria " + category}
                width={500}
                height={500}
                loading="lazy"
                className="group-hover:scale-120 transition-all duration-200"
              />
              <Text
                color="fg"
                fontSize="lg"
                fontWeight="medium"
                textAlign="center"
              >
                {category}
              </Text>
            </VStack>
          </Link>
        )
      })}
    </SimpleGrid>
  )
}