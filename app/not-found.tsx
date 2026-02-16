
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Home, MoveLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0a] text-center px-4">
      
      {/* 404 Glitch Text Effect (Simulated via CSS classes if available, else simple) */}
      <h1 className="text-9xl font-black text-white mb-2 tracking-tighter opacity-10">404</h1>
      
      <div className="absolute z-10 flex flex-col items-center">
        <h2 className="text-4xl font-bold text-white mb-6">Page Not Found</h2>
        <p className="text-slate-400 max-w-md mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <div className="flex gap-4">
          <Link href="/dashboard">
            <Button className="bg-blue-600 hover:bg-blue-500 text-white gap-2">
              <MoveLeft className="w-4 h-4" /> Go Back
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="border-white/10 text-slate-300 hover:bg-white/5 gap-2">
              <Home className="w-4 h-4" /> Home
            </Button>
          </Link>
        </div>
      </div>

    </div>
  )
}
