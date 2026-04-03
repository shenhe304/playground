import type { InvitationData } from '../lib/types';

interface BloomProps {
  data: InvitationData;
  compact?: boolean;
}

// SVG floral decorations
const FloralTop = () => (
  <svg viewBox="0 0 400 120" className="w-full" aria-hidden="true">
    <g opacity="0.35">
      {/* Center large bloom */}
      <circle cx="200" cy="20" r="12" fill="#e8a0bf" />
      <ellipse cx="200" cy="6" rx="7" ry="12" fill="#f4c2d8" />
      <ellipse cx="214" cy="14" rx="7" ry="12" transform="rotate(60 214 14)" fill="#f4c2d8" />
      <ellipse cx="214" cy="26" rx="7" ry="12" transform="rotate(120 214 26)" fill="#dda0cc" />
      <ellipse cx="200" cy="34" rx="7" ry="12" transform="rotate(180 200 34)" fill="#f4c2d8" />
      <ellipse cx="186" cy="26" rx="7" ry="12" transform="rotate(240 186 26)" fill="#dda0cc" />
      <ellipse cx="186" cy="14" rx="7" ry="12" transform="rotate(300 186 14)" fill="#f4c2d8" />
      {/* Left blooms */}
      <circle cx="90" cy="30" r="9" fill="#c8a0d4" />
      <ellipse cx="90" cy="20" rx="5" ry="9" fill="#ddbce8" />
      <ellipse cx="99" cy="25" rx="5" ry="9" transform="rotate(60 99 25)" fill="#ddbce8" />
      <ellipse cx="99" cy="35" rx="5" ry="9" transform="rotate(120 99 35)" fill="#c8a0d4" />
      <ellipse cx="90" cy="40" rx="5" ry="9" transform="rotate(180 90 40)" fill="#ddbce8" />
      <ellipse cx="81" cy="35" rx="5" ry="9" transform="rotate(240 81 35)" fill="#c8a0d4" />
      <ellipse cx="81" cy="25" rx="5" ry="9" transform="rotate(300 81 25)" fill="#ddbce8" />
      {/* Right blooms */}
      <circle cx="310" cy="30" r="9" fill="#e8a0bf" />
      <ellipse cx="310" cy="20" rx="5" ry="9" fill="#f4c2d8" />
      <ellipse cx="319" cy="25" rx="5" ry="9" transform="rotate(60 319 25)" fill="#f4c2d8" />
      <ellipse cx="319" cy="35" rx="5" ry="9" transform="rotate(120 319 35)" fill="#e8a0bf" />
      <ellipse cx="310" cy="40" rx="5" ry="9" transform="rotate(180 310 40)" fill="#f4c2d8" />
      <ellipse cx="301" cy="35" rx="5" ry="9" transform="rotate(240 301 35)" fill="#e8a0bf" />
      <ellipse cx="301" cy="25" rx="5" ry="9" transform="rotate(300 301 25)" fill="#f4c2d8" />
      {/* Leaves */}
      <ellipse cx="160" cy="45" rx="4" ry="18" transform="rotate(-30 160 45)" fill="#b8d4b0" />
      <ellipse cx="175" cy="55" rx="4" ry="16" transform="rotate(-15 175 55)" fill="#a8c8a0" />
      <ellipse cx="240" cy="45" rx="4" ry="18" transform="rotate(30 240 45)" fill="#b8d4b0" />
      <ellipse cx="225" cy="55" rx="4" ry="16" transform="rotate(15 225 55)" fill="#a8c8a0" />
      <ellipse cx="55" cy="55" rx="3" ry="14" transform="rotate(-25 55 55)" fill="#b8d4b0" />
      <ellipse cx="345" cy="55" rx="3" ry="14" transform="rotate(25 345 55)" fill="#b8d4b0" />
      {/* Small buds */}
      <circle cx="135" cy="65" r="5" fill="#f4c2d8" />
      <circle cx="265" cy="65" r="5" fill="#ddbce8" />
      <circle cx="30" cy="70" r="4" fill="#e8a0bf" />
      <circle cx="370" cy="70" r="4" fill="#c8a0d4" />
    </g>
  </svg>
);

