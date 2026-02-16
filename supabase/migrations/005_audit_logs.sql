-- 8. AUDIT LOGS (System-wide traceability)
create table if not exists public.audit_logs (
  id uuid primary key default uuid_generate_v4(),
  action text not null,        -- e.g. 'role_update', 'user_suspension'
  entity_type text not null,   -- e.g. 'user', 'task', 'system'
  entity_id text,              -- ID of the object being changed (Target User ID)
  actor_id uuid references public.users(id), -- Admin who performed action
  details jsonb,               -- { "from": "client", "to": "admin" }
  created_at timestamptz default now()
);

-- Index for fast lookups
create index if not exists idx_audit_logs_entity_id on public.audit_logs(entity_id);
create index if not exists idx_audit_logs_actor_id on public.audit_logs(actor_id);
create index if not exists idx_audit_logs_created_at on public.audit_logs(created_at);

-- RLS: Only Admins can read logic (enforced via Application logic, but good to have)
alter table public.audit_logs enable row level security;

-- Policy: Admins can view all logs
-- (We use Service Role in app for now, but good practice)
-- create policy "Admins can view all audit logs" on public.audit_logs
--   for select using (auth.uid() in (select id from public.users where role = 'admin'));
