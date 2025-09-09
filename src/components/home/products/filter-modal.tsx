'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  HStack,
  IconButton,
  Text,
  VStack,
  createListCollection,
} from '@chakra-ui/react';
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from '@chakra-ui/react/dialog';
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '@chakra-ui/react/select';
import {
  SliderRoot,
  SliderTrack,
  SliderRange,
  SliderThumb,
} from '@chakra-ui/react/slider';
import {
  CheckboxRoot,
  CheckboxIndicator,
  CheckboxLabel
} from '@chakra-ui/react/checkbox';
import { IconAdjustmentsHorizontal, IconX, IconCheck } from '@tabler/icons-react';
import { useFilterModal } from '@/contexts/filter-modal-context';
import { Categories } from '@/types/product/enums';
import { Category } from '@/types/product/types';
import { LinesFilterOptions } from '@/types/misc/types';

interface FilterModalProps {
  onFiltersChange: (filters: LinesFilterOptions) => void;
}

const sortOptions = createListCollection({
  items: [
    { label: 'Nome A-Z', value: 'name' },
    { label: 'Menor preço', value: 'price-asc' },
    { label: 'Maior preço', value: 'price-desc' },
    { label: 'Mais recentes', value: 'newest' },
  ],
});

export default function FilterModal({ onFiltersChange }: FilterModalProps) {
  const { isOpen, closeModal } = useFilterModal();

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState<LinesFilterOptions['sortBy']>('name');
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [inStock, setInStock] = useState(false);

  const handleCategoryToggle = (category: Category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleApplyFilters = () => {
    const filters: LinesFilterOptions = {
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      sortBy,
      categories: selectedCategories,
      inStock
    };
    onFiltersChange(filters);
    closeModal();
  };

  const handleClearFilters = () => {
    setPriceRange([0, 1000]);
    setSortBy('name');
    setSelectedCategories([]);
    setInStock(false);

    const filters: LinesFilterOptions = {
      minPrice: 0,
      maxPrice: 1000,
      sortBy: 'name',
      categories: [],
      inStock: false
    };
    onFiltersChange(filters);
  };

  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };

  return (
    <DialogRoot
      open={isOpen}
      onOpenChange={({ open }) => !open && closeModal()}
      placement="center"
    >
      <DialogContent
        maxW={{ base: "90vw", sm: "400px", md: "500px" }}
        maxH="85vh"
        bg="white"
        borderRadius="lg"
        boxShadow="2xl"
        _dark={{ bg: "gray.800" }}
        m={4}
      >
        <DialogHeader pb={4}>
          <DialogTitle>
            <HStack gap={3}>
              <IconAdjustmentsHorizontal size={20} />
              <Text fontSize="lg" fontWeight="semibold">Filtros</Text>
            </HStack>
          </DialogTitle>
          <DialogCloseTrigger asChild>
            <IconButton
              variant="ghost"
              size="sm"
              position="absolute"
              top={3}
              right={3}
              aria-label="Fechar filtros"
            >
              <IconX size={20} />
            </IconButton>
          </DialogCloseTrigger>
        </DialogHeader>

        <DialogBody py={0} flex="1" overflow="hidden">
          <VStack
            gap={6}
            align="stretch"
            h="full"
            overflowY="auto"
            pr={2}
            css={{
              '&::-webkit-scrollbar': {
                width: '6px',
              },
              '&::-webkit-scrollbar-track': {
                background: 'transparent',
              },
              '&::-webkit-scrollbar-thumb': {
                background: 'var(--chakra-colors-gray-300)',
                borderRadius: '3px',
              },
            }}
          >
            <Box>
              <Text fontWeight="semibold" mb={3} fontSize="sm" color="gray.700">
                Ordenar por
              </Text>
              <SelectRoot
                collection={sortOptions}
                value={[sortBy]}
                onValueChange={(e) => setSortBy(e.value[0] as LinesFilterOptions['sortBy'])}
              >
                <SelectTrigger>
                  <SelectValueText placeholder="Selecione a ordenação" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.items.map((option) => (
                    <SelectItem item={option} key={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
            </Box>

            <Box h="1px" bg="gray.200" />

            <Box>
              <Text fontWeight="semibold" mb={3} fontSize="sm" color="gray.700">
                Faixa de preço
              </Text>
              <HStack justify="space-between" mb={4}>
                <Text fontSize="sm" color="gray.600" fontWeight="medium">
                  R$ {priceRange[0]}
                </Text>
                <Text fontSize="sm" color="gray.600" fontWeight="medium">
                  R$ {priceRange[1]}
                </Text>
              </HStack>
              <Box px={2}>
                <SliderRoot
                  min={0}
                  max={1000}
                  step={10}
                  value={priceRange}
                  onValueChange={(e) => handlePriceRangeChange(e.value)}
                >
                  <SliderTrack>
                    <SliderRange />
                  </SliderTrack>
                  <SliderThumb index={0} />
                  <SliderThumb index={1} />
                </SliderRoot>
              </Box>
            </Box>

            <Box h="1px" bg="gray.200" />

            <Box>
              <Text fontWeight="semibold" mb={3} fontSize="sm" color="gray.700">
                Categorias
              </Text>
              <VStack gap={3} align="stretch">
                {Object.values(Categories).map((category) => (
                  <CheckboxRoot
                    key={category}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => handleCategoryToggle(category)}
                    size="md"
                  >
                    <CheckboxIndicator>
                      <IconCheck size={14} />
                    </CheckboxIndicator>
                    <CheckboxLabel fontSize="sm" color="gray.700">
                      {category}
                    </CheckboxLabel>
                  </CheckboxRoot>
                ))}
              </VStack>
            </Box>

            <Box h="1px" bg="gray.200" />

            <Box pb={4}>
              <Text fontWeight="semibold" mb={3} fontSize="sm" color="gray.700">
                Disponibilidade
              </Text>
              <CheckboxRoot
                checked={inStock}
                onCheckedChange={() => setInStock(!inStock)}
                size="md"
              >
                <CheckboxIndicator>
                  <IconCheck size={14} />
                </CheckboxIndicator>
                <CheckboxLabel fontSize="sm" color="gray.700">
                  Apenas produtos em estoque
                </CheckboxLabel>
              </CheckboxRoot>
            </Box>
          </VStack>
        </DialogBody>

        <DialogFooter pt={4} pb={4}>
          <VStack gap={3} w="full">
            <Button
              colorScheme="blue"
              size="lg"
              w="full"
              onClick={handleApplyFilters}
              fontSize="md"
              fontWeight="semibold"
            >
              Aplicar Filtros
            </Button>
            <Button
              variant="ghost"
              size="md"
              w="full"
              onClick={handleClearFilters}
              fontSize="sm"
            >
              Limpar Filtros
            </Button>
          </VStack>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}
