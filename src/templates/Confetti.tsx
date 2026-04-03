import type { InvitationData } from '../lib/types';

interface ConfettiProps {
  data: InvitationData;
  compact?: boolean;
}

// Confetti dots background
const ConfettiBg = ({ compact }: { compact: boolean }) => {
  const dots = [
    { cx: 20, cy: 25, r: 5, fill: '#f472b6' },
    { cx: 55, cy: 10, r: 3, fill: '#a78bfa' },
    { cx: 80, cy: 35, r: 7, fill: '#34d399' },
    { cx: 110, cy: 15, r: 4, fill: '#fbbf24' },
    { cx: 140, cy: 40, r: 5, fill: '#60a5fa' },
    { cx: 170, cy: 8, r: 6, fill: '#f472b6' },
    { cx: 200, cy: 30, r: 3, fill: '#a78bfa' },
    { cx: 230, cy: 12, r: 5, fill: '#34d399' },
    { cx: 260, cy: 38, r: 4, fill: '#fbbf24' },
    { cx: 290, cy: 18, r: 6, fill: '#60a5fa' },
    { cx: 320, cy: 42, r: 3, fill: '#f472b6' },
    { cx: 350, cy: 22, r: 5, fill: '#a78bfa' },
    { cx: 378, cy: 10, r: 7, fill: '#34d399' },
    // Bottom row
    { cx: 15, cy: 75, r: 4, fill: '#60a5fa' },
    { cx: 45, cy: 88, r: 6, fill: '#f472b6' },
    { cx: 75, cy: 72, r: 3, fill: '#fbbf24' },
    { cx: 105, cy: 92, r: 5, fill: '#a78bfa' },
    { cx: 135, cy: 78, r: 7, fill: '#34d399' },
    { cx: 165, cy: 95, r: 4, fill: '#60a5fa' },
    { cx: 200, cy: 82, r: 5, fill: '#f472b6' },
    { cx: 235, cy: 96, r: 3, fill: '#fbbf24' },
    { cx: 265, cy: 76, r: 6, fill: '#a78bfa' },
    { cx: 295, cy: 90, r: 4, fill: '#34d399' },
    { cx: 325, cy: 80, r: 5, fill: '#60a5fa' },
    { cx: 355, cy: 94, r: 3, fill: '#f472b6' },
    { cx: 385, cy: 75, r: 6, fill: '#a78bfa' },
    // Rect confetti
    { cx: 35, cy: 55, r: 3, fill: '#fbbf24', isRect: true },
    { cx: 90, cy: 60, r: 4, fill: '#f472b6', isRect: true },
    { cx: 155, cy: 58, r: 3, fill: '#34d399', isRect: true },
    { cx: 215, cy: 62, r: 4, fill: '#60a5fa', isRect: true },
    { cx: 280, cy: 55, r: 3, fill: '#a78bfa', isRect: true },
    { cx: 340, cy: 60, r: 4, fill: '#fbbf24', isRect: true },
  ];

  return (
    <svg viewBox="0 0 400 100" className="w-full" aria-hidden="true" style={{ height: compact ? 60 : 90 }}>
      {dots.map((d, i) => (
        d.isRect
          ? <rect key={i} x={d.cx - d.r} y={d.cy - d.r} width={d.r * 2} height={d.r * 2} rx="1" fill={d.fill} opacity={0.55} transform={`rotate(${i * 17} ${d.cx} ${d.cy})`} />
          : <circle key={i} cx={d.cx} cy={d.cy} r={d.r} fill={d.fill} opacity={0.5} />
      ))}
    </svg>
  );
};

export default function Confetti({ data, compact = false }: ConfettiProps) {
  const { partnerA, partnerB, date, time, venue, photoUrl } = data;

  const formattedDate = date
    ? new Date(date + 'T00:00:00').toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Date TBD';

  const colors = ['#f472b6', '#a78bfa', '#34d399', '#fbbf24', '#60a5fa'];

  return (
    <div
      className="relative overflow-hidden flex flex-col"
      style={{
        background: '#ffffff',
        fontFamily: "'DM Sans', sans-serif",
        minHeight: compact ? undefined : '100%',
      }}
    >
      {/* Top confetti */}
      <ConfettiBg compact={compact} />

      {/* Content */}
      <div className={`flex flex-col items-center text-center ${compact ? 'px-6 py-3 gap-3' : 'px-8 py-6 gap-5'}`}>

        {/* Colorful name dots row */}
        <div className="flex gap-1.5 justify-center">
          {colors.map((c, i) => (
            <div key={i} className="rounded-full" style={{ width: compact ? 6 : 8, height: compact ? 6 : 8, background: c }} />
          ))}
        </div>

        {photoUrl && (
          <div
            className="rounded-full overflow-hidden border-4 border-white shadow-lg"
            style={{
              width: compact ? 64 : 100,
              height: compact ? 64 : 100,
              outline: '2px solid #f472b6',
              outlineOffset: 2,
            }}
          >
            <img src={photoUrl} alt="Couple" className="w-full h-full object-cover" />
          </div>
        )}

        <div>
          <h1
            className="script-font leading-none"
            style={{ fontSize: compact ? '36px' : '58px', color: '#a78bfa' }}
          >
            {partnerA || 'Partner A'}
          </h1>
          <div className="flex items-center justify-center gap-2 my-1">
            <div className="w-8 border-t border-dashed border-pink-300" />
            <span
              className="font-bold"
              style={{ fontSize: compact ? '12px' : '16px', color: '#f472b6' }}
            >
              ♥
            </span>
            <div className="w-8 border-t border-dashed border-pink-300" />
          </div>
          <h1
            className="script-font leading-none"
            style={{ fontSize: compact ? '36px' : '58px', color: '#34d399' }}
          >
            {partnerB || 'Partner B'}
          </h1>
        </div>

        <div
          className="rounded-full px-4 py-1 font-medium tracking-wide uppercase"
          style={{
            fontSize: compact ? '8px' : '10px',
            background: 'linear-gradient(90deg, #f472b6, #a78bfa, #60a5fa)',
            color: 'white',
          }}
        >
          are getting married!
        </div>

        <div className="space-y-1">
          <p
            className="font-semibold text-stone-800"
            style={{ fontSize: compact ? '12px' : '16px' }}
          >
            {formattedDate}
          </p>
          {time && (
            <p className="text-stone-500" style={{ fontSize: compact ? '11px' : '13px' }}>
              {time}
            </p>
          )}
          {venue && (
            <p
              className="text-stone-400 leading-snug"
              style={{ fontSize: compact ? '10px' : '12px', maxWidth: compact ? 160 : 260 }}
            >
              {venue}
            </p>
          )}
        </div>

        <div className="flex gap-1 justify-center">
          {colors.map((c, i) => (
            <div key={i} className="rounded-sm" style={{ width: compact ? 18 : 24, height: compact ? 3 : 4, background: c }} />
          ))}
        </div>
      </div>

      {/* Bottom confetti (flipped) */}
      <div className="mt-auto transform rotate-180">
        <ConfettiBg compact={compact} />
      </div>
    </div>
  );
}
