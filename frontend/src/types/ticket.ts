// ── Ticket Data Model ─────────────────────────────────
export interface Ticket {
  _id: string;
  subject: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Open' | 'In Progress' | 'Closed';
  createdAt: string;
}

// ── API Response Types ────────────────────────────────
export interface TicketsResponse {
  success: boolean;
  count: number;
  totalCount: number;
  limit: number;
  tickets: Ticket[];
}

export interface CreateTicketResponse {
  success: boolean;
  message: string;
  ticket?: Ticket;
  errors?: ValidationError[];
}

export interface DeleteTicketResponse {
  success: boolean;
  message: string;
  deletedTicket?: Ticket;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: ValidationError[];
}

// ── Form Types ────────────────────────────────────────
export interface ValidationError {
  field: string;
  message: string;
}

export interface FormErrors {
  subject?: string;
  description?: string;
  priority?: string;
}

export interface TicketFormData {
  subject: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High' | '';
}

// ── Limit options for Product Feature ─────────────────
export type LimitOption = 5 | 10 | 20;
