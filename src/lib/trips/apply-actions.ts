"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  isSupabaseConfigured,
  SUPABASE_NOT_CONFIGURED_MESSAGE,
} from "@/lib/supabase/env";

export type ApplyActionState = { error?: string; info?: string } | null;

export async function applyToTripAction(
  _prev: ApplyActionState,
  formData: FormData,
): Promise<ApplyActionState> {
  const tripId = String(formData.get("tripId") ?? "");
  if (!tripId) return { error: "Missing trip." };

  if (!isSupabaseConfigured) return { error: SUPABASE_NOT_CONFIGURED_MESSAGE };
  const supabase = await createClient();
  if (!supabase) return { error: SUPABASE_NOT_CONFIGURED_MESSAGE };

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "You must be signed in." };

  const { data: trip, error: tripError } = await supabase
    .from("trips")
    .select("id, user_id, participants_wanted")
    .eq("id", tripId)
    .maybeSingle();

  if (tripError || !trip) return { error: "This trip no longer exists." };
  if (trip.user_id === user.id) {
    return { error: "You can't apply to your own trip." };
  }

  const { count } = await supabase
    .from("trip_applications")
    .select("id", { count: "exact", head: true })
    .eq("trip_id", tripId)
    .eq("status", "accepted");

  if ((count ?? 0) >= trip.participants_wanted) {
    return { error: "This trip is already full." };
  }

  const { error } = await supabase.from("trip_applications").insert({
    trip_id: tripId,
    applicant_id: user.id,
    status: "pending",
  });

  if (error) {
    if (error.code === "23505") {
      return { info: "You've already applied to this trip." };
    }
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  revalidatePath(`/chat/${tripId}`);
  return { info: "Application sent. Waiting for the host to accept you." };
}

export async function respondToApplicationAction(formData: FormData) {
  const applicationId = String(formData.get("applicationId") ?? "");
  const tripId = String(formData.get("tripId") ?? "");
  const decision = String(formData.get("decision") ?? "");
  if (
    !applicationId ||
    !tripId ||
    (decision !== "accepted" && decision !== "declined")
  ) {
    return;
  }

  if (!isSupabaseConfigured) return;
  const supabase = await createClient();
  if (!supabase) return;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  const { data: trip } = await supabase
    .from("trips")
    .select("id, user_id, participants_wanted")
    .eq("id", tripId)
    .maybeSingle();

  if (!trip || trip.user_id !== user.id) return;

  if (decision === "accepted") {
    const { count } = await supabase
      .from("trip_applications")
      .select("id", { count: "exact", head: true })
      .eq("trip_id", tripId)
      .eq("status", "accepted");

    if ((count ?? 0) >= trip.participants_wanted) {
      revalidatePath(`/chat/${tripId}`);
      revalidatePath("/dashboard");
      return;
    }
  }

  await supabase
    .from("trip_applications")
    .update({ status: decision })
    .eq("id", applicationId)
    .eq("trip_id", tripId);

  revalidatePath("/dashboard");
  revalidatePath(`/chat/${tripId}`);
}

export async function sendTripMessageAction(
  _prev: ApplyActionState,
  formData: FormData,
): Promise<ApplyActionState> {
  const tripId = String(formData.get("tripId") ?? "");
  const content = String(formData.get("content") ?? "").trim();
  if (!tripId) return { error: "Missing trip." };
  if (!content) return { error: "Type a message first." };

  if (!isSupabaseConfigured) return { error: SUPABASE_NOT_CONFIGURED_MESSAGE };
  const supabase = await createClient();
  if (!supabase) return { error: SUPABASE_NOT_CONFIGURED_MESSAGE };

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "You must be signed in." };

  const { data: trip } = await supabase
    .from("trips")
    .select("id, user_id")
    .eq("id", tripId)
    .maybeSingle();

  if (!trip) return { error: "This trip no longer exists." };

  if (trip.user_id !== user.id) {
    const { data: application } = await supabase
      .from("trip_applications")
      .select("status")
      .eq("trip_id", tripId)
      .eq("applicant_id", user.id)
      .maybeSingle();

    if (application?.status !== "accepted") {
      return { error: "You haven't been admitted to this chat yet." };
    }
  }

  const { error } = await supabase.from("trip_messages").insert({
    trip_id: tripId,
    sender_id: user.id,
    content,
  });

  if (error) return { error: error.message };

  revalidatePath(`/chat/${tripId}`);
  return null;
}

export async function openTripChatAction(formData: FormData) {
  const tripId = String(formData.get("tripId") ?? "");
  if (tripId) redirect(`/chat/${tripId}`);
}
