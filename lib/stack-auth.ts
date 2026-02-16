import "server-only"
import { StackServerApp } from "@stackframe/stack"

/**
 * Stack Auth Configuration
 * 
 * Initialize Stack Auth for server-side operations
 * This file should only be imported in server components and API routes
 */

if (!process.env.NEXT_PUBLIC_STACK_PROJECT_ID) {
  throw new Error("Missing NEXT_PUBLIC_STACK_PROJECT_ID environment variable")
}

if (!process.env.STACK_SECRET_SERVER_KEY) {
  throw new Error("Missing STACK_SECRET_SERVER_KEY environment variable")
}

export const stackServerApp = new StackServerApp({
  tokenStore: "nextjs-cookie",
  projectId: process.env.NEXT_PUBLIC_STACK_PROJECT_ID,
  publishableClientKey: process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY,
  secretServerKey: process.env.STACK_SECRET_SERVER_KEY,
  urls: {
    signIn: "/handler/sign-in",
    signUp: "/handler/sign-up",
    afterSignIn: "/dashboard",
    afterSignUp: "/dashboard",
    afterSignOut: "/",
  },
})
