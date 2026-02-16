"use client"

import { StackProvider } from "@stackframe/stack"
import { stackClientApp } from "@/lib/stack-client"

/**
 * Stack Auth Provider Component
 * 
 * Wraps the application to provide authentication context
 */

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <StackProvider app={stackClientApp}>
      {children}
    </StackProvider>
  )
}
