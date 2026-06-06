interface Props {
  ticketSubject: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
}

export default function DeleteDialog({ ticketSubject, onConfirm, onCancel, loading }: Props) {
  return (
    <div className="overlay" onClick={onCancel}>
      <div className="dialog" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-icon">🗑️</div>
        <h3 className="dialog-title">Delete Ticket?</h3>
        <p className="dialog-msg">
          This action cannot be undone. The ticket will be permanently removed from the database.
        </p>
        <div className="dialog-ticket-name">"{ticketSubject}"</div>
        <div className="dialog-actions">
          <button className="btn btn-ghost" onClick={onCancel} disabled={loading}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm} disabled={loading}>
            {loading ? 'Deleting...' : 'Yes, Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
