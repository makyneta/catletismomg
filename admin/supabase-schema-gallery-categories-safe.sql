-- Script seguro para criar a tabela de categorias da galeria sem conflito
-- Pode ser executado várias vezes, porque usa IF EXISTS / IF NOT EXISTS.

create table if not exists public.gallery_categories (
  id text primary key,
  name text not null unique,
  slug text not null unique,
  created_at timestamptz not null default now()
);

alter table public.gallery_categories enable row level security;

-- Reaproveita o nome caso a tabela já exista e a coluna ainda não exista.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'gallery_categories'
      AND column_name = 'id'
  ) THEN
    ALTER TABLE public.gallery_categories ADD COLUMN id text;
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'gallery_categories'
      AND column_name = 'name'
  ) THEN
    ALTER TABLE public.gallery_categories ADD COLUMN name text;
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'gallery_categories'
      AND column_name = 'slug'
  ) THEN
    ALTER TABLE public.gallery_categories ADD COLUMN slug text;
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'gallery_categories'
      AND column_name = 'created_at'
  ) THEN
    ALTER TABLE public.gallery_categories ADD COLUMN created_at timestamptz default now();
  END IF;
END $$;

-- Garante que a PK exista quando a tabela já existia sem ela.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conrelid = 'public.gallery_categories'::regclass
      AND contype = 'p'
  ) THEN
    ALTER TABLE public.gallery_categories ADD PRIMARY KEY (id);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_indexes
    WHERE schemaname = 'public'
      AND tablename = 'gallery_categories'
      AND indexname = 'gallery_categories_name_key'
  ) THEN
    CREATE UNIQUE INDEX gallery_categories_name_key ON public.gallery_categories (name);
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM pg_indexes
    WHERE schemaname = 'public'
      AND tablename = 'gallery_categories'
      AND indexname = 'gallery_categories_slug_key'
  ) THEN
    CREATE UNIQUE INDEX gallery_categories_slug_key ON public.gallery_categories (slug);
  END IF;
END $$;

-- Remove as policies antigas antes de recriar para evitar conflitos.
drop policy if exists "Galeria categorias publicas" on public.gallery_categories;
drop policy if exists "Admins podem gerir categorias galeria" on public.gallery_categories;
drop policy if exists "Admins podem atualizar categorias galeria" on public.gallery_categories;
drop policy if exists "Admins podem apagar categorias galeria" on public.gallery_categories;

create policy "Galeria categorias publicas"
on public.gallery_categories
for select
using (true);

create policy "Admins podem gerir categorias galeria"
on public.gallery_categories
for insert
with check (true);

create policy "Admins podem atualizar categorias galeria"
on public.gallery_categories
for update
using (true)
with check (true);

create policy "Admins podem apagar categorias galeria"
on public.gallery_categories
for delete
using (true);

-- Opcional: mantém categorias padrão caso ainda não existam.
insert into public.gallery_categories (id, name, slug)
values
  ('gallery-cat-geral', 'geral', 'geral'),
  ('gallery-cat-meeting', 'meeting', 'meeting'),
  ('gallery-cat-prova', 'prova', 'prova'),
  ('gallery-cat-evento', 'evento', 'evento'),
  ('gallery-cat-clube', 'clube', 'clube')
on conflict (name) do nothing;
