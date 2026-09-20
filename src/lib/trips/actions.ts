"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured, SUPABASE_NOT_CONFIGURED_MESSAGE } from "@/lib/supabase/env";
import { isActivityType } from "@/lib/trips/types";

export type CreateTripState = { error?: string } | null;

/**
 * Creates a trip on behalf of the signed-in user. There's no form wired to
 * this yet (see components/trips — not built), but the backend/data model
 * is ready: this is what the future "create post" button will call.
 */
export async function createTripAction(
  _prevState: CreateTripState,
  formData: FormData,
): Promise<CreateTripState> {
  const activityType = String(formData.get("activityType") ?? "");
  const location = String(formData.get("location") ?? "").trim();
  const scheduledFor = String(formData.get("scheduledFor") ?? "");
  const participantsWanted = Number(formData.get("participantsWanted"));
  const locationPlaceId = formData.get("locationPlaceId");
  const locationLat = formData.get("locationLat");
  const locationLng = formData.get("locationLng");

  if (!isActivityType(activityType)) {
    return { error: "Choose a valid activity type." };
  }
  if (!location) {
    return { error: "Please enter a location." };
  }
  const scheduledDate = new Date(scheduledFor);
  if (Number.isNaN(scheduledDate.getTime())) {
    return { error: "Please choose a valid date." };
  }
  if (!Number.isInteger(participantsWanted) || participantsWanted < 1) {
    return { error: "Number of people must be at least 1." };
  }

  if (!isSupabaseConfigured) {
    return { error: SUPABASE_NOT_CONFIGURED_MESSAGE };
  }

  const supabase = await createClient();
  if (!supabase) {
    return { error: SUPABASE_NOT_CONFIGURED_MESSAGE };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be signed in to create a trip." };
  }

  const { error } = await supabase.from("trips").insert({
    user_id: user.id,
    activity_type: activityType,
    location,
    location_place_id: locationPlaceId ? String(locationPlaceId) : null,
    location_lat: locationLat ? Number(locationLat) : null,
    location_lng: locationLng ? Number(locationLng) : null,
    scheduled_for: scheduledDate.toISOString(),
    participants_wanted: participantsWanted,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  return null;
}
