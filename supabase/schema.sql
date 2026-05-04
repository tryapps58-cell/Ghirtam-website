-- ─── GHRITAM — Supabase Database Schema ──────────────────────────────────────
-- Run this in: Supabase Dashboard > SQL Editor > New Query
-- Execute sections in order

-- ─── 1. User Profiles ────────────────────────────────────────────────────────
-- Extends auth.users with customer-facing profile data
CREATE TABLE IF NOT EXISTS public.profiles (
  id          UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name   TEXT,
  phone       TEXT,
  avatar_url  TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at  TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Auto-create profile when a user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ─── 2. Addresses ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.addresses (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  label       TEXT DEFAULT 'Home',           -- "Home", "Work", etc.
  full_name   TEXT NOT NULL,
  phone       TEXT NOT NULL,
  line1       TEXT NOT NULL,
  line2       TEXT,
  city        TEXT NOT NULL,
  state       TEXT NOT NULL,
  pincode     TEXT NOT NULL,
  is_default  BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ─── 3. Orders ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.orders (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id         UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  order_number    TEXT UNIQUE NOT NULL,  -- human-readable e.g. GHR-20240503-0001
  status          TEXT DEFAULT 'pending' CHECK (
                    status IN ('pending','confirmed','shipped','delivered','cancelled','refunded')
                  ),
  payment_status  TEXT DEFAULT 'unpaid' CHECK (
                    payment_status IN ('unpaid','paid','refunded','failed')
                  ),
  payment_method  TEXT,                  -- 'razorpay', 'cod', etc.
  subtotal        NUMERIC(10,2) NOT NULL,
  shipping_fee    NUMERIC(10,2) DEFAULT 0,
  discount        NUMERIC(10,2) DEFAULT 0,
  total           NUMERIC(10,2) NOT NULL,
  currency        TEXT DEFAULT 'INR',
  shipping_address JSONB,               -- snapshot of address at order time
  notes           TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at      TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ─── 4. Order Items ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.order_items (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id    UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  product_id  TEXT NOT NULL,             -- slug from products.ts / future products table
  product_name TEXT NOT NULL,
  variant_size TEXT NOT NULL,
  sku         TEXT NOT NULL,
  quantity    INTEGER NOT NULL CHECK (quantity > 0),
  unit_price  NUMERIC(10,2) NOT NULL,
  total_price NUMERIC(10,2) NOT NULL,
  image_url   TEXT
);

-- ─── 5. Newsletter Subscribers ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email       TEXT UNIQUE NOT NULL,
  subscribed  BOOLEAN DEFAULT TRUE,
  source      TEXT DEFAULT 'homepage',   -- 'homepage', 'checkout', 'footer'
  created_at  TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ─── 6. Row Level Security (RLS) ─────────────────────────────────────────────

-- Profiles: users can read/update their own profile
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Addresses: users can CRUD their own addresses
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own addresses" ON public.addresses
  FOR ALL USING (auth.uid() = user_id);

-- Orders: users can view their own orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own orders" ON public.orders
  FOR SELECT USING (auth.uid() = user_id);

-- Order items: users can view items of their own orders
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own order items" ON public.order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.orders o
      WHERE o.id = order_items.order_id AND o.user_id = auth.uid()
    )
  );

-- Newsletter: anyone can insert, only service_role can read/update
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can subscribe to newsletter" ON public.newsletter_subscribers
  FOR INSERT WITH CHECK (true);

-- ─── 7. Updated-at trigger ───────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
