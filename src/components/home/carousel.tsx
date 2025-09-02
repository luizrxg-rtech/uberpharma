"use client";

import {Box, Button, HStack, Image, Text, Circle} from "@chakra-ui/react";
import {AnimatePresence, motion} from "motion/react";
import {MouseEvent, useEffect, useState} from "react";
import {IconArrowRight} from "@tabler/icons-react";
import CircularProgress from "@/components/ui/circular-progress"

const carouselItems = [
  {
    id: 1,
    image: "/banner-spray-azul.jpg",
    alt: "Linha Oleum"
  },
  {
    id: 2,
    image: "/banner-spray-azul.jpg",
    alt: "Linha Oleum"
  },
  {
    id: 3,
    image: "/banner-spray-azul.jpg",
    alt: "Linha Oleum"
  },
  {
    id: 4,
    image: "/banner-spray-azul.jpg",
    alt: "Linha Oleum"
  },
  {
    id: 5,
    image: "/banner-spray-azul.jpg",
    alt: "Linha Oleum"
  },
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (e: MouseEvent<HTMLDivElement> , index: number) => {
    e.stopPropagation()
    setCurrentIndex(index);
  };

  const pauseAutoPlay = () => setIsAutoPlaying(false);
  const resumeAutoPlay = () => setIsAutoPlaying(false);

  return (
    <Box
      position="relative"
      w="full"
      height={{ base: "756px", md: "756px", lg: "756px" }}
      bg="white"
      borderRadius="4xl"
      overflow="hidden"
      onMouseEnter={pauseAutoPlay}
      onMouseLeave={resumeAutoPlay}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
        >
          <Box position="relative" w="full" height="full">
            <Image
              src={carouselItems[currentIndex].image}
              alt={carouselItems[currentIndex].alt}
              width="100%"
              height="100%"
              objectFit="cover"
              loading="lazy"
            />
          </Box>
        </motion.div>
      </AnimatePresence>

      <HStack
        position="absolute"
        top={8}
        right={8}
        zIndex={2}
        gap={0}
        bg="fg/40"
        color="bg"
        borderRadius="full"
        px={4}
        py={2}
        fontSize="xs"
        fontWeight="bold"
      >
        {carouselItems.map((_, index) => {
          const isCurrent = index === currentIndex;

          return (
            <Box
              align="center"
              justify="center"
              position="relative"
              width="14px"
              height="14px"
              key={index}
            >
              {isCurrent &&
                <CircularProgress
                  progress={100}
                  size={14}
                  strokeWidth={1.5}
                  color="white"
                  className="mr-2"
                />
              }
              <Circle
                size="6px"
                position="absolute"
                top="4px"
                right="4px"
                bg={isCurrent ? "white" : "whiteAlpha.500"}
                cursor="pointer"
                onClick={(e) => goToSlide(e, index)}
                transition="all 0.2s"
                _hover={{ bg: isCurrent ? "" : "whiteAlpha.700" }}
              />
            </Box>
          )})
        }
      </HStack>

      <Button
        position="absolute"
        bottom={16}
        right={16}
        borderRadius="full"
        py={7}
        px={8}
        _hover={{
          bg: "brand.500",
        }}
      >
        <Text
          fontSize="md"
          lineHeight="1.2"
        >
          Quero conhecer
        </Text>
        <IconArrowRight className="mt-0.5" size={14} />
      </Button>
    </Box>
  );
}