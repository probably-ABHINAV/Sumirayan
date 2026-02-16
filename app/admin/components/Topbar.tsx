'use client'

import MobileSidebar from "./MobileSidebar"

export default function Topbar() {
  return (
    <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-black">
      <div className="flex items-center gap-4">
        <MobileSidebar />
        <h1 className="text-lg font-semibold">Admin Panel</h1>
      </div>
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-primary text-black flex items-center justify-center font-bold">
          A
        </div>
      </div>
    </header>
  )
}
