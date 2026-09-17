import { DefaultAvatar } from "@/components/dashboard/default-avatar";

export function ParticipantsBadge({ count }: { count: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-[#F2F2F6] py-[5px] pr-4 pl-[5px]">
      <DefaultAvatar size={28} />
      <span className="text-[14px] leading-none text-black">{count}</span>
    </span>
  );
}
