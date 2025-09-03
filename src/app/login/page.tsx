'use client';

import {FormEvent, useState} from 'react';
import {useAuth} from '@/contexts/auth-context';
import {useRouter} from 'next/navigation';
import {Box, Button, Container, HStack, Link, Text, VStack} from '@chakra-ui/react';
import {IconArrowLeft, IconAt, IconLock} from '@tabler/icons-react';
import {TextField} from '@/components/ui/text-field';

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState('');

  const handleBackClick = () => {
    router.back();
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

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    const formErrors = validateLoginForm();
    if (formErrors.length > 0) {
      setErrors(formErrors);
      return;
    }

    setLoading(true);
    setErrors([]);
    setSuccess('');

    try {
      const result = await login(loginData.email, loginData.password);

      if (result.success) {
        setSuccess('Login realizado com sucesso!');

        setTimeout(() => {
          router.push('/');
        }, 1000);
      } else {
        setErrors([result.error || 'E-mail ou senha inválidos']);
      }
    } catch {
      setErrors(['Erro ao fazer login. Tente novamente.']);
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
            Entrar na Conta
          </Text>
          <Button variant="ghost" onClick={handleBackClick}>
            <IconArrowLeft className="mr-2" size={16} />
            Voltar
          </Button>
        </HStack>

        <form onSubmit={handleLogin}>
          <VStack gap={6} align="stretch">
            {success && (
              <Box bg="green.50" className="border" borderColor="green.200" p={3} borderRadius="md">
                <Text color="green.600">{success}</Text>
              </Box>
            )}

            <TextField
              label="E-mail"
              type="email"
              placeholder="seu@email.com"
              variant="subtle"
              startElement={<IconAt size={16} />}
              value={loginData.email}
              onChange={(value) => setLoginData({ ...loginData, email: value })}
              required
            />

            <TextField
              label="Senha"
              type="password"
              placeholder="Sua senha"
              variant="subtle"
              startElement={<IconLock size={16} />}
              value={loginData.password}
              onChange={(value) => setLoginData({ ...loginData, password: value })}
              required
            />

            {errors.length > 0 && (
              <Box bg="red.50" className="border" borderColor="red.200" p={3} borderRadius="md">
                <VStack align="start" gap={1}>
                  {errors.map((error, index) => (
                    <Text key={index} fontSize="sm" color="red.600">{error}</Text>
                  ))}
                </VStack>
              </Box>
            )}

            <Button
              type="submit"
              colorScheme="primary"
              size="lg"
              loading={loading}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>

            <VStack textAlign="center" mt={4}>
              <Text color="fg.muted">
                Ainda não possui uma conta ?
              </Text>
              <Link href="/register" color="primary.500" fontWeight="medium">
                Criar conta
              </Link>
            </VStack>
          </VStack>
        </form>
      </VStack>
    </Container>
  );
}
