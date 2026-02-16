
'use client'

import { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-[#0a0a0a] text-center px-4">
      <div className="bg-[#121212] border border-white/10 p-8 rounded-2xl max-w-md w-full flex flex-col items-center">
        <div className="bg-red-500/10 p-4 rounded-full mb-6">
          <AlertTriangle className="h-10 w-10 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Something went wrong!</h2>
        <p className="text-slate-400 mb-8 text-sm">
          We encountered an unexpected error. Our team has been notified.
        </p>
        <div className="flex gap-4 w-full">
          <Button 
            onClick={() => window.location.href = '/dashboard'}
            variant="outline"
            className="flex-1 border-white/10 text-slate-300 hover:bg-white/5"
          >
            Go Home
          </Button>
          <Button 
            onClick={() => reset()}
            className="flex-1 bg-blue-600 hover:bg-blue-500 text-white"
          >
            Try Again
          </Button>
        </div>
        {process.env.NODE_ENV === 'development' && (
           <div className="mt-8 text-left w-full bg-black/50 p-4 rounded border border-white/5 overflow-auto max-h-40">
             <p className="text-xs font-mono text-red-400 whitespace-pre-wrap">{error.message}</p>
           </div>
        )}
      </div>
    </div>
  )
}
