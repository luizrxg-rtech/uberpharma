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
        variant={isSelected(null) ? "solid" : "subtle"}
        fontWeight="semibold"
      >
        Ver todos
      </Button>
      {Object.values(Categories).map((category, index) => {
        return (
          <Button
            key={index}
            onClick={() => setSelectedCategory(category)}
            variant={isSelected(category) ? "solid" : "subtle"}
            fontWeight="semibold"
          >
            {category}
          </Button>
        )
      })}
      <Button
        onClick={() => {}}
        fontWeight="semibold"
        variant="outline"
        ml="auto"
      >
        <IconAdjustmentsHorizontal size={16} />
        Filtro
      </Button>
    </HStack>
  )
}