import {Box, Text, VStack} from "@chakra-ui/react";
import Image from "next/image";

export default function Banner() {

  return (
    <Box
      bg="bg.muted"
      w="full"
      position="relative"
      borderRadius="4xl"
      h="fit"
    >
      <VStack
        position="absolute"
        align="center"
        maxW="4xl"
        justifySelf="center"
        gap={4}
        pt="100px"
      >
        <Text color="fg" fontSize="6xl" fontWeight="bold">
          Aqui você é o foco
        </Text>
        <Text color="fg.muted" fontSize="lg" textAlign="center">
          Nosso atendimento é pensado para ouvir suas necessidades e oferecer soluções personalizadas, mais do que produtos entregamos cuidado e atenção.
        </Text>
      </VStack>
      <Image
        src="/banners/banner-advertising.png"
        alt="Banner mostrando produtos e atendente"
        width={2552}
        height={1666}
        loading="lazy"
      />
    </Box>
  )
}