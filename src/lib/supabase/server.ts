import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "@/lib/supabase/env";

/**
 * Supabase client for use in Server Components, Server Actions and Route
 * Handlers. Returns `null` when the project isn't configured yet.
 */
export async function createClient() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null;

  const cookieStore = await cookies();

  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // Called from a Server Component render (not an Action/Route
          // Handler): cookies can't be set here. The middleware below
          // takes care of refreshing the session on every request, so
          // this is safe to ignore.
        }
      },
    },
  });
}
