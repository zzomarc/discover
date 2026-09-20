import { User } from "lucide-react";
import { cn } from "@/lib/utils";

export function DefaultAvatar({
  size = 40,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-neutral-200 text-neutral-400",
        className,
      )}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <User className="h-[58%] w-[58%]" strokeWidth={2} />
    </div>
  );
}
