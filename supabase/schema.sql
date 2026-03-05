-- ============================================================
-- Souls of Creative — Supabase Database Schema
-- Run this in your Supabase SQL Editor
-- ============================================================

-- 1. User Roles Enum
CREATE TYPE user_role AS ENUM ('admin', 'editor');

-- 2. Profiles Table (tied to Supabase Auth)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  role user_role DEFAULT 'editor' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Announcements Table
CREATE TABLE announcements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  message TEXT NOT NULL,
  cta_url TEXT,
  is_active BOOLEAN DEFAULT false,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Categories Table
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE
);

-- 5. Articles Table (with excerpt and cover_image additions)
CREATE TABLE articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT,
  cover_image TEXT,
  author_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Article-Categories Junction Table
CREATE TABLE article_categories (
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (article_id, category_id)
);

-- 7. Media Table
CREATE TABLE media (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  uploaded_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Playlists Table
CREATE TABLE playlists (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  embed_url TEXT NOT NULL,
  platform TEXT NOT NULL CHECK (platform IN ('spotify', 'apple_music', 'soundcloud', 'youtube')),
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- Helper Functions (must come before policies that use them)
-- ============================================================

-- Bypass RLS on profiles to check roles (SECURITY DEFINER runs as table owner)
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION is_editor_or_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('editor', 'admin')
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- ============================================================
-- Row Level Security
-- ============================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE playlists ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- Public Read Policies
-- ============================================================

CREATE POLICY "Public can view active announcements"
  ON announcements FOR SELECT
  USING (is_active = true AND (expires_at IS NULL OR expires_at > NOW()));

CREATE POLICY "Public can view published articles"
  ON articles FOR SELECT
  USING (is_published = true);

CREATE POLICY "Public can view categories"
  ON categories FOR SELECT
  USING (true);

CREATE POLICY "Public can view article categories"
  ON article_categories FOR SELECT
  USING (true);

CREATE POLICY "Public can view playlists"
  ON playlists FOR SELECT
  USING (true);

-- ============================================================
-- Editor Policies (authenticated editors and admins)
-- ============================================================

CREATE POLICY "Editors can manage articles"
  ON articles FOR ALL
  USING (is_editor_or_admin())
  WITH CHECK (is_editor_or_admin());

CREATE POLICY "Editors can manage article_categories"
  ON article_categories FOR ALL
  USING (is_editor_or_admin())
  WITH CHECK (is_editor_or_admin());

CREATE POLICY "Editors can manage media"
  ON media FOR ALL
  USING (is_editor_or_admin())
  WITH CHECK (is_editor_or_admin());

CREATE POLICY "Editors can manage playlists"
  ON playlists FOR ALL
  USING (is_editor_or_admin())
  WITH CHECK (is_editor_or_admin());

CREATE POLICY "Editors can manage announcements"
  ON announcements FOR ALL
  USING (is_editor_or_admin())
  WITH CHECK (is_editor_or_admin());

-- ============================================================
-- Profile Policies
-- ============================================================

CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  USING (is_admin());

CREATE POLICY "Admins can update profiles"
  ON profiles FOR UPDATE
  USING (is_admin())
  WITH CHECK (is_admin());

-- ============================================================
-- Auto-create Profile on Signup Trigger
-- ============================================================

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (NEW.id, NEW.email, 'editor');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================================
-- Auto-update updated_at on Article Changes
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- Seed Default Categories
-- ============================================================

INSERT INTO categories (name, slug) VALUES
  ('Fashion', 'fashion'),
  ('Music', 'music'),
  ('Culture', 'culture'),
  ('Interviews', 'interviews'),
  ('Lifestyle', 'lifestyle')
ON CONFLICT (slug) DO NOTHING;
