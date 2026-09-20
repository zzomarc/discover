import { ArrowLeftRight, MessageCircle, Search } from "lucide-react";
import { CreateTripDialog } from "@/components/trips/create-trip-dialog";

export function BottomNav() {
  return (
    <nav className="flex h-[64px] shrink-0 items-center justify-between px-9">
      <HomeIcon />
      <Search className="h-6 w-6 text-neutral-400" strokeWidth={1.75} />
      <CreateTripDialog />
      <ArrowLeftRight className="h-6 w-6 text-neutral-400" strokeWidth={1.75} />
      <MessageCircle className="h-6 w-6 text-neutral-400" strokeWidth={1.75} />
    </nav>
  );
}

function HomeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3.5 10.5L12 3l8.5 7.5V20a1 1 0 0 1-1 1h-5v-6.5h-5V21h-5a1 1 0 0 1-1-1v-9.5Z"
        fill="black"
      />
    </svg>
  );
}
