export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

/**
 * Friendly message shown instead of crashing when the app owner hasn't
 * added the Supabase credentials yet (see README.md → "Collegare Supabase").
 */
export const SUPABASE_NOT_CONFIGURED_MESSAGE =
  "Login isn't connected to a database yet. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY (see README.md) and try again.";
