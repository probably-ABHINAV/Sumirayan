"use client"

import { StackClientApp } from "@stackframe/stack"

/**
 * Stack Auth Client Configuration
 * 
 * Initialize Stack Auth for client-side operations
 * This should only be used in client components
 */

export const stackClientApp = new StackClientApp({
  projectId: process.env.NEXT_PUBLIC_STACK_PROJECT_ID!,
  publishableClientKey: process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY!,
  tokenStore: "cookie",
})
