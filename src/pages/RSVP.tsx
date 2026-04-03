import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { InvitationData } from '../lib/types';

function decodeInvite(id: string): InvitationData | null {
  try {
    return JSON.parse(decodeURIComponent(atob(id)));
  } catch {
    return null;
  }
}

type Attendance = 'yes' | 'no' | 'maybe';

const ATTENDANCE_OPTIONS: { value: Attendance; label: string; emoji: string; color: string }[] = [
  { value: 'yes', label: 'Joyfully accepts', emoji: '🎉', color: '#10b981' },
  { value: 'maybe', label: 'Tentatively accepts', emoji: '🤞', color: '#f59e0b' },
  { value: 'no', label: 'Regretfully declines', emoji: '💌', color: '#f43f5e' },
];

export default function RSVP() {
  const { id } = useParams<{ id: string }>();
  const data = id ? decodeInvite(id) : null;

  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState<Attendance | null>(null);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !attendance || !id) return;

    setSubmitting(true);
    setError(null);

    try {
      const { error: sbError } = await supabase.from('rsvp_responses').insert({
        invite_id: id,
        name: name.trim(),
        attendance,
        message: message.trim() || null,
      });

      if (sbError) throw sbError;
      setSubmitted(true);
    } catch (err) {
      console.error('RSVP error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return <ConfirmationScreen data={data} attendance={attendance} name={name} inviteId={id || ''} />;
  }

  return (
    <div
      className="min-h-dvh flex flex-col"
      style={{ background: 'linear-gradient(160deg, #fdf2f8 0%, #fce7f3 40%, #ede9fe 100%)' }}
    >
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-4 max-w-2xl mx-auto w-full">
        <Link to="/" className="script-font text-2xl text-rose-400">Everly</Link>
        {id && (
          <Link to={`/invite/${id}`} className="text-xs text-stone-400 hover:text-stone-600 transition-colors">
            ← View invitation
          </Link>
        )}
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-lg">
          {/* Heading */}
          <div className="text-center mb-8">
            <span className="text-4xl mb-3 block">💌</span>
            {data ? (
              <>
                <h1 className="serif-font text-2xl sm:text-3xl font-light text-stone-800 mb-2 text-balance">
                  RSVP to{' '}
                  <em className="text-rose-400">
                    {data.partnerA} &amp; {data.partnerB}'s
                  </em>{' '}
                  wedding
                </h1>
                {data.date && (
                  <p className="text-stone-400 text-sm">
                    {new Date(data.date + 'T00:00:00').toLocaleDateString('en-US', {
                      weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
                    })}
                  </p>
                )}
              </>
            ) : (
              <h1 className="serif-font text-2xl font-light text-stone-800">RSVP</h1>
            )}
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="card p-6 sm:p-8 flex flex-col gap-6"
          >
            {/* Name */}
            <div>
              <label className="label" htmlFor="rsvp-name">Your name *</label>
              <input
                id="rsvp-name"
                className="input-field"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Attendance */}
            <div>
              <label className="label">Will you attend? *</label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {ATTENDANCE_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setAttendance(opt.value)}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border-2 text-xs font-medium transition-all duration-150 ${
                      attendance === opt.value
                        ? 'border-current text-current'
                        : 'border-stone-200 text-stone-500 hover:border-stone-300'
                    }`}
                    style={
                      attendance === opt.value
                        ? { borderColor: opt.color, color: opt.color, background: `${opt.color}12` }
                        : {}
                    }
                  >
                    <span className="text-xl">{opt.emoji}</span>
                    <span className="leading-tight text-center">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="label" htmlFor="rsvp-message">Message to the couple (optional)</label>
              <textarea
                id="rsvp-message"
                className="input-field resize-none"
                rows={3}
                placeholder="Share your excitement, wishes, or a kind note..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            {error && (
              <p className="text-sm text-red-500 bg-red-50 px-4 py-3 rounded-xl">{error}</p>
            )}

            <button
              type="submit"
              disabled={!name.trim() || !attendance || submitting}
              className="btn-primary py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Sending...' : 'Send my RSVP 💌'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

interface ConfirmationProps {
  data: InvitationData | null;
  attendance: Attendance | null;
  name: string;
  inviteId: string;
}

function ConfirmationScreen({ data, attendance, name, inviteId }: ConfirmationProps) {
  const isYes = attendance === 'yes';
  const isMaybe = attendance === 'maybe';

  return (
    <div
      className="min-h-dvh flex flex-col items-center justify-center px-4 text-center"
      style={{ background: 'linear-gradient(160deg, #fdf2f8 0%, #fce7f3 40%, #ede9fe 100%)' }}
    >
      <div className="card p-8 sm:p-12 max-w-md w-full flex flex-col items-center gap-4">
        <span className="text-6xl">{isYes ? '🎊' : isMaybe ? '🤞' : '💝'}</span>

        <h1 className="serif-font text-2xl sm:text-3xl font-light text-stone-800">
          Thank you, {name}!
        </h1>

        <p className="text-stone-500 leading-relaxed text-balance">
          {isYes
            ? "We're so excited to celebrate with you! See you at the wedding 🥂"
            : isMaybe
            ? "We hope you can make it! We'll keep you updated."
            : "We'll miss you, but we appreciate you letting us know. Sending love your way!"}
        </p>

        {data && (
          <div className="bg-rose-50 rounded-2xl px-5 py-4 w-full text-left">
            <p className="text-xs font-medium text-stone-400 uppercase tracking-widest mb-2">Save the date</p>
            <p className="font-semibold text-stone-700">
              {data.partnerA} &amp; {data.partnerB}
            </p>
            {data.date && (
              <p className="text-sm text-stone-500 mt-0.5">
                {new Date(data.date + 'T00:00:00').toLocaleDateString('en-US', {
                  weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
                })}
              </p>
            )}
            {data.venue && <p className="text-xs text-stone-400 mt-0.5">{data.venue}</p>}
          </div>
        )}

        <Link to={`/invite/${inviteId}`} className="btn-secondary text-sm mt-2">
          View invitation
        </Link>
        <Link to="/" className="btn-ghost text-xs text-stone-400">
          Create your own invitation →
        </Link>
      </div>
    </div>
  );
}
