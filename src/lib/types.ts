export interface LeadPayload {
  name: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  size: string;
  focus: string[];
  systems?: string;
  source?: string;
  submittedAt?: string;
}

export interface SubmissionResponse {
  success: boolean;
  message: string;
  hubspot?: {
    success: boolean;
    method?: string;
    error?: string;
  };
  email?: {
    success: boolean;
    recipient?: string;
    method?: string;
    error?: string;
  };
}
