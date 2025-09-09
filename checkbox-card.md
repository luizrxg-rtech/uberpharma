# components > Checkbox Card

URL: docs/components/checkbox-card
Source: https://raw.githubusercontent.com/chakra-ui/chakra-ui/refs/heads/main/apps/www/content/docs/components/checkbox-card.mdx

Used to select or deselect options displayed within cards.

  ***

title: Checkbox Card
description: Used to select or deselect options displayed within cards.
links:
- source: https://github.com/chakra-ui/chakra-ui/tree/main/packages/react/src/components/checkbox-card
- storybook: https://storybook.chakra-ui.com/?path=/story/components-checkbox-card--basic
- recipe: https://github.com/chakra-ui/chakra-ui/tree/main/packages/react/src/theme/recipes/checkbox-card.ts
- ark: https://ark-ui.com/docs/components/checkbox
  ------------------------------------------------------------------------------------------------

  ```tsx
import { CheckboxCard } from "@chakra-ui/react"

export const CheckboxCardBasic = () => {
  return (
    <CheckboxCard.Root maxW="240px">
      <CheckboxCard.HiddenInput />
      <CheckboxCard.Control>
        <CheckboxCard.Label>Next.js</CheckboxCard.Label>
        <CheckboxCard.Indicator />
      </CheckboxCard.Control>
    </CheckboxCard.Root>
  )
}

```

## Usage

```tsx
import { CheckboxCard } from "@chakra-ui/react"
```

```tsx
<CheckboxCard.Root>
  <CheckboxCard.HiddenInput />
  <CheckboxCard.Control>
    <CheckboxCard.Content>
      <CheckboxCard.Label />
      <CheckboxCard.Description />
    </CheckboxCard.Content>
    <CheckboxCard.Indicator />
  </CheckboxCard.Control>
</CheckboxCard.Root>
```

:::info

