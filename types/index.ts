export type Cadence = 'weekly' | 'biweekly' | 'monthly' | 'quarterly';

export interface Contact {
  id: string;
  user_id: string;
  name: string;
  role: string;
  company: string;
  context: string;
  cadence: Cadence;
  avatar_url?: string | null;
  created_at: string;
}

export interface Interaction {
  id: string;
  contact_id: string;
  user_id: string;
  note: string;
  interacted_at: string;
  created_at: string;
}

export interface ContactWithLastInteraction extends Contact {
  lastInteraction: Interaction | null;
}
