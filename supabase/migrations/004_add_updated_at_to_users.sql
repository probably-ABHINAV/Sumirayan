-- Add updated_at column to users table
alter table public.users 
add column if not exists updated_at timestamptz default now();

-- Create trigger to automatically update updated_at
drop trigger if exists update_users_updated_at on public.users;
create trigger update_users_updated_at
before update on public.users
for each row
execute procedure update_updated_at_column();
