"use client"

import { useState } from "react"
import { AdminUser, updateUserRole, UserRole, getUserActivity, AuditLog } from "@/app/actions/admin"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Search, MoreHorizontal, User, CheckCircle2, AlertTriangle } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

const ROLE_COLORS: Record<string, string> = {
  admin: "bg-red-500/10 text-red-500 border-red-500/20",
  manager: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  developer: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  designer: "bg-pink-500/10 text-pink-500 border-pink-500/20",
  video_editor: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  client: "bg-green-500/10 text-green-500 border-green-500/20",
  unassigned: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
}

const ROLE_DESCRIPTIONS: Record<string, string> = {
  admin: "Full system access. Can manage users & data.",
  manager: "Can view all tasks and assign work.",
  developer: "Can execute development tasks.",
  designer: "Can execute design tasks.",
  video_editor: "Can execute video tasks.",
  client: "Restricted access. Request-only.",
  unassigned: "No role assigned."
}

/* 🔥 CRITICAL FIX */
const normalizeRole = (role?: string | null): string => {
  if (!role) return "unassigned"
  return String(role)
    .toLowerCase()
    .replace(/ /g, "_")
    .replace(/-/g, "_")
}

export default function UserTable({ initialUsers }: { initialUsers: AdminUser[] }) {
  const [users, setUsers] = useState(initialUsers)
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [pendingRole, setPendingRole] = useState<UserRole | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [activityLogs, setActivityLogs] = useState<AuditLog[]>([])
  const [loadingLogs, setLoadingLogs] = useState(false)

  const { toast } = useToast()

  const filteredUsers = users.filter(u => {
    const matchesSearch =
      u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.full_name?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRole =
      roleFilter === "all" ||
      normalizeRole(u.role) === roleFilter

    return matchesSearch && matchesRole
  })

  const openUserSheet = async (user: AdminUser) => {
    setSelectedUser(user)
    setPendingRole(null)
    setActivityLogs([])
    setLoadingLogs(true)
    try {
      const logs = await getUserActivity(user.id)
      setActivityLogs(logs)
    } finally {
      setLoadingLogs(false)
    }
  }

  const handleRoleChangeRequest = (newRole: string) => {
    if (!selectedUser) return
    if (normalizeRole(selectedUser.role) === newRole) return
    setPendingRole(newRole as UserRole)
    setShowConfirmDialog(true)
  }

  const commitRoleChange = async () => {
    if (!selectedUser || !pendingRole) return
    setIsUpdating(true)

    try {
      await updateUserRole(selectedUser.id, pendingRole)

      setUsers(prev =>
        prev.map(u =>
          u.id === selectedUser.id ? { ...u, role: pendingRole } : u
        )
      )

      setSelectedUser(prev =>
        prev ? { ...prev, role: pendingRole } : null
      )

      toast({
        title: "Role Updated",
        description: `User promoted to ${pendingRole.toUpperCase()}.`,
      })

    } catch {
      toast({
        title: "Update Failed",
        description: "Could not update user role.",
        variant: "destructive"
      })
    } finally {
      setIsUpdating(false)
      setShowConfirmDialog(false)
      setPendingRole(null)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">

      {/* Search + Filter */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search users..."
            className="w-full bg-[#121212] border border-white/10 rounded-lg pl-10 pr-4 py-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-[180px] bg-[#121212] border-white/10">
            <SelectValue placeholder="Filter by Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            {Object.keys(ROLE_COLORS).map(role => (
              <SelectItem key={role} value={role}>
                {role.replace("_", " ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-white/10 bg-[#121212]">
        <table className="w-full">
          <tbody>
            {filteredUsers.map(user => {
              const role = normalizeRole(user.role)

              return (
                <tr key={user.id} className="border-b border-white/10">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.profile_image_url || undefined} />
                        <AvatarFallback>
                          {user.full_name?.[0] || user.email?.[0]?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div>{user.full_name || "Unnamed User"}</div>
                        <div className="text-xs text-slate-500">{user.email}</div>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <Badge
                      variant="outline"
                      className={cn("capitalize", ROLE_COLORS[role])}
                    >
                      {role.replace("_", " ")}
                    </Badge>
                  </td>

                  <td className="p-4 text-right">
                    <Button size="sm" onClick={() => openUserSheet(user)}>
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Role Change Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-red-500 flex gap-2">
              <AlertTriangle className="w-5 h-5" />
              Confirm Role Change
            </DialogTitle>
            <DialogDescription>
              Grant <strong>{pendingRole}</strong> privileges?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              Cancel
            </Button>
            <Button onClick={commitRoleChange} disabled={isUpdating}>
              {isUpdating ? "Updating..." : "Confirm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
