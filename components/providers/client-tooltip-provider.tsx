"use client"

import * as React from "react"
import { TooltipProvider } from "@/components/ui/tooltip"

export function ClientTooltipProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <>{children}</>
  }

  return <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
}
