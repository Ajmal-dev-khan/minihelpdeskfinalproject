import { useState } from 'react';
import { createTicket } from '../api/tickets';
import { FormErrors, TicketFormData } from '../types/ticket';

interface Props {
  onCreated: (message: string) => void;
  onError: (message: string) => void;
}

const EMPTY_FORM: TicketFormData = {
  subject: '',
  description: '',
  priority: '',
};

// ── ENGINEERING FEATURE: Frontend + Backend Validation ─
// Frontend validates BEFORE sending to backend.
// Backend validates again as a second layer of protection.
export default function TicketForm({ onCreated, onError }: Props) {
  const [form, setForm] = useState<TicketFormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [apiError, setApiError] = useState('');
  const [saving, setSaving] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // ── Frontend Validation ──────────────────────────────
  const validate = (data: TicketFormData): FormErrors => {
    const errs: FormErrors = {};

    if (!data.subject.trim()) {
      errs.subject = 'Subject is required';
    } else if (data.subject.trim().length < 3) {
      errs.subject = 'Subject must be at least 3 characters';
    } else if (data.subject.trim().length > 100) {
      errs.subject = 'Subject cannot exceed 100 characters';
    }

    if (!data.description.trim()) {
      errs.description = 'Description is required';
    } else if (data.description.trim().length < 10) {
      errs.description = 'Description must be at least 10 characters';
    } else if (data.description.trim().length > 1000) {
      errs.description = 'Description cannot exceed 1000 characters';
    }

    if (!data.priority) {
      errs.priority = 'Please select a priority level';
    }

    return errs;
  };

  const handleChange = (field: keyof TicketFormData, value: string) => {
    const updated = { ...form, [field]: value };
    setForm(updated);
    // Re-validate field if it was already touched
    if (touched[field]) {
      const errs = validate(updated);
      setErrors((prev) => ({ ...prev, [field]: errs[field] }));
    }
  };

  const handleBlur = (field: keyof TicketFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errs = validate(form);
    setErrors((prev) => ({ ...prev, [field]: errs[field] }));
  };

  const handleSubmit = async () => {
    // Mark all fields touched
    setTouched({ subject: true, description: true, priority: true });
    setApiError('');

    const errs = validate(form);
    setErrors(errs);

    // Stop if frontend validation fails — no network request sent
    if (Object.keys(errs).length > 0) return;

    setSaving(true);
    try {
      const result = await createTicket(form);
      setForm(EMPTY_FORM);
      setErrors({});
      setTouched({});
      onCreated(result.message || 'Ticket created successfully!');
    } catch (err: any) {
      // Handle backend validation errors
      if (err.errors && Array.isArray(err.errors)) {
        const backendErrors: FormErrors = {};
        err.errors.forEach((e: { field: string; message: string }) => {
          (backendErrors as any)[e.field] = e.message;
        });
        setErrors(backendErrors);
        setApiError(err.message || 'Validation failed on server');
      } else {
        const msg = err.message || 'Failed to create ticket. Check connection.';
        setApiError(msg);
        onError(msg);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setForm(EMPTY_FORM);
    setErrors({});
    setTouched({});
    setApiError('');
  };

  const subjectLen = form.subject.length;
  const descLen = form.description.length;

  return (
    <div className="form-card">
      <div className="section-header" style={{ marginBottom: '20px' }}>
        <h2 className="section-title">New Ticket</h2>
      </div>

      {/* API Error Banner */}
      {apiError && (
        <div className="api-error">
          <span>⚠</span>
          <span>{apiError}</span>
        </div>
      )}

      <div className="form-grid">
        {/* Subject */}
        <div className="field full-width">
          <label htmlFor="subject">Subject *</label>
          <input
            id="subject"
            type="text"
            value={form.subject}
            onChange={(e) => handleChange('subject', e.target.value)}
            onBlur={() => handleBlur('subject')}
            placeholder="Brief summary of the issue..."
            className={errors.subject ? 'error' : ''}
            maxLength={100}
          />
          <div className="field-footer">
            <span className="field-error">{errors.subject || ''}</span>
            <span className={`char-count ${subjectLen > 90 ? 'danger' : subjectLen > 75 ? 'warn' : ''}`}>
              {subjectLen}/100
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="field full-width">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            value={form.description}
            onChange={(e) => handleChange('description', e.target.value)}
            onBlur={() => handleBlur('description')}
            placeholder="Describe the issue in detail (minimum 10 characters)..."
            className={errors.description ? 'error' : ''}
            maxLength={1000}
          />
          <div className="field-footer">
            <span className="field-error">{errors.description || ''}</span>
            <span className={`char-count ${descLen > 950 ? 'danger' : descLen > 800 ? 'warn' : ''}`}>
              {descLen}/1000
            </span>
          </div>
        </div>

        {/* Priority */}
        <div className="field">
          <label htmlFor="priority">Priority *</label>
          <select
            id="priority"
            value={form.priority}
            onChange={(e) => handleChange('priority', e.target.value)}
            onBlur={() => handleBlur('priority')}
            className={errors.priority ? 'error' : ''}
          >
            <option value="">Select priority...</option>
            <option value="Low">🟢 Low</option>
            <option value="Medium">🟡 Medium</option>
            <option value="High">🔴 High</option>
          </select>
          {errors.priority && (
            <span className="field-error">{errors.priority}</span>
          )}
        </div>

        {/* Status (read-only info) */}
        <div className="field">
          <label>Initial Status</label>
          <input
            type="text"
            value="Open (auto-assigned)"
            disabled
            style={{ opacity: 0.5, cursor: 'not-allowed' }}
          />
          <span className="field-hint">New tickets start with Open status</span>
        </div>
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-ghost" onClick={handleReset}>
          Clear
        </button>
        {/* ENGINEERING FEATURE: Button disabled while saving to prevent duplicates */}
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={saving}
        >
          {saving ? (
            <>
              <span className="spinner" style={{ width: 14, height: 14, borderWidth: 2 }} />
              Saving...
            </>
          ) : (
            '+ Create Ticket'
          )}
        </button>
      </div>
    </div>
  );
}
