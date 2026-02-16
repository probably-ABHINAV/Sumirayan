'use server'

import { supabaseAdmin } from "@/lib/supabaseAdmin"
import { syncStackUser } from "@/lib/sync-user"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

// --- TYPES ---
export type TaskStatus = 'todo' | 'in_progress' | 'in_review' | 'done' | 'archived'

export interface CreateTaskInput {
  title: string
  client?: string
  description?: string
  role_required: string // 'video_editor', etc
  deadline: string // YYYY-MM-DD
  slug: string
}

export interface Task {
  id: string
  slug: string
  title: string
  client: string | null
  date: string | null // YYYY-MM-DD
  status: TaskStatus
  description: string | null
  full_brief: string | null
  role_required: string | null
  deadline: string | null
  task_assets?: any[]
  task_history?: any[]
}

// --- ACTIONS ---

export async function getDashboardTasks() {
  const user = await syncStackUser()
  if (!user) return []

  const { data, error } = await supabaseAdmin
    .from('tasks')
    .select('*')
    .or(`assigned_to.eq.${user.id},created_by.eq.${user.id}`)
    .order('deadline', { ascending: true })

  if (error) {
    console.error("Error fetching tasks:", error)
    return []
  }

  return data as Task[]
}

export async function getTaskBySlug(slug: string) {
  const user = await syncStackUser()
  if (!user) return null

  const { data, error } = await supabaseAdmin
    .from('tasks')
    .select('*, task_assets(*), task_history(*)')
    .eq('slug', slug)
    .single()

  if (error) {
    // console.error("Error fetching task:", error) 
    // valid case if not found
    return null
  }

  return data as Task
}

export async function updateTaskStatus(taskId: string, newStatus: TaskStatus) {
  const user = await syncStackUser()
  if (!user) throw new Error("Unauthorized")

  const { error } = await supabaseAdmin
    .from('tasks')
    .update({ status: newStatus })
    .eq('id', taskId)
  
  if (error) throw new Error("Failed to update status")
  
  await supabaseAdmin.from('task_history').insert({
    task_id: taskId,
    action: 'STATUS_CHANGE',
    note: `Status updated to ${newStatus}`,
    created_by: user.id
  })

  revalidatePath('/dashboard')
}

export async function createTask(input: CreateTaskInput) {
  const user = await syncStackUser()
  if (!user) throw new Error("Unauthorized")
  
  // Basic validation
  if (!input.title || !input.slug) {
     throw new Error("Missing required fields")
  }

  // Insert
  const { error } = await supabaseAdmin.from('tasks').insert({
    title: input.title,
    client: input.client || null,
    description: input.description || null,
    full_brief: input.description || null, // Mapping description to brief for now
    role_required: input.role_required,
    deadline: input.deadline,
    slug: input.slug,
    status: 'todo',
    created_by: user.id,
    date: input.deadline // Mapping date to deadline for dashboard logic
    // assigned_to: logic? Default to self for now? 
    // Let's leave assigned_to null or assign to self if role matches?
    // For now: assigned_to = user.id (Self-assign)
    // assigned_to: user.id 
  })

  if (error) {
    console.error("Create Create Error", error)
    throw new Error("Failed to create task: " + error.message)
  }

  revalidatePath('/dashboard')
  redirect('/dashboard')
}
