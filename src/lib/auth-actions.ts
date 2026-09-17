"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SUPABASE_NOT_CONFIGURED_MESSAGE, isSupabaseConfigured } from "@/lib/supabase/env";

export type AuthActionState = {
  error?: string;
  info?: string;
} | null;

function translateAuthError(message: string): string {
  const known: Record<string, string> = {
    "Invalid login credentials": "Incorrect email or password.",
    "User already registered": "An account with this email already exists.",
    "Password should be at least 6 characters":
      "Password must be at least 6 characters.",
    "Email not confirmed":
      "Please confirm your email before signing in. Check your inbox.",
  };
  return known[message] ?? message;
}

export async function signUpAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Please enter both email and password." };
  }

  if (!isSupabaseConfigured) {
    return { error: SUPABASE_NOT_CONFIGURED_MESSAGE };
  }

  const supabase = await createClient();
  if (!supabase) {
    return { error: SUPABASE_NOT_CONFIGURED_MESSAGE };
  }

  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return { error: translateAuthError(error.message) };
  }

  if (!data.session) {
    return {
      info: "Account created! Check your email to confirm your address before signing in.",
    };
  }

  redirect("/dashboard");
}

export async function signInAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Please enter both email and password." };
  }

  if (!isSupabaseConfigured) {
    return { error: SUPABASE_NOT_CONFIGURED_MESSAGE };
  }

  const supabase = await createClient();
  if (!supabase) {
    return { error: SUPABASE_NOT_CONFIGURED_MESSAGE };
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: translateAuthError(error.message) };
  }

  redirect("/dashboard");
}

export async function signOutAction() {
  const supabase = await createClient();
  if (supabase) {
    await supabase.auth.signOut();
  }
  redirect("/login");
}
