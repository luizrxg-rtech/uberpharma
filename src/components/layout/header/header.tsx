"use client"

import {TextField} from "@/components/ui/text-field";
import {useState} from "react";
import {IconSearch, IconShoppingCart, IconUser} from "@tabler/icons-react";
import { useNavigationLoading } from "@/hooks/use-navigation-loading";
import {KeyboardEvent} from "react";
import Image from "next/image";
import {ProfileButton} from "@/components/layout/header/profile-button";
import { useCart } from "@/contexts/cart-context";
import { useAuth } from "@/contexts/auth-context";
import { useCartSidebar } from "@/contexts/cart-sidebar-context";
import { Badge, Button, HStack } from "@chakra-ui/react";
import { CartSidebar } from "@/components/layout/cart/cart-sidebar";

export default function Header() {
  const { navigateWithLoading } = useNavigationLoading();
  const { itemCount } = useCart();
  const { isAuthenticated, user } = useAuth();
  const { isOpen, toggleSidebar, closeSidebar } = useCartSidebar();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigateWithLoading(`/search/${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleLogoClick = () => {
    navigateWithLoading('/');
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background p-4 border-b border-border">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <Image
            src="/logo.png"
            alt="Logo"
            width={100}
            height={100}
            className="cursor-pointer"
            onClick={handleLogoClick}
          />
          <TextField
            value={searchQuery}
            onChange={setSearchQuery}
            onKeyDown={handleKeyDown}
            placeholder="Pesquisar produtos"
            startElement={<IconSearch/>}
            className="max-w-md"
          />
          <HStack gap={4}>
            <Button
              variant="ghost"
              onClick={toggleSidebar}
              position="relative"
            >
              <IconShoppingCart />
              {itemCount > 0 && (
                <Badge
                  position="absolute"
                  top="-1"
                  right="-1"
                  colorScheme="primary"
                  borderRadius="full"
                  minW="20px"
                  h="20px"
                >
                  {itemCount}
                </Badge>
              )}
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigateWithLoading(isAuthenticated ? '/profile' : '/login')}
            >
              <IconUser />
            </Button>
            <ProfileButton/>
          </HStack>
        </div>
      </header>

      <CartSidebar isOpen={isOpen} onClose={closeSidebar} />
    </>
  );
}
