import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { stackServerApp } from "./lib/stack-auth"
import { createClient } from "@supabase/supabase-js" // Add this import

/**
 * Authentication Middleware
 * * Enforces role-based access control on protected routes
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
    // 1. First check Stack Auth Metadata
    let userRole = (user.clientReadOnlyMetadata?.role || user.clientMetadata?.role) as string | undefined

    // 2. Override with Supabase Database Role (Source of Truth)
    try {
      // Assuming you have these env variables set in your project
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
      const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      
      if (supabaseUrl && supabaseKey) {
        const supabase = createClient(supabaseUrl, supabaseKey)
        
        // Stack Auth usually stores email in primaryEmail
        const userEmail = user.primaryEmail || (user as any).email

        if (userEmail) {
          const { data: dbUser } = await supabase
            .from('users')
            .select('role')
            .eq('email', userEmail)
            .single()

          // If Supabase has a role, use it!
          if (dbUser && dbUser.role) {
            userRole = dbUser.role
          }
        }
      }
    } catch (error) {
      console.error("Supabase Role Fetch Error:", error)
    }

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
            // Added current role to the message so you can easily debug if it's fetching correctly
            message: `Access denied. Required role: ${allowedRoles.join(" or ")}. Your current role is: ${userRole || "null"}`, 
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
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
