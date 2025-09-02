import {VStack, Text, Link} from "@chakra-ui/react";
import { LinkWithName } from "@/types/misc/types";

interface LinkListProps {
  title: string,
  links: LinkWithName[]
}

export default function LinkList({
  title,
  links,
} : LinkListProps) {

  return (
    <VStack
      align="start"
      gap={10}
    >
      <Text
        color="fg"
        fontWeight="semibold"
        fontSize="md"
        mb={4}
      >
        {title}
      </Text>
      {links.map((link, index) => {
        return (
          <Link
            key={index}
            href={link.url}
            color="fg.muted"
          >
            {link.name}
          </Link>
        )
      })}
    </VStack>
  )
}