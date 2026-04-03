import { useNavigate } from 'react-router-dom';
import type { TemplateConfig } from '../lib/types';
import InvitationPreview from './InvitationPreview';

interface TemplateCardProps {
  template: TemplateConfig;
}

const PREVIEW_DATA = {
  bloom: {
    template: 'bloom' as const,
    partnerA: 'Sophie',
    partnerB: 'James',
    date: '2025-06-14',
    time: '4:00 PM',
    venue: 'The Garden Estate, Malibu',
  },
  confetti: {
    template: 'confetti' as const,
    partnerA: 'Lily',
    partnerB: 'Marco',
    date: '2025-08-02',
    time: '5:30 PM',
    venue: 'Rooftop at The Grand, NYC',
  },
  'golden-hour': {
    template: 'golden-hour' as const,
    partnerA: 'Clara',
    partnerB: 'William',
    date: '2025-09-20',
    time: '6:00 PM',
    venue: 'Château Lumière, Napa Valley',
  },
};

export default function TemplateCard({ template }: TemplateCardProps) {
  const navigate = useNavigate();

  const handleSelect = () => {
    navigate(`/create?template=${template.id}`);
  };

  return (
    <div
      className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm border border-stone-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer"
      onClick={handleSelect}
    >
      {/* Mini preview */}
      <div className="relative overflow-hidden" style={{ height: 280 }}>
        <div className="absolute inset-0 scale-100">
          <InvitationPreview
            data={PREVIEW_DATA[template.id]}
            compact
            className="!rounded-none !shadow-none w-full h-full"
          />
        </div>
      </div>

      {/* Card info */}
      <div className="p-5 flex flex-col gap-3">
        <div>
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-base font-semibold text-stone-800">{template.name}</h3>
            <span
              className="text-xs font-medium px-2.5 py-0.5 rounded-full"
              style={{ background: template.bg, color: template.accent }}
            >
              {template.tagline}
            </span>
          </div>
          <p className="text-sm text-stone-400 leading-snug">{template.description}</p>
        </div>

        <button
          className="w-full py-2.5 rounded-2xl text-sm font-semibold tracking-wide transition-all duration-200"
          style={{
            background: `linear-gradient(135deg, ${template.accent}dd, ${template.accent})`,
            color: 'white',
            boxShadow: `0 4px 14px 0 ${template.accent}44`,
          }}
          onClick={(e) => { e.stopPropagation(); handleSelect(); }}
        >
          Use this template
        </button>
      </div>
    </div>
  );
}
