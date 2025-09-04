import {Button, HStack, Skeleton, Text} from "@chakra-ui/react";
import {IconChevronRight} from "@tabler/icons-react";

interface RowHeaderProps {
  line: string
  loading: boolean,
}

export default function RowHeader({
  line,
  loading
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
      {/*<Button*/}
      {/*  onClick={() => {}}*/}
      {/*  rounded="full"*/}
      {/*  fontWeight="semibold"*/}
      {/*  variant="plain"*/}
      {/*  ml="auto"*/}
      {/*>*/}
      {/*  Ver todas*/}
      {/*  <IconChevronRight size={16} />*/}
      {/*</Button>*/}
    </HStack>
  )
}