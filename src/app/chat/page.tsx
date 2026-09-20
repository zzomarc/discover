import { PhoneFrame } from "@/components/chrome/phone-frame";
import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { ReceivedGroup, SentGroup } from "@/components/chat/message-group";
import { SentBubble } from "@/components/chat/message-bubble";

export default function ChatPage() {
  return (
    <PhoneFrame>
      <ChatHeader />

      <div className="flex flex-1 flex-col justify-end overflow-hidden px-5">
        <SentBubble>This is the main chat template</SentBubble>

        <p className="mt-8 text-center text-[15px] text-neutral-500">
          Nov 30, 2023, 9:41 AM
        </p>

        <div className="mt-8">
          <ReceivedGroup
            avatarSrc="/images/helena-hills.jpg"
            avatarAlt="Helena Hills"
            messages={["Oh?", "Cool", "How does it work?"]}
          />
        </div>

        <div className="mt-[18px]">
          <SentGroup
            messages={[
              "You just edit any text to type in the conversation you want to show, and delete any bubbles you don\u2019t want to use",
              "Boom!",
            ]}
          />
        </div>

        <div className="mt-[18px]">
          <ReceivedGroup
            avatarSrc="/images/helena-hills.jpg"
            avatarAlt="Helena Hills"
            messages={[
              "Hmmm",
              "I think I get it",
              "Will head to the Help Center if I have more questions tho",
            ]}
          />
        </div>
      </div>

      <ChatInput />
    </PhoneFrame>
  );
}
