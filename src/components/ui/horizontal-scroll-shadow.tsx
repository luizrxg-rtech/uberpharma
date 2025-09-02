"use client"

import {ReactNode} from "react";
import {HStack, ScrollArea} from "@chakra-ui/react";

interface HorizontalScrollShadowProps {
  children: ReactNode
  height: string
  gap: number
}

export default function HorizontalScrollShadow({
  children,
  height,
  gap,
}: HorizontalScrollShadowProps) {

  return (
    <ScrollArea.Root height={height}>
      <ScrollArea.Viewport
        css={{
          "--scroll-shadow-size": "4rem",
          maskImage:
            "linear-gradient(90deg, #fff,#fff,transparent 0,#fff var(--scroll-shadow-size),#fff calc(100% - var(--scroll-shadow-size)),transparent)",
          "&[data-at-left]": {
            maskImage:
              "linear-gradient(90deg,#fff calc(100% - var(--scroll-shadow-size)),transparent)",
          },
          "&[data-at-right]": {
            maskImage:
              "linear-gradient(-90deg,#fff calc(100% - var(--scroll-shadow-size)),transparent)",
          },
        }}
      >
        <ScrollArea.Content spaceY="4">
          <HStack gap={gap} flexWrap="nowrap">
            {children}
          </HStack>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
    </ScrollArea.Root>
  )
}