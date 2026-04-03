import { InviteData } from '../lib/types';
import Bloom from '../templates/Bloom';
import Confetti from '../templates/Confetti';
import GoldenHour from '../templates/GoldenHour';

interface InvitationPreviewProps {
  data: InviteData;
}

export default function InvitationPreview({ data }: InvitationPreviewProps) {
  return (
    <div key={data.templateId} className="fade-in">
      {data.templateId === 'bloom' && <Bloom data={data} />}
      {data.templateId === 'confetti' && <Confetti data={data} />}
      {data.templateId === 'golden-hour' && <GoldenHour data={data} />}
    </div>
  );
}
