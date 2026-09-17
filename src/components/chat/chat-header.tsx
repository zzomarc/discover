import { ChevronLeft, Phone, Video } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function ChatHeader() {
  return (
    <>
      <header className="flex h-[68px] shrink-0 items-center gap-3 px-5">
        <Link href="/dashboard" aria-label="Back to Discover">
          <ChevronLeft className="h-6 w-6 shrink-0 text-black" strokeWidth={2} />
        </Link>

        <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full">
          <Image
            src="/images/helena-hills.jpg"
            alt="Helena Hills"
            fill
            sizes="36px"
            className="object-cover"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-center gap-[2px]">
          <span className="truncate text-[19px] leading-none font-bold text-black">
            Helena Hills
          </span>
          <span className="truncate text-[15px] leading-none text-neutral-500">
            Active 11m ago
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
