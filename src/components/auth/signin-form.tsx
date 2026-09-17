"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/auth/submit-button";
import { signInAction, type AuthActionState } from "@/lib/auth-actions";

const inputClassName =
  "h-[46px] w-full rounded-xl border-neutral-200 px-3.5 text-[14px] placeholder:text-neutral-400 focus-visible:ring-1 focus-visible:ring-neutral-300";

export function SignInForm() {
  const [state, formAction] = useActionState<AuthActionState, FormData>(
    signInAction,
    null,
  );

  return (
    <form action={formAction} className="mt-2.5 flex w-full flex-col gap-[18px]">
      <div className="flex w-full flex-col gap-2">
        <Input
          type="email"
          name="email"
          placeholder="email@domain.com"
          autoComplete="email"
          required
          className={inputClassName}
        />

        <Input
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="current-password"
          required
          className={inputClassName}
        />
      </div>

      {state?.error && (
        <p className="-mt-1.5 text-[13px] text-red-500" role="alert">
          {state.error}
        </p>
      )}

      <SubmitButton
        className="h-[46px] w-full rounded-xl bg-black text-[15px] font-medium text-white hover:bg-black/90"
        pendingText="Signing in…"
      >
        Log in
      </SubmitButton>
    </form>
  );
}
