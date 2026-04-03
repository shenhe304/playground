import { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import type { TemplateId, InvitationData } from '../lib/types';
import { TEMPLATES } from '../lib/types';
import InvitationPreview from '../components/InvitationPreview';

export default function Create() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);

  const defaultTemplate = (searchParams.get('template') as TemplateId) || 'bloom';

  const [data, setData] = useState<InvitationData>({
    template: defaultTemplate,
    partnerA: '',
    partnerB: '',
    date: '',
    time: '',
    venue: '',
    photoUrl: undefined,
  });

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  useEffect(() => {
    const t = searchParams.get('template') as TemplateId;
    if (t && TEMPLATES.find((x) => x.id === t)) {
      setData((d) => ({ ...d, template: t }));
    }
  }, [searchParams]);

  const handleChange = (field: keyof InvitationData, value: string) => {
    setData((d) => ({ ...d, [field]: value }));
  };

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const url = ev.target?.result as string;
      setPhotoPreview(url);
      setData((d) => ({ ...d, photoUrl: url }));
    };
    reader.readAsDataURL(file);
  };

  const handleCreate = () => {
    // Encode invitation data in URL (no backend needed for basic sharing)
    const encoded = btoa(encodeURIComponent(JSON.stringify(data)));
    navigate(`/invite/${encoded}`);
  };

  const currentTemplate = TEMPLATES.find((t) => t.id === data.template)!;

  return (
    <div className="min-h-dvh bg-stone-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-stone-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <Link to="/" className="script-font text-2xl text-rose-400">Everly</Link>
          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-sm text-stone-400">
              Template: <span className="font-medium text-stone-700">{currentTemplate?.name}</span>
            </span>
            <button
              onClick={handleCreate}
              disabled={!data.partnerA || !data.partnerB}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              Create Invitation →
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

        {/* Left: Form */}
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="serif-font text-2xl font-light text-stone-800 mb-1">Customize your invitation</h1>
            <p className="text-sm text-stone-400">Changes appear in the preview instantly.</p>
          </div>

          {/* Template selector */}
          <div className="card p-5">
            <label className="label">Choose template</label>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleChange('template', t.id)}
                  className={`relative p-3 rounded-xl border-2 text-xs font-medium transition-all duration-150 ${
                    data.template === t.id
                      ? 'border-rose-400 bg-rose-50 text-rose-600'
                      : 'border-stone-200 bg-white text-stone-500 hover:border-stone-300'
                  }`}
                >
                  <div
                    className="w-6 h-6 rounded-full mx-auto mb-1.5"
                    style={{ background: t.accent }}
                  />
                  {t.name}
                </button>
              ))}
            </div>
          </div>

          {/* Names */}
          <div className="card p-5 space-y-4">
            <h2 className="text-sm font-semibold text-stone-700">The happy couple</h2>
            <div>
              <label className="label">Partner A name *</label>
              <input
                className="input-field"
                placeholder="e.g. Sophie"
                value={data.partnerA}
                onChange={(e) => handleChange('partnerA', e.target.value)}
              />
            </div>
            <div>
              <label className="label">Partner B name *</label>
              <input
                className="input-field"
                placeholder="e.g. James"
                value={data.partnerB}
                onChange={(e) => handleChange('partnerB', e.target.value)}
              />
            </div>
          </div>

          {/* Date & Time */}
          <div className="card p-5 space-y-4">
            <h2 className="text-sm font-semibold text-stone-700">When &amp; where</h2>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label">Date</label>
                <input
                  type="date"
                  className="input-field"
                  value={data.date}
                  onChange={(e) => handleChange('date', e.target.value)}
                />
              </div>
              <div>
                <label className="label">Time</label>
                <input
                  type="time"
                  className="input-field"
                  value={data.time}
                  onChange={(e) => handleChange('time', e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="label">Venue</label>
              <input
                className="input-field"
                placeholder="e.g. The Garden Estate, Malibu"
                value={data.venue}
                onChange={(e) => handleChange('venue', e.target.value)}
              />
            </div>
          </div>

          {/* Photo */}
          <div className="card p-5">
            <h2 className="text-sm font-semibold text-stone-700 mb-4">Couple photo (optional)</h2>
            <div className="flex items-center gap-4">
              {photoPreview ? (
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-rose-200 flex-shrink-0">
                  <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-full bg-stone-100 border-2 border-dashed border-stone-300 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">📸</span>
                </div>
              )}
              <div>
                <button
                  className="btn-secondary text-xs"
                  onClick={() => fileRef.current?.click()}
                >
                  {photoPreview ? 'Change photo' : 'Upload photo'}
                </button>
                <p className="text-xs text-stone-400 mt-1">JPG, PNG or WebP, max 5MB</p>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhoto}
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleCreate}
            disabled={!data.partnerA || !data.partnerB}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed w-full py-4 text-base"
          >
            Create my invitation ✨
          </button>
        </div>

        {/* Right: Live Preview */}
        <div className="lg:sticky lg:top-24">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xs font-medium text-stone-400 uppercase tracking-widest">Live preview</p>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-stone-400">Updates as you type</span>
            </div>
          </div>
          <div className="max-w-sm mx-auto">
            <InvitationPreview data={data} compact={false} />
          </div>
        </div>
      </div>
    </div>
  );
}
