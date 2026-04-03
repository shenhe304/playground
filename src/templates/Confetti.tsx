import { InviteData } from '../lib/types';

interface ConfettiProps {
  data: InviteData;
  mini?: boolean;
}

const confettiDots = [
  { x: 8, y: 6, r: 14, color: '#fecbcb' },
  { x: 85, y: 10, r: 10, color: '#e8dff0' },
  { x: 92, y: 25, r: 18, color: '#fecbcb' },
  { x: 5, y: 35, r: 8, color: '#c8e6c9' },
  { x: 78, y: 55, r: 12, color: '#fff9c4' },
  { x: 15, y: 70, r: 16, color: '#bbdefb' },
  { x: 90, y: 72, r: 9, color: '#fecbcb' },
  { x: 3, y: 88, r: 20, color: '#e8dff0' },
  { x: 82, y: 90, r: 14, color: '#c8e6c9' },
  { x: 50, y: 4, r: 7, color: '#fff9c4' },
  { x: 30, y: 92, r: 11, color: '#fecbcb' },
  { x: 60, y: 88, r: 9, color: '#bbdefb' },
];

export default function Confetti({ data, mini = false }: ConfettiProps) {
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
            background: 'var(--color-surface-lowest)',
            borderRadius: '32px',
            padding: mini ? '48px 40px' : '56px 48px',
            position: 'relative',
            overflow: 'hidden',
            minHeight: mini ? '900px' : 'auto',
          }}
        >
          {/* Confetti dots */}
          {confettiDots.map((dot, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `${dot.x}%`,
                top: `${dot.y}%`,
                width: `${dot.r}px`,
                height: `${dot.r}px`,
                borderRadius: '50%',
                background: dot.color,
                opacity: 0.75,
              }}
            />
          ))}

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'var(--color-neutral)',
                marginBottom: '28px',
                fontWeight: 600,
              }}
            >
              You're invited!
            </p>

            <h1
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: mini ? '40px' : '54px',
                fontWeight: 700,
                color: 'var(--color-on-surface)',
                lineHeight: 1.1,
                marginBottom: '4px',
              }}
            >
              {data.groomName || 'Partner A'}
            </h1>

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '28px',
                fontWeight: 700,
                color: 'var(--color-tertiary)',
                marginBottom: '4px',
              }}
            >
              +
            </p>

            <h1
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: mini ? '40px' : '54px',
                fontWeight: 700,
                color: 'var(--color-on-surface)',
                lineHeight: 1.1,
                marginBottom: '36px',
              }}
            >
              {data.brideName || 'Partner B'}
            </h1>

            {/* Photo */}
            {data.photo && (
              <div
                style={{
                  margin: '0 auto 32px',
                  width: mini ? '110px' : '130px',
                  height: mini ? '110px' : '130px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '4px solid var(--color-secondary)',
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

            {/* Date/venue block */}
            <div
              style={{
                background: 'var(--color-surface-low)',
                borderRadius: '24px',
                padding: '24px 28px',
                marginBottom: '20px',
              }}
            >
              {data.date && (
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '20px',
                    fontWeight: 700,
                    color: 'var(--color-primary)',
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
                    fontWeight: 500,
                    color: 'var(--color-on-surface)',
                    marginBottom: '8px',
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
                    color: 'var(--color-neutral)',
                    fontWeight: 500,
                  }}
                >
                  {data.venue}
                </p>
              )}
            </div>

            {/* Colorful decorative strip */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '16px' }}>
              {['#fecbcb', '#e8dff0', '#c8e6c9', '#fff9c4', '#bbdefb'].map((color, i) => (
                <div
                  key={i}
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: color,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
