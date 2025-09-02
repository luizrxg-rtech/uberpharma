import {Measures} from "./enums";

export type Measure = typeof Measures[keyof typeof Measures];

export interface Product {
  id: string
  name: string
  description: string
  price: number
  weight: number
  measure: Measure
  image_url?: string
  category: string
  stock: number
  created_at: string
  updated_at: string
}
