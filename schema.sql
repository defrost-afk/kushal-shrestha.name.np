-- ============================================================
--  FURNITURE & FURNISHINGS SHOP — Supabase Database Schema
--  Run this in: Supabase Dashboard > SQL Editor > New Query
-- ============================================================

-- ── SUPPLIERS ────────────────────────────────────────────────
CREATE TABLE suppliers (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  contact_name  TEXT,
  email         TEXT UNIQUE,
  phone         TEXT,
  address       TEXT,
  city          TEXT,
  country       TEXT DEFAULT 'Nepal',
  notes         TEXT,
  is_active     BOOLEAN DEFAULT TRUE,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ── CATEGORIES ───────────────────────────────────────────────
CREATE TABLE categories (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL UNIQUE,          -- e.g. 'Sofas', 'Beds', 'Curtains'
  description TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── PRODUCTS ─────────────────────────────────────────────────
CREATE TABLE products (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sku             TEXT UNIQUE NOT NULL,       -- e.g. 'SOF-001'
  name            TEXT NOT NULL,
  description     TEXT,
  category_id     UUID REFERENCES categories(id) ON DELETE SET NULL,
  supplier_id     UUID REFERENCES suppliers(id) ON DELETE SET NULL,
  unit            TEXT DEFAULT 'piece',       -- piece, meter, set, etc.
  cost_price      NUMERIC(12,2) NOT NULL DEFAULT 0,
  selling_price   NUMERIC(12,2) NOT NULL DEFAULT 0,
  image_url       TEXT,
  is_active       BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ── INVENTORY ────────────────────────────────────────────────
CREATE TABLE inventory (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id      UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity        INT NOT NULL DEFAULT 0,
  reorder_level   INT DEFAULT 5,             -- alert when stock <= this
  warehouse_loc   TEXT,                      -- e.g. 'Shelf A3'
  last_updated    TIMESTAMPTZ DEFAULT NOW()
);

-- ── STOCK MOVEMENTS (full audit trail) ──────────────────────
CREATE TABLE stock_movements (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id    UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  movement_type TEXT NOT NULL CHECK (movement_type IN ('IN','OUT','ADJUSTMENT')),
  quantity      INT NOT NULL,
  reference     TEXT,     -- e.g. purchase order no., invoice no.
  notes         TEXT,
  moved_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ── SEED: DEFAULT CATEGORIES ─────────────────────────────────
INSERT INTO categories (name, description) VALUES
  ('Sofas & Seating',  'Sofas, armchairs, ottomans'),
  ('Beds & Mattresses','Beds, headboards, mattresses'),
  ('Tables',           'Dining, coffee, side tables'),
  ('Storage',          'Wardrobes, cabinets, shelves'),
  ('Curtains & Blinds','Window treatments and soft furnishings'),
  ('Lighting',         'Lamps, ceiling lights, wall lights'),
  ('Rugs & Carpets',   'Floor coverings'),
  ('Outdoor',          'Garden and balcony furniture');

-- ── AUTO UPDATE updated_at ───────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_suppliers_updated_at
  BEFORE UPDATE ON suppliers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── ROW LEVEL SECURITY (RLS) — enable in Supabase ───────────
-- Disable for now (use anon key from your dashboard only on admin panel behind auth)
ALTER TABLE suppliers        ENABLE ROW LEVEL SECURITY;
ALTER TABLE products         ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory        ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock_movements  ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories       ENABLE ROW LEVEL SECURITY;

-- Allow all for authenticated users (you will add Supabase Auth later)
CREATE POLICY "Allow all for authenticated" ON suppliers
  FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all for authenticated" ON products
  FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all for authenticated" ON inventory
  FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all for authenticated" ON stock_movements
  FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all for authenticated" ON categories
  FOR ALL USING (auth.role() = 'authenticated');

-- ============================================================
--  DONE! Next step: note your Project URL and anon key from
--  Supabase Settings > API, then paste them into the dashboard.
-- ============================================================
