"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createTask } from "@/app/actions/tasks"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ArrowLeft, Loader2 } from "lucide-react"

export default function CreateTaskPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const title = formData.get("title") as string
    const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '')
    
    try {
        await createTask({
            title: title,
            client: formData.get("client") as string,
            description: formData.get("description") as string,
            role_required: formData.get("role_required") as string,
            deadline: formData.get("deadline") as string,
            slug: slug
        })
        // Redirect handled by Server Action
    } catch (err: any) {
        setError(err.message || "Failed to create task")
        setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-200 font-sans flex flex-col">
      <Header />
      <main className="flex-grow pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto w-full">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <h1 className="text-3xl font-bold text-white mb-8">Create New Task</h1>

        {error && <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl mb-6">{error}</div>}

        <form onSubmit={onSubmit} className="space-y-6 bg-[#121212] p-8 rounded-2xl border border-white/10">
            <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Task Title</label>
                <input name="title" required className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none" placeholder="e.g. Website Redesign" />
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Client Name</label>
                <input name="client" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none" placeholder="e.g. Acme Corp" />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Role Required</label>
                    <select name="role_required" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none">
                        <option value="developer">Developer</option>
                        <option value="designer">Designer</option>
                        <option value="video_editor">Video Editor</option>
                        <option value="client">Client</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Deadline</label>
                    <input name="deadline" type="date" required className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none" />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Description / Brief</label>
                <textarea name="description" rows={5} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none" placeholder="Detailed instructions..."></textarea>
            </div>

            <button disabled={loading} type="submit" className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all flex justify-center items-center">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create Task"}
            </button>
        </form>
      </main>
      <Footer />
    </div>
  )
}
