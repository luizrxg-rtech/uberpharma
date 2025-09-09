export interface ImageUploadResult {
  url: string
  path: string
}

export interface LinkWithName {
  name: string
  url: string
}

export interface LinesFilterOptions {
  minPrice: number;
  maxPrice: number;
  sortBy: "name" | "price-asc" | "price-desc" | "newest";
  categories: string[];
  inStock: boolean;
}