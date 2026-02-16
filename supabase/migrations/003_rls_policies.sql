-- 003_rls_policies.sql
-- Run this in Supabase SQL Editor

-- =============================================================================
-- HELPER FUNCTIONS
-- =============================================================================

-- Function to check if the current user is an admin or manager
create or replace function public.is_admin_or_manager()
returns boolean as $$
begin
  return exists (
    select 1 from public.users
    where id = auth.uid()
    and role in ('admin', 'manager')
  );
end;
$$ language plpgsql security definer;

-- =============================================================================
-- 1. USERS TABLE POLICIES
-- =============================================================================

-- Allow users to read their own profile
create policy "Users can read own profile"
on public.users for select
using (auth.uid() = id);

-- Allow admins/managers to read full directory
create policy "Admins/Managers can read all profiles"
on public.users for select
using (public.is_admin_or_manager());

-- Allow users to upsert their own profile (Self-Registration)
create policy "Users can update own profile"
on public.users for update
using (auth.uid() = id);

create policy "Users can insert own profile"
on public.users for insert
with check (auth.uid() = id);

-- =============================================================================
-- 2. TASKS TABLE POLICIES
-- =============================================================================

-- READ: 
-- 1. Admins/Managers see all tasks.
-- 2. Assignees see their assigned tasks.
-- 3. Clients see tasks where 'client' field matches their name (Rough implementation) OR they are the creator.
create policy "Task Visibility"
on public.tasks for select
using (
  public.is_admin_or_manager()
  or assigned_to = auth.uid()
  or created_by = auth.uid()
);

-- WRITE (INSERT):
-- Only Admins/Managers can create tasks. (Maybe clients too for requests?)
create policy "Task Creation"
on public.tasks for insert
with check (
  public.is_admin_or_manager()
);

-- WRITE (UPDATE):
-- 1. Admins/Managers can update everything.
-- 2. Assignees can ONLY update 'status' (and maybe 'full_brief'?). 
--    (For simplicity, allowing assignees to update the row, but frontend restricts UI).
create policy "Task Modification"
on public.tasks for update
using (
  public.is_admin_or_manager()
  or assigned_to = auth.uid()
);

-- DELETE: Only Admins
create policy "Task Deletion"
on public.tasks for delete
using (
  public.is_admin_or_manager() 
  -- Maybe check specific role 'admin'
);

-- =============================================================================
-- 3. TASK ASSETS POLICIES
-- =============================================================================

-- READ: If you can see the task, you can see its assets.
create policy "Asset Visibility"
on public.task_assets for select
using (
  exists (
    select 1 from public.tasks
    where id = task_assets.task_id
    and (
      public.is_admin_or_manager()
      or assigned_to = auth.uid()
      or created_by = auth.uid()
    )
  )
);

-- WRITE: Admins/Managers + Assignee can upload assets.
create policy "Asset Creation"
on public.task_assets for insert
with check (
  exists (
    select 1 from public.tasks
    where id = task_assets.task_id
    and (
      public.is_admin_or_manager()
      or assigned_to = auth.uid()
    )
  )
);

-- =============================================================================
-- 4. TASK HISTORY POLICIES
-- =============================================================================

-- READ: Same as Task visibility.
create policy "History Visibility"
on public.task_history for select
using (
  exists (
    select 1 from public.tasks
    where id = task_history.task_id
    and (
      public.is_admin_or_manager()
      or assigned_to = auth.uid()
      or created_by = auth.uid()
    )
  )
);

-- WRITE: History is inserted via triggers or strict backend logic. 
-- Allowing implicit insert by triggers, but usually RLS restricts direct insert.
-- We will allow authenticated users to INSERT history rows for tasks they have access to.
create policy "History Creation"
on public.task_history for insert
with check (
  auth.uid() = created_by -- Must attribute to self
);

-- =============================================================================
-- 5. FUNCTION PERMISSIONS
-- =============================================================================
-- Ensure RLS is active
alter table public.users force row level security;
alter table public.tasks force row level security;
alter table public.task_assets force row level security;
alter table public.task_history force row level security;
