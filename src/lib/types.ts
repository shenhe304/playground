export type TemplateId = 'bloom' | 'confetti' | 'golden-hour';

export interface InvitationData {
  id?: string;
  template: TemplateId;
  partnerA: string;
  partnerB: string;
  date: string;
  time: string;
  venue: string;
  photoUrl?: string;
}

export interface RSVPResponse {
  id?: string;
  invite_id: string;
  name: string;
  attendance: 'yes' | 'no' | 'maybe';
  message?: string;
  created_at?: string;
}

export interface TemplateConfig {
  id: TemplateId;
  name: string;
  description: string;
  accent: string;
  bg: string;
  tagline: string;
}

export const TEMPLATES: TemplateConfig[] = [
  {
    id: 'bloom',
    name: 'Bloom',
    description: 'Pastel pink & lilac with delicate floral accents',
    accent: '#e8a0bf',
    bg: '#fdf2f8',
    tagline: 'Romantic & Floral',
  },
  {
    id: 'confetti',
    name: 'Confetti',
    description: 'White with playful colorful dots and modern energy',
    accent: '#f472b6',
    bg: '#ffffff',
    tagline: 'Playful & Modern',
  },
  {
    id: 'golden-hour',
    name: 'Golden Hour',
    description: 'Warm ivory & peach tones with timeless elegance',
    accent: '#d4a574',
    bg: '#fdf8f0',
    tagline: 'Warm & Elegant',
  },
];
