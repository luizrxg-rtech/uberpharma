'use client';

import {Button, HStack, Menu, Text} from "@chakra-ui/react";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { IconUser, IconLogout, IconLogin } from "@tabler/icons-react";

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
      <Button variant="outline" onClick={handleLogin}>
        <IconLogin className="mr-2" size={16} />
        Entrar
      </Button>
    );
  }

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <HStack gap={2}>
          <IconUser size={16} />
          <Text fontSize="sm" color="muted.foreground">
            {user?.name || 'Usuário'}
          </Text>
        </HStack>
      </Menu.Trigger>
      <Menu.Content>
        <Menu.Item value="email">
          <Text fontSize="sm" color="muted.foreground">
            {user?.email}
          </Text>
        </Menu.Item>
        <Menu.Item value="logout" onClick={handleLogout}>
          <IconLogout className="mr-2" size={16} />
          Sair
        </Menu.Item>
      </Menu.Content>
    </Menu.Root>
  );
};
