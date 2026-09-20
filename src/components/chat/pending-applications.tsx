import { DefaultAvatar } from "@/components/dashboard/default-avatar";
import { respondToApplicationAction } from "@/lib/trips/apply-actions";
import { getDisplayName } from "@/lib/trips/format";
import type { TripApplication } from "@/lib/trips/applications";

export function PendingApplications({
  tripId,
  applications,
  isFull,
}: {
  tripId: string;
  applications: TripApplication[];
  isFull: boolean;
}) {
  const pending = applications.filter((a) => a.status === "pending");
  if (pending.length === 0) return null;

  return (
    <div className="shrink-0 border-b border-neutral-200 px-5 py-3">
      <p className="text-[13px] font-medium text-neutral-500">
        Waiting to join
      </p>
      <ul className="mt-2 flex flex-col gap-2">
        {pending.map((application) => (
          <li
            key={application.id}
            className="flex items-center gap-2.5"
          >
            <DefaultAvatar size={32} />
            <span className="min-w-0 flex-1 truncate text-[15px] font-medium text-black">
              {application.applicant
                ? getDisplayName(application.applicant)
                : "Someone"}
            </span>
            <form action={respondToApplicationAction} className="flex shrink-0 gap-1.5">
              <input type="hidden" name="applicationId" value={application.id} />
              <input type="hidden" name="tripId" value={tripId} />
              <button
                type="submit"
                name="decision"
                value="declined"
                className="rounded-full bg-[#F2F2F6] px-3 py-1.5 text-[13px] font-medium text-black"
              >
                Decline
              </button>
              <button
                type="submit"
                name="decision"
                value="accepted"
                disabled={isFull}
                className="rounded-full bg-black px-3 py-1.5 text-[13px] font-medium text-white disabled:opacity-40"
              >
                Accept
              </button>
            </form>
          </li>
        ))}
      </ul>
      {isFull && (
        <p className="mt-2 text-[12px] text-neutral-500">
          This trip is full — you can&apos;t accept more people.
        </p>
      )}
    </div>
  );
}
