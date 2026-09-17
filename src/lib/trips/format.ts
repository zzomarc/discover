import type { Trip } from "@/lib/trips/types";

/** Falls back to the local part of the email when no display name is set. */
export function getDisplayName(profile: {
  displayName?: string | null;
  email: string;
}): string {
  if (profile.displayName && profile.displayName.trim()) {
    return profile.displayName.trim();
  }
  return profile.email.split("@")[0] ?? profile.email;
}

/** e.g. "Sat, Oct 3" — used for the #when tag. */
export function formatTripDate(scheduledFor: string): string {
  const date = new Date(scheduledFor);
  if (Number.isNaN(date.getTime())) return scheduledFor;
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(date);
}

/** The two content tags shown on a trip card: #where and #when. */
export function getTripTags(trip: Pick<Trip, "location" | "scheduledFor">): [
  string,
  string,
] {
  return [`#${trip.location}`, `#${formatTripDate(trip.scheduledFor)}`];
}

/**
 * "0/{participantsWanted}": nobody has joined yet because there's no join
 * flow implemented — the creator's own seat isn't counted either, to keep
 * this simple until a real RSVP/join feature exists.
 */
export function formatParticipantsBadge(
  trip: Pick<Trip, "participantsWanted">,
): string {
  return `0/${trip.participantsWanted}`;
}
