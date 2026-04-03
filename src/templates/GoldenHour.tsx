import { InviteData } from '../lib/types';

interface GoldenHourProps {
  data: InviteData;
  mini?: boolean;
}

export default function GoldenHour({ data, mini = false }: GoldenHourProps) {
  const wrapperStyle = mini
    ? { width: '260px', height: '360px', overflow: 'hidden' }
    : {};

  const scale = mini ? 'scale-[0.38]' : '';
  const origin = mini ? 'origin-top-left' : '';

  return (
    <div style={wrapperStyle} className="relative">
      <div
        className={`${scale} ${origin}`}
        style={mini ? { width: '680px', transformOrigin: 'top left' } : { width: '100%' }}
      >
        <div
          style={{
            background: '#f7f3ee',
            borderRadius: '32px',
            padding: mini ? '48px 40px' : '56px 48px',
            position: 'relative',
            overflow: 'hidden',
            minHeight: mini ? '900px' : 'auto',
          }}
        >
          {/* Warm gradient overlay */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                'radial-gradient(ellipse at 80% 10%, rgba(254,203,203,0.35) 0%, transparent 60%), radial-gradient(ellipse at 10% 90%, rgba(232,223,240,0.25) 0%, transparent 50%)',
              pointerEvents: 'none',
            }}
          />

          {/* Decorative golden line */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '1px',
              height: '100%',
              background: 'linear-gradient(to bottom, transparent, rgba(160,112,112,0.12), transparent)',
              pointerEvents: 'none',
            }}
          />

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
            {/* Top ornament */}
            <div style={{ marginBottom: '28px' }}>
              <svg width="120" height="20" viewBox="0 0 120 20">
                <line x1="0" y1="10" x2="48" y2="10" stroke="rgba(160,112,112,0.35)" strokeWidth="1" />
                <circle cx="60" cy="10" r="4" fill="rgba(160,112,112,0.4)" />
                <line x1="72" y1="10" x2="120" y2="10" stroke="rgba(160,112,112,0.35)" strokeWidth="1" />
              </svg>
            </div>

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '10px',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'rgba(160,112,112,0.7)',
                marginBottom: '24px',
                fontWeight: 600,
              }}
            >
              The wedding of
            </p>

            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: mini ? '44px' : '56px',
                fontWeight: 400,
                color: '#a07070',
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
                marginBottom: '8px',
              }}
            >
              {data.groomName || 'Partner A'}
            </h1>

            <div style={{ margin: '8px 0 8px' }}>
              <svg width="80" height="16" viewBox="0 0 80 16">
                <line x1="0" y1="8" x2="32" y2="8" stroke="rgba(160,112,112,0.3)" strokeWidth="1" />
                <text x="40" y="12" textAnchor="middle" fill="rgba(160,112,112,0.6)" fontSize="12" fontStyle="italic" fontFamily="Noto Serif, serif">&amp;</text>
                <line x1="48" y1="8" x2="80" y2="8" stroke="rgba(160,112,112,0.3)" strokeWidth="1" />
              </svg>
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: mini ? '44px' : '56px',
                fontWeight: 400,
                color: '#a07070',
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
                marginBottom: '36px',
              }}
            >
              {data.brideName || 'Partner B'}
            </h1>

            {/* Photo */}
            {data.photo && (
              <div
                style={{
                  margin: '0 auto 36px',
                  width: mini ? '120px' : '140px',
                  height: mini ? '120px' : '140px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '3px solid rgba(160,112,112,0.25)',
                  boxShadow: '0 8px 32px rgba(160,112,112,0.15)',
                }}
              >
                <img
                  src={data.photo}
                  alt="Couple"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            )}

            {/* Date and venue */}
            <div
              style={{
                background: 'rgba(247,243,238,0.7)',
                borderRadius: '24px',
                padding: '28px 32px',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(160,112,112,0.08)',
              }}
            >
              {data.date && (
                <p
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '22px',
                    fontWeight: 400,
                    color: 'var(--color-on-surface)',
                    marginBottom: '6px',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {new Date(data.date + 'T00:00:00').toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              )}
              {data.time && (
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '15px',
                    color: 'rgba(160,112,112,0.8)',
                    fontWeight: 500,
                    marginBottom: '12px',
                  }}
                >
                  {data.time}
                </p>
              )}
              {data.venue && (
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '15px',
                    color: 'var(--color-on-surface)',
                    fontWeight: 400,
                  }}
                >
                  {data.venue}
                </p>
              )}
            </div>

            {/* Bottom ornament */}
            <div style={{ marginTop: '28px' }}>
              <svg width="120" height="20" viewBox="0 0 120 20">
                <line x1="0" y1="10" x2="48" y2="10" stroke="rgba(160,112,112,0.3)" strokeWidth="1" />
                <circle cx="60" cy="10" r="3" fill="rgba(160,112,112,0.35)" />
                <line x1="72" y1="10" x2="120" y2="10" stroke="rgba(160,112,112,0.3)" strokeWidth="1" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
