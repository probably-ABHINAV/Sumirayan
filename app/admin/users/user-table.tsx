"use client"

import { useState } from "react"
import { AdminUser, updateUserRole, UserRole, getUserActivity, AuditLog } from "@/app/actions/admin"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Loader2, ShieldAlert, Search, Filter, MoreHorizontal, 
  User, CheckCircle2, AlertTriangle, XCircle, Briefcase, 
  Calendar, Lock, Shield
} from "lucide-react"
import { 
  Sheet, SheetContent, SheetHeader, 
  SheetTitle, SheetFooter, SheetClose 
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, 
  DialogHeader, DialogTitle 
} from "@/components/ui/dialog"
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

const ROLE_COLORS: Record<string, string> = {
  admin: "bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/20",
  manager: "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 border-purple-500/20",
  developer: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-blue-500/20",
  designer: "bg-pink-500/10 text-pink-500 hover:bg-pink-500/20 border-pink-500/20",
  video_editor: "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20 border-orange-500/20",
  client: "bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20",
  unassigned: "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 border-yellow-500/20"
}

const ROLE_DESCRIPTIONS: Record<string, string> = {
  admin: "Full system access. Can manage users & data.",
  manager: "Can view all tasks and assign work.",
  developer: "Can execute development tasks.",
  designer: "Can execute design tasks.",
  video_editor: "Can execute video tasks.",
  client: "Restricted access. Request-only.",
}

