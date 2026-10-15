
export interface DashboardOverview {
  total_consultations: number;
  completed_consultations: number;
  completion_rate_pct: number;
  escalated_consultations: number;
  escalation_rate_pct: number;
  pending_consultations: number;
  accepted_consultations: number;
  avg_primary_response_seconds: number;
  active_facilities: number;
  active_providers: number;
}

export interface ConsultationTrend {
  consultation_date: string;
  total_consultations: number;
  completed_consultations: number;
  escalated_consultations: number;
  pending_consultations: number;
  accepted_consultations: number;
  completion_rate_pct: number;
}

export interface FacilityPerformance {
  facility_id: string;
  facility_code: string;
  facility_name: string;
  city: string;
  state: string;
  total_consultations: number;
  completed_consultations: number;
  escalated_consultations: number;
  pending_consultations: number;
  completion_rate_pct: number;
  escalation_rate_pct: number;
}

export interface RoutingPerformance {
  routing_tier: string;
  total_attempts: number;
  accepted_attempts: number;
  responded_without_acceptance: number;
  timed_out_attempts: number;
  acceptance_rate_pct: number;
  avg_acceptance_seconds: number | null;
}

export interface OperationalAlert {
  alert_type: string;
  severity: string;
  facility_code: string;
  facility_name: string;
  reference_id: string;
  alert_message: string;
  occurred_at: string;
  age_minutes: number | null;
}
