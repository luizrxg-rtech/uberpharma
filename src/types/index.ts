export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
  quantity: number;
}

export interface CartItem extends Product {
  cartQuantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  isLoggedIn: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
