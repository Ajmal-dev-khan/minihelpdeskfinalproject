import TicketForm from '../components/TicketForm';
import TicketList from '../components/TicketList';
import LimitSelector from '../components/LimitSelector';
import { useTickets } from '../hooks/useTickets';
import { LimitOption, Ticket } from '../types/ticket';

interface Props {
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

export default function HomePage({ onSuccess, onError }: Props) {
  const {
    tickets, limit, totalCount,
    loading, error, loadTickets,
    removeTicket, changeLimit
  } = useTickets();

  const handleLimitChange = (newLimit: LimitOption) => {
    changeLimit(newLimit);
  };

  // Stats for the dashboard bar
  const highCount     = tickets.filter((t: Ticket) => t.priority === 'High').length;
  const openCount     = tickets.filter((t: Ticket) => t.status === 'Open').length;
  const _closedCount = tickets.filter((t: Ticket) => t.status === 'Closed').length;

  return (
    <>
      {/* Stats Bar */}
      <div className="stats-bar">
        <div className="stat-card">
          <span className="stat-label">Total (DB)</span>
          <span className="stat-value accent">{totalCount}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Showing</span>
          <span className="stat-value">{tickets.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">High Priority</span>
          <span className="stat-value danger">{highCount}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Open</span>
          <span className="stat-value warn">{openCount}</span>
        </div>
      </div>

      {/* Create Form */}
      <TicketForm onCreated={onSuccess} onError={onError} />

      {/* Ticket List Header */}
      <div className="section-header">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <h2 className="section-title">All Tickets</h2>
          {!loading && !error && (
            <span className="count-info">
              Showing {tickets.length} of {totalCount} total tickets
            </span>
          )}
        </div>

        {/* PRODUCT FEATURE: Limit Selector */}
        <LimitSelector limit={limit} onChange={handleLimitChange} />
      </div>

      {/* Ticket List */}
      <TicketList
        tickets={tickets}
        loading={loading}
        error={error}
        onDelete={removeTicket}
        onSuccess={onSuccess}
        onError={onError}
        onRetry={loadTickets}
      />
    </>
  );
}