If you prefer a closed component composition, check out the
[snippet below](#closed-component).

:::

## Examples

### Description

Use the `CheckboxCard.Description` component to add a description to the
checkbox card.

```tsx
import { CheckboxCard } from "@chakra-ui/react"

export const CheckboxCardWithDescription = () => {
  return (
    <CheckboxCard.Root maxW="240px">
      <CheckboxCard.HiddenInput />
      <CheckboxCard.Control>
        <CheckboxCard.Content>
          <CheckboxCard.Label>Next.js</CheckboxCard.Label>
          <CheckboxCard.Description>Best for apps</CheckboxCard.Description>
        </CheckboxCard.Content>
        <CheckboxCard.Indicator />
      </CheckboxCard.Control>
    </CheckboxCard.Root>
  )
}

```

### Group

Use the `CheckboxGroup` component to group multiple checkbox cards.

```tsx
import { CheckboxCard, CheckboxGroup, Flex, Text } from "@chakra-ui/react"

export const CheckboxCardWithGroup = () => {
  return (
    <CheckboxGroup defaultValue={["next"]}>
      <Text textStyle="sm" fontWeight="medium">
        Select framework(s)
      </Text>
      <Flex gap="2">
        {items.map((item) => (
          <CheckboxCard.Root key={item.value} value={item.value}>
            <CheckboxCard.HiddenInput />
            <CheckboxCard.Control>
              <CheckboxCard.Content>
                <CheckboxCard.Label>{item.title}</CheckboxCard.Label>
                <CheckboxCard.Description>
                  {item.description}
                </CheckboxCard.Description>
              </CheckboxCard.Content>
              <CheckboxCard.Indicator />
            </CheckboxCard.Control>
          </CheckboxCard.Root>
        ))}
      </Flex>
    </CheckboxGroup>
  )
}

const items = [
  { value: "next", title: "Next.js", description: "Best for apps" },
  { value: "vite", title: "Vite", description: "Best for SPAs" },
  { value: "astro", title: "Astro", description: "Best for static sites" },
]

```

### Sizes

Pass the `size` prop to the `CheckboxCard.Root` component to change the size of
the checkbox card.

```tsx
import { CheckboxCard, For, Stack } from "@chakra-ui/react"

export const CheckboxCardWithSizes = () => {
  return (
    <Stack maxW="320px">
      <For each={["sm", "md", "lg"]}>
        {(size) => (
          <CheckboxCard.Root size={size} key={size}>
            <CheckboxCard.HiddenInput />
            <CheckboxCard.Control>
              <CheckboxCard.Content>
                <CheckboxCard.Label>Checkbox {size}</CheckboxCard.Label>
              </CheckboxCard.Content>
              <CheckboxCard.Indicator />
            </CheckboxCard.Control>
          </CheckboxCard.Root>
        )}
      </For>
    </Stack>
  )
}

```

### Variants

Use the `variant` prop to Pass the `variant` prop to the `CheckboxCard.Root`
component to change the variant of the checkbox card.

```tsx
import { CheckboxCard, For, Stack } from "@chakra-ui/react"

export const CheckboxCardWithVariants = () => {
  return (
    <Stack maxW="320px">
      <For each={["subtle", "surface", "outline"]}>
        {(variant) => (
          <CheckboxCard.Root
            defaultChecked
            key={variant}
            variant={variant}
            colorPalette="teal"
          >
            <CheckboxCard.HiddenInput />
            <CheckboxCard.Control>
              <CheckboxCard.Label>Checkbox {variant}</CheckboxCard.Label>
              <CheckboxCard.Indicator />
            </CheckboxCard.Control>
          </CheckboxCard.Root>
        )}
      </For>
    </Stack>
  )
}

```

### Disabled

Pass the `disabled` prop to the `CheckboxCard.Root` component to make the
checkbox card disabled.

```tsx
import { CheckboxCard } from "@chakra-ui/react"

export const CheckboxCardDisabled = () => {
  return (
    <CheckboxCard.Root disabled maxW="320px">
      <CheckboxCard.HiddenInput />
      <CheckboxCard.Control>
        <CheckboxCard.Content>
          <CheckboxCard.Label>Disabled</CheckboxCard.Label>
          <CheckboxCard.Description>
            This is a disabled checkbox
          </CheckboxCard.Description>
        </CheckboxCard.Content>
        <CheckboxCard.Indicator />
      </CheckboxCard.Control>
    </CheckboxCard.Root>
  )
}

```

### Addon

Render additional content within the `CheckboxCard.Addon` component to add some
more context to the checkbox card.

```tsx
import { Badge, CheckboxCard, HStack } from "@chakra-ui/react"

export const CheckboxCardWithAddon = () => {
  return (
    <CheckboxCard.Root maxW="300px">
      <CheckboxCard.HiddenInput />
      <CheckboxCard.Control>
        <CheckboxCard.Content>
          <CheckboxCard.Label>With Addon</CheckboxCard.Label>
          <CheckboxCard.Description>Some description</CheckboxCard.Description>
        </CheckboxCard.Content>
        <CheckboxCard.Indicator />
      </CheckboxCard.Control>
      <CheckboxCard.Addon>
        <HStack>
          Some supporting text
          <Badge variant="solid">New</Badge>
        </HStack>
      </CheckboxCard.Addon>
    </CheckboxCard.Root>
  )
}

```

### No Indicator

Here's an example of how to use the checkbox card without an indicator.

```tsx
import { CheckboxCard, HStack } from "@chakra-ui/react"

export const CheckboxCardNoIndicator = () => {
  return (
    <HStack>
      <CheckboxCard.Root>
        <CheckboxCard.HiddenInput />
        <CheckboxCard.Control>
          <CheckboxCard.Label>Chakra UI</CheckboxCard.Label>
        </CheckboxCard.Control>
      </CheckboxCard.Root>

      <CheckboxCard.Root>
        <CheckboxCard.HiddenInput />
        <CheckboxCard.Control>
          <CheckboxCard.Label>Next.js</CheckboxCard.Label>
        </CheckboxCard.Control>
      </CheckboxCard.Root>
    </HStack>
  )
}

```

### Icon

Here's an example of how to render custom icons within the checkbox card.

```tsx
import {
  CheckboxCard,
  CheckboxGroup,
  Float,
  Icon,
  SimpleGrid,
} from "@chakra-ui/react"
import { HiGlobeAlt, HiLockClosed, HiShieldCheck, HiUser } from "react-icons/hi"

export const CheckboxCardWithIcon = () => {
  return (
    <CheckboxGroup defaultValue={["Guest"]}>
      <SimpleGrid minChildWidth="200px" gap="2">
        {items.map((item) => (
          <CheckboxCard.Root align="center" key={item.label}>
            <CheckboxCard.HiddenInput />
            <CheckboxCard.Control>
              <CheckboxCard.Content>
                <Icon fontSize="2xl" mb="2">
                  {item.icon}
                </Icon>
                <CheckboxCard.Label>{item.label}</CheckboxCard.Label>
                <CheckboxCard.Description>
                  {item.description}
                </CheckboxCard.Description>
              </CheckboxCard.Content>
              <Float placement="top-end" offset="6">
                <CheckboxCard.Indicator />
              </Float>
            </CheckboxCard.Control>
          </CheckboxCard.Root>
        ))}
      </SimpleGrid>
    </CheckboxGroup>
  )
}

const items = [
  { icon: <HiShieldCheck />, label: "Admin", description: "Give full access" },
  { icon: <HiUser />, label: "User", description: "Give limited access" },
  {
    icon: <HiGlobeAlt />,
    label: "Guest",
    description: "Give read-only access",
  },
  { icon: <HiLockClosed />, label: "Blocked", description: "No access" },
]

```

### Closed Component

Here's how to setup the Checkbox card for a closed component composition.

<ExampleCode name="checkbox-card-closed-component" />

If you want to automatically add the closed component to your project, run the
command:

```bash
npx @chakra-ui/cli snippet add checkbox-card
```

Here's how to use the it

```tsx
<CheckboxCard label="Checkbox Card" />
```

## Props

### Root

| Prop | Default | Type | Description |
| --- | --- | --- | --- |
| value | "on" | `string` | The value of checkbox input. Useful for form submission. |
| colorPalette | gray | `'gray' \| 'red' \| 'orange' \| 'yellow' \| 'green' \| 'teal' \| 'blue' \| 'cyan' \| 'purple' \| 'pink'` | The color palette of the component |
| size | md | `'sm' \| 'md' \| 'lg'` | The size of the component |
| variant | outline | `'surface' \| 'subtle' \| 'outline' \| 'solid'` | The variant of the component |
| align | start | `'start' \| 'end' \| 'center'` | The align of the component |
| orientation | horizontal | `'vertical' \| 'horizontal'` | The orientation of the component |
| as | undefined | `React.ElementType` | The underlying element to render. |
| asChild | undefined | `boolean` | Use the provided child element as the default rendered element, combining their props and behavior. |
| unstyled | undefined | `boolean` | Whether to remove the component's style. |
| checked | undefined | `CheckedState` | The controlled checked state of the checkbox |
| defaultChecked | undefined | `CheckedState` | The initial checked state of the checkbox when rendered.
Use when you don't need to control the checked state of the checkbox. |
| disabled | undefined | `boolean` | Whether the checkbox is disabled |
| form | undefined | `string` | The id of the form that the checkbox belongs to. |
| id | undefined | `string` | The unique identifier of the machine. |
| ids | undefined | `Partial<{ root: string; hiddenInput: string; control: string; label: string }>` | The ids of the elements in the checkbox. Useful for composition. |
| invalid | undefined | `boolean` | Whether the checkbox is invalid |
| name | undefined | `string` | The name of the input field in a checkbox.
Useful for form submission. |
| onCheckedChange | undefined | `(details: CheckedChangeDetails) => void` | The callback invoked when the checked state changes. |
| readOnly | undefined | `boolean` | Whether the checkbox is read-only |
| required | undefined | `boolean` | Whether the checkbox is required |
| justify | undefined | `'start' \| 'end' \| 'center'` | The justify of the component |
