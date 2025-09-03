import {Box, SimpleGrid, Skeleton, SkeletonText, VStack} from '@chakra-ui/react';

export default function LoadingContent() {

  return (
    <SimpleGrid
      columns={2}
      gap={8}
      w="full"
      maxW="7xl"
      mx="auto"
    >
      <Skeleton
        width="100%"
        height="100%"
        borderRadius="3xl"
        aspectRatio={1}
      />
      <VStack
        align="start"
      >
        <SkeletonText
          noOfLines={1}
          w="100px"
        />
        <SkeletonText
          noOfLines={1}
          height="36px"
        />
        <SkeletonText
          w="170px"
          h="43px"
          mt={4}
          noOfLines={1}
        />

        <SkeletonText
          noOfLines={1}
          w="140px"
          h="20px"
        />

        <VStack
          gap={2}
          mt={6}
          align="stretch"
          w="full"
        >
          <SkeletonText
            w="156px"
            noOfLines={1}
          />
          <Skeleton
            w="240px"
            h="40px"
            borderRadius="full"
          />

          <Skeleton
            mt={4}
            w="full"
            h="44px"
            borderRadius="full"
          />
        </VStack>
        <Box
          w="full"
          mt={4}
        >
          <SkeletonText noOfLines={5} />
        </Box>
      </VStack>
    </SimpleGrid>
  )
}