import type { ActivityType } from "@/lib/trips/types";

/**
 * Metadata for each activity type a trip can be created with. `label` is
 * shown in the (future) activity picker and as the card title; `swatch`
 * drives the placeholder artwork rendered by <ActivityImage> until real
 * photos are provided per type (see components/trips/activity-image.tsx).
 */
export const ACTIVITY_TYPE_META: Record<
  ActivityType,
  { label: string; swatch: [string, string] }
> = {
  cinema: { label: "Cinema", swatch: ["#1f2937", "#4338ca"] },
  concert: { label: "Concert", swatch: ["#7c2d12", "#db2777"] },
};

export const ACTIVITY_TYPE_OPTIONS = (
  Object.keys(ACTIVITY_TYPE_META) as ActivityType[]
).map((value) => ({ value, label: ACTIVITY_TYPE_META[value].label }));
