import {Product} from "@/types/product/types";

export interface CartItem {
  id: string
  product: Product
  quantity: number
}
