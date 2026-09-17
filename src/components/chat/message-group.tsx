import Image from "next/image";
import { ReceivedBubble, SentBubble } from "@/components/chat/message-bubble";

export function ReceivedGroup({
  avatarSrc,
  avatarAlt,
  messages,
}: {
  avatarSrc: string;
  avatarAlt: string;
  messages: string[];
}) {
  return (
    <div className="flex items-end gap-2.5">
      <div className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full">
        <Image src={avatarSrc} alt={avatarAlt} fill sizes="28px" className="object-cover" />
      </div>
      <div className="flex flex-col gap-[2px]">
        {messages.map((message, i) => (
          <ReceivedBubble key={i}>{message}</ReceivedBubble>
        ))}
      </div>
    </div>
  );
}

export function SentGroup({ messages }: { messages: string[] }) {
  return (
    <div className="flex flex-col gap-[2px]">
      {messages.map((message, i) => (
        <SentBubble
          key={i}
          roundTopRight={i === 0}
          roundBottomRight={i === messages.length - 1}
        >
          {message}
        </SentBubble>
      ))}
    </div>
  );
}
