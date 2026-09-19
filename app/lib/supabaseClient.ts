import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Lazily create the client so missing env vars don't crash static export.
// Currently unused — returns null until Supabase is configured.
let cached: SupabaseClient | null = null

function getClient(): SupabaseClient | null {
  if (cached) return cached
  if (!supabaseUrl || !supabaseAnonKey) return null
  try {
    cached = createClient(supabaseUrl, supabaseAnonKey)
    return cached
  } catch {
    return null
  }
}

export const supabase: SupabaseClient | null = getClient()
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)
