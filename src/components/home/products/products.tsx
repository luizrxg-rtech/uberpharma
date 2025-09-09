"use client"

import {VStack} from "@chakra-ui/react";
import Filter from "./filter";
import FilterModal from "./filter-modal";
import {useEffect, useState} from "react";
import {Category, Product} from "@/types/product/types";
import {ProductService} from "@/services/product-service";
import {useRouter} from "next/navigation";
import Rows from "./rows/rows";
import {LinesFilterOptions} from "@/types/misc/types";

export const CUSTOM_LINE = "Mais vendidos"
export const PRODUCTS_PER_ROW = 6;

export default function Products() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[] | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [filterOptions, setFilterOptions] = useState<LinesFilterOptions>({
    minPrice: 0,
    maxPrice: 1000,
    sortBy: 'name',
    categories: [],
    inStock: false
  });

  const lines = [CUSTOM_LINE, ...Array.from(new Set(products?.map(product => product.line)))];

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const fetchedProducts: Product[] = await ProductService.getAllProducts();

      setProducts(fetchedProducts);
    } catch (error) {
      setError('Erro ao carregar produtos. Tente novamente. ');
      console.error('Erro ao carregar produtos:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = (productList: Product[]): Product[] => {
    let filtered = [...productList];

    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (filterOptions.categories.length > 0) {
      filtered = filtered.filter(product =>
        filterOptions.categories.includes(product.category)
      );
    }

    filtered = filtered.filter(product =>
      product.price >= filterOptions.minPrice &&
      product.price <= filterOptions.maxPrice
    );

    if (filterOptions.inStock) {
      filtered = filtered.filter(product => product.stock > 0);
    }

    switch (filterOptions.sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case 'name':
      default:
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return filtered;
  };

  const handleFiltersChange = (newFilters: LinesFilterOptions) => {
    setFilterOptions(newFilters);
  };

  const handleClickLine = (line: string) => {
    router.push(`/search/line/${encodeURIComponent(line || "")}`);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (error) {
    return null
  }

  return (
    <VStack
      w="full"
      py={44}
      gap={10}
    >
      <Filter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <FilterModal onFiltersChange={handleFiltersChange} />
      <Rows
        lines={lines}
        products={products}
        loading={loading}
        filterOptions={filterOptions}
        applyFilters={applyFilters}
        handleClickLine={handleClickLine}
      />
    </VStack>
  )
}