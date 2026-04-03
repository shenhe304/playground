import { InviteData } from '../lib/types';

interface BloomProps {
  data: InviteData;
  mini?: boolean;
}

export default function Bloom({ data, mini = false }: BloomProps) {
  const scale = mini ? 'scale-[0.38]' : '';
  const origin = mini ? 'origin-top-left' : '';
  const wrapperStyle = mini
    ? { width: '260px', height: '360px', overflow: 'hidden' }
    : {};

  return (
    <div style={wrapperStyle} className="relative">
      <div
        className={`${scale} ${origin}`}
        style={
          mini
            ? { width: '680px', transformOrigin: 'top left' }
            : { width: '100%' }
        }
      >
        <div
          style={{
            background: 'linear-gradient(145deg, #fff0f0 0%, #f0e8ff 100%)',
            borderRadius: mini ? '32px' : '32px',
            padding: mini ? '48px 40px' : '56px 48px',
            position: 'relative',
            overflow: 'hidden',
            minHeight: mini ? '900px' : 'auto',
          }}
        >
          {/* Decorative floral circles */}
          <div
            style={{
              position: 'absolute',
              top: '-40px',
              right: '-40px',
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              background: 'rgba(254, 203, 203, 0.45)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '-30px',
              left: '-30px',
              width: '160px',
              height: '160px',
              borderRadius: '50%',
              background: 'rgba(232, 223, 240, 0.5)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '40%',
              right: '-20px',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'rgba(254, 203, 203, 0.3)',
            }}
          />

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
            {/* Decorative SVG floral top */}
            <div style={{ marginBottom: '24px' }}>
              <svg width="80" height="40" viewBox="0 0 80 40" fill="none">
                <ellipse cx="40" cy="20" rx="8" ry="12" fill="rgba(120,82,82,0.18)" />
                <ellipse cx="20" cy="20" rx="6" ry="9" fill="rgba(254,203,203,0.5)" transform="rotate(-30 20 20)" />
                <ellipse cx="60" cy="20" rx="6" ry="9" fill="rgba(254,203,203,0.5)" transform="rotate(30 60 20)" />
                <ellipse cx="10" cy="28" rx="5" ry="7" fill="rgba(232,223,240,0.6)" transform="rotate(-50 10 28)" />
                <ellipse cx="70" cy="28" rx="5" ry="7" fill="rgba(232,223,240,0.6)" transform="rotate(50 70 28)" />
                <circle cx="40" cy="16" r="4" fill="rgba(120,82,82,0.25)" />
              </svg>
            </div>

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--color-primary)',
                marginBottom: '20px',
                fontWeight: 500,
              }}
            >
              Together with their families
            </p>

            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: mini ? '42px' : '52px',
                fontWeight: 700,
                color: 'var(--color-primary)',
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
                marginBottom: '4px',
              }}
            >
              {data.groomName || 'Partner A'}
            </h1>

            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '22px',
                color: 'rgba(120,82,82,0.6)',
                marginBottom: '4px',
                fontStyle: 'italic',
              }}
            >
              &amp;
            </p>

            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: mini ? '42px' : '52px',
                fontWeight: 700,
                color: 'var(--color-primary)',
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
                marginBottom: '32px',
              }}
            >
              {data.brideName || 'Partner B'}
            </h1>

            {/* Photo */}
            {data.photo && (
              <div
                style={{
                  margin: '0 auto 32px',
                  width: mini ? '120px' : '140px',
                  height: mini ? '120px' : '140px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '4px solid rgba(254,203,203,0.6)',
                  boxShadow: 'var(--shadow-float)',
                }}
              >
                <img
                  src={data.photo}
                  alt="Couple"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            )}

            <div
              style={{
                background: 'rgba(255,255,255,0.55)',
                borderRadius: '24px',
                padding: '24px 32px',
                marginBottom: '24px',
                backdropFilter: 'blur(8px)',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '11px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--color-neutral)',
                  marginBottom: '8px',
                  fontWeight: 600,
                }}
              >
                Request the honour of your presence
              </p>
              {data.date && (
                <p
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '24px',
                    color: 'var(--color-on-surface)',
                    fontWeight: 700,
                    marginBottom: '4px',
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
                    fontSize: '16px',
                    color: 'var(--color-primary)',
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
                  }}
                >
                  {data.venue}
                </p>
              )}
            </div>

            {/* Bottom floral decoration */}
            <div style={{ marginTop: '16px' }}>
              <svg width="60" height="30" viewBox="0 0 60 30" fill="none">
                <ellipse cx="30" cy="15" rx="6" ry="9" fill="rgba(120,82,82,0.15)" />
                <ellipse cx="14" cy="15" rx="5" ry="7" fill="rgba(254,203,203,0.45)" transform="rotate(-30 14 15)" />
                <ellipse cx="46" cy="15" rx="5" ry="7" fill="rgba(254,203,203,0.45)" transform="rotate(30 46 15)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
