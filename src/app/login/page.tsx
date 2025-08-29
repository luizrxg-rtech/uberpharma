'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import {
  Container,
  VStack,
  HStack,
  Text,
  Input,
  Button,
  Box,
  Tabs
} from '@chakra-ui/react';
import { IconArrowLeft } from '@tabler/icons-react';

export default function LoginPage() {
  const { login, register, isAuthenticated } = useAuth();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState('');

  const handleBackClick = () => {
    router.push('/');
  };

  const validateLoginForm = () => {
    const newErrors: string[] = [];

    if (!loginData.email) {
      newErrors.push('E-mail é obrigatório');
    } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      newErrors.push('E-mail inválido');
    }

    if (!loginData.password) {
      newErrors.push('Senha é obrigatória');
    } else if (loginData.password.length < 6) {
      newErrors.push('Senha deve ter pelo menos 6 caracteres');
    }

    return newErrors;
  };

  const validateRegisterForm = () => {
    const newErrors: string[] = [];

    if (!registerData.name) {
      newErrors.push('Nome é obrigatório');
    }

    if (!registerData.email) {
      newErrors.push('E-mail é obrigatório');
    } else if (!/\S+@\S+\.\S+/.test(registerData.email)) {
      newErrors.push('E-mail inválido');
    }

    if (!registerData.password) {
      newErrors.push('Senha é obrigatória');
    } else if (registerData.password.length < 6) {
      newErrors.push('Senha deve ter pelo menos 6 caracteres');
    }

    if (registerData.password !== registerData.confirmPassword) {
      newErrors.push('Senhas não coincidem');
    }

    return newErrors;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const formErrors = validateLoginForm();
    if (formErrors.length > 0) {
      setErrors(formErrors);
      return;
    }

    setLoading(true);
    setErrors([]);

    try {
      const success = await login(loginData.email, loginData.password);

      if (success) {
        setSuccess('Login realizado com sucesso!');
        setTimeout(() => {
          router.push('/');
        }, 1000);
      } else {
        setErrors(['E-mail ou senha inválidos']);
      }
    } catch (error) {
      setErrors(['Erro ao fazer login. Tente novamente.']);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const formErrors = validateRegisterForm();
    if (formErrors.length > 0) {
      setErrors(formErrors);
      return;
    }

    setLoading(true);
    setErrors([]);

    try {
      const success = await register(registerData.name, registerData.email, registerData.password);

      if (success) {
        setSuccess('Conta criada com sucesso!');
        setTimeout(() => {
          router.push('/');
        }, 1000);
      } else {
        setErrors(['E-mail já está em uso']);
      }
    } catch (error) {
      setErrors(['Erro ao criar conta. Tente novamente.']);
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    return (
      <Container maxW="md" py={8}>
        <VStack gap={6}>
          <Text fontSize="2xl" fontWeight="bold">
            Você já está logado
          </Text>
          <Button onClick={handleBackClick}>
            <IconArrowLeft className="mr-2" size={16} />
            Voltar à página inicial
          </Button>
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="md" py={8}>
      <VStack gap={8} align="stretch">
        <HStack justify="space-between" align="center">
          <Text fontSize="3xl" fontWeight="bold">
            Acesso à Conta
          </Text>
          <Button variant="ghost" onClick={handleBackClick}>
            <IconArrowLeft className="mr-2" size={16} />
            Voltar
          </Button>
        </HStack>

        <Box bg="card" p={6} borderRadius="lg" className="border" >
          <Tabs.Root value={activeTab} onValueChange={(details) => setActiveTab(details.value as 'login' | 'register')}>
            <Tabs.List>
              <Tabs.Trigger value="login">Entrar</Tabs.Trigger>
              <Tabs.Trigger value="register">Cadastrar</Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="login">
              <form onSubmit={handleLogin}>
                <VStack gap={4} align="stretch" mt={4}>
                  <Text textAlign="center" color="muted.foreground">
                    Entre com sua conta existente
                  </Text>

                  {errors.length > 0 && (
                    <Box bg="red.50" className="border" borderColor="red.200" p={3} borderRadius="md">
                      <VStack align="start" gap={1}>
                        {errors.map((error, index) => (
                          <Text key={index} fontSize="sm" color="red.600">{error}</Text>
                        ))}
                      </VStack>
                    </Box>
                  )}

                  {success && (
                    <Box bg="green.50" className="border" borderColor="green.200" p={3} borderRadius="md">
                      <Text color="green.600">{success}</Text>
                    </Box>
                  )}

                  <VStack gap={2} align="stretch">
                    <Text fontSize="sm" fontWeight="medium">E-mail</Text>
                    <Input
                      type="email"
                      placeholder="seu@email.com"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    />
                  </VStack>

                  <VStack gap={2} align="stretch">
                    <Text fontSize="sm" fontWeight="medium">Senha</Text>
                    <Input
                      type="password"
                      placeholder="Sua senha"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    />
                  </VStack>

                  <Button
                    type="submit"
                    colorScheme="primary"
                    size="lg"
                    loading={loading}
                  >
                    {loading ? 'Entrando...' : 'Entrar'}
                  </Button>
                </VStack>
              </form>
            </Tabs.Content>

            <Tabs.Content value="register">
              <form onSubmit={handleRegister}>
                <VStack gap={4} align="stretch" mt={4}>
                  <Text textAlign="center" color="muted.foreground">
                    Crie sua nova conta
                  </Text>

                  {errors.length > 0 && (
                    <Box bg="red.50" className="border" borderColor="red.200" p={3} borderRadius="md">
                      <VStack align="start" gap={1}>
                        {errors.map((error, index) => (
                          <Text key={index} fontSize="sm" color="red.600">{error}</Text>
                        ))}
                      </VStack>
                    </Box>
                  )}

                  {success && (
                    <Box bg="green.50" className="border" borderColor="green.200" p={3} borderRadius="md">
                      <Text color="green.600">{success}</Text>
                    </Box>
                  )}

                  <VStack gap={2} align="stretch">
                    <Text fontSize="sm" fontWeight="medium">Nome completo</Text>
                    <Input
                      type="text"
                      placeholder="Seu nome"
                      value={registerData.name}
                      onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                    />
                  </VStack>

                  <VStack gap={2} align="stretch">
                    <Text fontSize="sm" fontWeight="medium">E-mail</Text>
                    <Input
                      type="email"
                      placeholder="seu@email.com"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                    />
                  </VStack>

                  <VStack gap={2} align="stretch">
                    <Text fontSize="sm" fontWeight="medium">Senha</Text>
                    <Input
                      type="password"
                      placeholder="Mínimo 6 caracteres"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                    />
                  </VStack>

                  <VStack gap={2} align="stretch">
                    <Text fontSize="sm" fontWeight="medium">Confirmar senha</Text>
                    <Input
                      type="password"
                      placeholder="Digite a senha novamente"
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                    />
                  </VStack>

                  <Button
                    type="submit"
                    colorScheme="primary"
                    size="lg"
                    loading={loading}
                  >
                    {loading ? 'Criando conta...' : 'Criar Conta'}
                  </Button>
                </VStack>
              </form>
            </Tabs.Content>
          </Tabs.Root>
        </Box>

        <Text fontSize="sm" color="muted.foreground" textAlign="center">
          O login não é obrigatório, mas permite salvar suas preferências e acompanhar pedidos
        </Text>
      </VStack>
    </Container>
  );
}
