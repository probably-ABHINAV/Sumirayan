import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { stackServerApp } from "./lib/stack-auth"

/**
 * Authentication Middleware
 * 
 * Enforces role-based access control on protected routes
 * This runs on EVERY request before reaching the page
 */

// Define protected routes and their required roles
const PROTECTED_ROUTES: Record<string, string[]> = {
  "/admin": ["admin"],
  "/dashboard": ["admin", "manager", "developer", "designer", "video_editor"],
  "/task": ["admin", "manager", "developer", "designer", "video_editor"],
}

// Public routes that don't require authentication
const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/signup",
  "/about",
  "/contact",
  "/design",
  "/photography",
  "/art",
  "/learn",
  "/events",
  "/careers",
  "/handler", // Stack Auth handler
  "/debug", // Debug page
]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware for static files and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") // static files
  ) {
    return NextResponse.next()
  }

  // Check if route is public
  const isPublicRoute = PUBLIC_ROUTES.some((route) => 
    pathname === route || pathname.startsWith(route + "/")
  )

  // Get user from Stack Auth
  const user = await stackServerApp.getUser()

  // If not authenticated and trying to access protected route
  if (!user && !isPublicRoute) {
    const loginUrl = new URL("/handler/sign-in", request.url)
    loginUrl.searchParams.set("redirect", pathname)
    return NextResponse.redirect(loginUrl)
  }

  // If authenticated, check role-based access
  if (user && !isPublicRoute) {
    // Prioritize Server-Set Read-Only Metadata (Secure) -> Fallback to Client Metadata (Legacy/Bootstrap)
    const userRole = (user.clientReadOnlyMetadata?.role || user.clientMetadata?.role) as string | undefined

    // Find matching protected route
    const protectedRoute = Object.keys(PROTECTED_ROUTES).find((route) =>
      pathname.startsWith(route)
    )

    if (protectedRoute) {
      const allowedRoles = PROTECTED_ROUTES[protectedRoute]

      // Check if user has required role
      if (!userRole || !allowedRoles.includes(userRole)) {
        // Unauthorized - return 403
        return new NextResponse(
          JSON.stringify({
            error: "Forbidden",
            message: `Access denied. Required role: ${allowedRoles.join(" or ")}`,
          }),
          {
            status: 403,
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
      }
    }
  }

  // Allow request to proceed
  return NextResponse.next()
}

// Configure which routes this middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
