import {Categories, Product, Measures} from "@/types";
import {VStack, Text} from "@chakra-ui/react";

const mockProducts: Product[] = [
  {
    id: "",
    name: "Product",
    description: "Description of Product",
    price: 20.0,
    weight: 20,
    measure: Measures.GRAM,
    image_url: "/mock1.png",
    category: Categories.BEM_ESTAR,
    stock: 20,
    created_at: "",
    updated_at: ""
  },
  {
    id: "",
    name: "Product",
    description: "Description of Product",
    price: 20.0,
    weight: 20,
    measure: Measures.GRAM,
    image_url: "/mock2.png",
    category: Categories.BEM_ESTAR,
    stock: 20,
    created_at: "",
    updated_at: ""
  },
  {
    id: "",
    name: "Product",
    description: "Description of Product",
    price: 20.0,
    weight: 20,
    measure: Measures.GRAM,
    image_url: "/mock1.png",
    category: Categories.COSMECEUTICOS,
    stock: 20,
    created_at: "",
    updated_at: ""
  },
  {
    id: "",
    name: "Product",
    description: "Description of Product",
    price: 20.0,
    weight: 20,
    measure: Measures.GRAM,
    image_url: "/mock3.png",
    category: Categories.COSMECEUTICOS,
    stock: 20,
    created_at: "",
    updated_at: ""
  },
  {
    id: "",
    name: "Product",
    description: "Description of Product",
    price: 20.0,
    weight: 20,
    measure: Measures.GRAM,
    image_url: "/mock1.png",
    category: Categories.DERMATOLOGICOS,
    stock: 20,
    created_at: "",
    updated_at: ""
  },
  {
    id: "",
    name: "Product",
    description: "Description of Product",
    price: 20.0,
    weight: 20,
    measure: Measures.GRAM,
    image_url: "/mock2.png",
    category: Categories.DERMATOLOGICOS,
    stock: 20,
    created_at: "",
    updated_at: ""
  },
  {
    id: "",
    name: "Product",
    description: "Description of Product",
    price: 20.0,
    weight: 20,
    measure: Measures.GRAM,
    image_url: "/mock3.png",
    category: Categories.ESPORTES,
    stock: 20,
    created_at: "",
    updated_at: ""
  },
  {
    id: "",
    name: "Product",
    description: "Description of Product",
    price: 20.0,
    weight: 20,
    measure: Measures.GRAM,
    image_url: "/mock1.png",
    category: Categories.ESPORTES,
    stock: 20,
    created_at: "",
    updated_at: ""
  },
  {
    id: "",
    name: "Product",
    description: "Description of Product",
    price: 20.0,
    weight: 20,
    measure: Measures.GRAM,
    image_url: "/mock2.png",
    category: Categories.HIGIENE_PESSOAL,
    stock: 20,
    created_at: "",
    updated_at: ""
  },
  {
    id: "",
    name: "Product",
    description: "Description of Product",
    price: 20.0,
    weight: 20,
    measure: Measures.GRAM,
    image_url: "/mock3.png",
    category: Categories.HIGIENE_PESSOAL,
    stock: 20,
    created_at: "",
    updated_at: ""
  },
  {
    id: "",
    name: "Product",
    description: "Description of Product",
    price: 20.0,
    weight: 20,
    measure: Measures.GRAM,
    image_url: "/mock3.png",
    category: Categories.SUPLEMENTOS,
    stock: 20,
    created_at: "",
    updated_at: ""
  },
  {
    id: "",
    name: "Product",
    description: "Description of Product",
    price: 20.0,
    weight: 20,
    measure: Measures.GRAM,
    image_url: "/mock3.png",
    category: Categories.SUPLEMENTOS,
    stock: 20,
    created_at: "",
    updated_at: ""
  },
]


export default function Products() {


  return (
    <VStack>
      <Text>Products</Text>
    </VStack>
  )
}