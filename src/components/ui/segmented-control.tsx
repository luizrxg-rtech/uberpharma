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
  label?: string
  required?: boolean
  helperText?: string
  error?: string
  errorText?: string
  value: string
  onChange: (value: string) => void
  options: SegmentOption[]
  disabled?: boolean
  className?: string
  labelClassName?: string
  controlClassName?: string
  helperTextClassName?: string
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  variant?: "solid" | "outline" | "ghost" | "subtle"
  colorScheme?: string
  orientation?: "horizontal" | "vertical"
}

export const SegmentedControl = ({
  id,
  label,
  required,
  helperText,
  error,
  errorText,
  value,
  onChange,
  options,
  disabled,
  className,
  labelClassName,
  controlClassName,
  helperTextClassName,
  size = "md",
  variant = "outline",
  colorScheme = "gray",
  orientation = "horizontal"
}: SegmentedControlProps) => {
  const isVertical = orientation === "vertical"

  return (
    <FieldRoot
      className={className}
      required={required}
    >
      {label && (
        <FieldLabel className={labelClassName}>
          {label} <FieldRequiredIndicator />
        </FieldLabel>
      )}

      <Box
        id={id}
        display="flex"
        flexDirection={isVertical ? "column" : "row"}
        border="1px solid"
        borderColor="border.default"
        borderRadius="md"
        overflow="hidden"
        w="fit-content"
        className={controlClassName}
      >
        {options.map((option, index) => {
          const isSelected = value === option.value
          const isFirst = index === 0
          const isLast = index === options.length - 1

          return (
            <Button
              key={option.value}
              size={size}
              variant={isSelected ? "solid" : "ghost"}
              colorScheme={isSelected ? colorScheme : "gray"}
              onClick={() => !disabled && !option.disabled && onChange(option.value)}
              disabled={disabled || option.disabled}
              borderRadius="none"
              borderRight={!isVertical && !isLast ? "1px solid" : "none"}
              borderBottom={isVertical && !isLast ? "1px solid" : "none"}
              borderColor="border.default"
              flex={1}
              justifyContent="center"
              minW="fit-content"
              _hover={{
                bg: isSelected ? undefined : "bg.muted"
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

      {helperText && (
        <FieldHelperText className={helperTextClassName}>
          {helperText}
        </FieldHelperText>
      )}

      {(error && errorText) && (
        <FieldErrorText className={helperTextClassName}>
          {errorText}
        </FieldErrorText>
      )}
    </FieldRoot>
  )
}
