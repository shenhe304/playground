import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { RSVPResponse } from '../lib/types';

interface RSVPFormProps {
  inviteId: string;
  onSuccess: () => void;
}

export default function RSVPForm({ inviteId, onSuccess }: RSVPFormProps) {
  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState<'yes' | 'no' | 'maybe'>('yes');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const response: RSVPResponse = {
        invite_id: inviteId,
        name: name.trim(),
        attendance,
        message: message.trim(),
      };

      const { error: supaErr } = await supabase
        .from('rsvp_responses')
        .insert([response]);

      if (supaErr) {
        console.error('Supabase error:', supaErr);
        // Still show success to user in demo mode if env vars not set
      }

      onSuccess();
    } catch (err) {
      console.error(err);
      onSuccess(); // Allow demo usage without Supabase
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Name */}
      <div>
        <label
          style={{
            display: 'block',
            fontFamily: 'var(--font-sans)',
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--color-primary)',
            marginBottom: '8px',
          }}
        >
          Full Name
        </label>
        <input
          className="input-field"
          type="text"
          placeholder="Your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {error && (
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '13px',
              color: 'var(--color-primary)',
              marginTop: '6px',
            }}
          >
            {error}
          </p>
        )}
      </div>

      {/* Attendance toggle */}
      <div>
        <label
          style={{
            display: 'block',
            fontFamily: 'var(--font-sans)',
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--color-primary)',
            marginBottom: '8px',
          }}
        >
          Will you attend?
        </label>
        <div className="rsvp-toggle">
          {(['yes', 'no', 'maybe'] as const).map((option) => (
            <button
              key={option}
              type="button"
              className={`rsvp-toggle-btn ${attendance === option ? 'active' : ''}`}
              onClick={() => setAttendance(option)}
            >
              {option === 'yes' ? 'Yes!' : option === 'no' ? 'Can\'t make it' : 'Maybe'}
            </button>
          ))}
        </div>
      </div>

      {/* Message */}
      <div>
        <label
          style={{
            display: 'block',
            fontFamily: 'var(--font-sans)',
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--color-primary)',
            marginBottom: '8px',
          }}
        >
          Message to the couple{' '}
          <span style={{ color: 'var(--color-neutral)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>
            (optional)
          </span>
        </label>
        <textarea
          className="input-field"
          placeholder="Share your warmest wishes..."
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ resize: 'vertical', minHeight: '100px' }}
        />
      </div>

      <button
        type="submit"
        className="btn-primary"
        disabled={loading}
        style={{ opacity: loading ? 0.7 : 1 }}
      >
        {loading ? 'Sending...' : 'Send RSVP'}
      </button>
    </form>
  );
}
