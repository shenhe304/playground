export type TemplateId = 'bloom' | 'confetti' | 'golden-hour';

export interface InviteData {
  id: string;
  templateId: TemplateId;
  groomName: string;
  brideName: string;
  date: string;
  time: string;
  venue: string;
  photo?: string; // base64 data URL
}

export interface RSVPResponse {
  id?: string;
  invite_id: string;
  name: string;
  attendance: 'yes' | 'no' | 'maybe';
  message: string;
  created_at?: string;
}
