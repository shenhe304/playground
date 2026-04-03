import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import InvitationPreview from '../components/InvitationPreview';
import { InviteData } from '../lib/types';

export default function Invite() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<InviteData | null>(null);
  const [copied, setCopied] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;
    const invites = JSON.parse(localStorage.getItem('wedding-invites') || '{}');
    if (invites[id]) {
      setData(invites[id]);
    } else {
      setNotFound(true);
    }
  }, [id]);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  if (notFound) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--color-surface)',
          padding: '32px',
          textAlign: 'center',
          gap: '20px',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '32px',
            color: 'var(--color-on-surface)',
          }}
        >
          Invitation Not Found
        </h2>
        <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-neutral)', fontSize: '16px' }}>
          This invitation may have been removed or the link is invalid.
        </p>
        <button className="btn-primary" onClick={() => navigate('/')}>
          Create Your Own
        </button>
      </div>
    );
  }

  if (!data) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--color-surface)',
        }}
      >
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: '3px solid var(--color-tertiary)',
            borderTopColor: 'var(--color-primary)',
            animation: 'spin 0.8s linear infinite',
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
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
      <div style={{ maxWidth: '580px', margin: '0 auto' }}>
        {/* Invitation */}
        <div className="fade-in">
          <InvitationPreview data={data} />
        </div>

        {/* Actions */}
        <div
          style={{
            marginTop: '32px',
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <button
            className="btn-primary"
            onClick={() => navigate(`/rsvp/${id}`)}
          >
            RSVP Now
          </button>

          <button
            className="btn-secondary"
            onClick={handleShare}
            style={{ position: 'relative' }}
          >
            {copied ? 'Link Copied!' : 'Share Invitation'}
          </button>
        </div>

        {/* Footer note */}
        <p
          style={{
            textAlign: 'center',
            fontFamily: 'var(--font-sans)',
            fontSize: '13px',
            color: 'var(--color-neutral)',
            marginTop: '40px',
          }}
        >
          Made with{' '}
          <span
            style={{ color: 'var(--color-primary)', cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            Wedding Invitation
          </span>
        </p>
      </div>
    </div>
  );
}
