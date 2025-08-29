-- Create users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for better performance
CREATE INDEX idx_users_email ON users(email);

-- Create products table
CREATE TABLE products (
  id TEXT PRIMARY KEY,
  sku INTEGER UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  image TEXT NOT NULL,
  category TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending', -- pending, processing, shipped, delivered, cancelled
  shipping_address TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create order_items table
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id TEXT REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL,
  price_at_time DECIMAL(10,2) NOT NULL, -- Price when the order was placed
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for better performance
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);

-- Insert sample data
INSERT INTO products (id, sku, name, description, price, image, category, quantity) VALUES
  ('1', 40117, 'OLEUM ALECRIM ESSENCIAL FR. 10 ML', 'Pure rosemary essential oil with therapeutic properties. Perfect for aromatherapy and natural wellness routines.', 24.99, '/products/Alecrim_10_ml_300x.png', 'Bem-estar', 15),
  ('2', 40118, 'OLEUM CITRONELA ESSENCIAL FR. 10 ML', 'Natural citronella oil with insect repelling properties. Great for outdoor activities and natural protection.', 19.99, '/products/CITRONELA_bad58593-277b-48fc-a146-bdeb585a2e15_300x.png', 'Bem-estar', 22),
  ('3', 40105, 'DERMOSQEE CREME PREVENTIVO DE ESTRIAS FR 200 G', 'Premium cream formulated to prevent and reduce stretch marks. Enriched with natural ingredients for skin elasticity.', 34.99, '/products/Cremeestriassombra_300x.webp', 'Dermatológicos', 8),
  ('4', 40102, 'DERMOSQEE HIDRATANTE CORPORAL ROSA MOSQUETA UREIA 10 LOÇÃO FR 200 G', 'Intensive moisturizing lotion for dry skin. Provides long-lasting hydration with natural extracts.', 29.99, '/products/Locaohidratantes_sombra_300x.webp', 'Dermatológicos', 12),
  ('5', 40104, 'DERMOSQEE LUVAS DE SILICONE NATURAL CREME BISN. 60 G', 'Professional silicone-based hair treatment for shine and protection. Reduces frizz and enhances manageability.', 39.99, '/products/Lucasdesilicones_sombra_300x.webp', 'Dermatológicos', 6),
  ('6', 40106, 'DERMOSQEE ÓLEO DE ROSA MOSQUETA NATURAL MAIS VITAMINAS A E FR. 30 ML C/CX.', 'Luxurious natural body oil blend for nourishing and softening skin. Perfect for massage and daily moisturizing.', 27.99, '/products/Oleonaturalsombra_300x.webp', 'Dermatológicos', 18),
  ('7', 40084, 'OLEUM LAVANDA ESSENCIAL FR. 10 ML', 'Pure lavender essential oil known for its calming and relaxing properties. Ideal for stress relief and better sleep.', 32.99, '/products/OLEUMLAVANDA_300x.webp', 'Bem-estar', 14),
  ('8', 40128, 'OLEUM ROSA MOSQUETA NATURAL FR. 30 ML', 'Premium rosehip seed oil rich in vitamins and antioxidants. Perfect for anti-aging and skin regeneration.', 44.99, '/products/OLEUMROSAMOSQUETA30ml_300x.png', 'Bem-estar', 9),
  ('9', 40103, 'DERMOSQEE CREME NUTRITIVO FACIL DIA E NOITE ROSE LIFT 100 G', 'Advanced anti-aging serum with rose extract. Helps lift and firm skin while reducing fine lines and wrinkles.', 59.99, '/products/Roseliftsombra_300x.png', 'Dermatológicos', 0);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can view their own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create policies for products table
CREATE POLICY "Allow public read access on products" ON products
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to modify products" ON products
  FOR ALL USING (auth.role() = 'authenticated');

-- Create policies for orders table
CREATE POLICY "Users can view their own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own orders" ON orders
  FOR UPDATE USING (auth.uid() = user_id);

-- Create policies for order_items table
CREATE POLICY "Users can view their own order items" ON order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create their own order items" ON order_items
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );
