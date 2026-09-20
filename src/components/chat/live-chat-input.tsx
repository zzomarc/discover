"use client";

import { Image as ImageIcon, Mic, Smile } from "lucide-react";
import { useActionState, useEffect, useRef } from "react";
import {
  sendTripMessageAction,
  type ApplyActionState,
} from "@/lib/trips/apply-actions";

export function LiveChatInput({ tripId }: { tripId: string }) {
  const [state, formAction, pending] = useActionState<ApplyActionState, FormData>(
    sendTripMessageAction,
    null,
  );
  const formRef = useRef<HTMLFormElement>(null);
  const wasPending = useRef(false);

  useEffect(() => {
    if (wasPending.current && !pending && !state?.error) {
      formRef.current?.reset();
    }
    wasPending.current = pending;
  }, [pending, state]);

  return (
    <div className="shrink-0 px-5 pt-[18px] pb-2">
      <form
        ref={formRef}
        action={formAction}
        className="flex h-[46px] items-center rounded-full border border-neutral-200 pr-3 pl-4"
      >
        <input type="hidden" name="tripId" value={tripId} />
        <input
          type="text"
          name="content"
          placeholder="Message..."
          autoComplete="off"
          className="min-w-0 flex-1 bg-transparent text-[15px] text-black outline-none placeholder:text-neutral-400"
        />
        <button type="submit" className="sr-only">
          Send
        </button>
        <div className="flex shrink-0 items-center gap-3">
          <Mic className="h-5 w-5 text-neutral-400" strokeWidth={1.75} />
          <Smile className="h-5 w-5 text-neutral-400" strokeWidth={1.75} />
          <ImageIcon className="h-5 w-5 text-neutral-400" strokeWidth={1.75} />
        </div>
      </form>
      {state?.error && (
        <p className="mt-1.5 text-center text-[12px] text-red-500" role="alert">
          {state.error}
        </p>
      )}
    </div>
  );
}
