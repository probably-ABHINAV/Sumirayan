import "server-only"
import { stackServerApp } from "./stack-auth"
import { supabaseAdmin } from "./supabaseAdmin"

export async function getCurrentUser() {
  const user = await stackServerApp.getUser()
  return user
}

export async function getUserRole() {
  const user = await getCurrentUser()
  if (!user) return null

  const { data, error } = await supabaseAdmin
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single()

  if (error) {
    console.error("Role fetch error:", error.message)
    return null
  }

  return data?.role ?? null
}

export async function requireAuth() {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Authentication required")
  }

  return user
}

export async function requireRole(roles: string | string[]) {
  const user = await requireAuth()
  const role = await getUserRole()

  const allowed = Array.isArray(roles) ? roles : [roles]

  if (!role || !allowed.includes(role)) {
    throw new Error("Access denied")
  }

  return { user, role }
}
