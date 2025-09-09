'use client';

import { useState } from 'react';
import { VStack, Grid, GridItem } from '@chakra-ui/react';
import { Address } from '@/types/checkout/types';
import { TextField } from '@/components/ui/text-field';

interface AddressFormProps {
  address: Address;
  onChange: (address: Address) => void;
}

export default function AddressForm({ address, onChange }: AddressFormProps) {
  const [isLoadingCep, setIsLoadingCep] = useState(false);

  const handleChange = (field: keyof Address, value: string) => {
    onChange({
      ...address,
      [field]: value
    });
  };

  const handleCepChange = async (cep: string) => {
    handleChange('zipCode', cep);

    if (cep.replace(/\D/g, '').length === 8) {
      setIsLoadingCep(true);
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep.replace(/\D/g, '')}/json/`);
        const data = await response.json();

        if (!data.erro) {
          onChange({
            ...address,
            zipCode: cep,
            street: data.logradouro || address.street,
            neighborhood: data.bairro || address.neighborhood,
            city: data.localidade || address.city,
            state: data.uf || address.state
          });
        }
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
      } finally {
        setIsLoadingCep(false);
      }
    }
  };

  return (
    <VStack gap={4} align="stretch">
      <Grid templateColumns={{ base: '1fr', md: '2fr 1fr' }} gap={4}>
        <GridItem>
          <TextField
            label="CEP"
            placeholder="00000-000"
            value={address.zipCode}
            onChange={handleCepChange}
            mask="99999-999"
            required
          />
        </GridItem>
      </Grid>

      <TextField
        label="Rua/Avenida"
        placeholder="Nome da rua"
        value={address.street}
        onChange={(value: string) => handleChange('street', value)}
        required
        disabled={isLoadingCep}
      />

      <Grid templateColumns={{ base: '1fr', md: '2fr 1fr' }} gap={4}>
        <GridItem>
          <TextField
            label="Número"
            placeholder="123"
            value={address.number}
            onChange={(value: string) => handleChange('number', value)}
            required
          />
        </GridItem>
        <GridItem>
          <TextField
            label="Complemento"
            placeholder="Apartamento, sala, etc."
            value={address.complement || ''}
            onChange={(value: string) => handleChange('complement', value)}
          />
        </GridItem>
      </Grid>

      <TextField
        label="Bairro"
        placeholder="Nome do bairro"
        value={address.neighborhood}
        onChange={(value: string) => handleChange('neighborhood', value)}
        required
        disabled={isLoadingCep}
      />

      <Grid templateColumns={{ base: '1fr', md: '2fr 1fr' }} gap={4}>
        <GridItem>
          <TextField
            label="Cidade"
            placeholder="Nome da cidade"
            value={address.city}
            onChange={(value: string) => handleChange('city', value)}
            required
            disabled={isLoadingCep}
          />
        </GridItem>
        <GridItem>
          <TextField
            label="Estado"
            placeholder="UF"
            value={address.state}
            onChange={(value: string) => handleChange('state', value)}
            required
            disabled={isLoadingCep}
          />
        </GridItem>
      </Grid>
    </VStack>
  );
}
