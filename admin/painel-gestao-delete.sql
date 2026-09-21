-- SQL complementar para o painel
-- Objetivo: permitir ver/listar, editar e apagar utilizadores, notícias e fotografias
-- e garantir que a remoção no painel apaga mesmo o registo da base de dados.

-- 1) Garante que as tabelas existem (caso ainda não tenham sido criadas)
create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  password text not null,
  role text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.news (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  summary text,
  image_url text,
  content text,
  season text not null default '2026/27',
  status text not null default 'published' check (status in ('draft', 'published')),
  category text not null default 'geral',
  featured boolean not null default false,
  published_at timestamptz not null default now(),
  author_role text not null default 'admin',
  page_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.gallery_images (
  id text primary key,
  title text not null,
  alt text,
  description text,
  image_url text not null,
  season text not null default '2026/27',
  category text not null default 'geral',
  author_role text not null default 'admin',
  created_at timestamptz not null default now()
);

-- 2) Garante que a constraint de roles existe
alter table public.admin_users drop constraint if exists admin_users_role_check;
alter table public.admin_users
  add constraint admin_users_role_check
  check (role in ('master_admin', 'admin', 'estagiario'));

-- 3) Ativa RLS nas tabelas do painel
alter table public.admin_users enable row level security;
alter table public.news enable row level security;
alter table public.gallery_images enable row level security;

-- 4) Remove policies antigas para evitar duplicados
-- utilizadores

drop policy if exists "painel_admin_users_select" on public.admin_users;
drop policy if exists "painel_admin_users_insert" on public.admin_users;
drop policy if exists "painel_admin_users_update" on public.admin_users;
drop policy if exists "painel_admin_users_delete" on public.admin_users;

-- notícias
drop policy if exists "painel_news_select" on public.news;
drop policy if exists "painel_news_insert" on public.news;
drop policy if exists "painel_news_update" on public.news;
drop policy if exists "painel_news_delete" on public.news;

-- galeria
drop policy if exists "painel_gallery_select" on public.gallery_images;
drop policy if exists "painel_gallery_insert" on public.gallery_images;
drop policy if exists "painel_gallery_update" on public.gallery_images;
drop policy if exists "painel_gallery_delete" on public.gallery_images;

-- 5) Policies permissivas para o painel funcionar corretamente
-- Utilizadores: ver, criar, editar e apagar do painel
create policy "painel_admin_users_select"
on public.admin_users
for select
using (true);

create policy "painel_admin_users_insert"
on public.admin_users
for insert
with check (true);

create policy "painel_admin_users_update"
on public.admin_users
for update
using (true)
with check (true);

create policy "painel_admin_users_delete"
on public.admin_users
for delete
using (true);

-- Notícias: ver, criar, editar e apagar do painel
create policy "painel_news_select"
on public.news
for select
using (true);

create policy "painel_news_insert"
on public.news
for insert
with check (true);

create policy "painel_news_update"
on public.news
for update
using (true)
with check (true);

create policy "painel_news_delete"
on public.news
for delete
using (true);

-- Galeria: ver, criar, editar e apagar do painel
create policy "painel_gallery_select"
on public.gallery_images
for select
using (true);

create policy "painel_gallery_insert"
on public.gallery_images
for insert
with check (true);

create policy "painel_gallery_update"
on public.gallery_images
for update
using (true)
with check (true);

create policy "painel_gallery_delete"
on public.gallery_images
for delete
using (true);

-- 6) Seed base importante para master admin (se ainda não existir)
insert into public.admin_users (email, password, role, is_active)
values ('makyneta@tutamail.com', 'Gesture2-Moodiness0-Crumpet8-Prankish4-Unexposed0', 'master_admin', true)
on conflict (email) do nothing;

-- 7) Como usar:
-- - Execute este ficheiro no SQL Editor do Supabase.
-- - Depois no painel, o botão de apagar vai remover o registo da tabela de verdade.
-- - As notícias e fotografias adicionadas no painel ficam visíveis e podem ser eliminadas também.
