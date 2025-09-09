"use client"

import {TextField} from "@/components/ui/text-field";
import {KeyboardEvent, useState} from "react";
import {IconSearch, IconShoppingBag} from "@tabler/icons-react";
import {useRouter} from "next/navigation";
import Image from "next/image";
import {ProfileButton} from "@/components/layout/header/profile-button";
import {useCart} from "@/contexts/cart-context";
import {useCartSidebar} from "@/contexts/cart-sidebar-context";
import {Badge, HStack, IconButton, VStack} from "@chakra-ui/react";
import CartButton from "@/components/layout/header/cart-button";

export default function Header() {
  const router = useRouter();
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
      p={42}
    >
      <HStack
        align="center"
        justify="space-between"
        className="w-full max-w-7xl"
      >
        <Image
          src="/logos/logo.png"
          alt="Logo"
          width={781}
          height={184}
          className="cursor-pointer h-10 w-auto"
          onClick={handleLogoClick}
          loading="lazy"
        />
        <TextField
          value={searchQuery}
          onChange={setSearchQuery}
          onKeyDown={handleKeyDown}
          placeholder="Buscar produtos"
          startElement={<IconSearch size={16}/>}
          className="max-w-md font-semibold"
        />
        <HStack gap={4}>
          <CartButton />
          <ProfileButton/>
        </HStack>
      </HStack>
    </VStack>
  );
}
