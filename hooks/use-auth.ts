"use client"

import { useUser } from "@stackframe/stack"
import type { Role } from "@/types/auth"
import { hasPermission, canAccessRoute, type Permission } from "@/types/auth"

/**
 * Client-Side Authentication Hook
 * 
 * Use this hook in client components to access auth state
 * Note: This is for UI purposes only - all authorization is enforced server-side
 */

export function useAuth() {
  const user = useUser()

  const role = (user?.clientMetadata?.role as Role) || null

  return {
    user,
    role,
    isAuthenticated: !!user,
    isLoading: user === undefined,
    
    // Helper functions
    hasPermission: (permission: Permission) => {
      if (!role) return false
      return hasPermission(role, permission)
    },
    
    canAccessRoute: (path: string) => {
      if (!role) return false
      return canAccessRoute(role, path)
    },
    
    // Role checks
    isAdmin: role === "admin",
    isManager: role === "manager",
    isDeveloper: role === "developer",
    isDesigner: role === "designer",
    isVideoEditor: role === "video_editor",
    isClient: role === "client",
    
    // Group checks
    isStaff: role ? ["developer", "designer", "video_editor"].includes(role) : false,
    isManagement: role ? ["admin", "manager"].includes(role) : false,
    isInternal: role ? ["admin", "manager", "developer", "designer", "video_editor"].includes(role) : false,
  }
}
