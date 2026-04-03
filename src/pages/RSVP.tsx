import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import RSVPForm from '../components/RSVPForm';
import { InviteData } from '../lib/types';

export default function RSVP() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [inviteData, setInviteData] = useState<InviteData | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!id) return;
    const invites = JSON.parse(localStorage.getItem('wedding-invites') || '{}');
    if (invites[id]) {
      setInviteData(invites[id]);
    }
  }, [id]);

  const coupleNames =
    inviteData
      ? `${inviteData.groomName || 'Partner A'} & ${inviteData.brideName || 'Partner B'}`
      : 'the couple';

  if (submitted) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: 'var(--color-surface)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 24px',
          textAlign: 'center',
        }}
      >
        <div className="fade-in" style={{ maxWidth: '480px' }}>
          {/* Celebration icon */}
          <div style={{ fontSize: '64px', marginBottom: '24px' }}>🎉</div>

          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '36px',
              fontWeight: 700,
              color: 'var(--color-on-surface)',
              letterSpacing: '-0.02em',
              marginBottom: '16px',
            }}
          >
            Can't wait to celebrate with you!
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '16px',
              color: 'var(--color-neutral)',
              lineHeight: 1.65,
              marginBottom: '40px',
            }}
          >
            Your RSVP has been received. {coupleNames} will be thrilled to hear from you.
          </p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              className="btn-primary"
              onClick={() => navigate(`/invite/${id}`)}
            >
              View Invitation
            </button>
            <button className="btn-secondary" onClick={() => navigate('/')}>
              Create Yours
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--color-surface)',
        padding: '40px 24px 80px',
      }}
    >
      <div style={{ maxWidth: '520px', margin: '0 auto' }}>
        {/* Back button */}
        <button
          onClick={() => navigate(`/invite/${id}`)}
          style={{
            background: 'none',
            border: 'none',
            fontFamily: 'var(--font-sans)',
            fontSize: '14px',
            color: 'var(--color-neutral)',
            cursor: 'pointer',
            marginBottom: '32px',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          ← Back to invitation
        </button>

        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--color-primary)',
              marginBottom: '12px',
              fontWeight: 600,
            }}
          >
            RSVP
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '36px',
              fontWeight: 700,
              color: 'var(--color-on-surface)',
              letterSpacing: '-0.02em',
              marginBottom: '8px',
            }}
          >
            Will you join{' '}
            <span style={{ color: 'var(--color-primary)' }}>{coupleNames}</span>?
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '15px',
              color: 'var(--color-neutral)',
              lineHeight: 1.6,
            }}
          >
            Let them know you're coming — it means the world.
          </p>
        </div>

        {/* Form card */}
        <div className="card">
          <RSVPForm
            inviteId={id || ''}
            onSuccess={() => setSubmitted(true)}
          />
        </div>
      </div>
    </div>
  );
}
