import { createClient } from "@/lib/supabase/server";
import { mapTripRow, type Trip, type TripRow } from "@/lib/trips/types";

/**
 * The public feed: every trip, newest first, with the creator's profile
 * (display name + email) embedded via the trips→profiles foreign key.
 * Returns an empty list when Supabase isn't configured, the user isn't
 * signed in, or there's simply nothing to show yet — callers should render
 * an empty state rather than treat `[]` as an error.
 */
export async function getFeedTrips(): Promise<Trip[]> {
  const supabase = await createClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("trips")
    .select(
      "id, user_id, activity_type, location, location_place_id, location_lat, location_lng, scheduled_for, participants_wanted, created_at, creator:profiles(display_name, email)",
    )
    .order("created_at", { ascending: false });

  if (error || !data) return [];

  return (data as unknown as TripRow[]).map(mapTripRow);
}
