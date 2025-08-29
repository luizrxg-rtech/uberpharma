import { Box, Button } from "@chakra-ui/react"
import { FieldRoot, FieldLabel, FieldHelperText, FieldErrorText, FieldRequiredIndicator } from "@chakra-ui/react/field"
import { ReactNode } from "react"

export interface SegmentOption {
  label: string
  value: string
  disabled?: boolean
  icon?: ReactNode
}

interface SegmentedControlProps {
  id?: string
  value: string
  onChange: (value: string) => void
  options: SegmentOption[]
  disabled?: boolean
  className?: string
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  variant?: "solid" | "outline" | "ghost" | "subtle"
  colorScheme?: string
  orientation?: "horizontal" | "vertical"
}

export const SegmentedControl = ({
  id,
  value,
  onChange,
  options,
  disabled,
  className,
  size = "md",
  variant = "outline",
  colorScheme = "gray",
  orientation = "horizontal"
}: SegmentedControlProps) => {
  const isVertical = orientation === "vertical"

  return (
    <Box
      id={id}
      display="flex"
      flexDirection={isVertical ? "column" : "row"}
      borderRadius="md"
      overflow="hidden"
      background="gray.100"
      w="fit-content"
      className={className}
    >
      {options.map((option) => {
        const isSelected = value === option.value

        return (
          <Button
            key={option.value}
            size={size}
            variant={isSelected ? "solid" : "ghost"}
            colorScheme={isSelected ? colorScheme : "gray"}
            onClick={() => !disabled && !option.disabled && onChange(option.value)}
            disabled={disabled || option.disabled}
            borderRadius="none"
            flex={1}
            justifyContent="center"
            minW="fit-content"
            _hover={{
              bg: isSelected ? undefined : "brand.50"
            }}
            _active={{
              bg: isSelected ? undefined : "bg.emphasized"
            }}
          >
            {option.icon && (
              <Box mr={option.label ? 2 : 0}>
                {option.icon}
              </Box>
            )}
            {option.label}
          </Button>
        )
      })}
    </Box>
  )
}
