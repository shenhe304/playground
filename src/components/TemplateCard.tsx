import { TemplateId, InviteData } from '../lib/types';
import Bloom from '../templates/Bloom';
import Confetti from '../templates/Confetti';
import GoldenHour from '../templates/GoldenHour';

interface TemplateCardProps {
  templateId: TemplateId;
  name: string;
  description: string;
  onSelect: (id: TemplateId) => void;
}

const sampleData: InviteData = {
  id: 'preview',
  templateId: 'bloom',
  groomName: 'Alexander',
  brideName: 'Sophia',
  date: '2025-06-14',
  time: '4:00 PM',
  venue: 'The Grand Garden Estate',
};

export default function TemplateCard({ templateId, name, description, onSelect }: TemplateCardProps) {
  const preview = { ...sampleData, templateId };

  return (
    <div
      style={{
        background: 'var(--color-surface-lowest)',
        borderRadius: '32px',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-float)',
        cursor: 'pointer',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        display: 'flex',
        flexDirection: 'column',
      }}
      className="template-card"
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-8px)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 20px 60px 0 rgba(46,47,45,0.1)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = 'var(--shadow-float)';
      }}
    >
      {/* Preview thumbnail */}
      <div
        style={{
          padding: '24px 24px 0',
          background: 'var(--color-surface-low)',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {templateId === 'bloom' && <Bloom data={preview} mini />}
        {templateId === 'confetti' && <Confetti data={preview} mini />}
        {templateId === 'golden-hour' && <GoldenHour data={preview} mini />}
      </div>

      {/* Card info */}
      <div style={{ padding: '24px 28px 28px', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div>
          <h3
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '22px',
              fontWeight: 700,
              color: 'var(--color-on-surface)',
              marginBottom: '6px',
            }}
          >
            {name}
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '14px',
              color: 'var(--color-neutral)',
              lineHeight: 1.5,
            }}
          >
            {description}
          </p>
        </div>

        <button
          className="btn-primary"
          style={{ marginTop: 'auto', width: '100%' }}
          onClick={() => onSelect(templateId)}
        >
          Use this template
        </button>
      </div>
    </div>
  );
}
