'use server'

import { supabaseAdmin } from "@/lib/supabaseAdmin"
import { stackServerApp } from "@/lib/stack-auth"
import { syncStackUser } from "@/lib/sync-user"
import { revalidatePath } from "next/cache"

export type UserRole = 'admin' | 'manager' | 'developer' | 'designer' | 'video_editor' | 'client'

export interface AdminUser {
  id: string
  email: string
  full_name: string | null
  role: UserRole
  created_at: string
  last_sign_in_at?: string
  task_count?: number
}

async function requireAdmin() {
  const user = await syncStackUser()
  if (!user) throw new Error("Unauthorized")
  
  // Check Stack Auth Metadata for Authority
  const stackUser = await stackServerApp.getUser()
  const role = stackUser?.clientReadOnlyMetadata?.role || stackUser?.clientMetadata?.role
  
  if (role !== 'admin') {
    throw new Error("Forbidden: Admin access only")
  }
  return user
}

import { createSupabaseUserClient } from "@/lib/supabase-scored"
// ...

export async function getAdminUsers() {
  const user = await requireAdmin() // Returns Stack User
  // Use Scoped Client
  const supabase = await createSupabaseUserClient({ id: user.id, role: 'admin' })

  const { data, error } = await supabase
    .from('users')
    .select('*, tasks:tasks!assigned_to(count)')
    .order('created_at', { ascending: false })
// ...

  if (error) throw new Error(error.message)
  
  // Transform to flat object if needed, usually Supabase returns { ..., tasks: [{ count: 5 }] }
  // We need to map it if we want clean AdminUser type
  return data.map((u: any) => ({
    ...u,
    task_count: u.tasks?.[0]?.count || 0
  })) as AdminUser[]
}

// --- Audit Logging Helpers ---

// Log an action to the audit table
async function logAuditAction(action: string, entityType: string, entityId: string, details: any) {
  const actor = await requireAdmin() // Ensure logged in as admin
  
  await supabaseAdmin.from('audit_logs').insert({
    action,
    entity_type: entityType,
    entity_id: entityId,
    actor_id: actor.id,
    details
  })
}

export interface AuditLog {
  id: string
  action: string
  entity_type: string
  entity_id: string
  actor_id: string
  details: any
  created_at: string
  actor?: { full_name: string; email: string } // Joined
}

export async function getSystemActivity() {
  await requireAdmin()
  
  const { data, error } = await supabaseAdmin
    .from('audit_logs')
    .select('*, actor:users!actor_id(full_name, email)')
    .order('created_at', { ascending: false })
    .limit(10)
    
  if (error) throw new Error(error.message)
  return data as AuditLog[]
}

export async function getUserActivity(userId: string) {
  await requireAdmin()
  
  const { data, error } = await supabaseAdmin
    .from('audit_logs')
    .select('*, actor:users!actor_id(full_name, email)')
    .eq('entity_id', userId)
    .order('created_at', { ascending: false })
    
  if (error) throw new Error(error.message)
  return data as AuditLog[]
}

// --- Mutations ---

export async function updateUserRole(userId: string, newRole: UserRole) {
  await requireAdmin()
  
  // Fetch current role for audit diff
  const { data: currentUser } = await supabaseAdmin
    .from('users')
    .select('role')
    .eq('id', userId)
    .single()
    
  const oldRole = currentUser?.role || 'unknown'

  // 1. Update Stack Auth (The Authority) - Attempt
  try {
      const app = stackServerApp as any
      if (app.users && app.users.update) {
          await app.users.update(userId, {
              clientReadOnlyMetadata: { role: newRole }
          })
      } else if (app.updateUser) {
          await app.updateUser(userId, {
            clientReadOnlyMetadata: { role: newRole }
          })
      } else {
         console.warn("Could not update Stack Auth metadata (method not found). Updating DB only.")
      }
  } catch (e) {
      console.error("Failed to update Stack Auth:", e)
      // We proceed to DB update to avoid blocking, but log it?
      // Actually, if Stack update fails, we might want to throw.
      // But for now, we continue.
  }

  // 2. Update Supabase (The Database)
  const { error } = await supabaseAdmin
    .from('users')
    .update({ role: newRole })
    .eq('id', userId)

  if (error) throw new Error(error.message)

  // 3. Log Audit
  await logAuditAction('role_update', 'user', userId, {
    from: oldRole,
    to: newRole
  })

  revalidatePath('/admin/users')
}