export default function UserTable({ initialUsers }: { initialUsers: AdminUser[] }) {
  const [users, setUsers] = useState(initialUsers)
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  
  // State for Role Change Logic
  const [pendingRole, setPendingRole] = useState<UserRole | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  
  // Activity Log State
  const [activityLogs, setActivityLogs] = useState<AuditLog[]>([])
  const [loadingLogs, setLoadingLogs] = useState(false)

  const { toast } = useToast()

  // Filter Logic
  const filteredUsers = users.filter(u => {
    const matchesSearch = u.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (u.full_name && u.full_name.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesRole = roleFilter === "all" || u.role === roleFilter
    return matchesSearch && matchesRole
  })

  // Open Sheet & Fetch Logs
  const openUserSheet = async (user: AdminUser) => {
    setSelectedUser(user)
    setPendingRole(null)
    setActivityLogs([])
    setLoadingLogs(true)
    try {
      const logs = await getUserActivity(user.id)
      setActivityLogs(logs)
    } catch (e) {
      console.error("Failed to fetch logs", e)
    } finally {
      setLoadingLogs(false)
    }
  }

  // Handle Role Change Request
  const handleRoleChangeRequest = (newRole: string) => {
    if (!selectedUser) return
    if (newRole === selectedUser.role) return
    setPendingRole(newRole as UserRole)
    setShowConfirmDialog(true)
  }

  // Commit Role Change
  const commitRoleChange = async () => {
    if (!selectedUser || !pendingRole) return
    
    setIsUpdating(true)
    try {
      await updateUserRole(selectedUser.id, pendingRole)
      
      // Update local state
      setUsers(users.map(u => u.id === selectedUser.id ? { ...u, role: pendingRole } : u))
      setSelectedUser({ ...selectedUser, role: pendingRole })
      
      toast({
        title: "Role Updated",
        description: `User promoted to ${pendingRole.toUpperCase()}.`,
      })
      
      // Refresh logs to show the change immediately (optional)
      const logs = await getUserActivity(selectedUser.id)
      setActivityLogs(logs)

    } catch (error) {
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
    <div className="flex min-h-screen flex-col bg-black text-white">
      {/* Note: Header/Footer might be in Layout, but we include them if requested or just content */}
      {/* Assuming Layout handles Header/Footer, we just render content here. But previous file had Header. */}
      {/* Let's focus on the Table content. */}
      
      <main className="flex-1 p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight mb-2">User Management</h1>
                <p className="text-slate-400">Manage access and roles for all users.</p>
            </div>
            {/* Add User placeholder */}
            <Button className="bg-white/5 hover:bg-white/10 text-white border border-white/10" disabled>
                <User className="w-4 h-4 mr-2" /> Add User
            </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                    type="text" 
                    placeholder="Search users..." 
                    className="w-full bg-[#121212] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[180px] bg-[#121212] border-white/10 text-white">
                    <SelectValue placeholder="Filter by Role" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1a] border-white/10 text-white">
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="developer">Developer</SelectItem>
                    <SelectItem value="client">Client</SelectItem>
                </SelectContent>
            </Select>
        </div>

        {/* Table */}
        <div className="rounded-xl border border-white/10 overflow-hidden bg-[#121212]">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-white/10 text-slate-400 text-xs uppercase tracking-wider">
                        <th className="p-4 font-medium">User</th>
                        <th className="p-4 font-medium">Role</th>
                        <th className="p-4 font-medium">Joined</th>
                        <th className="p-4 font-medium text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {filteredUsers.map(user => (
                        <tr key={user.id} className="hover:bg-white/[0.02] transition">
                            <td className="p-4">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-9 w-9 border border-white/10">
                                        <AvatarImage src={user.profile_image_url || undefined} />
                                        <AvatarFallback className="bg-blue-600 text-white text-xs">
                                            {user.full_name?.[0] || user.email[0].toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-medium text-white">{user.full_name || 'Unnamed User'}</div>
                                        <div className="text-xs text-slate-500">{user.email}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="p-4">
                                <Badge variant="outline" className={cn("capitalize px-2 py-0.5 text-[10px] tracking-wide", ROLE_COLORS[user.role] || ROLE_COLORS.unassigned)}>
                                    {user.role.replace('_', ' ')}
                                </Badge>
                            </td>
                            <td className="p-4 text-sm text-slate-500 font-mono">
                                {new Date(user.created_at).toLocaleDateString()}
                            </td>
                            <td className="p-4 text-right">
                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-white" onClick={() => openUserSheet(user)}>
                                    <MoreHorizontal className="w-4 h-4" />
                                </Button>
                            </td>
                        </tr>
                    ))}
                    {filteredUsers.length === 0 && (
                        <tr>
                            <td colSpan={4} className="p-8 text-center text-slate-500">
                                No users found matching your filters.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>

        {/* Sheet (User Details) */}
        <Sheet open={!!selectedUser} onOpenChange={(open) => !open && setSelectedUser(null)}>
            <SheetContent className="w-[400px] sm:w-[540px] border-l border-white/10 bg-[#0a0a0a] p-0 text-white overflow-hidden flex flex-col">
                {selectedUser && (
                    <>
                        <div className="p-6 border-b border-white/10 bg-[#121212]">
                            <SheetHeader className="mb-6">
                                <SheetTitle className="flex items-center gap-3 text-xl">
                                    <Avatar className="h-12 w-12 border border-white/10">
                                        <AvatarFallback className="bg-blue-600 text-lg">
                                            {selectedUser.full_name?.[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="text-white">{selectedUser.full_name}</div>
                                        <div className="text-sm font-normal text-slate-400">{selectedUser.email}</div>
                                    </div>
                                </SheetTitle>
                            </SheetHeader>
                        </div>

                        <Tabs defaultValue="profile" className="flex-1 flex flex-col">
                            <div className="px-6 border-b border-white/10">
                                <TabsList className="bg-transparent w-full justify-start h-auto p-0 gap-6">
                                    <TabsTrigger value="profile" className="data-[state=active]:bg-transparent data-[state=active]:text-blue-500 data-[state=active]:shadow-none data-[state=active]:border-b-2 border-blue-500 rounded-none px-0 py-3 text-slate-500 hover:text-slate-300 transition-all">Profile & Role</TabsTrigger>
                                    <TabsTrigger value="activity" className="data-[state=active]:bg-transparent data-[state=active]:text-blue-500 data-[state=active]:shadow-none data-[state=active]:border-b-2 border-blue-500 rounded-none px-0 py-3 text-slate-500 hover:text-slate-300 transition-all">Activity Log</TabsTrigger>
                                </TabsList>
                            </div>

                            <TabsContent value="profile" className="p-6 space-y-8 mt-0 animate-in fade-in slide-in-from-left-4 duration-300 overflow-y-auto flex-1">
                                <div className="space-y-4">
                                     <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider">Access Level</h3>
                                     <div className="bg-[#121212] rounded-xl border border-white/10 p-1">
                                         {Object.entries(ROLE_COLORS).filter(([r]) => r !== 'unassigned').map(([role, color]) => (
                                             <button
                                                 key={role}
                                                 onClick={() => handleRoleChangeRequest(role)}
                                                 className={cn(
                                                     "w-full flex items-center justify-between p-3 rounded-lg text-sm transition-all mb-1 last:mb-0",
                                                     selectedUser.role === role ? "bg-white/10 text-white" : "hover:bg-white/5 text-slate-400 hover:text-slate-200"
                                                 )}
                                             >
                                                 <div className="flex items-center gap-3">
                                                     <div className={cn("w-2 h-2 rounded-full", role === 'admin' ? "bg-red-500" : "bg-slate-500")}></div>
                                                     <span className="capitalize">{role.replace('_', ' ')}</span>
                                                 </div>
                                                 {selectedUser.role === role && <CheckCircle2 className="w-4 h-4 text-blue-500" />}
                                             </button>
                                         ))}
                                     </div>
                                     <p className="text-xs text-slate-500 px-1">
                                         {ROLE_DESCRIPTIONS[pendingRole || selectedUser.role] || "Select a role to view permissions."}
                                     </p>
                                </div>
                            </TabsContent>

                            <TabsContent value="activity" className="p-0 mt-0 animate-in fade-in slide-in-from-right-4 duration-300 flex-1 overflow-y-auto">
                                {loadingLogs ? (
                                    <div className="p-8 flex justify-center"><Loader2 className="animate-spin text-slate-500" /></div>
                                ) : activityLogs.length === 0 ? (
                                    <div className="p-8 text-center text-slate-500 text-sm">No recorded activity.</div>
                                ) : (
                                    <div className="divide-y divide-white/5">
                                        {activityLogs.map(log => (
                                            <div key={log.id} className="p-6 hover:bg-white/[0.02]">
                                                <div className="flex gap-3">
                                                    <div className="mt-1">
                                                        <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 ring-4 ring-blue-500/20"></div>
                                                        <div className="w-px h-full bg-white/5 mx-auto mt-2"></div>
                                                    </div>
                                                    <div className="flex-1 pb-4">
                                                        <p className="text-sm font-medium text-white">
                                                            {log.action.replace('_', ' ')}
                                                        </p>
                                                        <p className="text-xs text-slate-500 mt-1">
                                                           by <span className="text-slate-300">{log.actor?.full_name || 'Admin'}</span> · {new Date(log.created_at).toLocaleString()}
                                                        </p>
                                                        {log.details && (
                                                            <div className="mt-2 text-xs font-mono bg-black/40 p-2 rounded border border-white/5 text-slate-400">
                                                                {JSON.stringify(log.details).replace(/[{"}]/g, '').replace(/,/g, ', ')}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </TabsContent>
                        </Tabs>
                    </>
                )}
            </SheetContent>
        </Sheet>

        {/* Confirmation Dialog */}
        <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
            <DialogContent className="bg-[#1a1a1a] border-white/10 text-white">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-red-500">
                        <AlertTriangle className="w-5 h-5" /> Warning: Privilege Change
                    </DialogTitle>
                    <DialogDescription className="text-slate-300 pt-2">
                        You are about to grant <strong>{pendingRole?.toUpperCase()}</strong> privileges to this user.
                        <br/><br/>
                        This gives them significant control over the system. This action will be logged.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="gap-2 mt-4">
                    <Button variant="outline" onClick={() => setShowConfirmDialog(false)} className="border-white/10 hover:bg-white/5 text-slate-300">
                        Cancel
                    </Button>
                    <Button 
                        onClick={commitRoleChange} 
                        className="bg-red-600 hover:bg-red-700 text-white"
                        disabled={isUpdating}
                    >
                        {isUpdating ? "Promoting..." : "Confirm Promotion"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}
