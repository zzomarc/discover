import { ChevronLeft, Phone, Video } from "lucide-react";
import Link from "next/link";
import { DefaultAvatar } from "@/components/dashboard/default-avatar";

export function GroupChatHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <>
      <header className="flex h-[68px] shrink-0 items-center gap-3 px-5">
        <Link href="/dashboard" aria-label="Back to Discover">
          <ChevronLeft className="h-6 w-6 shrink-0 text-black" strokeWidth={2} />
        </Link>

        <div className="flex shrink-0 -space-x-2">
          <DefaultAvatar size={36} className="ring-2 ring-white" />
          <DefaultAvatar size={36} className="ring-2 ring-white" />
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-center gap-[2px]">
          <span className="truncate text-[19px] leading-none font-bold text-black">
            {title}
          </span>
          <span className="truncate text-[15px] leading-none text-neutral-500">
            {subtitle}
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-5">
          <Phone className="h-6 w-6 text-black" strokeWidth={1.75} />
          <Video className="h-6 w-6 text-black" strokeWidth={1.75} />
        </div>
      </header>

      <div className="h-px w-full shrink-0 bg-neutral-200" />
    </>
  );
}
