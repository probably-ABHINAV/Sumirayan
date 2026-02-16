"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { 
  ArrowLeft, Calendar, CheckCircle2, XCircle, Paperclip, 
  Clock, Link as LinkIcon, Code2, Palette, Film, 
  FileText, AlertCircle, Download
} from "lucide-react"

// --- TYPES & HELPERS ---
type Role = "Developer" | "Graphic Designer" | "Video Editor"
type Status = "pending" | "completed" | "revision"

interface TaskDetail {
  id: string
  slug: string
  title: string
  description: string
  fullBrief: string
  role: Role
  deadline: string
  status: Status
  assets: { name: string; url: string; type: "link" | "file" }[]
  history: { date: string; action: string; note?: string }[]
}

const getTheme = (role: Role) => {
  switch(role) {
    case "Developer": return { color: "text-blue-400", bg: "bg-blue-500", border: "border-blue-500/20", icon: Code2 };
    case "Graphic Designer": return { color: "text-pink-400", bg: "bg-pink-500", border: "border-pink-500/20", icon: Palette };
    case "Video Editor": return { color: "text-purple-400", bg: "bg-purple-500", border: "border-purple-500/20", icon: Film };
    default: return { color: "text-gray-400", bg: "bg-gray-500", border: "border-gray-500/20", icon: Code2 };
  }
}

// --- MOCK DATA FETCH ---
const getTaskBySlug = (slug: string): TaskDetail | undefined => {
  // Demo Data - Add more as needed
  const TASKS: TaskDetail[] = [
    {
      id: "2",
      slug: "social-media-reels",
      title: "Instagram Reels - Ep 44",
      description: "Edit raw footage. 3 clips needed.",
      fullBrief: "We need 3 reels extracted from the Episode 44 raw footage. \n\n1. Focus on the segment about 'AI Ethics' (timestamp 14:20 - 18:00). \n2. Second clip covering 'Future of Design' (22:00 - 24:30). \n\n**Requirements:**\n- Add captions in the brand font (Inter Bold).\n- Use the standard yellow highlight color for emphasis.\n- Export in 1080x1920 vertical format.",
      role: "Video Editor",
      deadline: "Tomorrow, 5:00 PM",
      status: "pending",
      assets: [
        { name: "Raw Footage (Drive)", url: "#", type: "link" },
        { name: "Brand Guidelines.pdf", url: "#", type: "file" }
      ],
      history: [{ date: "Oct 24, 10:00 AM", action: "Task Created" }]
    },
     {
      id: "1",
      slug: "fix-login-api",
      title: "Fix Login API Bug",
      description: "Users getting 403 error on dashboard refresh.",
      fullBrief: "The authentication token is expiring prematurely. Please debug the Auth Middleware.",
      role: "Developer",
      deadline: "Today, 5:00 PM",
      status: "pending",
      assets: [{ name: "Sentry Logs", url: "#", type: "link" }],
      history: [{ date: "Today, 9:00 AM", action: "Task Created" }]
    }
  ]
  return TASKS.find(t => t.slug === slug)
}

export default function TaskDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [task, setTask] = useState<TaskDetail | null>(null)
  
  useEffect(() => {
    if (params?.slug) {
      setTask(getTaskBySlug(params.slug as string) || null)
    }
  }, [params])

  if (!task) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">Loading...</div>

  const theme = getTheme(task.role)
  const RoleIcon = theme.icon

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-foreground font-sans flex flex-col">
      <Header />
      
      <main className="flex-grow pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Back Button */}
          <button onClick={() => router.back()} className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors mb-8 group">
            <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10"><ArrowLeft className="w-4 h-4" /></div>
            Back to Workspace
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* LEFT: Content */}
            <div className="lg:col-span-2 space-y-8">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                
                {/* Header Block */}
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border mb-4 ${theme.border} ${theme.bg}/10 ${theme.color}`}>
                  <RoleIcon className="w-3.5 h-3.5" /> {task.role} Task
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">{task.title}</h1>
                
                {/* Big Brief Box */}
                <div className="bg-[#121212] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                  <div className="p-6 border-b border-white/10 bg-white/5 flex items-center gap-2">
                      <FileText className={`w-5 h-5 ${theme.color}`} />
                      <h3 className="font-bold text-lg text-white">Detailed Instructions</h3>
                  </div>
                  <div className="p-8 prose prose-invert prose-lg max-w-none text-gray-300 whitespace-pre-line">
                    {task.fullBrief}
                  </div>
                  <div className="p-8 border-t border-white/10 bg-black/20">
                    <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
                      <Paperclip className="w-4 h-4" /> Assets
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {task.assets.map((asset, i) => (
                        <a key={i} href={asset.url} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 group transition-all">
                          <div className="p-3 rounded-lg bg-black/40 text-muted-foreground group-hover:text-white">{asset.type === 'link' ? <LinkIcon className="w-5 h-5" /> : <Download className="w-5 h-5" />}</div>
                          <span className="text-sm font-bold text-gray-200 group-hover:text-white truncate">{asset.name}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* RIGHT: Actions */}
            <div className="space-y-6 sticky top-28 h-fit">
              <div className="bg-[#121212] p-6 rounded-2xl border border-white/10 shadow-lg">
                  <h3 className="font-bold text-lg text-white mb-6">Actions</h3>
                  <div className="space-y-3">
                      <button className="w-full py-4 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold flex items-center justify-center gap-2 transition-all">
                          <CheckCircle2 className="w-5 h-5" /> Mark Complete
                      </button>
                      <button className="w-full py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-muted-foreground hover:text-red-400 flex items-center justify-center gap-2 transition-all">
                          <XCircle className="w-5 h-5" /> Report Issue
                      </button>
                  </div>
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}