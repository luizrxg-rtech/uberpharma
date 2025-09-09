'use client';

import {FormEvent, useState} from 'react';
import {useAuth} from '@/contexts/auth-context';
import {useRouter} from 'next/navigation';
import {Box, Button, Container, HStack, Link, Text, VStack} from '@chakra-ui/react';
import {IconArrowLeft, IconAt, IconLock, IconUser} from '@tabler/icons-react';
import {TextField} from '@/components/ui/text-field';

export default function RegisterPage() {
  const { register, isAuthenticated } = useAuth();
  const router = useRouter();

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
    router.back();
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

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();

    const formErrors = validateRegisterForm();
    if (formErrors.length > 0) {
      setErrors(formErrors);
      return;
    }

    setLoading(true);
    setErrors([]);
    setSuccess('');

    try {
      const result = await register(registerData.email, registerData.password, registerData.name);

      if (result.success) {
        setSuccess('Conta criada com sucesso! Verifique seu e-mail para confirmar a conta.');

        setTimeout(() => {
          router.push('/');
        }, 2000);
      } else {
        setErrors([result.error || 'Erro ao criar conta']);
      }
    } catch {
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
            Criar Conta
          </Text>
          <Button variant="ghost" onClick={handleBackClick}>
            <IconArrowLeft className="mr-2" size={16} />
            Voltar
          </Button>
        </HStack>

        <form onSubmit={handleRegister}>
          <VStack gap={6} align="stretch">
            {success && (
              <Box bg="green.50" className="border" borderColor="green.200" p={3} borderRadius="md">
                <Text color="green.600">{success}</Text>
              </Box>
            )}

            <TextField
              label="Nome completo"
              type="text"
              placeholder="Seu nome"
              startElement={<IconUser size={16} />}
              value={registerData.name}
              onChange={(value) => setRegisterData({ ...registerData, name: value })}
              required
            />

            <TextField
              label="E-mail"
              type="email"
              placeholder="seu@email.com"
              startElement={<IconAt size={16} />}
              value={registerData.email}
              onChange={(value) => setRegisterData({ ...registerData, email: value })}
              required
            />

            <TextField
              label="Senha"
              type="password"
              placeholder="Mínimo 6 caracteres"
              startElement={<IconLock size={16} />}
              value={registerData.password}
              onChange={(value) => setRegisterData({ ...registerData, password: value })}
              required
            />

            <TextField
              label="Confirmar senha"
              type="password"
              placeholder="Digite a senha novamente"
              startElement={<IconLock size={16} />}
              value={registerData.confirmPassword}
              onChange={(value) => setRegisterData({ ...registerData, confirmPassword: value })}
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
              {loading ? 'Criando conta...' : 'Criar Conta'}
            </Button>

            <VStack textAlign="center" mt={4}>
              <Text color="fg.muted">
                Já possui uma conta ?
              </Text>
              <Link href="/login" color="primary.500" fontWeight="medium">
                Fazer login
              </Link>
            </VStack>
          </VStack>
        </form>
      </VStack>
    </Container>
  );
}
