import {ReactNode} from "react";
import {ScrollArea} from "@chakra-ui/react";

export default function Scroll({children}: ReactNode) {
  return (
    <ScrollArea.Root
      height="100vh"
      variant="always"
    >
      <ScrollArea.Viewport>
        <ScrollArea.Content>
          {children}
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar bg="transparent">
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner />
    </ScrollArea.Root>
  )
}