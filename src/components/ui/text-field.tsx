import {Input, InputGroup} from "@chakra-ui/react"
import { FieldRoot, FieldLabel, FieldHelperText, FieldErrorText, FieldRequiredIndicator } from "@chakra-ui/react/field"
import { ReactNode, KeyboardEvent } from "react";
import { withMask } from "use-mask-input"

interface TextFieldProps {
  id?: string,
  label?: string,
  required?: boolean,
  helperText?: string,
  error?: string,
  errorText?: string,
  value: string,
  onChange: (value: string) => void,
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void,
  placeholder?: string,
  startElement?: ReactNode | string,
  endElement?: ReactNode | string,
  startAddon?: string,
  endAddon?: string,
  type?: string,
  mask?: string,
  disabled?: boolean,
  readOnly?: boolean,
  className?: string,
  labelClassName?: string,
  inputClassName?: string,
  helperTextClassName?: string,
  variant?: "outline" | "subtle" | "flushed" | undefined,
  size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | undefined,
}

export const TextField = ({
  id,
  label,
  required,
  helperText,
  error,
  errorText,
  value,
  onChange,
  onKeyDown,
  placeholder,
  startElement,
  endElement,
  startAddon,
  endAddon,
  type,
  mask,
  disabled,
  readOnly,
  className,
  labelClassName,
  inputClassName,
  helperTextClassName,
  variant,
  size
}: TextFieldProps) => {
  return (
    <FieldRoot
      className={className}
      required={required}
    >
      {label &&
        <FieldLabel className={labelClassName}>
          {label} <FieldRequiredIndicator />
        </FieldLabel>
      }
      <InputGroup
        startElement={startElement}
        endElement={endElement}
        startAddon={startAddon}
        endAddon={endAddon}
      >
        <Input
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          className={inputClassName}
          variant={variant}
          readOnly={readOnly}
          disabled={disabled}
          type={type}
          size={size}
          borderRadius="xl"
          {...(mask ? { ref: withMask(mask) } : {})}
        />
      </InputGroup>
      {helperText && <FieldHelperText className={helperTextClassName}>{helperText}</FieldHelperText>}
      {(error && errorText) && <FieldErrorText className={helperTextClassName}>{errorText}</FieldErrorText>}
    </FieldRoot>
  )
}