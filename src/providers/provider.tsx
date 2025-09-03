"use client"

import { ChakraProvider } from "@chakra-ui/react"
import { system } from "@/theme"
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "./color-mode"

import {Toaster} from "@/components/ui/toaster"
import {LoadingProvider} from "@/contexts/loading-context"
import {RouteChangeHandler} from "@/components/ui/route-change-handler";
import { CartProvider } from "@/contexts/cart-context"
import { AuthProvider } from "@/contexts/auth-context"
import { CartSidebarProvider } from "@/contexts/cart-sidebar-context"
import { FilterModalProvider } from "@/contexts/filter-modal-context"

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider {...props}>
        <AuthProvider>
          <CartProvider>
            <CartSidebarProvider>
              <FilterModalProvider>
                <LoadingProvider>
                  {props.children}
                  <Toaster/>
                  <RouteChangeHandler />
                </LoadingProvider>
              </FilterModalProvider>
            </CartSidebarProvider>
          </CartProvider>
        </AuthProvider>
      </ColorModeProvider>
    </ChakraProvider>
  )
}
