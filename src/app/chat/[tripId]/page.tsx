import { notFound, redirect } from "next/navigation";
import { PhoneFrame } from "@/components/chrome/phone-frame";
import { ChatRealtime } from "@/components/chat/chat-realtime";
import { GroupChatHeader } from "@/components/chat/group-chat-header";
import { LiveChatInput } from "@/components/chat/live-chat-input";
import { MessageThread } from "@/components/chat/message-thread";
import { PendingApplications } from "@/components/chat/pending-applications";
import { ACTIVITY_TYPE_META } from "@/lib/trips/activity-types";
import { acceptedCount, isTripFull } from "@/lib/trips/format";
import {
  getCurrentUserId,
  getTripById,
  getTripMessages,
} from "@/lib/trips/queries";

export default async function TripChatPage({
  params,
}: {
  params: Promise<{ tripId: string }>;
}) {
  const { tripId } = await params;
  const [trip, userId, messages] = await Promise.all([
    getTripById(tripId),
    getCurrentUserId(),
    getTripMessages(tripId),
  ]);

  if (!trip || !userId) notFound();

  const isCreator = trip.userId === userId;
  const mine = (trip.applications ?? []).find((a) => a.applicantId === userId);
  const isMember = isCreator || mine?.status === "accepted";

  if (!isMember) {
    redirect("/dashboard");
  }

  const members = 1 + acceptedCount(trip);
  const title = ACTIVITY_TYPE_META[trip.activityType].label;
  const subtitle = `${members} member${members === 1 ? "" : "s"} · ${trip.location}`;

  return (
    <PhoneFrame>
      <ChatRealtime tripId={trip.id} />
      <GroupChatHeader title={title} subtitle={subtitle} />

      {isCreator && (
        <PendingApplications
          tripId={trip.id}
          applications={trip.applications ?? []}
          isFull={isTripFull(trip)}
        />
      )}

      <MessageThread messages={messages} currentUserId={userId} />
      <LiveChatInput tripId={trip.id} />
    </PhoneFrame>
  );
}
