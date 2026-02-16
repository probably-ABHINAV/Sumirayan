
'use client'

import { SidebarNav } from "./SidebarNav"

export default function Sidebar() {
  return (
    <aside className="hidden md:flex w-64 bg-neutral-900 border-r border-white/10 p-6 flex-col">
      <h2 className="text-xl font-bold mb-8 text-white">Sumirayan Admin</h2>
      <SidebarNav />
    </aside>
  )
}
