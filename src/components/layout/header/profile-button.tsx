'use client';

import { Button, Menu, Text } from "@chakra-ui/react";
import { useAuth } from "@/contexts/auth-context";
import { useNavigationLoading } from "@/hooks/use-navigation-loading";
import { IconUser, IconLogout, IconLogin } from "@tabler/icons-react";

export const ProfileButton = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { navigateWithLoading } = useNavigationLoading();

  const handleLogin = () => {
    navigateWithLoading('/login');
  };

  const handleLogout = () => {
    logout();
    navigateWithLoading('/');
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
        <Button variant="ghost">
          <IconUser className="mr-2" size={16} />
          {user?.name || 'Usuário'}
        </Button>
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
