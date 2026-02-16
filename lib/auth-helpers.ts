import "server-only"
import { stackServerApp } from "./stack-auth"
import type { Role } from "@/types/auth"
import { canAccessRoute, hasPermission, type Permission } from "@/types/auth"

/**
 * Server-Side Authentication Helpers
 * 
 * These functions should only be used in:
 * - Server Components
 * - Server Actions
 * - API Routes
 * - Middleware
 */

/**
 * Get the current authenticated user
 * Returns null if not authenticated
 */
export async function getCurrentUser() {
  const user = await stackServerApp.getUser()
  return user
}

/**
 * Get the current user's role
 * Returns null if not authenticated or role not set
 */
export async function getUserRole(): Promise<Role | null> {
  const user = await getCurrentUser()
  if (!user) return null

  // Get role from user metadata
  const role = user.clientMetadata?.role as Role | undefined
  return role || null
}

/**
 * Require authentication - throws if not authenticated
 */
export async function requireAuth() {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Authentication required")
  }
  return user
}

/**
 * Require a specific role - throws if user doesn't have the role
 */
export async function requireRole(allowedRoles: Role | Role[]) {
  const user = await requireAuth()
  const userRole = await getUserRole()

  if (!userRole) {
    throw new Error("User role not set")
  }

  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles]

  if (!roles.includes(userRole)) {
    throw new Error(`Access denied. Required role: ${roles.join(" or ")}`)
  }

  return { user, role: userRole }
}

/**
 * Check if current user has a specific permission
 */
export async function checkPermission(permission: Permission): Promise<boolean> {
  const role = await getUserRole()
  if (!role) return false

  return hasPermission(role, permission)
}

/**
 * Require a specific permission - throws if user doesn't have it
 */
export async function requirePermission(permission: Permission) {
  const hasAccess = await checkPermission(permission)

  if (!hasAccess) {
    throw new Error(`Permission denied: ${permission}`)
  }
}

/**
 * Check if current user can access a specific route
 */
export async function checkRouteAccess(path: string): Promise<boolean> {
  const role = await getUserRole()
  if (!role) return false

  return canAccessRoute(role, path)
}

/**
 * Get user with role information
 */
export async function getUserWithRole() {
  const user = await getCurrentUser()
  if (!user) return null

  const role = await getUserRole()
  if (!role) return null

  return {
    id: user.id,
    email: user.primaryEmail || "",
    name: user.displayName || undefined,
    role,
    metadata: user.clientMetadata,
  }
}
