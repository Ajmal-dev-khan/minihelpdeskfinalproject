import {
  TicketsResponse,
  CreateTicketResponse,
  DeleteTicketResponse,
  TicketFormData,
  LimitOption,
} from '../types/ticket';

const BASE_URL = 'https://minihelpdeskfinalproject-production.up.railway.app/tickets';

// ── GET /tickets?limit=5|10|20 ────────────────────────
// PRODUCT FEATURE: Limit Items by Number
export const fetchTickets = async (limit: LimitOption): Promise<TicketsResponse> => {
  const response = await fetch(`${BASE_URL}?limit=${limit}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch tickets');
  }

  return response.json();
};

// ── POST /tickets ─────────────────────────────────────
// With full validation support
export const createTicket = async (
  data: TicketFormData
): Promise<CreateTicketResponse> => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const result: CreateTicketResponse = await response.json();

  // Throw on error so caller can handle validation errors
  if (!response.ok) {
    throw result;
  }

  return result;
};

// ── DELETE /tickets/:id ───────────────────────────────
export const deleteTicket = async (id: string): Promise<DeleteTicketResponse> => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });

  const result: DeleteTicketResponse = await response.json();

  if (!response.ok) {
    throw new Error((result as any).message || 'Failed to delete ticket');
  }

  return result;
};
