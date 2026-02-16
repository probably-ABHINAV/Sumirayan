import { getDashboardTasks } from "@/app/actions/tasks"
import { syncStackUser } from "@/lib/sync-user"
import DashboardClient from "./dashboard-client"

export default async function DashboardPage() {
  const [tasks, user] = await Promise.all([
    getDashboardTasks(),
    syncStackUser()
  ])
  // Serialize user object to remove methods
  const serializedUser = user ? JSON.parse(JSON.stringify(user)) : null
  
  return <DashboardClient initialTasks={tasks} user={serializedUser} />
}
