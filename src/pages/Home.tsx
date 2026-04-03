import { Link } from 'react-router-dom';
import { TEMPLATES } from '../lib/types';
import TemplateCard from '../components/TemplateCard';

export default function Home() {
  return (
    <div className="min-h-dvh" style={{ background: 'linear-gradient(160deg, #fdf2f8 0%, #fce7f3 30%, #ede9fe 70%, #fdf8f0 100%)' }}>
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <span className="script-font text-3xl text-rose-400">Everly</span>
        <Link to="/dashboard" className="btn-ghost text-sm">
          View RSVPs →
        </Link>
      </nav>

      {/* Hero */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-medium text-rose-500 tracking-widest uppercase mb-8 shadow-sm border border-rose-100">
          <span>✦</span>
          <span>Digital Wedding Invitations</span>
          <span>✦</span>
        </div>

        <h1 className="serif-font text-4xl sm:text-5xl lg:text-6xl font-light text-stone-800 leading-tight mb-4 text-balance">
          Your perfect invitation,
          <br />
          <em className="text-rose-400 font-normal">in minutes</em>
        </h1>

        <p className="text-stone-500 text-lg max-w-xl mx-auto leading-relaxed mb-12">
          Choose a beautiful template, add your details, and share your love story with the world.
        </p>

        {/* Template cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEMPLATES.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>

        {/* Bottom note */}
        <p className="mt-12 text-stone-400 text-sm">
          Free forever · No credit card needed · RSVP tracking included
        </p>
      </div>
    </div>
  );
}
