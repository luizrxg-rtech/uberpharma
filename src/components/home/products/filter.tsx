import {Category} from "@/types/product/types";
import {Button, HStack} from "@chakra-ui/react";
import {Categories} from "@/types/product/enums";
import {IconAdjustmentsHorizontal} from "@tabler/icons-react";

interface FilterProps {
  selectedCategory: Category | null,
  setSelectedCategory(value: Category | null): void,
}

export default function Filter({
  selectedCategory,
  setSelectedCategory
}: FilterProps) {

  const isSelected = (category: Category | null) => {
    return selectedCategory === category;
  }

  return (
    <HStack
      w="full"
    >
      <Button
        onClick={() => setSelectedCategory(null)}
        rounded="full"
        bg={isSelected(null) ? "" : "bg.muted"}
        color={isSelected(null) ? "" : "fg"}
        fontWeight="semibold"
        _hover={{
          bg: isSelected(null) ? "" : "bg.emphasized"
        }}
      >
        Ver todos
      </Button>
      {Object.values(Categories).map((category, index) => {
        return (
          <Button
            key={index}
            onClick={() => setSelectedCategory(category)}
            rounded="full"
            bg={isSelected(category) ? "" : "bg.muted"}
            color={isSelected(category) ? "" : "fg"}
            fontWeight="semibold"
            _hover={{
              bg: isSelected(category) ? "" : "bg.emphasized"
            }}
          >
            {category}
          </Button>
        )
      })}
      <Button
        onClick={() => {}}
        rounded="full"
        fontWeight="semibold"
        color="fg"
        borderColor="bg.muted"
        variant="outline"
        _hover={{
          bg: "bg.muted"
        }}
        ml="auto"
      >
        <IconAdjustmentsHorizontal size={16} />
        Filtro
      </Button>
    </HStack>
  )
}