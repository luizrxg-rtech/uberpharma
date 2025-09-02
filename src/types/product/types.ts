import {Categories, Measures} from "./enums";

export type Measure = typeof Measures[keyof typeof Measures];
export type Category = typeof Categories[keyof typeof Categories];

export interface Product {
  id: string
  name: string
  description: string
  line: string
  price: number
  weight: number
  measure: Measure
  image_url?: string
  category: Category
  stock: number
  created_at: string
  updated_at: string
}
