import { createClient } from "@/lib/supabase/server";
import {
  mapApplicationRow,
  type TripApplication,
  type TripApplicationRow,
} from "@/lib/trips/applications";
import { mapTripRow, type Trip, type TripRow } from "@/lib/trips/types";

const TRIP_SELECT =
  "id, user_id, activity_type, location, location_place_id, location_lat, location_lng, scheduled_for, participants_wanted, created_at, creator:profiles(display_name, email)";

const APPLICATION_SELECT =
  "id, trip_id, applicant_id, status, created_at, applicant:profiles!trip_applications_applicant_id_fkey(display_name, email)";

function withApplications(
  trip: Trip,
  applications: TripApplication[],
): Trip {
  return {
    ...trip,
    applications: applications.filter((a) => a.tripId === trip.id),
  };
}

/**
 * The public feed: every trip, newest first, with the creator's profile
 * and the applications visible to the current user (own application, or
 * every application if they created the trip).
 */
export async function getFeedTrips(): Promise<Trip[]> {
  const supabase = await createClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("trips")
    .select(TRIP_SELECT)
    .order("created_at", { ascending: false });

  if (error || !data) return [];

  const trips = (data as unknown as TripRow[]).map(mapTripRow);
  if (trips.length === 0) return [];

  const { data: apps } = await supabase
    .from("trip_applications")
    .select(APPLICATION_SELECT)
    .in(
      "trip_id",
      trips.map((t) => t.id),
    );

  const applications = ((apps ?? []) as unknown as TripApplicationRow[]).map(
    mapApplicationRow,
  );

  return trips.map((trip) => withApplications(trip, applications));
}

export async function getTripById(tripId: string): Promise<Trip | null> {
  const supabase = await createClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("trips")
    .select(TRIP_SELECT)
    .eq("id", tripId)
    .maybeSingle();

  if (error || !data) return null;

  const trip = mapTripRow(data as unknown as TripRow);
  const { data: apps } = await supabase
    .from("trip_applications")
    .select(APPLICATION_SELECT)
    .eq("trip_id", tripId)
    .order("created_at", { ascending: true });

  const applications = ((apps ?? []) as unknown as TripApplicationRow[]).map(
    mapApplicationRow,
  );

  return withApplications(trip, applications);
}

export interface TripMessage {
  id: string;
  tripId: string;
  senderId: string;
  content: string;
  createdAt: string;
  sender: { displayName: string | null; email: string } | null;
}

interface TripMessageRow {
  id: string;
  trip_id: string;
  sender_id: string;
  content: string;
  created_at: string;
  sender?: { display_name: string | null; email: string } | null;
}

export function mapMessageRow(row: TripMessageRow): TripMessage {
  return {
    id: row.id,
    tripId: row.trip_id,
    senderId: row.sender_id,
    content: row.content,
    createdAt: row.created_at,
    sender: row.sender
      ? { displayName: row.sender.display_name, email: row.sender.email }
      : null,
  };
}

export async function getTripMessages(tripId: string): Promise<TripMessage[]> {
  const supabase = await createClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("trip_messages")
    .select(
      "id, trip_id, sender_id, content, created_at, sender:profiles!trip_messages_sender_id_fkey(display_name, email)",
    )
    .eq("trip_id", tripId)
    .order("created_at", { ascending: true });

  if (error || !data) return [];
  return (data as unknown as TripMessageRow[]).map(mapMessageRow);
}

export async function getCurrentUserId(): Promise<string | null> {
  const supabase = await createClient();
  if (!supabase) return null;
  const { data } = await supabase.auth.getUser();
  return data.user?.id ?? null;
}
