import { useState, useRef, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import InvitationPreview from '../components/InvitationPreview';
import { InviteData, TemplateId } from '../lib/types';

function generateId(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

const templateLabels: Record<TemplateId, string> = {
  bloom: 'Bloom',
  confetti: 'Confetti',
  'golden-hour': 'Golden Hour',
};

export default function Create() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const templateParam = searchParams.get('template') as TemplateId | null;
  const validTemplate: TemplateId = templateParam && ['bloom', 'confetti', 'golden-hour'].includes(templateParam)
    ? templateParam
    : 'bloom';

  const [data, setData] = useState<InviteData>({
    id: generateId(),
    templateId: validTemplate,
    groomName: '',
    brideName: '',
    date: '',
    time: '',
    venue: '',
    photo: undefined,
  });

  useEffect(() => {
    setData((prev) => ({ ...prev, templateId: validTemplate }));
  }, [validTemplate]);

  const update = (field: keyof InviteData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setData((prev) => ({ ...prev, photo: ev.target?.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handlePublish = () => {
    // Save to localStorage
    const invites = JSON.parse(localStorage.getItem('wedding-invites') || '{}');
    invites[data.id] = data;
    localStorage.setItem('wedding-invites', JSON.stringify(invites));
    navigate(`/invite/${data.id}`);
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: 'var(--font-sans)',
    fontSize: '12px',
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--color-primary)',
    marginBottom: '8px',
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-surface)' }}>
      {/* Top bar */}
      <div
        style={{
          background: 'rgba(247,246,243,0.85)',
          backdropFilter: 'blur(16px)',
          borderBottom: 'none',
          padding: '16px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-lift)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => navigate('/')}
            style={{
              background: 'var(--color-surface-highest)',
              border: 'none',
              borderRadius: '20px',
              padding: '8px 18px',
              fontFamily: 'var(--font-sans)',
              fontSize: '14px',
              fontWeight: 500,
              color: 'var(--color-on-surface)',
              cursor: 'pointer',
            }}
          >
            ← Back
          </button>
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '18px',
              color: 'var(--color-on-surface)',
            }}
          >
            Customize: <span style={{ color: 'var(--color-primary)' }}>{templateLabels[data.templateId]}</span>
          </span>
        </div>

        <button className="btn-primary" onClick={handlePublish}>
          Create Invitation
        </button>
      </div>

      {/* Main layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '0',
          maxWidth: '1400px',
          margin: '0 auto',
          minHeight: 'calc(100vh - 70px)',
        }}
      >
        {/* Form panel */}
        <div
          style={{
            padding: '40px 32px',
            overflowY: 'auto',
            background: 'var(--color-surface-lowest)',
            boxShadow: '4px 0 24px rgba(46,47,45,0.04)',
          }}
        >
          <div style={{ maxWidth: '480px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '28px',
                  fontWeight: 700,
                  color: 'var(--color-on-surface)',
                  marginBottom: '8px',
                }}
              >
                Your Details
              </h2>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--color-neutral)', lineHeight: 1.6 }}>
                Fill in your information and watch the invitation come to life.
              </p>
            </div>

            {/* Template switcher */}
            <div>
              <span style={labelStyle}>Template</span>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {(['bloom', 'confetti', 'golden-hour'] as TemplateId[]).map((tid) => (
                  <button
                    key={tid}
                    onClick={() => update('templateId', tid)}
                    style={{
                      padding: '8px 18px',
                      borderRadius: '20px',
                      border: 'none',
                      background: data.templateId === tid ? 'var(--color-primary)' : 'var(--color-surface-highest)',
                      color: data.templateId === tid ? 'white' : 'var(--color-on-surface)',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '13px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {templateLabels[tid]}
                  </button>
                ))}
              </div>
            </div>

            {/* Names */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={labelStyle}>Partner A / Groom's Name</label>
                <input
                  className="input-field"
                  type="text"
                  placeholder="e.g. Alexander"
                  value={data.groomName}
                  onChange={(e) => update('groomName', e.target.value)}
                />
              </div>
              <div>
                <label style={labelStyle}>Partner B / Bride's Name</label>
                <input
                  className="input-field"
                  type="text"
                  placeholder="e.g. Sophia"
                  value={data.brideName}
                  onChange={(e) => update('brideName', e.target.value)}
                />
              </div>
            </div>

            {/* Date & Time */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={labelStyle}>Wedding Date</label>
                <input
                  className="input-field"
                  type="date"
                  value={data.date}
                  onChange={(e) => update('date', e.target.value)}
                />
              </div>
              <div>
                <label style={labelStyle}>Time</label>
                <input
                  className="input-field"
                  type="time"
                  value={data.time}
                  onChange={(e) => update('time', e.target.value)}
                />
              </div>
            </div>

            {/* Venue */}
            <div>
              <label style={labelStyle}>Venue Name</label>
              <input
                className="input-field"
                type="text"
                placeholder="e.g. The Grand Garden Estate"
                value={data.venue}
                onChange={(e) => update('venue', e.target.value)}
              />
            </div>

            {/* Photo upload */}
            <div>
              <label style={labelStyle}>Couple Photo</label>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  padding: '20px',
                  background: 'var(--color-surface-low)',
                  borderRadius: '20px',
                }}
              >
                {data.photo ? (
                  <div
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      flexShrink: 0,
                      border: '3px solid var(--color-tertiary)',
                    }}
                  >
                    <img
                      src={data.photo}
                      alt="Couple"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                ) : (
                  <div
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      background: 'var(--color-surface-highest)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="8" r="4" fill="rgba(173,173,171,0.5)" />
                      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="rgba(173,173,171,0.5)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                    </svg>
                  </div>
                )}
                <div>
                  <button
                    type="button"
                    className="btn-secondary"
                    style={{ padding: '10px 20px', fontSize: '13px' }}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {data.photo ? 'Change Photo' : 'Upload Photo'}
                  </button>
                  {data.photo && (
                    <button
                      type="button"
                      style={{
                        display: 'block',
                        marginTop: '8px',
                        background: 'none',
                        border: 'none',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '12px',
                        color: 'var(--color-neutral)',
                        cursor: 'pointer',
                        padding: 0,
                      }}
                      onClick={() => setData((prev) => ({ ...prev, photo: undefined }))}
                    >
                      Remove photo
                    </button>
                  )}
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handlePhotoUpload}
              />
            </div>

            <button className="btn-primary" onClick={handlePublish} style={{ width: '100%' }}>
              Create Invitation →
            </button>
          </div>
        </div>

        {/* Live preview panel */}
        <div
          style={{
            padding: '40px 32px',
            background: 'var(--color-surface)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--color-neutral)',
              marginBottom: '24px',
            }}
          >
            Live Preview
          </p>
          <div style={{ width: '100%', maxWidth: '520px' }}>
            <InvitationPreview data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
