import {Button, HStack, Skeleton, Text} from "@chakra-ui/react";
import {IconChevronRight} from "@tabler/icons-react";

interface RowHeaderProps {
  line: string
  loading: boolean,
  handleClickLine(): void,
}

export default function RowHeader({
  line,
  loading,
  handleClickLine
}: RowHeaderProps) {

  if (loading) {
    return (
      <HStack
        justify="space-between"
        w="full"
      >
        <Skeleton
          width="200px"
          height="28px"
        />
        <Skeleton
          width="200px"
          height="28px"
        />
      </HStack>
    )
  }

  return (
    <HStack
      justify="space-between"
      w="full"
    >
      <Text
        fontWeight="bold"
        fontSize="2xl"
      >
        {line}
      </Text>
      <Button
        onClick={handleClickLine}
        size="sm"
        px={4}
        py={2}
        _hover={{
          bg: "brand.50",
          color: "brand.900",
        }}
        _active={{
          bg: "brand.100",
        }}
        rounded="full"
        fontWeight="semibold"
        variant="plain"
        ml="auto"
      >
        Ver todas
        <IconChevronRight size={16} />
      </Button>
    </HStack>
  )
}