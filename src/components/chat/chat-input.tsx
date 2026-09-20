import { Image as ImageIcon, Mic, Smile } from "lucide-react";

export function ChatInput() {
  return (
    <div className="shrink-0 px-5 pt-[18px] pb-2">
      <div className="flex h-[46px] items-center rounded-full border border-neutral-200 pr-3 pl-4">
        <input
          type="text"
          placeholder="Message..."
          className="min-w-0 flex-1 bg-transparent text-[15px] text-black outline-none placeholder:text-neutral-400"
        />
        <div className="flex shrink-0 items-center gap-3">
          <Mic className="h-5 w-5 text-neutral-400" strokeWidth={1.75} />
          <Smile className="h-5 w-5 text-neutral-400" strokeWidth={1.75} />
          <ImageIcon className="h-5 w-5 text-neutral-400" strokeWidth={1.75} />
        </div>
      </div>
    </div>
  );
}
