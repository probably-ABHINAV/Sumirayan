'use client'

import React from "react"
import Sidebar from "./components/Sidebar"
import Topbar from "./components/Topbar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 p-6 bg-neutral-950 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
