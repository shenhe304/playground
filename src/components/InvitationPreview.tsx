import type { InvitationData } from '../lib/types';
import Bloom from '../templates/Bloom';
import Confetti from '../templates/Confetti';
import GoldenHour from '../templates/GoldenHour';

interface InvitationPreviewProps {
  data: InvitationData;
  compact?: boolean;
  className?: string;
}

export default function InvitationPreview({ data, compact = false, className = '' }: InvitationPreviewProps) {
  const TemplateComponent = {
    bloom: Bloom,
    confetti: Confetti,
    'golden-hour': GoldenHour,
  }[data.template];

  if (!TemplateComponent) return null;

  return (
    <div
      className={`overflow-hidden rounded-2xl shadow-lg ${className}`}
      style={{ aspectRatio: compact ? '3/4' : '2/3' }}
    >
      <TemplateComponent data={data} compact={compact} />
    </div>
  );
}
