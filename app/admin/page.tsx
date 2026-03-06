import { getAdminUsers, getSystemActivity } from "@/app/actions/admin"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ShieldCheck, Users, Activity, Clock, ShieldAlert, AlertTriangle } from "lucide-react" // Added AlertTriangle
import Link from "next/link"
// 🔥 redirect ka import hata diya gaya hai

/* 🔥 ROLE NORMALIZER */
const normalizeRole = (role?: string | null): string => {
  if (!role) return "unassigned"
  return String(role)
    .toLowerCase()
    .replace(/ /g, "_")
    .replace(/-/g, "_")
}

export default async function AdminOverviewPage() {
  let users = []
  let logs = []
  let errorMsg = null

  // 🔥 Try/Catch block WITHOUT redirect to prevent Next.js Error 310 bug
  try {
    const [usersRaw, logsRaw] = await Promise.all([
      getAdminUsers(),
      getSystemActivity()
    ])
    
    users = usersRaw ?? []
    logs = logsRaw ?? []
  } catch (error: any) {
    console.error("Access denied or fetch failed:", error)
    errorMsg = error.message // Save the error message instead of redirecting
  }

  // 🔥 Agar user admin nahi hai, toh redirect karne ke bajaye yeh safe UI dikhao
  if (errorMsg) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-slate-200 flex flex-col">
        <Header />
        <main className="flex-grow flex flex-col items-center justify-center p-6 text-center">
          <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">Access Denied</h1>
          <p className="text-slate-400">Aapko is page ko dekhne ki permission nahi hai.</p>
          
          <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm font-mono max-w-lg">
            Error: {errorMsg}
            <br/><br/>
            (Make sure your user has the 'admin' role exactly in your Stack Auth User Metadata)
          </div>

          <Link href="/" className="mt-8 px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition">
            Go Back Home
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  // --- Normal Admin UI below (only renders if no error) ---
  const pendingCount = users.filter(u => normalizeRole(u.role) === "client").length
  const adminCount = users.filter(u => normalizeRole(u.role) === "admin").length

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-200 flex flex-col">
      <Header />

      <main className="flex-grow pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">

        {/* Header */}
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <ShieldCheck className="text-blue-500 w-8 h-8" />
              Admin Overview
            </h1>
            <p className="text-slate-400 mt-2">
              System health and security audit.
            </p>
          </div>

          <Link
            href="/admin/users"
            className="text-blue-400 hover:text-blue-300 text-sm font-semibold flex items-center gap-2"
          >
            <Users className="w-4 h-4" />
            Manage Users →
          </Link>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Total Users */}
          <div className="bg-[#121212] border border-white/10 p-6 rounded-2xl">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-xl">
                <Users className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-slate-500 text-sm uppercase tracking-wider">
                  Total Users
                </p>
                <div className="text-3xl font-bold text-white mt-1">
                  {users.length}
                </div>
              </div>
            </div>
          </div>

          {/* Pending */}
          <div className="bg-[#121212] border border-white/10 p-6 rounded-2xl">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-500/10 rounded-xl">
                <Clock className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-slate-500 text-sm uppercase tracking-wider">
                  Pending Approval
                </p>
                <div className="text-3xl font-bold text-white mt-1">
                  {pendingCount}
                </div>
              </div>
            </div>
          </div>

          {/* Admins */}
          <div className="bg-[#121212] border border-white/10 p-6 rounded-2xl">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-500/10 rounded-xl">
                <ShieldAlert className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <p className="text-slate-500 text-sm uppercase tracking-wider">
                  Admins
                </p>
                <div className="text-3xl font-bold text-white mt-1">
                  {adminCount}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Activity */}
        <div className="bg-[#121212] border border-white/10 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-white/10 flex justify-between items-center">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Activity className="text-slate-400 w-5 h-5" />
              Recent System Activity
            </h2>
            <div className="text-xs text-slate-500 uppercase tracking-widest font-mono">
              Live Audit Trail
            </div>
          </div>

          {logs.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              No activity recorded yet.
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {logs.map((log: any) => {
                const safeAction = log.action ? log.action.replace("_", " ") : "unknown action"
                const safeEntity = log.entity_id ? String(log.entity_id).substring(0, 8) : "N/A"

                return (
                  <div key={log.id} className="p-4 hover:bg-white/[0.02] transition-colors flex gap-4">
                    <div className="mt-1">
                      <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-white/10">
                        {log.action === "role_update"
                          ? <ShieldCheck className="w-4 h-4 text-blue-400" />
                          : <Activity className="w-4 h-4 text-slate-400" />}
                      </div>
                    </div>

                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <p className="text-sm text-slate-200">
                          <span className="font-semibold text-white">
                            {log.actor?.full_name || log.actor?.email || "Unknown"}
                          </span>
                          <span className="text-slate-500"> {" "} {safeAction} {" "} </span>
                          <span className="font-mono text-xs text-slate-500 bg-white/5 px-1 py-0.5 rounded">
                            {safeEntity}
                          </span>
                        </p>
                        <span className="text-xs text-slate-500 whitespace-nowrap ml-4">
                          {log.created_at ? new Date(log.created_at).toLocaleString() : "N/A"}
                        </span>
                      </div>

                      {log.details && (
                        <div className="mt-1 text-xs text-slate-500 font-mono bg-black/30 p-2 rounded border border-white/5 inline-block">
                          {JSON.stringify(log.details).replace(/[{"}]/g, "").replace(/:/g, ": ").replace(/,/g, " · ")}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          <div className="p-4 bg-white/[0.02] border-t border-white/5 text-center">
            <Link href="/admin/users" className="text-xs text-slate-500 hover:text-slate-300 uppercase tracking-widest font-bold">
              View All Users
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
