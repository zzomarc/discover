import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function ReceivedBubble({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-[270px] self-start rounded-r-[22px] rounded-l-none bg-[#E8E8EA] px-4 py-[10px] text-[16px] leading-[21px] text-black",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function SentBubble({
  children,
  roundTopRight = true,
  roundBottomRight = true,
  className,
}: {
  children: ReactNode;
  roundTopRight?: boolean;
  roundBottomRight?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-[270px] self-end rounded-l-[22px] bg-black px-4 py-[10px] text-[16px] leading-[21px] text-white",
        roundTopRight ? "rounded-tr-[22px]" : "rounded-tr-[6px]",
        roundBottomRight ? "rounded-br-[22px]" : "rounded-br-[6px]",
        className,
      )}
    >
      {children}
    </div>
  );
}
