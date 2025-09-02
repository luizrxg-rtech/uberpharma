"use client";

import {Box, Circle, HStack, Image,} from "@chakra-ui/react";
import {AnimatePresence, motion} from "motion/react";
import {useEffect, useState} from "react";

const carouselItems = [
  {
    id: 1,
    image: "/banner-spray-azul.jpg",
    alt: "teste"
  },
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const pauseAutoPlay = () => setIsAutoPlaying(false);
  const resumeAutoPlay = () => setIsAutoPlaying(true);

  return (
    <Box
      position="relative"
      width="100%"
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
          <Box position="relative" width="100%" height="100%">
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
        bottom="4"
        left="50%"
        transform="translateX(-50%)"
        zIndex={2}
        gap={2}
      >
        {carouselItems.map((_, index) => (
          <Circle
            key={index}
            size="12px"
            bg={index === currentIndex ? "white" : "whiteAlpha.500"}
            cursor="pointer"
            onClick={() => goToSlide(index)}
            transition="all 0.2s"
            _hover={{ bg: "whiteAlpha.700" }}
          />
        ))}
      </HStack>
    </Box>
  );
}