const FloralBottom = () => (
  <svg viewBox="0 0 400 120" className="w-full" aria-hidden="true">
    <g opacity="0.35" transform="scale(1,-1) translate(0,-120)">
      <circle cx="200" cy="20" r="12" fill="#e8a0bf" />
      <ellipse cx="200" cy="6" rx="7" ry="12" fill="#f4c2d8" />
      <ellipse cx="214" cy="14" rx="7" ry="12" transform="rotate(60 214 14)" fill="#f4c2d8" />
      <ellipse cx="214" cy="26" rx="7" ry="12" transform="rotate(120 214 26)" fill="#dda0cc" />
      <ellipse cx="200" cy="34" rx="7" ry="12" transform="rotate(180 200 34)" fill="#f4c2d8" />
      <ellipse cx="186" cy="26" rx="7" ry="12" transform="rotate(240 186 26)" fill="#dda0cc" />
      <ellipse cx="186" cy="14" rx="7" ry="12" transform="rotate(300 186 14)" fill="#f4c2d8" />
      <circle cx="90" cy="30" r="9" fill="#c8a0d4" />
      <ellipse cx="90" cy="20" rx="5" ry="9" fill="#ddbce8" />
      <ellipse cx="99" cy="25" rx="5" ry="9" transform="rotate(60 99 25)" fill="#ddbce8" />
      <ellipse cx="99" cy="35" rx="5" ry="9" transform="rotate(120 99 35)" fill="#c8a0d4" />
      <ellipse cx="90" cy="40" rx="5" ry="9" transform="rotate(180 90 40)" fill="#ddbce8" />
      <ellipse cx="81" cy="35" rx="5" ry="9" transform="rotate(240 81 35)" fill="#c8a0d4" />
      <ellipse cx="81" cy="25" rx="5" ry="9" transform="rotate(300 81 25)" fill="#ddbce8" />
      <circle cx="310" cy="30" r="9" fill="#e8a0bf" />
      <ellipse cx="310" cy="20" rx="5" ry="9" fill="#f4c2d8" />
      <ellipse cx="319" cy="25" rx="5" ry="9" transform="rotate(60 319 25)" fill="#f4c2d8" />
      <ellipse cx="319" cy="35" rx="5" ry="9" transform="rotate(120 319 35)" fill="#e8a0bf" />
      <ellipse cx="310" cy="40" rx="5" ry="9" transform="rotate(180 310 40)" fill="#f4c2d8" />
      <ellipse cx="301" cy="35" rx="5" ry="9" transform="rotate(240 301 35)" fill="#e8a0bf" />
      <ellipse cx="301" cy="25" rx="5" ry="9" transform="rotate(300 301 25)" fill="#f4c2d8" />
      <ellipse cx="160" cy="45" rx="4" ry="18" transform="rotate(-30 160 45)" fill="#b8d4b0" />
      <ellipse cx="175" cy="55" rx="4" ry="16" transform="rotate(-15 175 55)" fill="#a8c8a0" />
      <ellipse cx="240" cy="45" rx="4" ry="18" transform="rotate(30 240 45)" fill="#b8d4b0" />
      <ellipse cx="225" cy="55" rx="4" ry="16" transform="rotate(15 225 55)" fill="#a8c8a0" />
    </g>
  </svg>
);

export default function Bloom({ data, compact = false }: BloomProps) {
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
        background: 'linear-gradient(160deg, #fdf2f8 0%, #fce7f3 40%, #ede9fe 100%)',
        fontFamily: "'DM Sans', sans-serif",
        minHeight: compact ? undefined : '100%',
      }}
    >
      {/* Top floral */}
      <div className={compact ? '-mt-2 -mb-4' : '-mt-4 -mb-8'}>
        <FloralTop />
      </div>

      {/* Content */}
      <div className={`flex flex-col items-center text-center ${compact ? 'px-6 py-4 gap-3' : 'px-8 py-6 gap-5'}`}>
        <p
          className="text-pink-400 tracking-[0.3em] uppercase"
          style={{ fontSize: compact ? '8px' : '11px', fontWeight: 500 }}
        >
          Together with their families
        </p>

        {photoUrl && (
          <div
            className="rounded-full overflow-hidden border-4 border-white shadow-lg"
            style={{
              width: compact ? 64 : 100,
              height: compact ? 64 : 100,
            }}
          >
            <img src={photoUrl} alt="Couple" className="w-full h-full object-cover" />
          </div>
        )}

        <div>
          <h1
            className="script-font leading-none text-rose-400"
            style={{ fontSize: compact ? '38px' : '62px', color: '#c05891' }}
          >
            {partnerA || 'Partner A'}
          </h1>
          <p
            className="text-purple-300 tracking-widest uppercase"
            style={{ fontSize: compact ? '9px' : '12px', margin: compact ? '4px 0' : '8px 0' }}
          >
            &amp;
          </p>
          <h1
            className="script-font leading-none"
            style={{ fontSize: compact ? '38px' : '62px', color: '#c05891' }}
          >
            {partnerB || 'Partner B'}
          </h1>
        </div>

        <div
          className="w-12 border-t border-pink-300"
          style={{ borderWidth: '1px', margin: compact ? '0' : '4px 0' }}
        />

        <div className="space-y-1">
          <p
            className="serif-font text-purple-800 italic"
            style={{ fontSize: compact ? '13px' : '18px' }}
          >
            {formattedDate}
          </p>
          {time && (
            <p className="text-pink-500" style={{ fontSize: compact ? '11px' : '14px' }}>
              {time}
            </p>
          )}
          {venue && (
            <p
              className="text-stone-500 leading-snug"
              style={{ fontSize: compact ? '10px' : '13px', maxWidth: compact ? 160 : 260 }}
            >
              {venue}
            </p>
          )}
        </div>

        <div
          className="border border-pink-200 rounded-full px-4 py-1"
          style={{ fontSize: compact ? '8px' : '11px' }}
        >
          <span className="text-pink-400 tracking-widest uppercase">Kindly RSVP</span>
        </div>
      </div>

      {/* Bottom floral */}
      <div className={`mt-auto ${compact ? '-mb-2 -mt-4' : '-mb-4 -mt-8'}`}>
        <FloralBottom />
      </div>
    </div>
  );
}
