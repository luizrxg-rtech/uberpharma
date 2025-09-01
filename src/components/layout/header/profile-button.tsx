'use client';

import {Button, HStack, Menu, Text} from "@chakra-ui/react";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import {IconUser, IconLogout, IconLogin, IconUserCircle} from "@tabler/icons-react";

export const ProfileButton = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!isAuthenticated) {
    return (
      <Button
        variant="subtle"
        onClick={handleLogin}
        bg="bg.muted"
        color="fg"
        borderRadius="full"
        _hover={{
          bg: "bg.emphasized"
        }}
      >
        <IconUserCircle size={16} />
        Entrar
      </Button>
    );
  }

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <HStack gap={2}>
          <Button
            variant="subtle"
            bg="bg.muted"
            color="fg"
            borderRadius="full"
            _hover={{
              bg: "bg.emphasized"
            }}
          >
            <IconUserCircle size={16} />
            Minha conta
          </Button>
        </HStack>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.Item value="logout" onClick={handleLogout}>
            <IconLogout className="mr-2" size={16} />
            Sair
          </Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  );
};
