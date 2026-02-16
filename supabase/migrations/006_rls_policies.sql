-- Enable RLS on all tables (if not already)
alter table public.users enable row level security;
alter table public.tasks enable row level security;
alter table public.task_assets enable row level security;
alter table public.task_history enable row level security;
alter table public.audit_logs enable row level security;

-- Helper function to get user role from JWT (assuming 'user_role' claim)
-- If we use standard Supabase Auth, role is in app_metadata.
-- We will check both 'user_role' (custom) and 'app_metadata->role'.
create or replace function get_user_role() returns text as $$
begin
  return coalesce(
    current_setting('request.jwt.claim.user_role', true),
    (current_setting('request.jwt.claims', true)::jsonb ->> 'user_role')
  );
end;
$$ language plpgsql;

-- 1. USERS
-- Admin can do everything
create policy "Admins full access users" on public.users
  for all
  using ((auth.jwt() ->> 'user_role') = 'admin');

-- Users can read their own profile
create policy "Users read own profile" on public.users
  for select
  using (id = auth.uid());

-- 2. TASKS
-- Admin can do everything
create policy "Admins full access tasks" on public.tasks
  for all
  using ((auth.jwt() ->> 'user_role') = 'admin');

-- Managers can read all tasks (Simulated Team logic for now)
create policy "Managers read all tasks" on public.tasks
  for select
  using ((auth.jwt() ->> 'user_role') = 'manager');

-- Staff/Developers can read assigned tasks
create policy "Staff read assigned tasks" on public.tasks
  for select
  using (assigned_to = auth.uid());

-- Clients can read tasks created by them or assigned to them
create policy "Clients read own tasks" on public.tasks
  for select
  using (created_by = auth.uid() or assigned_to = auth.uid() or client = auth.uid()::text); 
  -- Note: Client field in tasks is text (name), but might be ID driven in future.
  -- Safe fallback: created_by

-- 3. ASSETS (Inherit from Task)
-- Policy: You can see asset if you can see task
create policy "Admins full access assets" on public.task_assets
  for all
  using ((auth.jwt() ->> 'user_role') = 'admin');

create policy "Users read task assets" on public.task_assets
  for select
  using (
    exists (
      select 1 from public.tasks 
      where id = public.task_assets.task_id 
      and (
        -- Replicate Task logic:
        (auth.jwt() ->> 'user_role') = 'manager'
        or assigned_to = auth.uid()
        or created_by = auth.uid()
      )
    )
  );

-- 4. HISTORY / AUDIT
-- Only Admins can read full history/audit logs
create policy "Admins full access history" on public.task_history
  for select
  using ((auth.jwt() ->> 'user_role') = 'admin');

create policy "Admins full access audit users" on public.audit_logs
  for select
  using ((auth.jwt() ->> 'user_role') = 'admin');
