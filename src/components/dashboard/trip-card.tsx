import { DefaultAvatar } from "@/components/dashboard/default-avatar";
import { ParticipantsBadge } from "@/components/dashboard/participants-badge";
import { TagPill } from "@/components/dashboard/tag-pill";
import { ActivityImage } from "@/components/trips/activity-image";
import type { ActivityType } from "@/lib/trips/types";

export function TripCard({
  tripId,
  activityType,
  creatorName,
  title,
  tags,
  participants,
  badgeMode,
}: {
  tripId: string;
  activityType: ActivityType;
  creatorName: string;
  title: string;
  tags: string[];
  participants: string;
  badgeMode: "apply" | "pending" | "chat" | "full" | "own";
}) {
  return (
    <article className="shrink-0 rounded-2xl border border-neutral-200 p-2.5">
      <div className="flex items-center gap-3">
        <DefaultAvatar size={40} />
        <span className="truncate text-[19px] leading-none font-bold text-black">
          {creatorName}
        </span>
      </div>

      <div className="mt-2 h-px w-full bg-neutral-200" />

      <ActivityImage
        activityType={activityType}
        className="relative mt-2.5 h-[125px] w-full overflow-hidden rounded-md"
      />

      <h3 className="mt-3.5 text-[21px] leading-none font-bold text-black">
        {title}
      </h3>

      <div className="mt-3 flex gap-2">
        {tags.map((tag, i) => (
          <TagPill key={i}>{tag}</TagPill>
        ))}
      </div>

      <div className="mt-3 flex justify-end">
        <ParticipantsBadge tripId={tripId} count={participants} mode={badgeMode} />
      </div>
    </article>
  );
}
