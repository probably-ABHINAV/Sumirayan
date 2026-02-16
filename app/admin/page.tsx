
import { getAdminUsers, getSystemActivity } from "@/app/actions/admin"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { 
  ShieldCheck, Users, Activity, Clock, ShieldAlert, CheckCircle2 
} from "lucide-react"
import Link from "next/link"

export default async function AdminOverviewPage() {
  const [users, logs] = await Promise.all([
    getAdminUsers(),
    getSystemActivity()
  ])

  const pendingCount = users.filter(u => u.role === 'client').length
  const adminCount = users.filter(u => u.role === 'admin').length

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-200 font-sans flex flex-col">
      <Header />
      <main className="flex-grow pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        
        {/* Header */}
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <ShieldCheck className="text-blue-500 w-8 h-8" /> Admin Overview
            </h1>
            <p className="text-slate-400 mt-2">System health and security audit.</p>
          </div>
          <Link href="/admin/users" className="text-blue-400 hover:text-blue-300 text-sm font-semibold flex items-center gap-2">
            <Users className="w-4 h-4" /> Manage Users →
          </Link>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-[#121212] border border-white/10 p-6 rounded-2xl">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-xl">
                <Users className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">Total Users</p>
                <div className="text-3xl font-bold text-white mt-1">{users.length}</div>
              </div>
            </div>
          </div>
          
          <div className="bg-[#121212] border border-white/10 p-6 rounded-2xl">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-500/10 rounded-xl">
                <Clock className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">Pending Approval</p>
                <div className="text-3xl font-bold text-white mt-1">{pendingCount}</div>
              </div>
            </div>
          </div>

          <div className="bg-[#121212] border border-white/10 p-6 rounded-2xl">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-500/10 rounded-xl">
                <ShieldAlert className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">Admins</p>
                <div className="text-3xl font-bold text-white mt-1">{adminCount}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity (Audit Log) */}
        <div className="bg-[#121212] border border-white/10 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-white/10 flex justify-between items-center">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Activity className="text-slate-400 w-5 h-5" /> Recent System Activity
            </h2>
            <div className="text-xs text-slate-500 uppercase tracking-widest font-mono">
              Live Audit Trail
            </div>
          </div>
          
          <div className="p-0">
            {logs.length === 0 ? (
              <div className="p-8 text-center text-slate-500">No activity recorded yet.</div>
            ) : (
              <div className="divide-y divide-white/5">
                {logs.map((log) => (
                  <div key={log.id} className="p-4 hover:bg-white/[0.02] transition-colors flex gap-4">
                    <div className="mt-1">
                      <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-white/10">
                        {log.action === 'role_update' ? <ShieldCheck className="w-4 h-4 text-blue-400" /> : <Activity className="w-4 h-4 text-slate-400" />}
                      </div>
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <p className="text-sm text-slate-200">
                          <span className="font-semibold text-white">{log.actor?.full_name || log.actor?.email || 'Unknown'}</span>
                          <span className="text-slate-500"> {log.action.replace('_', ' ')} </span>
                          <span className="font-mono text-xs text-slate-500 bg-white/5 px-1 py-0.5 rounded">{log.entity_id.substring(0,8)}</span>
                        </p>
                        <span className="text-xs text-slate-500 whitespace-nowrap ml-4">
                          {new Date(log.created_at).toLocaleString()}
                        </span>
                      </div>
                      
                      {log.details && (
                        <div className="mt-1 text-xs text-slate-500 font-mono bg-black/30 p-2 rounded border border-white/5 inline-block">
                          {JSON.stringify(log.details)
                            .replace(/[{"}]/g, '')
                            .replace(/:/g, ': ')
                            .replace(/,/g, ' · ')}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="p-4 bg-white/[0.02] border-t border-white/5 text-center">
            <Link href="/admin/users" className="text-xs text-slate-500 hover:text-slate-300 transition-colors uppercase tracking-widest font-bold">
              View All Users
            </Link>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  )
}
