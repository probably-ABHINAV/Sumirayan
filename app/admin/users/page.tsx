
import { getAdminUsers } from "@/app/actions/admin"
import UserTable from "./user-table"

export default async function AdminUsersPage() {
  const users = await getAdminUsers()
  
  return <UserTable initialUsers={users} />
}
