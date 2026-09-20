import { PhoneFrame } from "@/components/chrome/phone-frame";
import { BottomNav } from "@/components/dashboard/bottom-nav";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { FilterPills } from "@/components/dashboard/filter-pills";
import { TripCard } from "@/components/dashboard/trip-card";
import { ACTIVITY_TYPE_META } from "@/lib/trips/activity-types";
import {
  formatParticipantsBadge,
  getDisplayName,
  getTripTags,
  isTripFull,
} from "@/lib/trips/format";
import { getCurrentUserId, getFeedTrips } from "@/lib/trips/queries";
import type { Trip } from "@/lib/trips/types";

function badgeModeFor(
  trip: Trip,
  userId: string | null,
): "apply" | "pending" | "chat" | "full" | "own" {
  if (!userId) return isTripFull(trip) ? "full" : "apply";
  if (trip.userId === userId) return "own";

  const mine = (trip.applications ?? []).find((a) => a.applicantId === userId);
  if (mine?.status === "accepted") return "chat";
  if (mine?.status === "pending") return "pending";
  if (isTripFull(trip)) return "full";
  return "apply";
}

export default async function DashboardPage() {
  const [trips, userId] = await Promise.all([getFeedTrips(), getCurrentUserId()]);

  return (
    <PhoneFrame>
      <DashboardHeader />
      <FilterPills />

      <div className="flex-1 overflow-y-auto px-5">
        {trips.length === 0 ? (
          <EmptyFeed />
        ) : (
          <div className="flex flex-col gap-[27px] pb-6">
            {trips.map((trip) => (
              <TripCard
                key={trip.id}
                tripId={trip.id}
                activityType={trip.activityType}
                creatorName={
                  trip.creator ? getDisplayName(trip.creator) : "Someone"
                }
                title={ACTIVITY_TYPE_META[trip.activityType].label}
                tags={getTripTags(trip)}
                participants={formatParticipantsBadge(trip)}
                badgeMode={badgeModeFor(trip, userId)}
              />
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </PhoneFrame>
  );
}

function EmptyFeed() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 pb-16 text-center">
      <p className="text-[17px] font-bold text-black">No trips yet</p>
      <p className="max-w-[240px] text-[14px] text-neutral-500">
        Tap the + button below to create your first one.
      </p>
    </div>
  );
}
