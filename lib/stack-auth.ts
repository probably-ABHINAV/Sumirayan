import "server-only"
import { StackServerApp } from "@stackframe/stack"

if (!process.env.NEXT_PUBLIC_STACK_PROJECT_ID) {
  throw new Error("Missing NEXT_PUBLIC_STACK_PROJECT_ID")
}

if (!process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY) {
  throw new Error("Missing NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY")
}

if (!process.env.STACK_SECRET_SERVER_KEY) {
  throw new Error("Missing STACK_SECRET_SERVER_KEY")
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
