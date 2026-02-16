-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. ENUMS (Enums over strings)
-- Drop types if they exist to allow clean slate (optional, be careful in prod)
-- drop type if exists public.task_status;
-- drop type if exists public.asset_type;
-- drop type if exists public.user_role;

do $$ begin
    create type public.task_status as enum (
        'todo',
        'in_progress',
        'in_review',
        'done',
        'archived'
    );
exception
    when duplicate_object then null;
end $$;

do $$ begin
    create type public.asset_type as enum (
        'file',
        'link'
    );
exception
    when duplicate_object then null;
end $$;

do $$ begin
    create type public.user_role as enum (
        'admin',
        'manager',
        'developer',
        'designer',
        'video_editor',
        'client'
    );
exception
    when duplicate_object then null;
end $$;

-- 2. USERS TABLE (Reference only - Stack Auth owns identity)
create table if not exists public.users (
  id uuid primary key, -- Matches Stack Auth User ID
  email text not null,
  role public.user_role not null default 'client',
  created_at timestamptz default now(),
  full_name text
);

alter table public.users enable row level security;

-- 3. TASKS TABLE (Core Entity)
create table if not exists public.tasks (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null,
  description text,
  full_brief text,
  client text,
  role_required public.user_role,
  
  assigned_to uuid references public.users(id) on delete set null,
  status public.task_status not null default 'todo',
  
  date date,
  deadline timestamptz,
  
  created_by uuid references public.users(id) on delete set null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_tasks_status on public.tasks(status);
create index if not exists idx_tasks_assigned_to on public.tasks(assigned_to);
create index if not exists idx_tasks_slug on public.tasks(slug);

alter table public.tasks enable row level security;

-- 4. TASK ASSETS (Files & Links)
create table if not exists public.task_assets (
  id uuid primary key default uuid_generate_v4(),
  task_id uuid not null references public.tasks(id) on delete cascade,
  name text not null,
  url text not null,
  type public.asset_type not null,
  created_at timestamptz default now()
);

create index if not exists idx_task_assets_task_id on public.task_assets(task_id);

alter table public.task_assets enable row level security;

-- 5. TASK HISTORY (Auditable actions)
create table if not exists public.task_history (
  id uuid primary key default uuid_generate_v4(),
  task_id uuid not null references public.tasks(id) on delete cascade,
  action text not null,
  note text,
  
  created_by uuid references public.users(id) on delete set null,
  created_at timestamptz default now()
);

create index if not exists idx_task_history_task_id on public.task_history(task_id);

alter table public.task_history enable row level security;

-- 6. AUTOMATIC UPDATED_AT TRIGGER
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language 'plpgsql';

drop trigger if exists update_tasks_updated_at on public.tasks;
create trigger update_tasks_updated_at
before update on public.tasks
for each row
execute procedure update_updated_at_column();

-- 7. HISTORY IMMUTABILITY TRIGGER (Validation Test: History cannot be overwritten)
create or replace function prevent_history_modification()
returns trigger as $$
begin
    raise exception 'Task history is immutable and cannot be modified or deleted.';
end;
$$ language 'plpgsql';

drop trigger if exists protect_task_history_update on public.task_history;
create trigger protect_task_history_update
before update on public.task_history
for each row
execute procedure prevent_history_modification();

drop trigger if exists protect_task_history_delete on public.task_history;
create trigger protect_task_history_delete
before delete on public.task_history
for each row
execute procedure prevent_history_modification();
