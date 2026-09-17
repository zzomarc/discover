import type { ReactNode } from "react";

export function TagPill({ children }: { children: ReactNode }) {
  return (
    <span className="flex flex-1 items-center justify-center rounded-full bg-[#F2F2F6] px-3 py-[7px] text-center text-[14px] leading-none text-black">
      {children}
    </span>
  );
}
