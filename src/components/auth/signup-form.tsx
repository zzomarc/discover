"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/auth/submit-button";
import { signUpAction, type AuthActionState } from "@/lib/auth-actions";

const inputClassName =
  "h-[46px] w-full rounded-xl border-neutral-200 px-3.5 text-[14px] placeholder:text-neutral-400 focus-visible:ring-1 focus-visible:ring-neutral-300";

export function SignUpForm() {
  const [state, formAction] = useActionState<AuthActionState, FormData>(
    signUpAction,
    null,
  );

  return (
    <form action={formAction} className="mt-2.5 flex w-full flex-col gap-[18px]">
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
        autoComplete="new-password"
        minLength={6}
        required
        className={inputClassName}
      />

      {state?.error && (
        <p className="-mt-1.5 text-[13px] text-red-500" role="alert">
          {state.error}
        </p>
      )}
      {state?.info && (
        <p className="-mt-1.5 text-[13px] text-green-600" role="status">
          {state.info}
        </p>
      )}

      <SubmitButton
        className="h-[46px] w-full rounded-xl bg-black text-[15px] font-medium text-white hover:bg-black/90"
        pendingText="Creating account…"
      >
        Continue
      </SubmitButton>
    </form>
  );
}
