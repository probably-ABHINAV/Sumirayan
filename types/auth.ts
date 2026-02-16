/**
 * Authentication & Authorization Types
 *
 * Defines the role-based access control (RBAC) system
 */

// Role definitions - source of truth for all authorization
export type Role =
  | "admin" // Full system access
  | "manager" // Team oversight, assign tasks
  | "developer" // Development tasks only
  | "designer" // Design tasks only
  | "video_editor" // Video editing tasks only
  | "client"; // View-only access

// User interface with role information
export interface UserWithRole {
  id: string;
  email: string;
  name?: string;
  role: Role;
  metadata?: Record<string, any>;
}

// Permission helpers
export type Permission =
  | "view_dashboard"
  | "manage_users"
  | "assign_tasks"
  | "complete_tasks"
  | "view_admin"
  | "edit_content"
  | "view_analytics";

// Role to permissions mapping
export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  admin: [
    "view_dashboard",
    "manage_users",
    "assign_tasks",
    "complete_tasks",
    "view_admin",
    "edit_content",
    "view_analytics",
  ],
  manager: [
    "view_dashboard",
    "assign_tasks",
    "complete_tasks",
    "view_analytics",
  ],
  developer: ["view_dashboard", "complete_tasks"],
  designer: ["view_dashboard", "complete_tasks"],
  video_editor: ["view_dashboard", "complete_tasks"],
  client: [],
};

// Helper function to check if a role has a specific permission
export function hasPermission(role: Role, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role].includes(permission);
}

// Helper function to check if a role can access a route
export function canAccessRoute(role: Role, path: string): boolean {
  // Admin can access everything
  if (role === "admin") return true;

  // Route-specific rules
  if (path.startsWith("/admin")) {
    return false; // Only admin can access (already checked above)
  }

  if (path.startsWith("/dashboard")) {
    return [
      "admin",
      "manager",
      "developer",
      "designer",
      "video_editor",
    ].includes(role);
  }

  if (path.startsWith("/task/")) {
    return [
      "admin",
      "manager",
      "developer",
      "designer",
      "video_editor",
    ].includes(role);
  }

  if (path.startsWith("/account")) {
    return true; // All authenticated users can access their account
  }

  // Default: allow access to public routes
  return true;
}

// Staff roles (employees)
export const STAFF_ROLES: Role[] = ["developer", "designer", "video_editor"];

// Management roles
export const MANAGEMENT_ROLES: Role[] = ["admin", "manager"];

// All internal roles (not clients)
export const INTERNAL_ROLES: Role[] = [...MANAGEMENT_ROLES, ...STAFF_ROLES];

// Helper to check if user is staff
export function isStaff(role: Role): boolean {
  return STAFF_ROLES.includes(role);
}

// Helper to check if user is management
export function isManagement(role: Role): boolean {
  return MANAGEMENT_ROLES.includes(role);
}

// Helper to check if user is internal (not a client)
export function isInternal(role: Role): boolean {
  return INTERNAL_ROLES.includes(role);
}
