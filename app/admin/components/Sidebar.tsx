'use client'

import Link from "next/link"

const menu = [
  { name: "Dashboard", href: "/admin" },
  { name: "Projects", href: "/admin/projects" },
  { name: "Clients", href: "/admin/clients" },
  { name: "Services", href: "/admin/services" },
  { name: "Settings", href: "/admin/settings" },
]

export default function Sidebar() {
  return (
    <aside className="w-64 bg-neutral-900 border-r border-white/10 p-6">
      <h2 className="text-xl font-bold mb-8">Sumirayan Admin</h2>
      <nav className="space-y-3">
        {menu.map(item => (
          <Link
            key={item.name}
            href={item.href}
            className="block px-4 py-2 rounded-lg text-gray-300 hover:bg-primary hover:text-black transition"
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
