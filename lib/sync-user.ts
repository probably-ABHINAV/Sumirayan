
import { stackServerApp } from "@/lib/stack-auth"
import { supabaseAdmin } from "@/lib/supabaseAdmin"

/**
 * Syncs the current Stack Auth user to the Supabase public.users table.
 * This ensures Referential Integrity for Foreign Keys (e.g. tasks.assigned_to).
 * 
 * Should be called in Server Components (e.g. Layout, Page, or Server Actions).
 */
export async function syncStackUser() {
  try {
    const user = await stackServerApp.getUser()
    
    // If not logged in, nothing to sync
    if (!user) return null

    // Prepare user data mapping
    // Note: 'role' in Stack might need mapping to 'role' in DB enum
    // For now, we default to 'client' or map if metadata exists
    // You can enhance this by fetching Stack roles or metadata

    const { error } = await supabaseAdmin.from('users').upsert({
      id: user.id,
      email: user.primaryEmail,
      full_name: user.displayName,
      // We do NOT overwrite 'role' here preventing accidental demotion of admins
      // role: dbRole, 
      // updated_at will be set by DB trigger if we had one, or we set it manually
      // updated_at: new Date().toISOString() // Removing this as column doesn't exist yet
    }, {
      onConflict: 'id',
      ignoreDuplicates: false, 
    })

    if (error) {
      console.error("DEBUG: Failed to sync user to Supabase:", error.message)
    } else {
      // console.log("DEBUG: Synced user:", user.id)
    }

    return user
  } catch (err) {
    console.error("DEBUG: Error in syncStackUser:", err)
    return null
  }
}
