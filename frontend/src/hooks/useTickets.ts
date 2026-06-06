import { useState, useEffect, useCallback } from 'react';
import { Ticket, LimitOption } from '../types/ticket';
import { fetchTickets, deleteTicket as deleteTicketApi } from '../api/tickets';

export const useTickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [limit, setLimit] = useState<LimitOption>(10);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const loadTickets = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchTickets(limit);
      setTickets(data.tickets);
      setTotalCount(data.totalCount);
    } catch (err: any) {
      setError(err.message || 'Failed to load tickets. Is the backend running?');
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    loadTickets();
  }, [loadTickets]);

  const removeTicket = async (id: string): Promise<string> => {
    const result = await deleteTicketApi(id);
    await loadTickets();
    return result.message;
  };

  const changeLimit = (newLimit: LimitOption) => {
    setLimit(newLimit);
  };

  return {
    tickets,
    limit,
    totalCount,
    loading,
    error,
    loadTickets,
    removeTicket,
    changeLimit,
  };
};
