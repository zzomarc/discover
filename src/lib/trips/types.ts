export type ActivityType = "cinema" | "concert";

export const ACTIVITY_TYPE_VALUES: readonly ActivityType[] = [
  "cinema",
  "concert",
] as const;

export function isActivityType(value: unknown): value is ActivityType {
  return (
    typeof value === "string" &&
    (ACTIVITY_TYPE_VALUES as readonly string[]).includes(value)
  );
}

export interface Trip {
  id: string;
  userId: string;
  activityType: ActivityType;
  location: string;
  locationPlaceId: string | null;
  locationLat: number | null;
  locationLng: number | null;
  /** ISO timestamp of when the activity will happen. */
  scheduledFor: string;
  participantsWanted: number;
  createdAt: string;
  /** Present when the query embeds the creator's profile (see queries.ts). */
  creator?: {
    displayName: string | null;
    email: string;
  } | null;
}

/**
 * Raw shape of a row as it comes back from Supabase (snake_case columns,
 * optional embedded `creator` from the profiles table).
 */
export interface TripRow {
  id: string;
  user_id: string;
  activity_type: ActivityType;
  location: string;
  location_place_id: string | null;
  location_lat: number | null;
  location_lng: number | null;
  scheduled_for: string;
  participants_wanted: number;
  created_at: string;
  creator?: { display_name: string | null; email: string } | null;
}

export function mapTripRow(row: TripRow): Trip {
  return {
    id: row.id,
    userId: row.user_id,
    activityType: row.activity_type,
    location: row.location,
    locationPlaceId: row.location_place_id,
    locationLat: row.location_lat,
    locationLng: row.location_lng,
    scheduledFor: row.scheduled_for,
    participantsWanted: row.participants_wanted,
    createdAt: row.created_at,
    creator: row.creator
      ? { displayName: row.creator.display_name, email: row.creator.email }
      : null,
  };
}
