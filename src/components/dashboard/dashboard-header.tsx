import { Menu } from "lucide-react";
import { DefaultAvatar } from "@/components/dashboard/default-avatar";

export function DashboardHeader() {
  return (
    <header className="flex h-[76px] shrink-0 items-center justify-between px-6">
      <Menu className="h-5 w-5 text-black" strokeWidth={2.25} />
      <h1 className="text-[21px] leading-none font-bold tracking-tight text-black">
        Discover
      </h1>
      <DefaultAvatar size={28} />
    </header>
  );
}
