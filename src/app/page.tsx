import {Box, VStack} from "@chakra-ui/react";
import Carousel from "@/components/home/carousel"
import Products from "@/components/home/products";

export default function Home() {
  return (
    <VStack
      className="max-w-7xl mx-auto"
    >
      <Carousel />
      <Products />
    </VStack>
  );
}
