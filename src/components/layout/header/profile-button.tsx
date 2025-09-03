'use client';

import {Button, HStack, Menu, Text} from "@chakra-ui/react";
import {useAuth} from "@/contexts/auth-context";
import {useRouter} from "next/navigation";
import {IconLogout, IconUserCircle} from "@tabler/icons-react";

export const ProfileButton = () => {
  const { isAuthenticated, logout } = useAuth();
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
          >
            <IconUserCircle size={16} />
            Minha conta
          </Button>
        </HStack>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content bg="bg.muted" color="fg" borderRadius="full">
          <Menu.Item
            value="logout"
            onClick={handleLogout}
            borderRadius="full"
            className="cursor-pointer"
            px={4}
            py={2}
          >
            <IconLogout size={20} />
            <Text fontWeight="medium" color="fg">
              Sair
            </Text>
          </Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  );
};
