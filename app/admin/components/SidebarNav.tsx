
"use client" // Ensure this is client component

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const menu = [
  { name: "Users", href: "/admin/users" },
  { name: "Projects", href: "/admin/coming-soon" },
  { name: "Clients", href: "/admin/coming-soon" },
  { name: "Services", href: "/admin/coming-soon" },
  { name: "Settings", href: "/admin/coming-soon" },
]

export function SidebarNav() {
  const pathname = usePathname()
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 space-y-3">
        {menu.map(item => {
           const isActive = pathname === item.href
           
           // Also handle sub-routes (e.g. /admin/users/123)
           // But since submenu is limited, exact match or startsWith is fine.
           // For "Users", usually strict match on list page? 
           // Or active if pathname.startsWith(item.href)
           const isStartMatch = pathname.startsWith(item.href)

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                  "block px-4 py-2 rounded-lg transition-colors border border-transparent",
                  isStartMatch 
                    ? "bg-white/10 text-white border-white/5 font-medium shadow-sm" 
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
              )}
            >
              {item.name}
            </Link>
          )
        })}
      </div>

       <div className="pt-6 border-t border-white/10">
        <Link 
            href="/dashboard"
            className="block px-4 py-2 text-sm text-blue-400 hover:text-blue-300 transition"
        >
            ← Return to App
        </Link>
      </div>
    </div>
  )
}
