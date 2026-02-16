import { StackHandler } from "@stackframe/stack"
import { stackServerApp } from "@/lib/stack-auth"

export const dynamic = 'force-dynamic'

export default function Handler(props: any) {
  console.log("Stack Handler accessed with props:", props)
  return <StackHandler app={stackServerApp} {...props} />
}
