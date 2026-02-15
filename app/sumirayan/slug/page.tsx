"use client"

import { useParams, useRouter } from "next/navigation"
import { useState, useMemo, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  CheckCircle2, XCircle, AlertTriangle, 
  Calendar, Check, X, BarChart3,
  LayoutDashboard, Bell, ArrowLeft
} from "lucide-react"

// --- TYPES ---
type Status = "pending" | "completed" | "failed" | "revision"

interface Task {
  id: string
  title: string
  client: string
  date: string 
  status: Status
  remark?: string
}

// --- DATA SOURCE ---
const DATA_BY_SLUG: Record<string, { title: string, tasks: Task[] }> = {
  "video-editor": {
    title: "Video Editor",
    tasks: [
      { id: "1", title: "Instagram Reel - Ed Tech", client: "Sankalp Civil", date: "2026-02-05", status: "pending" },
      { id: "2", title: "Youtube Thumbnail", client: "Birdcarts", date: "2026-02-05", status: "pending" },
      { id: "3", title: "Website Banner Resize", client: "Narayan GW", date: "2026-02-05", status: "completed" },
      { id: "4", title: "Logo Animation Fix", client: "ANK Realty", date: "2026-02-04", status: "revision", remark: "Speed too slow" },
      { id: "5", title: "Poster Design", client: "Dr. Vikas", date: "2026-02-04", status: "completed" },
      { id: "6", title: "Video Rendering", client: "ArchBuilds", date: "2026-02-04", status: "failed" },
    ]
  },
  "graphic-designer": {
    title: "Graphic Designer",
    tasks: [
      { id: "g1", title: "Brand Identity Pack", client: "Cafe Coffee", date: "2026-02-05", status: "pending" },
      { id: "g2", title: "Social Media Carousel", client: "Tech Start", date: "2026-02-05", status: "completed" },
      { id: "g3", title: "Billboard Mockup", client: "City Ads", date: "2026-02-04", status: "revision", remark: "Color mismatch" },
      { id: "g4", title: "Flyer Design", client: "Gym Pro", date: "2026-02-03", status: "completed" },
    ]
  },
  "it-manager": {
    title: "IT Manager",
    tasks: [
      { id: "t1", title: "Server Migration", client: "Internal", date: "2026-02-05", status: "pending" },
      { id: "t2", title: "Firewall Update", client: "Security Team", date: "2026-02-05", status: "completed" },
      { id: "t3", title: "API Endpoint Fix", client: "Dev Team", date: "2026-02-04", status: "failed" },
      { id: "t4", title: "Database Backup", client: "Auto-System", date: "2026-02-04", status: "completed" },
    ]
  }
}

