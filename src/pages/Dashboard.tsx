import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { RSVPResponse } from '../lib/types';
import { useNavigate } from 'react-router-dom';

const attendanceColors: Record<string, string> = {
  yes: '#c8e6c9',
  no: '#fecbcb',
  maybe: '#e8dff0',
};

const attendanceLabels: Record<string, string> = {
  yes: 'Attending',
  no: 'Not Attending',
  maybe: 'Maybe',
};

export default function Dashboard() {
  const [responses, setResponses] = useState<RSVPResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResponses = async () => {
      setLoading(true);
      try {
        const { data, error: supaErr } = await supabase
          .from('rsvp_responses')
          .select('*')
          .order('created_at', { ascending: false });

        if (supaErr) {
          setError('Could not load responses. Make sure Supabase is configured.');
        } else {
          setResponses(data || []);
        }
      } catch {
        setError('Could not connect to the database.');
      } finally {
        setLoading(false);
      }
    };

    fetchResponses();
  }, []);

  const counts = {
    yes: responses.filter((r) => r.attendance === 'yes').length,
    no: responses.filter((r) => r.attendance === 'no').length,
    maybe: responses.filter((r) => r.attendance === 'maybe').length,
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--color-surface)',
        padding: '48px 24px 80px',
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '48px',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--color-primary)',
                marginBottom: '8px',
                fontWeight: 600,
              }}
            >
              Dashboard
            </p>
            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '40px',
                fontWeight: 700,
                color: 'var(--color-on-surface)',
                letterSpacing: '-0.02em',
              }}
            >
              RSVP Responses
            </h1>
          </div>
          <button className="btn-primary" onClick={() => navigate('/')}>
            + New Invitation
          </button>
        </div>

        {/* Stats */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
            marginBottom: '40px',
          }}
        >
          {(['yes', 'no', 'maybe'] as const).map((key) => (
            <div
              key={key}
              style={{
                background: 'var(--color-surface-lowest)',
                borderRadius: '24px',
                padding: '24px',
                boxShadow: 'var(--shadow-lift)',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: attendanceColors[key],
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px',
                  fontSize: '20px',
                  fontWeight: 700,
                  fontFamily: 'var(--font-sans)',
                  color: 'var(--color-on-surface)',
                }}
              >
                {counts[key]}
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--color-neutral)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                {attendanceLabels[key]}
              </p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div
          style={{
            background: 'var(--color-surface-lowest)',
            borderRadius: '32px',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-float)',
          }}
        >
          {/* Table header */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1.2fr 2fr 1.5fr',
              padding: '20px 28px',
              background: 'var(--color-surface-low)',
              gap: '16px',
            }}
          >
            {['Name', 'Attendance', 'Message', 'Submitted'].map((col) => (
              <span
                key={col}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--color-neutral)',
                }}
              >
                {col}
              </span>
            ))}
          </div>

          {loading && (
            <div style={{ padding: '48px', textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-neutral)', fontSize: '15px' }}>
                Loading responses...
              </p>
            </div>
          )}

          {error && (
            <div style={{ padding: '48px', textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-primary)', fontSize: '15px' }}>
                {error}
              </p>
              <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-neutral)', fontSize: '13px', marginTop: '8px' }}>
                Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.
              </p>
            </div>
          )}

          {!loading && !error && responses.length === 0 && (
            <div style={{ padding: '64px', textAlign: 'center' }}>
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '22px',
                  color: 'var(--color-on-surface)',
                  marginBottom: '8px',
                }}
              >
                No responses yet
              </p>
              <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-neutral)', fontSize: '15px' }}>
                Share your invitation and RSVPs will appear here.
              </p>
            </div>
          )}

          {!loading && !error && responses.map((response, index) => (
            <div
              key={response.id || index}
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1.2fr 2fr 1.5fr',
                padding: '20px 28px',
                gap: '16px',
                background: index % 2 === 0 ? 'var(--color-surface-lowest)' : 'var(--color-surface)',
                alignItems: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '15px',
                  fontWeight: 600,
                  color: 'var(--color-on-surface)',
                }}
              >
                {response.name}
              </span>

              <span>
                <span
                  style={{
                    background: attendanceColors[response.attendance],
                    borderRadius: '12px',
                    padding: '4px 12px',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: 'var(--color-on-surface)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {attendanceLabels[response.attendance]}
                </span>
              </span>

              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '14px',
                  color: 'var(--color-neutral)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {response.message || '—'}
              </span>

              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13px',
                  color: 'var(--color-neutral)',
                }}
              >
                {response.created_at
                  ? new Date(response.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  : '—'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
