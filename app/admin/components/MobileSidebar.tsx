
'use client'

import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SidebarNav } from "./SidebarNav"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function MobileSidebar() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-white/10">
           <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-neutral-900 border-r border-white/10 text-white w-72 p-6">
        <h2 className="text-xl font-bold mb-8 text-white">Sumirayan Admin</h2>
        <SidebarNav />
      </SheetContent>
    </Sheet>
  )
}
