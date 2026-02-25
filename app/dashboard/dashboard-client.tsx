"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  CheckCircle2, XCircle, AlertTriangle, 
  Calendar, X, BarChart3, LayoutDashboard 
} from "lucide-react"
import { Task, updateTaskStatus, TaskStatus } from "@/app/actions/tasks"
import Link from "next/link"

// --- TYPES ---

export default function DashboardClient({ initialTasks, user }: { initialTasks: Task[], user: any }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [selectedHistoryDate, setSelectedHistoryDate] = useState<string | null>(null)
  
  // Date Range State
  const [startDate, setStartDate] = useState("2026-02-01")
  const [endDate, setEndDate] = useState("2026-02-05")

  // FIX 1: 'en-CA' safely formats the local date exactly as YYYY-MM-DD avoiding UTC mismatch
  const today = new Date().toLocaleDateString('en-CA')

  // --- FILTERS ---
  // Tasks due today OR pending/in_progress but overdue?
  // User logic: "date === today"
  const todayTasks = tasks.filter(t => {
     // If date matches today. 
     // Also show if status is in_progress? 
     // For strict adherence to user design: date === today
     return t.date === today && t.status !== "in_review"
  })
  
  const revisionTasks = tasks.filter(t => t.status === "in_review")

  // Generate Last 7 Days
  const last7Days = useMemo(() => {
    const dates = []
    for (let i = 0; i < 7; i++) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      dates.push(d.toLocaleDateString('en-CA')) // Kept consistent with local timezone
    }
    return dates
  }, [])

  // Range Report Logic
  const rangeReport = useMemo(() => {
    const relevantTasks = tasks.filter(t => t.date && t.date >= startDate && t.date <= endDate)
    const total = relevantTasks.length
    const completed = relevantTasks.filter(t => t.status === "done").length
    const efficiency = total === 0 ? 0 : Math.round((completed / total) * 100)
    return { total, completed, efficiency, relevantTasks }
  }, [startDate, endDate, tasks])

  // Monthly Report
  const monthlyStats = useMemo(() => {
    const currentMonth = today.substring(0, 7) // YYYY-MM
    const monthTasks = tasks.filter(t => t.date && t.date.startsWith(currentMonth))
    const total = monthTasks.length
    const completed = monthTasks.filter(t => t.status === "done").length
    return { total, completed, percentage: total === 0 ? 0 : Math.round((completed / total) * 100) }
  }, [tasks, today])

  // Handlers
  const handleStatusChange = async (id: string, newUiStatus: "pending" | "completed" | "failed") => {
    // Map UI to DB
    let newDbStatus: TaskStatus = 'todo'
    if (newUiStatus === 'completed') newDbStatus = 'done'
    if (newUiStatus === 'failed') newDbStatus = 'archived' 
    if (newUiStatus === 'pending') newDbStatus = 'in_progress'

    // FIX 2: Store previous state for safe revert
    const previousTasks = [...tasks]

    // Optimistic Update
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: newDbStatus } : t))
    
    try {
      await updateTaskStatus(id, newDbStatus)
    } catch (err) {
      console.error("Failed update", err)
      // FIX 2: Revert UI if DB fails
      setTasks(previousTasks)
      alert("Something went wrong updating the task. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-200 font-sans flex flex-col">
      <Header />

      <main className="flex-grow pt-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-10">
        
        {/* --- SECTION 1: TODAY'S WORK --- */}
        <section>
          <h1 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">Welcome To Work Dashboard, {user?.displayName || 'Guest'}</h1>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <LayoutDashboard className="text-blue-500" /> Today's Work
            </h2>
            <div className="flex gap-2">
                {(user?.clientReadOnlyMetadata?.role === 'admin' || user?.clientMetadata?.role === 'admin') && (
                    <Link href="/admin/users" className="px-4 py-2 bg-red-600/20 border border-red-600/50 text-red-200 text-sm font-bold rounded-lg hover:bg-red-600/30 transition-colors">
                        Admin Panel
                    </Link>
                )}
                <Link href="/dashboard/create" className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-500 transition-colors">
                    + Create Task
                </Link>
            </div>
          </div>
          <div className="grid gap-0">
            {todayTasks.length === 0 ? (
               <div className="text-center p-8 border border-dashed border-white/10 rounded-xl text-slate-500">No work assigned for today yet.</div>
            ) : (
                todayTasks.map(task => (
                <div key={task.id} className="group relative bg-[#121212] border border-white/10 p-4 rounded-xl flex items-center justify-between hover:border-white/20 transition-all mb-2">
                    <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl ${task.status === 'done' ? 'bg-green-500' : 'bg-blue-500'}`} />
                    <Link href={`/tasks/${task.slug}`} className="block flex-1">
                        <h3 className="font-semibold text-lg text-white hover:text-primary transition-colors">{task.title}</h3>
                        <p className="text-sm text-slate-500">{task.client || 'Internal'}</p>
                    </Link>
                    
                    <div className="flex gap-3">
                    <button 
                        onClick={() => handleStatusChange(task.id, "failed")} 
                        className={`px-2 py-1 rounded-lg border font-medium text-sm transition-all flex items-center gap-2 border-red-500/30 text-red-500 hover:bg-red-500/10`}
                    >
                        <XCircle className="w-2 h-2" /> Pending
                    </button>
                    <button 
                        onClick={() => handleStatusChange(task.id, "completed")}
                        className={`px-2 py-1 rounded-lg border font-medium text-sm transition-all flex items-center gap-2 ${task.status === 'done' ? 'bg-green-500 text-white border-green-500' : 'border-green-500/30 text-green-500 hover:bg-green-500/10'}`}
                    >
                        <CheckCircle2 className="w-2 h-2" /> Done
                    </button>
                    </div>
                </div>
                ))
            )}
          </div>
        </section>

        {/* --- SECTION 2: REWORK --- */}
        {revisionTasks.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-amber-500 mb-4 flex items-center gap-2">
              <AlertTriangle className="fill-amber-500 text-black" /> Rework Required
            </h2>
            <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl overflow-hidden">
              {revisionTasks.map(task => (
                <div key={task.id} className="p-4 border-b border-amber-500/20 last:border-0 flex justify-between items-center">
                  <div>
                    <Link href={`/tasks/${task.slug}`}>
                        <h3 className="font-medium text-amber-200 hover:underline">{task.title}</h3>
                    </Link>
                    <p className="text-xs text-amber-400/70">Status: In Review</p>
                  </div>
                  <button onClick={() => handleStatusChange(task.id, "completed")} className="px-3 py-1 bg-amber-500 text-black text-sm font-bold rounded hover:bg-amber-400">
                    Fix & Done
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* --- SECTION 3: LAST 7 DAYS --- */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">Last 7 Days History</h2>
          <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
            {last7Days.map((date) => {
              const dayTasks = tasks.filter(t => t.date === date)
              const allDone = dayTasks.length > 0 && dayTasks.every(t => t.status === 'done')
              
              return (
                <button 
                  key={date} 
                  onClick={() => setSelectedHistoryDate(date)}
                  className="min-w-[100px] h-24 bg-[#111] border border-white/10 rounded-xl flex flex-col items-center justify-center hover:bg-white/5 hover:border-purple-500/50 transition-all relative group"
                >
                  <span className="text-xs text-slate-500 uppercase">{new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}</span>
                  <span className="text-lg font-bold text-white">{new Date(date).getDate()}</span>
                  <div className={`mt-2 w-2 h-2 rounded-full ${dayTasks.length === 0 ? 'bg-slate-700' : allDone ? 'bg-green-500' : 'bg-red-500'}`} />
                </button>
              )
            })}
          </div>
        </section>

        <div className="grid md:grid-cols-2 gap-6">
          {/* RANGE REPORT */}
          <section className="bg-[#121212] border border-white/10 p-6 rounded-2xl">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-400" /> Range Report
            </h2>
            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full bg-black border border-white/20 rounded p-2 text-sm text-white" />
              </div>
              <div className="flex-1">
                <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full bg-black border border-white/20 rounded p-2 text-sm text-white" />
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-white">{rangeReport.completed} <span className="text-lg text-slate-500 font-normal">/ {rangeReport.total}</span></div>
                <div className="text-xs text-slate-400">Tasks Completed</div>
              </div>
              <div className="text-right">
                 <div className={`text-2xl font-bold ${rangeReport.efficiency >= 80 ? 'text-green-400' : 'text-orange-400'}`}>{rangeReport.efficiency}%</div>
                 <div className="text-xs text-slate-400">Efficiency</div>
              </div>
            </div>
          </section>

          {/* MONTHLY SUMMARY */}
          <section className="bg-gradient-to-br from-[#121212] to-purple-900/10 border border-white/10 p-6 rounded-2xl relative overflow-hidden">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-400" /> Monthly Summary
            </h2>
            <div className="mt-6">
              <div className="flex justify-between text-sm mb-2 text-slate-300">
                <span>Progress</span>
                <span>{monthlyStats.percentage}%</span>
              </div>
              <div className="w-full h-3 bg-black/50 rounded-full overflow-hidden border border-white/5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${monthlyStats.percentage}%` }}
                  className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                />
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                 <div className="bg-black/40 p-3 rounded-lg border border-white/5">
                    <p className="text-xs text-slate-500">Total</p>
                    <p className="text-xl font-bold text-white">{monthlyStats.total}</p>
                 </div>
                 <div className="bg-black/40 p-3 rounded-lg border border-white/5">
                    <p className="text-xs text-slate-500">Done</p>
                    <p className="text-xl font-bold text-green-400">{monthlyStats.completed}</p>
                 </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />

      {/* POPUP MODAL */}
      <AnimatePresence>
        {selectedHistoryDate && (
          // FIX 3: Added motion.div and animation variables for smooth entry/exit
          <motion.div 
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#181818] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl"
            >
              <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                <h3 className="text-white font-bold flex items-center gap-2">Work Log: {selectedHistoryDate}</h3>
                <button onClick={() => setSelectedHistoryDate(null)} className="p-1 hover:bg-white/10 rounded-full text-white"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-4 max-h-[60vh] overflow-y-auto">
                {tasks.filter(t => t.date === selectedHistoryDate).map(task => (
                    <div key={task.id} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                      <div>
                        <p className="text-slate-200 font-medium">{task.title}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {task.status === 'done' ? (
                          <div className="flex items-center gap-1 text-green-400 bg-green-400/10 px-2 py-1 rounded text-xs font-bold">Done</div>
                        ) : (
                          <div className="flex items-center gap-1 text-red-400 bg-red-400/10 px-2 py-1 rounded text-xs font-bold">Pending</div>
                        )}
                      </div>
                    </div>
                  ))}
                  {tasks.filter(t => t.date === selectedHistoryDate).length === 0 && <p className="text-center text-slate-500">No tasks.</p>}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
