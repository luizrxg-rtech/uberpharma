import {Button, HStack, Text, VStack} from '@chakra-ui/react';
import {IconArrowLeft, IconHome, IconSearch} from '@tabler/icons-react';

interface NotFoundContentProps {
  handleBackClick(): void,
  handleHomeClick(): void,
}

export default function NotFoundContent({
  handleBackClick,
  handleHomeClick,
}: NotFoundContentProps) {

  return (
    <VStack
      gap={8}
      maxW="4xl"
      mx="auto"
      px="6"
      py="16"
      textAlign="center"
    >
      <VStack gap={3}>
        <Text
          fontSize="xl"
          color="fg"
          fontWeight="semibold"
        >
          Produto não encontrado
        </Text>
        <Text
          fontSize="lg"
          color="fg.muted"
          maxW="md"
        >
          Ops! O produto que você está procurando não existe.
        </Text>
      </VStack>

      <VStack
        w="200px"
        h="200px"
        bg="brand.50"
        borderRadius="full"
        align="center"
        justify="center"
        position="relative"
        overflow="hidden"
        my={10}
      >
        <VStack
          w="120px"
          h="120px"
          bg="brand.100"
          borderRadius="full"
          align="center"
          justify="center"
        >
          <IconSearch
            size={48}
            className="text-background"
          />
        </VStack>
      </VStack>

      <HStack
        gap={4}
        flexWrap="wrap"
        justify="center"
      >
        <Button
          size="lg"
          px={8}
          onClick={handleHomeClick}
        >
          <IconHome size={20} />
          Ir para Home
        </Button>

        <Button
          variant="outline"
          size="lg"
          px={8}
          onClick={handleBackClick}
        >
          <IconArrowLeft size={20} />
          Voltar
        </Button>
      </HStack>
    </VStack>
  )
}