import { createBrowserClient } from "@supabase/ssr";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "@/lib/supabase/env";

/**
 * Supabase client for use in Client Components. Safe to call even when the
 * project isn't configured yet: it returns `null` instead of throwing so the
 * static UI keeps rendering (see `isSupabaseConfigured`).
 */
export function createClient() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null;
  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}
