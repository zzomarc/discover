export type ApplicationStatus = "pending" | "accepted" | "declined";

export interface TripApplication {
  id: string;
  tripId: string;
  applicantId: string;
  status: ApplicationStatus;
  createdAt: string;
  applicant: { displayName: string | null; email: string } | null;
}

export interface TripApplicationRow {
  id: string;
  trip_id: string;
  applicant_id: string;
  status: ApplicationStatus;
  created_at: string;
  applicant?: { display_name: string | null; email: string } | null;
}

export function mapApplicationRow(row: TripApplicationRow): TripApplication {
  return {
    id: row.id,
    tripId: row.trip_id,
    applicantId: row.applicant_id,
    status: row.status,
    createdAt: row.created_at,
    applicant: row.applicant
      ? { displayName: row.applicant.display_name, email: row.applicant.email }
      : null,
  };
}
