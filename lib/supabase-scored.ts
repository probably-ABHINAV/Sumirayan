import { createClient } from "@supabase/supabase-js"
import jwt from "jsonwebtoken"
import { supabaseAdmin } from "./supabaseAdmin" // Fallback
import { UserRole } from "@/app/actions/admin"

// This client enforces RLS by signing a token for the specific user.
// If SUPABASE_JWT_SECRET is missing, it falls back to Admin (Service Role)
// but warns about the security gap.

export async function createSupabaseUserClient(user: { id: string, role: string }) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  const jwtSecret = process.env.SUPABASE_JWT_SECRET

  if (!jwtSecret) {
    console.warn("⚠️ SUPABASE_JWT_SECRET is missing. RLS policies are NOT being enforced strictly. Application logic is checking roles, but DB-level protection is bypassed (using Service Role).")
    return supabaseAdmin
  }

  // Mint a custom token for Supabase
  // We include 'user_role' claim which our RLS policies check
  const token = jwt.sign(
    {
      sub: user.id,
      aud: "authenticated",
      role: "authenticated",
      user_role: user.role, // Custom claim for our policies
      exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hour
    },
    jwtSecret
  )

  // Create a client with this token
  const client = createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    }
  })

  return client
}
