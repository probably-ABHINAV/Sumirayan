
import { getTaskBySlug } from "@/app/actions/tasks"
// import { notFound } from "next/navigation" 
import TaskDetailClient from "./task-detail-client"

export default async function TaskDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const task = await getTaskBySlug(params.slug)
  
  if (!task) {
    // return notFound() // or handle gracefully
    return <div className="text-white p-20 text-center">Task Not Found</div>
  }

  return <TaskDetailClient task={task} />
}
