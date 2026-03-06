import { stackServerApp } from "@/lib/stack-auth"
import { supabaseAdmin } from "@/lib/supabaseAdmin"

export async function syncStackUser() {
  try {
    const user = await stackServerApp.getUser()

    if (!user) return null

    const { error } = await supabaseAdmin
      .from("users")
      .upsert(
        {
          id: user.id,
          email: user.primaryEmail ?? user.email ?? "",
          full_name: user.displayName ?? user.primaryEmail ?? "User",
        },
        {
          onConflict: "id",
        }
      )

    if (error) {
      console.error("Failed to sync user:", error.message)
    }

    return user
  } catch (err) {
    console.error("Error in syncStackUser:", err)
    return null
  }
}
