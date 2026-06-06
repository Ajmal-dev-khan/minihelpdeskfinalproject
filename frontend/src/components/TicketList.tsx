import { Ticket } from '../types/ticket';
import TicketCard from './TicketCard';

interface Props {
  tickets: Ticket[];
  loading: boolean;
  error: string;
  onDelete: (id: string) => Promise<string>;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
  onRetry: () => void;
}

export default function TicketList({
  tickets, loading, error, onDelete, onSuccess, onError, onRetry
}: Props) {
  if (loading) {
    return (
      <div className="loading-state">
        <div className="spinner" />
        <p className="loading-text">Loading tickets...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <div className="error-state-icon">⚠️</div>
        <h3 className="error-state-title">Could not load tickets</h3>
        <p className="error-state-msg">{error}</p>
        <button className="btn btn-ghost" onClick={onRetry}>Try Again</button>
      </div>
    );
  }

  if (tickets.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🎫</div>
        <h3 className="empty-title">No tickets found</h3>
        <p className="empty-subtitle">Create your first ticket using the form above.</p>
      </div>
    );
  }

  return (
    <div className="tickets-list">
      {tickets.map((ticket) => (
        <TicketCard
          key={ticket._id}
          ticket={ticket}
          onDelete={onDelete}
          onSuccess={onSuccess}
          onError={onError}
        />
      ))}
    </div>
  );
}
