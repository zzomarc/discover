import { Clapperboard, Music4 } from "lucide-react";
import type { ActivityType } from "@/lib/trips/types";
import { ACTIVITY_TYPE_META } from "@/lib/trips/activity-types";

const ACTIVITY_ICONS: Record<ActivityType, typeof Clapperboard> = {
  cinema: Clapperboard,
  concert: Music4,
};

/**
 * Placeholder artwork shown on a trip card while there are no real
 * per-activity photos yet: a gradient in the activity's brand color with its
 * icon. Drop a real photo at `/public/images/activities/<type>.jpg` and swap
 * this out for a plain <Image> once available.
 */
export function ActivityImage({
  activityType,
  className,
}: {
  activityType: ActivityType;
  className?: string;
}) {
  const Icon = ACTIVITY_ICONS[activityType];
  const [from, to] = ACTIVITY_TYPE_META[activityType].swatch;

  return (
    <div
      className={className}
      style={{
        background: `linear-gradient(135deg, ${from}, ${to})`,
      }}
    >
      <div className="flex h-full w-full items-center justify-center">
        <Icon className="h-9 w-9 text-white/90" strokeWidth={1.5} />
      </div>
    </div>
  );
}
