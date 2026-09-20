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
  "h-[46px] w-full rounded-xl border-neutral-200 px-3.5 text-[14px] text-black placeholder:text-neutral-400 focus-visible:border-neutral-300 focus-visible:ring-1 focus-visible:ring-neutral-300";

const labelClassName = "text-[13px] font-medium text-black";

/**
 * The "+" button in the center of the bottom nav: opens a dialog with the
 * form that calls createTripAction (src/lib/trips/actions.ts) to insert a
 * new row in public.trips. On success, closes itself and resets — the
 * dashboard feed picks up the new trip via the action's
 * revalidatePath("/dashboard").
 *
 * Styled to match the rest of the app (same input/button treatment as the
 * login & signup screens) rather than the generic shadcn defaults — see
 * className overrides below. Marco will share a reference screenshot for
 * this screen later; revisit then to match it exactly.
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

      <DialogContent
        showCloseButton
        className="w-[calc(100%-2rem)] max-w-[350px] rounded-2xl border border-neutral-200 bg-white p-6 shadow-none ring-0 [&_[data-slot=dialog-close]]:text-neutral-400 [&_[data-slot=dialog-close]]:hover:bg-transparent [&_[data-slot=dialog-close]]:hover:text-black"
      >
        <DialogHeader className="gap-1.5">
          <DialogTitle className="text-[19px] leading-none font-bold tracking-tight text-black">
            Create a trip
          </DialogTitle>
          <DialogDescription className="text-[14px] text-neutral-500">
            Fill in the details and it&apos;ll show up in the feed.
          </DialogDescription>
        </DialogHeader>

        <form
          ref={formRef}
          action={formAction}
          className="mt-2.5 flex w-full flex-col gap-[18px]"
        >
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="activityType" className={labelClassName}>
              Activity
            </Label>
            <Select name="activityType" defaultValue="cinema">
              <SelectTrigger
                id="activityType"
                className="h-[46px] w-full rounded-xl border-neutral-200 px-3.5 text-[14px] text-black data-[size=default]:h-[46px]"
              >
                <SelectValue placeholder="Choose an activity" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border border-neutral-200 shadow-sm ring-0">
                {ACTIVITY_TYPE_OPTIONS.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="text-[14px] text-black focus:bg-neutral-100 focus:text-black"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="location" className={labelClassName}>
              Location
            </Label>
            <Input
              id="location"
              name="location"
              placeholder="Milan, Italy"
              required
              className={inputClassName}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="scheduledFor" className={labelClassName}>
              Date &amp; time
            </Label>
            <Input
              id="scheduledFor"
              name="scheduledFor"
              type="datetime-local"
              required
              className={inputClassName}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="participantsWanted" className={labelClassName}>
              Number of people
            </Label>
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
