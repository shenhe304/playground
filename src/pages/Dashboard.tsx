import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { RSVPResponse } from '../lib/types';

const ATTENDANCE_STYLES: Record<string, { label: string; color: string; bg: string; emoji: string }> = {
  yes: { label: 'Attending', color: '#10b981', bg: '#ecfdf5', emoji: '🎉' },
  maybe: { label: 'Maybe', color: '#f59e0b', bg: '#fffbeb', emoji: '🤞' },
  no: { label: 'Declining', color: '#f43f5e', bg: '#fff1f2', emoji: '💌' },
};

export default function Dashboard() {
  const [responses, setResponses] = useState<RSVPResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchResponses() {
      setLoading(true);
      setError(null);
      try {
        const { data, error: sbError } = await supabase
          .from('rsvp_responses')
          .select('*')
          .order('created_at', { ascending: false });

        if (sbError) throw sbError;
        setResponses(data || []);
      } catch (err) {
        console.error('Dashboard fetch error:', err);
        setError('Could not load RSVP responses. Check your Supabase configuration.');
      } finally {
        setLoading(false);
      }
    }

    fetchResponses();
  }, []);

  const counts = {
    yes: responses.filter((r) => r.attendance === 'yes').length,
    maybe: responses.filter((r) => r.attendance === 'maybe').length,
    no: responses.filter((r) => r.attendance === 'no').length,
  };

  return (
    <div className="min-h-dvh bg-stone-50">
      {/* Header */}
      <header className="bg-white border-b border-stone-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <Link to="/" className="script-font text-2xl text-rose-400">Everly</Link>
          <Link to="/" className="btn-secondary text-sm">
            ← Back to templates
          </Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Page title */}
        <div className="mb-8">
          <h1 className="serif-font text-3xl font-light text-stone-800 mb-1">RSVP Dashboard</h1>
          <p className="text-stone-400 text-sm">All responses from your guests</p>
        </div>

        {/* Stats */}
        {!loading && !error && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="card p-4 text-center">
              <p className="text-2xl font-bold text-stone-800">{responses.length}</p>
              <p className="text-xs text-stone-400 mt-0.5 uppercase tracking-wide">Total RSVPs</p>
            </div>
            {(['yes', 'maybe', 'no'] as const).map((key) => {
              const s = ATTENDANCE_STYLES[key];
              return (
                <div key={key} className="card p-4 text-center" style={{ background: s.bg }}>
                  <p className="text-2xl font-bold" style={{ color: s.color }}>{counts[key]}</p>
                  <p className="text-xs mt-0.5 uppercase tracking-wide" style={{ color: s.color, opacity: 0.7 }}>
                    {s.emoji} {s.label}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div className="card p-12 text-center">
            <div className="w-8 h-8 border-2 border-rose-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-stone-400 text-sm">Loading responses...</p>
          </div>
        ) : error ? (
          <div className="card p-8 text-center">
            <span className="text-4xl mb-3 block">⚠️</span>
            <p className="text-stone-700 font-medium mb-1">Could not load responses</p>
            <p className="text-stone-400 text-sm">{error}</p>
          </div>
        ) : responses.length === 0 ? (
          <div className="card p-12 text-center">
            <span className="text-5xl mb-4 block">💌</span>
            <h2 className="serif-font text-xl text-stone-700 mb-2">No RSVPs yet</h2>
            <p className="text-stone-400 text-sm">
              Share your invitation link and RSVPs will appear here.
            </p>
            <Link to="/" className="btn-primary mt-6 text-sm inline-flex">
              Create an invitation
            </Link>
          </div>
        ) : (
          <div className="card overflow-hidden">
            {/* Table header */}
            <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-3 bg-stone-50 border-b border-stone-100 text-xs font-medium text-stone-400 uppercase tracking-wider">
              <div className="col-span-3">Guest</div>
              <div className="col-span-2">Attendance</div>
              <div className="col-span-5">Message</div>
              <div className="col-span-2">Date</div>
            </div>

            {/* Table rows */}
            <div className="divide-y divide-stone-100">
              {responses.map((r) => {
                const s = ATTENDANCE_STYLES[r.attendance] || ATTENDANCE_STYLES.maybe;
                const date = r.created_at ? new Date(r.created_at) : null;

                return (
                  <div
                    key={r.id}
                    className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 px-6 py-4 hover:bg-stone-50/60 transition-colors"
                  >
                    {/* Name */}
                    <div className="sm:col-span-3 font-medium text-stone-800 text-sm">
                      {r.name}
                    </div>

                    {/* Attendance badge */}
                    <div className="sm:col-span-2">
                      <span
                        className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full"
                        style={{ background: s.bg, color: s.color }}
                      >
                        {s.emoji} {s.label}
                      </span>
                    </div>

                    {/* Message */}
                    <div className="sm:col-span-5 text-sm text-stone-500 leading-relaxed">
                      {r.message ? (
                        <span className="italic">"{r.message}"</span>
                      ) : (
                        <span className="text-stone-300">—</span>
                      )}
                    </div>

                    {/* Date */}
                    <div className="sm:col-span-2 text-xs text-stone-400">
                      {date
                        ? date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                        : '—'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
