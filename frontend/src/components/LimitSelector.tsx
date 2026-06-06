import { LimitOption } from '../types/ticket';

interface Props {
  limit: LimitOption;
  onChange: (limit: LimitOption) => void;
}

const OPTIONS: LimitOption[] = [5, 10, 20];

// ── PRODUCT FEATURE: Limit Items by Number ────────────
// Allows user to choose how many tickets to display.
// Sends ?limit=N to backend which applies MongoDB .limit(N)
export default function LimitSelector({ limit, onChange }: Props) {
  return (
    <div className="limit-selector">
      <span className="limit-label">Show</span>
      <div className="limit-buttons">
        {OPTIONS.map((opt) => (
          <button
            key={opt}
            className={`limit-btn ${limit === opt ? 'active' : ''}`}
            onClick={() => onChange(opt)}
            title={`Show ${opt} tickets`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
