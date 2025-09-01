INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "allow_public_read" ON storage.objects
FOR SELECT USING (bucket_id = 'product-images');

CREATE POLICY "allow_authenticated_uploads" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'product-images'
  AND auth.role() = 'authenticated'
);

CREATE POLICY "allow_authenticated_updates" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'product-images'
  AND auth.role() = 'authenticated'
) WITH CHECK (
  bucket_id = 'product-images'
  AND auth.role() = 'authenticated'
);

CREATE POLICY "allow_authenticated_deletes" ON storage.objects
FOR DELETE USING (
  bucket_id = 'product-images'
  AND auth.role() = 'authenticated'
);