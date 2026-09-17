import Image from "next/image";
import { DefaultAvatar } from "@/components/dashboard/default-avatar";
import { ParticipantsBadge } from "@/components/dashboard/participants-badge";
import { TagPill } from "@/components/dashboard/tag-pill";

export function TripCard({
  title,
  tags,
  participants,
}: {
  title: string;
  tags: [string, string, string];
  participants?: string;
}) {
  return (
    <article className="shrink-0 rounded-2xl border border-neutral-200 p-2.5">
      <div className="flex items-center gap-3">
        <DefaultAvatar size={40} />
        <span className="text-[19px] leading-none font-bold text-black">
          User
        </span>
      </div>

      <div className="mt-2 h-px w-full bg-neutral-200" />

      <div className="relative mt-2.5 h-[125px] w-full overflow-hidden rounded-md">
        <Image
          src="/images/camper-trip.jpg"
          alt="Foto del viaggio in camper tra i vigneti"
          fill
          sizes="400px"
          className="object-cover"
        />
      </div>

      <h3 className="mt-3.5 text-[21px] leading-none font-bold text-black">
        {title}
      </h3>

      <div className="mt-3 flex gap-2">
        {tags.map((tag, i) => (
          <TagPill key={i}>{tag}</TagPill>
        ))}
      </div>

      {participants && (
        <div className="mt-3 flex justify-end">
          <ParticipantsBadge count={participants} />
        </div>
      )}
    </article>
  );
}
