-- Configuração do Supabase Storage para upload de imagens de produtos

-- 1. Criar o bucket 'product-images' (caso não exista)
-- Execute este comando no SQL Editor do Supabase Dashboard:

INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Configurar políticas RLS (Row Level Security) para o bucket
-- Permitir que qualquer usuário autenticado faça upload de imagens

-- Política para SELECT (visualizar imagens) - pública
CREATE POLICY "Imagens de produtos são públicas" ON storage.objects
FOR SELECT USING (bucket_id = 'product-images');

-- Política para INSERT (fazer upload) - apenas usuários autenticados
CREATE POLICY "Usuários autenticados podem fazer upload de imagens" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'product-images' AND auth.role() = 'authenticated');

-- Política para UPDATE (atualizar imagens) - apenas usuários autenticados
CREATE POLICY "Usuários autenticados podem atualizar imagens" ON storage.objects
FOR UPDATE USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');

-- Política para DELETE (deletar imagens) - apenas usuários autenticados
CREATE POLICY "Usuários autenticados podem deletar imagens" ON storage.objects
FOR DELETE USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');

-- 3. Verificar se o bucket foi criado corretamente
-- SELECT * FROM storage.buckets WHERE id = 'product-images';

-- 4. Configurações adicionais recomendadas:
-- No painel do Supabase, vá em Storage > Settings e configure:
-- - File size limit: 5MB
-- - Allowed MIME types: image/jpeg, image/png, image/webp
-- - Enable image transformations (opcional, para otimização automática)
