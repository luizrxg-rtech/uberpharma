"use client"

import {TextField} from "@/components/ui/text-field";
import {KeyboardEvent, useState} from "react";
import {IconSearch, IconShoppingCart, IconUser} from "@tabler/icons-react";
import {useRouter} from "next/navigation";
import Image from "next/image";
import {ProfileButton} from "@/components/layout/header/profile-button";
import {useCart} from "@/contexts/cart-context";
import {useAuth} from "@/contexts/auth-context";
import {useCartSidebar} from "@/contexts/cart-sidebar-context";
import {Badge, Box, Button, HStack, VStack} from "@chakra-ui/react";

export default function Header() {
  const router = useRouter();
  const { itemCount } = useCart();
  const { isAuthenticated, user } = useAuth();
  const { toggleSidebar } = useCartSidebar();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search/${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleLogoClick = () => {
    router.push('/');
  };

  return (
    <VStack
      as="header"
      align="center"
      justify="stretch"
      p={4}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border"
    >
      <HStack
        align="center"
        justify="space-between"
        className="w-full max-w-7xl"
      >
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
            onClick={() => router.push(isAuthenticated ? '/profile' : '/login')}
          >
            <IconUser />
          </Button>
          <ProfileButton/>
        </HStack>
      </HStack>
    </VStack>
  );
}
