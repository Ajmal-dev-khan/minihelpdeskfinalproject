import { useState } from 'react';
import { Ticket } from '../types/ticket';
import DeleteDialog from './DeleteDialog';

interface Props {
  ticket: Ticket;
  onDelete: (id: string) => Promise<string>;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

export default function TicketCard({ ticket, onDelete, onSuccess, onError }: Props) {
  const [showDialog, setShowDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDeleteClick = () => setShowDialog(true);

  const handleConfirmDelete = async () => {
    setDeleting(true);
    try {
      const message = await onDelete(ticket._id);
      onSuccess(message);
    } catch (err: any) {
      onError(err.message || 'Failed to delete ticket');
    } finally {
      setDeleting(false);
      setShowDialog(false);
    }
  };

  const statusClass = ticket.status.replace(' ', '-');

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    });
  };

  return (
    <>
      <div className="ticket-card">
        <div className={`ticket-priority-bar ${ticket.priority}`} />

        <div style={{ paddingLeft: '8px' }}>
          <div className="ticket-top">
            <h3 className="ticket-subject">{ticket.subject}</h3>
            <button
              className="btn btn-danger btn-sm"
              onClick={handleDeleteClick}
              title="Delete ticket"
            >
              Delete
            </button>
          </div>

          <p className="ticket-description">{ticket.description}</p>

          <div className="ticket-meta">
            <span className={`badge badge-priority ${ticket.priority}`}>
              {ticket.priority}
            </span>
            <span className={`badge badge-status ${statusClass}`}>
              {ticket.status}
            </span>
            <span className="ticket-date">{formatDate(ticket.createdAt)}</span>
          </div>
        </div>
      </div>

      {showDialog && (
        <DeleteDialog
          ticketSubject={ticket.subject}
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowDialog(false)}
          loading={deleting}
        />
      )}
    </>
  );
}
