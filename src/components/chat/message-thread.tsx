import { DefaultAvatar } from "@/components/dashboard/default-avatar";
import { ReceivedBubble, SentBubble } from "@/components/chat/message-bubble";
import { getDisplayName } from "@/lib/trips/format";
import type { TripMessage } from "@/lib/trips/queries";

interface Group {
  senderId: string;
  senderName: string;
  mine: boolean;
  messages: string[];
}

function groupMessages(
  messages: TripMessage[],
  currentUserId: string,
): Group[] {
  const groups: Group[] = [];
  for (const message of messages) {
    const last = groups[groups.length - 1];
    if (last && last.senderId === message.senderId) {
      last.messages.push(message.content);
      continue;
    }
    groups.push({
      senderId: message.senderId,
      senderName: message.sender
        ? getDisplayName(message.sender)
        : "Someone",
      mine: message.senderId === currentUserId,
      messages: [message.content],
    });
  }
  return groups;
}

export function MessageThread({
  messages,
  currentUserId,
}: {
  messages: TripMessage[];
  currentUserId: string;
}) {
  if (messages.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
        <p className="text-[16px] font-bold text-black">No messages yet</p>
        <p className="mt-1 text-[14px] text-neutral-500">
          Say hi to the group.
        </p>
      </div>
    );
  }

  const groups = groupMessages(messages, currentUserId);

  return (
    <div className="flex flex-1 flex-col justify-end gap-[18px] overflow-y-auto px-5 py-4">
      {groups.map((group, i) =>
        group.mine ? (
          <div key={`${group.senderId}-${i}`} className="flex flex-col items-end gap-[2px]">
            {group.messages.map((text, j) => (
              <SentBubble
                key={j}
                roundTopRight={j === 0}
                roundBottomRight={j === group.messages.length - 1}
              >
                {text}
              </SentBubble>
            ))}
          </div>
        ) : (
          <div key={`${group.senderId}-${i}`} className="flex items-end gap-2.5">
            <DefaultAvatar size={28} />
            <div className="flex min-w-0 flex-col gap-[2px]">
              {group.messages.map((text, j) => (
                <ReceivedBubble key={j}>{text}</ReceivedBubble>
              ))}
            </div>
          </div>
        ),
      )}
    </div>
  );
}
