import { StackHandler } from "@stackframe/stack"
import { stackServerApp } from "@/lib/stack-auth"

export const dynamic = 'force-dynamic'

export default function Handler(props: any) {
  console.log("Stack Handler accessed with props:", props)
  
  return (
    // Is div ne form ko screen ke bilkul center mein kar diya hai
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <StackHandler app={stackServerApp} {...props} />
      </div>
    </div>
  )
}
