import type { InvitationData } from '../lib/types';

interface GoldenHourProps {
  data: InvitationData;
  compact?: boolean;
}

const GoldenDivider = ({ compact }: { compact: boolean }) => (
  <div className="flex items-center justify-center gap-3 w-full">
    <div className="flex-1 border-t" style={{ borderColor: '#d4a574', opacity: 0.5 }} />
    <svg
      viewBox="0 0 40 20"
      style={{ width: compact ? 28 : 40, height: compact ? 14 : 20 }}
      aria-hidden="true"
    >
      <path d="M20 2 L22 9 L20 10 L18 9 Z" fill="#d4a574" opacity="0.7" />
      <path d="M20 18 L22 11 L20 10 L18 11 Z" fill="#d4a574" opacity="0.7" />
      <path d="M2 10 L9 8 L10 10 L9 12 Z" fill="#d4a574" opacity="0.5" />
      <path d="M38 10 L31 8 L30 10 L31 12 Z" fill="#d4a574" opacity="0.5" />
      <circle cx="20" cy="10" r="3" fill="#d4a574" opacity="0.9" />
    </svg>
    <div className="flex-1 border-t" style={{ borderColor: '#d4a574', opacity: 0.5 }} />
  </div>
);

const GoldenBorderFrame = ({ compact }: { compact: boolean }) => {
  const pad = compact ? 6 : 12;
  const size = compact ? 12 : 20;
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
      {/* Corner ornaments */}
      {/* Top-left */}
      <g opacity="0.4">
        <line x1={pad} y1={pad} x2={pad + size} y2={pad} stroke="#c9956a" strokeWidth="1" />
        <line x1={pad} y1={pad} x2={pad} y2={pad + size} stroke="#c9956a" strokeWidth="1" />
        <circle cx={pad} cy={pad} r="2.5" fill="#d4a574" />
      </g>
      {/* Top-right */}
      <g opacity="0.4">
        <line x1="100%" y1={pad} x2={`calc(100% - ${pad + size}px)`} y2={pad} stroke="#c9956a" strokeWidth="1" />
        <line x1="100%" y1={pad} x2="100%" y2={pad + size} stroke="#c9956a" strokeWidth="1" />
        <circle cx="100%" cy={pad} r="2.5" fill="#d4a574" />
      </g>
      {/* Bottom-left */}
      <g opacity="0.4">
        <line x1={pad} y1="100%" x2={pad + size} y2="100%" stroke="#c9956a" strokeWidth="1" />
        <line x1={pad} y1="100%" x2={pad} y2={`calc(100% - ${size}px)`} stroke="#c9956a" strokeWidth="1" />
        <circle cx={pad} cy="100%" r="2.5" fill="#d4a574" />
      </g>
      {/* Bottom-right */}
      <g opacity="0.4">
        <line x1="100%" y1="100%" x2={`calc(100% - ${pad + size}px)`} y2="100%" stroke="#c9956a" strokeWidth="1" />
        <line x1="100%" y1="100%" x2="100%" y2={`calc(100% - ${size}px)`} stroke="#c9956a" strokeWidth="1" />
        <circle cx="100%" cy="100%" r="2.5" fill="#d4a574" />
      </g>
    </svg>
  );
};

export default function GoldenHour({ data, compact = false }: GoldenHourProps) {
  const { partnerA, partnerB, date, time, venue, photoUrl } = data;

  const formattedDate = date
    ? new Date(date + 'T00:00:00').toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Date TBD';

  return (
    <div
      className="relative overflow-hidden flex flex-col"
      style={{
        background: 'linear-gradient(170deg, #fdf8f0 0%, #fef3e2 50%, #fde8d0 100%)',
        fontFamily: "'DM Sans', sans-serif",
        minHeight: compact ? undefined : '100%',
      }}
    >
      <GoldenBorderFrame compact={compact} />

      {/* Top ornament bar */}
      <div
        className="w-full flex-shrink-0"
        style={{ background: 'linear-gradient(90deg, transparent, #d4a574, transparent)', height: compact ? 1 : 2, opacity: 0.6, marginTop: compact ? 16 : 28 }}
      />

      {/* Content */}
      <div className={`flex flex-col items-center text-center ${compact ? 'px-8 py-4 gap-3' : 'px-10 py-8 gap-6'}`}>

        <div>
          <p
            className="uppercase tracking-[0.35em] text-amber-700"
            style={{ fontSize: compact ? '7px' : '10px', opacity: 0.8 }}
          >
            The Wedding of
          </p>
        </div>

        {photoUrl && (
          <div
            className="overflow-hidden"
            style={{
              width: compact ? 64 : 100,
              height: compact ? 64 : 100,
              borderRadius: '50%',
              border: `3px solid #d4a574`,
              boxShadow: '0 0 0 2px #fdf8f0, 0 0 0 4px #d4a574',
              opacity: 0.9,
            }}
          >
            <img src={photoUrl} alt="Couple" className="w-full h-full object-cover" />
          </div>
        )}

        <div>
          <h1
            className="script-font leading-none"
            style={{ fontSize: compact ? '36px' : '60px', color: '#92400e' }}
          >
            {partnerA || 'Partner A'}
          </h1>
          <p
            className="serif-font italic"
            style={{
              fontSize: compact ? '11px' : '16px',
              color: '#d4a574',
              margin: compact ? '6px 0' : '10px 0',
              letterSpacing: '0.15em',
            }}
          >
            — and —
          </p>
          <h1
            className="script-font leading-none"
            style={{ fontSize: compact ? '36px' : '60px', color: '#92400e' }}
          >
            {partnerB || 'Partner B'}
          </h1>
        </div>

        <GoldenDivider compact={compact} />

        <div className="space-y-1.5">
          <p
            className="serif-font italic text-amber-900"
            style={{ fontSize: compact ? '13px' : '18px', opacity: 0.9 }}
          >
            {formattedDate}
          </p>
          {time && (
            <p
              className="text-amber-800 tracking-wider"
              style={{ fontSize: compact ? '11px' : '13px', opacity: 0.75 }}
            >
              {time}
            </p>
          )}
          {venue && (
            <p
              className="text-amber-700 leading-snug"
              style={{ fontSize: compact ? '10px' : '13px', opacity: 0.7, maxWidth: compact ? 160 : 260 }}
            >
              {venue}
            </p>
          )}
        </div>

        <div
          className="border rounded-sm px-5 py-1.5 tracking-[0.3em] uppercase text-amber-700"
          style={{
            fontSize: compact ? '7px' : '9px',
            borderColor: '#d4a574',
            opacity: 0.8,
          }}
        >
          Request the honour of your presence
        </div>
      </div>

      {/* Bottom ornament bar */}
      <div
        className="w-full flex-shrink-0 mt-auto"
        style={{ background: 'linear-gradient(90deg, transparent, #d4a574, transparent)', height: compact ? 1 : 2, opacity: 0.6, marginBottom: compact ? 16 : 28 }}
      />
    </div>
  );
}
