"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/auth/submit-button";
import { createTripAction, type CreateTripState } from "@/lib/trips/actions";
import { ACTIVITY_TYPE_OPTIONS } from "@/lib/trips/activity-types";

const inputClassName =
  "h-[44px] w-full rounded-xl border-neutral-200 px-3.5 text-[14px] placeholder:text-neutral-400 focus-visible:ring-1 focus-visible:ring-neutral-300";

/**
 * The "+" button in the center of the bottom nav: opens a dialog with the
 * form that calls createTripAction (src/lib/trips/actions.ts) to insert a
 * new row in public.trips. On success, closes itself and resets — the
 * dashboard feed (once wired to getFeedTrips) picks up the new trip via the
 * action's revalidatePath("/dashboard").
 */
export function CreateTripDialog() {
  const [open, setOpen] = useState(false);
  const [state, formAction, isPending] = useActionState<
    CreateTripState,
    FormData
  >(createTripAction, null);
  const formRef = useRef<HTMLFormElement>(null);
  const wasPending = useRef(false);

  useEffect(() => {
    if (wasPending.current && !isPending && !state?.error) {
      setOpen(false);
      formRef.current?.reset();
    }
    wasPending.current = isPending;
  }, [isPending, state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        aria-label="Create post"
        className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white transition-colors hover:bg-black/90"
      >
        <Plus className="h-6 w-6" strokeWidth={2.25} />
      </DialogTrigger>

      <DialogContent showCloseButton>
        <DialogHeader>
          <DialogTitle>Create a trip</DialogTitle>
          <DialogDescription>
            Fill in the details and it&apos;ll show up in the feed.
          </DialogDescription>
        </DialogHeader>

        <form ref={formRef} action={formAction} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="activityType">Activity</Label>
            <Select name="activityType" defaultValue="cinema">
              <SelectTrigger id="activityType" className="w-full">
                <SelectValue placeholder="Choose an activity" />
              </SelectTrigger>
              <SelectContent>
                {ACTIVITY_TYPE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              placeholder="Milan, Italy"
              required
              className={inputClassName}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="scheduledFor">Date &amp; time</Label>
            <Input
              id="scheduledFor"
              name="scheduledFor"
              type="datetime-local"
              required
              className={inputClassName}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="participantsWanted">Number of people</Label>
            <Input
              id="participantsWanted"
              name="participantsWanted"
              type="number"
              min={1}
              defaultValue={2}
              required
              className={inputClassName}
            />
          </div>

          {state?.error && (
            <p className="text-[13px] text-red-500" role="alert">
              {state.error}
            </p>
          )}

          <SubmitButton
            className="h-[46px] w-full rounded-xl bg-black text-[15px] font-medium text-white hover:bg-black/90"
            pendingText="Creating…"
          >
            Create
          </SubmitButton>
        </form>
      </DialogContent>
    </Dialog>
  );
}
