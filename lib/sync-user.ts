import { stackServerApp } from "@/lib/stack-auth"
import { supabaseAdmin } from "@/lib/supabaseAdmin"

export async function syncStackUser() {
  try {
    const user = await stackServerApp.getUser()

    if (!user) return null

    const email = user.primaryEmail ?? ""
    const name = user.displayName ?? email

    const { error } = await supabaseAdmin
      .from("users")
      .upsert(
        {
          id: user.id,
          email: email,
          full_name: name,
        },
        {
          onConflict: "id",
        }
      )

    if (error) {
      console.error("User sync failed:", error.message)
    }

    return user
  } catch (error) {
    console.error("syncStackUser error:", error)
    return null
  }
}
