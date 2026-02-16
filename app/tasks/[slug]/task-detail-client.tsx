"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { useState } from "react"
import { motion } from "framer-motion"
import { 
  ArrowLeft, CheckCircle2, XCircle, Paperclip, 
  Link as LinkIcon, Code2, Palette, Film, 
  FileText, Download
} from "lucide-react"
import { useRouter } from "next/navigation"

// --- TYPES ---
// DB uses snake_case enums, UI uses Title Case themes
// DB: developer, designer, video_editor
type Role = "developer" | "designer" | "video_editor" | "client" | "admin" | "manager"

const getTheme = (role: string | null) => {
  switch(role) {
    case "developer": return { color: "text-blue-400", bg: "bg-blue-500", border: "border-blue-500/20", icon: Code2 };
    case "designer": return { color: "text-pink-400", bg: "bg-pink-500", border: "border-pink-500/20", icon: Palette };
    case "video_editor": return { color: "text-purple-400", bg: "bg-purple-500", border: "border-purple-500/20", icon: Film };
    default: return { color: "text-gray-400", bg: "bg-gray-500", border: "border-gray-500/20", icon: Code2 };
  }
}

export default function TaskDetailClient({ task }: { task: any }) {
  const router = useRouter()
  
  if (!task) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">Task not found</div>

  const theme = getTheme(task.role_required)
  const RoleIcon = theme.icon

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-200 font-sans flex flex-col">
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
                  <RoleIcon className="w-3.5 h-3.5" /> {task.role_required?.replace('_', ' ').toUpperCase() || 'GENERAL'} TASK
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">{task.title}</h1>
                
                {/* Big Brief Box */}
                <div className="bg-[#121212] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                  <div className="p-6 border-b border-white/10 bg-white/5 flex items-center gap-2">
                      <FileText className={`w-5 h-5 ${theme.color}`} />
                      <h3 className="font-bold text-lg text-white">Detailed Instructions</h3>
                  </div>
                  <div className="p-8 prose prose-invert prose-lg max-w-none text-gray-300 whitespace-pre-line">
                    {task.full_brief || task.description || "No specific instructions provided."}
                  </div>
                  
                  {/* Assets Section */}
                  <div className="p-8 border-t border-white/10 bg-black/20">
                    <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
                      <Paperclip className="w-4 h-4" /> Assets
                    </h3>
                    {task.task_assets && task.task_assets.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {task.task_assets.map((asset: any, i: number) => (
                          <a key={i} href={asset.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 group transition-all">
                            <div className="p-3 rounded-lg bg-black/40 text-muted-foreground group-hover:text-white">{asset.type === 'link' ? <LinkIcon className="w-5 h-5" /> : <Download className="w-5 h-5" />}</div>
                            <span className="text-sm font-bold text-gray-200 group-hover:text-white truncate">{asset.name}</span>
                          </a>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-slate-500">No assets attached.</p>
                    )}
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
              
              {/* History Preview (Optional) */}
              {task.task_history && task.task_history.length > 0 && (
                 <div className="bg-[#121212] p-6 rounded-2xl border border-white/10 shadow-lg">
                   <h3 className="font-bold text-lg text-white mb-4">Activity</h3>
                   <div className="space-y-3">
                     {task.task_history.map((h: any, i: number) => (
                       <div key={i} className="text-sm border-b border-white/5 pb-2 last:border-0">
                         <span className="text-slate-400 block text-xs">{new Date(h.created_at).toLocaleString()}</span>
                         <span className="text-white">{h.action}</span>
                         {h.note && <p className="text-slate-500 italic mt-1">{h.note}</p>}
                       </div>
                     ))}
                   </div>
                 </div>
              )}
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
