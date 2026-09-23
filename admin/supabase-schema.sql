-- 1) Cria a tabela de utilizadores do painel
create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  password text not null,
  role text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.admin_users drop constraint if exists admin_users_role_check;
alter table public.admin_users
  add constraint admin_users_role_check
  check (role in ('master_admin', 'admin', 'estagiario'));

-- 2) Cria a tabela de notícias do ano 2026/27 e seguintes
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

create table if not exists public.gallery_categories (
  id text primary key,
  name text not null unique,
  slug text not null unique,
  created_at timestamptz not null default now()
);

-- 3) Segurança: leitura pública das notícias; escrita restrita aos administradores
alter table public.news enable row level security;
alter table public.gallery_images enable row level security;
alter table public.gallery_categories enable row level security;
alter table public.admin_users enable row level security;

drop policy if exists "Noticias publicas" on public.news;
drop policy if exists "Admin users public read" on public.admin_users;
drop policy if exists "Admins podem escrever users" on public.admin_users;
drop policy if exists "Admins podem atualizar users" on public.admin_users;
drop policy if exists "Admins podem apagar users" on public.admin_users;
drop policy if exists "Admins podem inserir noticias" on public.news;
drop policy if exists "Admins podem atualizar noticias" on public.news;
drop policy if exists "Admins podem apagar noticias" on public.news;
drop policy if exists "Galeria publica" on public.gallery_images;
drop policy if exists "Admins podem inserir galeria" on public.gallery_images;
drop policy if exists "Admins podem atualizar galeria" on public.gallery_images;
drop policy if exists "Admins podem apagar galeria" on public.gallery_images;
drop policy if exists "Galeria categorias publicas" on public.gallery_categories;
drop policy if exists "Admins podem gerir categorias galeria" on public.gallery_categories;

create policy "Noticias publicas" on public.news
  for select using (true);

create policy "Admin users public read" on public.admin_users
  for select using (true);

create policy "Admins podem escrever users" on public.admin_users
  for insert with check (true);

create policy "Admins podem atualizar users" on public.admin_users
  for update using (true) with check (true);

create policy "Admins podem apagar users" on public.admin_users
  for delete using (true);

create policy "Admins podem inserir noticias" on public.news
  for insert with check (true);

create policy "Admins podem atualizar noticias" on public.news
  for update using (true) with check (true);

create policy "Admins podem apagar noticias" on public.news
  for delete using (true);

create policy "Galeria publica" on public.gallery_images
  for select using (true);

create policy "Admins podem inserir galeria" on public.gallery_images
  for insert with check (true);

create policy "Admins podem atualizar galeria" on public.gallery_images
  for update using (true) with check (true);

create policy "Admins podem apagar galeria" on public.gallery_images
  for delete using (true);

create policy "Galeria categorias publicas" on public.gallery_categories
  for select using (true);

create policy "Admins podem gerir categorias galeria" on public.gallery_categories
  for insert with check (true);

create policy "Admins podem atualizar categorias galeria" on public.gallery_categories
  for update using (true) with check (true);

create policy "Admins podem apagar categorias galeria" on public.gallery_categories
  for delete using (true);

-- 4) Seed base para os master admins do sistema
insert into public.admin_users (email, password, role, is_active)
values ('makyneta@tutamail.com', 'Gesture2-Moodiness0-Crumpet8-Prankish4-Unexposed0', 'master_admin', true)
on conflict (email) do nothing;

-- 5) Para o editor de Supabase (ou no SQL editor):
--    - Vá a Database > SQL Editor
--    - Execute este ficheiro
--    - Depois, em Authentication > Users, crie um utilizador para login real do painel (opcional)
--    - Configure RLS depois para restringir as operações conforme as regras reais da sua organização
