import {HStack, Text} from "@chakra-ui/react";
import {IconWorld} from "@tabler/icons-react";

export default function Baseline() {
  return (
    <HStack
      justify="center"
      className="border-t"
      w="100%"
    >
      <HStack
        justify="space-between"
        maxW="7xl"
        w="100%"
        py={4}
      >
        <HStack
          color="fg"
          fontSize="md"
          fontWeight="bold"
        >
          <IconWorld size={24} />
          <Text>
            Português - Brasil
          </Text>
        </HStack>
        <Text>
          Todos os direitos reservados © 2025 - UberPharma.
        </Text>
      </HStack>
    </HStack>
  )
}