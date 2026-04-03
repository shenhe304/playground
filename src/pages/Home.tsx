import { useNavigate } from 'react-router-dom';
import TemplateCard from '../components/TemplateCard';
import { TemplateId } from '../lib/types';

const templates: { id: TemplateId; name: string; description: string }[] = [
  {
    id: 'bloom',
    name: 'Bloom',
    description: 'Pastel pink & lilac with floral accents and elegant serif typography. Soft and romantic.',
  },
  {
    id: 'confetti',
    name: 'Confetti',
    description: 'Playful white base with colorful pastel confetti. Bold and celebratory for a fun wedding.',
  },
  {
    id: 'golden-hour',
    name: 'Golden Hour',
    description: 'Warm ivory & peach with a soft gradient. Classic elegance with a sunlit, heirloom feel.',
  },
];

export default function Home() {
  const navigate = useNavigate();

  const handleSelect = (templateId: TemplateId) => {
    navigate(`/create?template=${templateId}`);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--color-surface)',
        padding: '0 0 80px',
      }}
    >
      {/* Hero */}
      <div
        style={{
          textAlign: 'center',
          padding: '72px 24px 56px',
          background: 'linear-gradient(180deg, var(--color-surface-lowest) 0%, var(--color-surface) 100%)',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '11px',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'var(--color-primary)',
            marginBottom: '16px',
            fontWeight: 600,
          }}
        >
          Wedding Invitations
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(36px, 6vw, 64px)',
            fontWeight: 700,
            color: 'var(--color-on-surface)',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            marginBottom: '20px',
            maxWidth: '640px',
            margin: '0 auto 20px',
          }}
        >
          Your love story, beautifully told
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '17px',
            color: 'var(--color-neutral)',
            maxWidth: '480px',
            margin: '0 auto',
            lineHeight: 1.65,
          }}
        >
          Choose a template and create a stunning digital invitation in minutes. Share it with the world.
        </p>
      </div>

      {/* Template grid */}
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 24px',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--color-neutral)',
            marginBottom: '32px',
            textAlign: 'center',
          }}
        >
          Pick your style
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '28px',
          }}
        >
          {templates.map((t) => (
            <TemplateCard
              key={t.id}
              templateId={t.id}
              name={t.name}
              description={t.description}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
