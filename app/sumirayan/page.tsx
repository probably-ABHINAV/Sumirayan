"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Video, Palette, Server, ArrowRight } from "lucide-react"

const ROLES = [
  {
    id: "video-editor",
    title: "Video Editor",
    icon: Video,
    color: "from-blue-600 to-cyan-500",
    desc: "Manage timelines, renders, and revisions."
  },
  {
    id: "graphic-designer",
    title: "Graphic Designer",
    icon: Palette,
    color: "from-purple-600 to-pink-500",
    desc: "Track posters, logos, and creative assets."
  },
  {
    id: "it-manager",
    title: "IT Department",
    icon: Server,
    color: "from-emerald-600 to-green-500",
    desc: "Monitor systems, backend fixes, and status."
  }
]

export default function SumiranLanding() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col items-center justify-center p-4">
      
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-slate-500">
          Sumirayan Workspace
        </h1>
        <p className="text-slate-400 text-lg max-w-xl mx-auto">
          Select your role to enter the dashboard.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl w-full perspective-1000">
        {ROLES.map((role, i) => (
          // --- LINK FIX: Ab ye '/sumiran/video-editor' par jayega ---
          <Link href={`/sumiran/${role.id}`} key={role.id} className="group">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ 
                y: -10, 
                rotateY: 5,
                boxShadow: "0px 20px 40px rgba(0,0,0,0.5)"
              }}
              className="relative h-[400px] bg-[#111] rounded-2xl border border-white/10 p-8 flex flex-col justify-between overflow-hidden transition-all duration-300 group-hover:border-white/20"
            >
              <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${role.color} opacity-10 blur-[80px] rounded-full group-hover:opacity-20 transition-opacity`} />
              
              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${role.color} flex items-center justify-center mb-6 shadow-lg`}>
                  <role.icon className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-3xl font-bold mb-3">{role.title}</h2>
                <p className="text-slate-400 leading-relaxed">
                  {role.desc}
                </p>
              </div>

              <div className="relative z-10 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider opacity-60 group-hover:opacity-100 transition-opacity">
                Open Dashboard <ArrowRight className="w-4 h-4" />
              </div>

              <div className={`absolute left-0 top-2 bottom-2 w-1.5 rounded-r bg-gradient-to-b ${role.color} opacity-50`} />
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  )
}


