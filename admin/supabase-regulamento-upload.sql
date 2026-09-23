-- SQL para suportar o upload do PDF de regulamento no Supabase
-- Execute este script no SQL Editor do Supabase

-- 1) Tabela para guardar metadata do PDF do regulamento
create table if not exists public.regulamento_documents (
  id uuid primary key default gen_random_uuid(),
  title text not null default 'Regulamento',
  file_name text not null,
  file_url text not null,
  mime_type text not null default 'application/pdf',
  size_bytes bigint not null default 0,
  is_active boolean not null default true,
  uploaded_by text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2) Trigger para atualizar updated_at
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_regulamento_documents_updated_at on public.regulamento_documents;
create trigger trg_regulamento_documents_updated_at
before update on public.regulamento_documents
for each row
execute function public.set_updated_at();

-- 3) Habilitar RLS
alter table public.regulamento_documents enable row level security;

drop policy if exists "regulamento_documents_select_public" on public.regulamento_documents;
drop policy if exists "regulamento_documents_insert_admin" on public.regulamento_documents;
drop policy if exists "regulamento_documents_update_admin" on public.regulamento_documents;
drop policy if exists "regulamento_documents_delete_admin" on public.regulamento_documents;

create policy "regulamento_documents_select_public"
on public.regulamento_documents
for select
using (true);

create policy "regulamento_documents_insert_admin"
on public.regulamento_documents
for insert
with check (true);

create policy "regulamento_documents_update_admin"
on public.regulamento_documents
for update
using (true)
with check (true);

create policy "regulamento_documents_delete_admin"
on public.regulamento_documents
for delete
using (true);

-- 4) Bucket para armazenar os ficheiros PDF numa pasta do Storage
-- O bucket deve existir com ID 'regulamentos' e ser público
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('regulamentos', 'regulamentos', true, 52428800, ARRAY['application/pdf'])
on conflict (id) do update set
  public = true,
  file_size_limit = 52428800,
  allowed_mime_types = ARRAY['application/pdf'];

-- 5) Policies para o bucket de storage
-- leitura pública dos PDFs
 drop policy if exists "regulamentos_public_read" on storage.objects;
create policy "regulamentos_public_read"
on storage.objects
for select
using (bucket_id = 'regulamentos');

-- upload permitido para o site/admin local, sem depender de sessão do Supabase
 drop policy if exists "regulamentos_admin_insert" on storage.objects;
create policy "regulamentos_admin_insert"
on storage.objects
for insert
with check (
  bucket_id = 'regulamentos'
);

-- atualização permitida para o site/admin local
 drop policy if exists "regulamentos_admin_update" on storage.objects;
create policy "regulamentos_admin_update"
on storage.objects
for update
using (
  bucket_id = 'regulamentos'
)
with check (
  bucket_id = 'regulamentos'
);

-- remoção permitida para o site/admin local
 drop policy if exists "regulamentos_admin_delete" on storage.objects;
create policy "regulamentos_admin_delete"
on storage.objects
for delete
using (
  bucket_id = 'regulamentos'
);

-- 6) Registo inicial do PDF padrão (opcional)
insert into public.regulamento_documents (title, file_name, file_url, mime_type, size_bytes, is_active, uploaded_by)
values (
  'Regulamento',
  'regulamento.pdf',
  'https://kcisuhgmubqyjpuexaar.supabase.co/storage/v1/object/public/regulamentos/regulamento.pdf',
  'application/pdf',
  0,
  true,
  'system'
)
on conflict do nothing;

-- 7) Exemplo de uso depois de fazer upload:
--    SELECT * FROM public.regulamento_documents ORDER BY created_at DESC;
--    SELECT * FROM storage.objects WHERE bucket_id = 'regulamentos';
