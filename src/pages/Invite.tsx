import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import type { InvitationData } from '../lib/types';
import Bloom from '../templates/Bloom';
import Confetti from '../templates/Confetti';
import GoldenHour from '../templates/GoldenHour';

function decodeInvite(id: string): InvitationData | null {
  try {
    return JSON.parse(decodeURIComponent(atob(id)));
  } catch {
    return null;
  }
}

export default function Invite() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  if (!id) return <NotFound />;

  const data = decodeInvite(id);
  if (!data) return <NotFound />;

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const TemplateComponent = {
    bloom: Bloom,
    confetti: Confetti,
    'golden-hour': GoldenHour,
  }[data.template];

  if (!TemplateComponent) return <NotFound />;

  return (
    <div className="min-h-dvh flex flex-col" style={{ background: 'linear-gradient(160deg, #fdf2f8 0%, #fce7f3 30%, #ede9fe 70%, #fdf8f0 100%)' }}>
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-4 max-w-3xl mx-auto w-full">
        <Link to="/" className="script-font text-2xl text-rose-400">Everly</Link>
        <Link to={`/create?template=${data.template}`} className="text-xs text-stone-400 hover:text-stone-600 transition-colors">
          Create yours →
        </Link>
      </header>

      {/* Invitation */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="overflow-hidden rounded-3xl shadow-2xl" style={{ minHeight: 540 }}>
            <TemplateComponent data={data} compact={false} />
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-8 w-full max-w-md">
          <button
            onClick={() => navigate(`/rsvp/${id}`)}
            className="flex-1 btn-primary py-4 text-base font-semibold"
          >
            RSVP Now 💌
          </button>
          <button
            onClick={handleShare}
            className={`flex-1 btn-secondary py-4 text-base font-semibold transition-all duration-200 ${copied ? 'bg-green-50 border-green-300 text-green-700' : ''}`}
          >
            {copied ? '✓ Link copied!' : 'Share invitation'}
          </button>
        </div>

        <p className="mt-6 text-xs text-stone-400 text-center">
          Share this page with your guests · Created with Everly
        </p>
      </main>
    </div>
  );
}

function NotFound() {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center text-center px-4" style={{ background: '#fdf2f8' }}>
      <span className="text-5xl mb-4">💐</span>
      <h1 className="serif-font text-2xl text-stone-700 mb-2">Invitation not found</h1>
      <p className="text-stone-400 mb-6">This link may be expired or incorrect.</p>
      <Link to="/" className="btn-primary">Go home</Link>
    </div>
  );
}
