'use client';

import { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product, CartItem } from '@/types';

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' };

interface CartContextType extends CartState {
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);

      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, cartQuantity: item.cartQuantity + 1 }
            : item
        );

        return {
          items: updatedItems,
          total: updatedItems.reduce((sum, item) => sum + (item.price * item.cartQuantity), 0),
          itemCount: updatedItems.reduce((sum, item) => sum + item.cartQuantity, 0)
        };
      }

      const newItems = [...state.items, { ...action.payload, cartQuantity: 1 }];
      return {
        items: newItems,
        total: newItems.reduce((sum, item) => sum + (item.price * item.cartQuantity), 0),
        itemCount: newItems.reduce((sum, item) => sum + item.cartQuantity, 0)
      };
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      return {
        items: newItems,
        total: newItems.reduce((sum, item) => sum + (item.price * item.cartQuantity), 0),
        itemCount: newItems.reduce((sum, item) => sum + item.cartQuantity, 0)
      };
    }

    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: action.payload.id });
      }

      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, cartQuantity: action.payload.quantity }
          : item
      );

      return {
        items: updatedItems,
        total: updatedItems.reduce((sum, item) => sum + (item.price * item.cartQuantity), 0),
        itemCount: updatedItems.reduce((sum, item) => sum + item.cartQuantity, 0)
      };
    }

    case 'CLEAR_CART':
      return {
        items: [],
        total: 0,
        itemCount: 0
      };

    default:
      return state;
  }
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    itemCount: 0
  });

  const addItem = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider value={{
      ...state,
      addItem,
      removeItem,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