export default function RoleDashboard() {
  const params = useParams()
  const router = useRouter()
  
  // Logic to grab the slug correctly
  const slug = params?.slug as string
  const currentData = DATA_BY_SLUG[slug]

  const [tasks, setTasks] = useState<Task[]>([])
  const [selectedHistoryDate, setSelectedHistoryDate] = useState<string | null>(null)
  
  // Date Range State
  const [startDate, setStartDate] = useState("2026-02-01")
  const [endDate, setEndDate] = useState("2026-02-05")
  const today = "2026-02-05" 

  // Initialize data on load
  useEffect(() => {
    if (currentData) {
      setTasks(currentData.tasks)
    }
  }, [slug, currentData])

  // --- ERROR HANDLING IF SLUG IS WRONG ---
  if (!currentData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white gap-4">
        <h2 className="text-2xl font-bold">Role Not Found</h2>
        <p className="text-slate-400">The role "{slug}" does not exist in our database.</p>
        <button 
          onClick={() => router.push('/sumiran-team')}
          className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500"
        >
          Back to Selection
        </button>
      </div>
    )
  }

  // --- DATA PROCESSING LOGIC ---
  const todayTasks = tasks.filter(t => t.date === today && t.status !== "revision")
  const revisionTasks = tasks.filter(t => t.status === "revision")

  const last7Days = useMemo(() => {
    const dates = []
    for (let i = 1; i <= 7; i++) {
      const d = new Date(today)
      d.setDate(d.getDate() - i)
      dates.push(d.toISOString().split('T')[0])
    }
    return dates
  }, [])

  const rangeReport = useMemo(() => {
    const relevantTasks = tasks.filter(t => t.date >= startDate && t.date <= endDate)
    const total = relevantTasks.length
    const completed = relevantTasks.filter(t => t.status === "completed").length
    const efficiency = total === 0 ? 0 : Math.round((completed / total) * 100)
    return { total, completed, efficiency, relevantTasks }
  }, [startDate, endDate, tasks])

  const monthlyStats = useMemo(() => {
    const monthTasks = tasks.filter(t => t.date.startsWith("2026-02"))
    const total = monthTasks.length
    const completed = monthTasks.filter(t => t.status === "completed").length
    return { total, completed, percentage: total === 0 ? 0 : Math.round((completed / total) * 100) }
  }, [tasks])

  const handleStatusChange = (id: string, newStatus: Status) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t))
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-200 font-sans flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-6 z-50">
         <div className="flex items-center gap-4">
            {/* Back Button fix: goes to /sumiran-team */}
            <button onClick={() => router.push('/sumiran-team')} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <h1 className="font-bold text-xl text-white tracking-tight">Sumiran<span className="text-blue-500">Team</span></h1>
         </div>
         <div className="flex items-center gap-4">
             <div className="px-3 py-1 bg-white/5 rounded-full border border-white/10 text-xs font-medium text-slate-300">
                {currentData.title}
             </div>
             <Bell className="w-5 h-5 text-slate-400" />
         </div>
      </header>

      <main className="flex-grow pt-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-10 mb-20">
        
        {/* --- SECTION 1: TODAY'S WORK --- */}
        <section>
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-white mb-2">Hello, Team</h1>
            <p className="text-slate-500">Workspace loaded for: <span className="text-blue-400 font-bold">{currentData.title}</span></p>
          </div>
          
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <LayoutDashboard className="text-blue-500" /> Today's Work
          </h2>
          <div className="grid gap-3">
            {todayTasks.map(task => (
              <div key={task.id} className="group relative bg-[#121212] border border-white/10 p-4 rounded-xl flex items-center justify-between hover:border-white/20 transition-all">
                <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl ${task.status === 'completed' ? 'bg-green-500' : task.status === 'failed' ? 'bg-red-500' : 'bg-blue-500'}`} />
                <div>
                  <h3 className="font-semibold text-lg text-white">{task.title}</h3>
                  <p className="text-sm text-slate-500">{task.client}</p>
                </div>
                
                <div className="flex gap-3">
                  <button 
                    onClick={() => handleStatusChange(task.id, "failed")}
                    className={`px-3 py-1.5 rounded-lg border font-medium text-xs transition-all flex items-center gap-2 ${task.status === 'failed' ? 'bg-red-500 text-white border-red-500' : 'border-red-500/30 text-red-500 hover:bg-red-500/10'}`}
                  >
                    <XCircle className="w-3 h-3" /> Failed
                  </button>
                  <button 
                    onClick={() => handleStatusChange(task.id, "completed")}
                    className={`px-3 py-1.5 rounded-lg border font-medium text-xs transition-all flex items-center gap-2 ${task.status === 'completed' ? 'bg-green-500 text-white border-green-500' : 'border-green-500/30 text-green-500 hover:bg-green-500/10'}`}
                  >
                    <CheckCircle2 className="w-3 h-3" /> Done
                  </button>
                </div>
              </div>
            ))}
            {todayTasks.length === 0 && <div className="text-center p-8 border border-dashed border-white/10 rounded-xl text-slate-500">No work assigned for today yet.</div>}
          </div>
        </section>

        {/* --- SECTION 2: REVISION / REWORK --- */}
        {revisionTasks.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-amber-500 mb-4 flex items-center gap-2">
              <AlertTriangle className="fill-amber-500 text-black" /> Rework Required
            </h2>
            <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl overflow-hidden">
              {revisionTasks.map(task => (
                <div key={task.id} className="p-4 border-b border-amber-500/20 last:border-0 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-amber-200">{task.title}</h3>
                    <p className="text-xs text-amber-400/70">Remark: {task.remark}</p>
                  </div>
                  <button onClick={() => handleStatusChange(task.id, "completed")} className="px-3 py-1 bg-amber-500 text-black text-sm font-bold rounded hover:bg-amber-400">
                    Fix & Done
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* --- SECTION 3: LAST 7 DAYS HISTORY --- */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">Last 7 Days History</h2>
          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
            {last7Days.map((date, index) => {
              const dayTasks = tasks.filter(t => t.date === date)
              const allDone = dayTasks.length > 0 && dayTasks.every(t => t.status === 'completed')
              
              return (
                <button 
                  key={date} 
                  onClick={() => setSelectedHistoryDate(date)}
                  className="min-w-[100px] h-24 bg-[#111] border border-white/10 rounded-xl flex flex-col items-center justify-center hover:bg-white/5 hover:border-blue-500/50 transition-all relative group"
                >
                  <span className="text-xs text-slate-500 uppercase">{new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}</span>
                  <span className="text-lg font-bold text-white">{new Date(date).getDate()}</span>
                  <div className={`mt-2 w-2 h-2 rounded-full ${dayTasks.length === 0 ? 'bg-slate-700' : allDone ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className="absolute bottom-2 text-[10px] text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">View</span>
                </button>
              )
            })}
          </div>
        </section>

        {/* --- STATS GRID --- */}
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
          <section className="bg-gradient-to-br from-[#121212] to-blue-900/10 border border-white/10 p-6 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-3xl rounded-full" />
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-400" /> Monthly Summary
            </h2>
            <div className="mt-6">
              <div className="flex justify-between text-sm mb-2 text-slate-300">
                <span>February Progress</span>
                <span>{monthlyStats.percentage}%</span>
              </div>
              <div className="w-full h-3 bg-black/50 rounded-full overflow-hidden border border-white/5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${monthlyStats.percentage}%` }}
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                />
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                 <div className="bg-black/40 p-3 rounded-lg border border-white/5">
                    <p className="text-xs text-slate-500">Total Assigned</p>
                    <p className="text-xl font-bold text-white">{monthlyStats.total}</p>
                 </div>
                 <div className="bg-black/40 p-3 rounded-lg border border-white/5">
                    <p className="text-xs text-slate-500">Tasks Done</p>
                    <p className="text-xl font-bold text-green-400">{monthlyStats.completed}</p>
                 </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* --- POPUP MODAL --- */}
      <AnimatePresence>
        {selectedHistoryDate && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#181818] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl"
            >
              <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                <h3 className="text-white font-bold flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-400" />
                  Work Log: {selectedHistoryDate}
                </h3>
                <button onClick={() => setSelectedHistoryDate(null)} className="p-1 hover:bg-white/10 rounded-full text-white"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-4 max-h-[60vh] overflow-y-auto">
                {tasks.filter(t => t.date === selectedHistoryDate).length === 0 ? (
                  <p className="text-center text-slate-500 py-6">No tasks found.</p>
                ) : (
                  tasks.filter(t => t.date === selectedHistoryDate).map(task => (
                    <div key={task.id} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                      <div>
                        <p className="text-slate-200 font-medium">{task.title}</p>
                        <p className="text-xs text-slate-500">{task.client}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {task.status === 'completed' ? (
                          <div className="flex items-center gap-1 text-green-400 bg-green-400/10 px-2 py-1 rounded text-xs font-bold"><Check className="w-3 h-3" /> Done</div>
                        ) : (
                          <div className="flex items-center gap-1 text-red-400 bg-red-400/10 px-2 py-1 rounded text-xs font-bold"><X className="w-3 h-3" /> Failed</div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
