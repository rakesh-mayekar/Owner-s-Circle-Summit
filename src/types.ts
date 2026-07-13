export type PageId = 'home' | 'about' | 'agenda' | 'speakers' | 'attendees' | 'sponsorship' | 'contact';

export interface Speaker {
  id: string;
  name: string;
  role: string;
  company: string;
  bio: string;
  image: string; // Symbolic representation / descriptive placeholder
  category: 'Founder' | 'Investor' | 'Industry Leader' | 'Ecosystem Partner';
  featured: boolean;
}

export interface Session {
  id: string;
  time: string;
  title: string;
  speakerIds: string[];
  track: 'Track A: Scaling & Operations' | 'Track B: Capital & Exit' | 'Track C: Elite Roundtables';
  description: string;
  location: string;
}

export interface SponsorTier {
  id: string;
  name: string;
  price: string;
  slotsAvailable: number;
  benefits: string[];
  logoSize: 'Max' | 'Large' | 'Medium' | 'Small';
  vipPasses: number;
  speakingSlot: boolean;
  exhibitionSpace: boolean;
}

export interface AttendeePersona {
  id: string;
  segment: string;
  challenges: string[];
  roiTriggers: string[];
  valueProposition: string;
  engagementFocus: string;
}
