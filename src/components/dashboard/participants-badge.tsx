"use client";

import type { ReactNode } from "react";
import { useActionState } from "react";
import { DefaultAvatar } from "@/components/dashboard/default-avatar";
import {
  applyToTripAction,
  openTripChatAction,
  type ApplyActionState,
} from "@/lib/trips/apply-actions";
import { cn } from "@/lib/utils";

type Mode = "apply" | "pending" | "chat" | "full" | "own";

function BadgeShell({
  count,
  className,
  children,
}: {
  count: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-[#F2F2F6] py-[5px] pr-4 pl-[5px]",
        className,
      )}
    >
      <DefaultAvatar size={28} />
      <span className="text-[14px] leading-none text-black">{count}</span>
      {children}
    </span>
  );
}

function ApplyForm({ tripId, count }: { tripId: string; count: string }) {
  const [state, formAction] = useActionState<ApplyActionState, FormData>(
    applyToTripAction,
    null,
  );

  return (
    <div className="flex flex-col items-end gap-1">
      <form action={formAction}>
        <input type="hidden" name="tripId" value={tripId} />
        <button type="submit" aria-label="Apply to this trip">
          <BadgeShell count={count} className="transition-colors hover:bg-neutral-200" />
        </button>
      </form>
      {state?.error && (
        <p className="max-w-[180px] text-right text-[11px] text-red-500" role="alert">
          {state.error}
        </p>
      )}
      {state?.info && (
        <p className="max-w-[180px] text-right text-[11px] text-neutral-500" role="status">
          {state.info}
        </p>
      )}
    </div>
  );
}

export function ParticipantsBadge({
  tripId,
  count,
  mode,
}: {
  tripId: string;
  count: string;
  mode: Mode;
}) {
  if (mode === "apply") {
    return <ApplyForm tripId={tripId} count={count} />;
  }

  if (mode === "chat" || mode === "own") {
    return (
      <form action={openTripChatAction}>
        <input type="hidden" name="tripId" value={tripId} />
        <button type="submit" aria-label="Open trip chat">
          <BadgeShell count={count} className="transition-colors hover:bg-neutral-200" />
        </button>
      </form>
    );
  }

  return (
    <BadgeShell
      count={count}
      className={mode === "full" ? "opacity-60" : undefined}
    />
  );
}
