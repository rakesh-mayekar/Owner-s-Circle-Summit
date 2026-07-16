import { Speaker, Session, SponsorTier } from '../types';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  badge?: string;
}

export const LEADERSHIP_TEAM: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Gurmeet Sachdev',
    role: 'Summit Chair & Chief Executive Trustee',
    badge: 'PE Investor & Enterprise Counsel',
    bio: 'Distinguished enterprise architect with three decades of experience structuring high-value leveraged buyouts, capital syndications, and private equity transitions across major industrial corridors in India.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'team-2',
    name: 'Karishma Shah',
    role: 'Managing Partner & Elite Delegate Liaison',
    badge: 'Elite Cohort Onboarding & Security',
    bio: 'Oversees corporate alignments, private concierge logistics, and high-touch bespoke retreat environments. Veteran curator of ultra-private assemblies for India\'s leading industrial founders and legacy offices.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'team-3',
    name: 'Deepak Rao',
    role: 'Managing Director & Strategic Board Advisor',
    badge: 'Sovereign Wealth & Succession Lead',
    bio: 'Distinguished advisor on corporate governance, complex family office capital allocations, and cross-border asset transitions. Advisor to legacy corporate conglomerates representing $15B+ in aggregate valuation.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'team-4',
    name: 'Vikramaditya Sen',
    role: 'Director of Growth Alliances & M&A Strategy',
    badge: 'Programmatic M&A Integrator',
    bio: 'Pioneered several structural consolidations and debt restructurings for high-growth enterprise SaaS and infrastructure portfolios. Expert on multi-city business integrations and programmatic exit strategies.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'team-5',
    name: 'Meenakshi Sharma',
    role: 'Head of Global Corporate Partnerships',
    badge: 'Institutional Capital Coordinator',
    bio: 'Coordinates high-density relationship designs, luxury hospitality integrations, and multi-tier banking alignments, ensuring premier corporate resources are seamlessly structured for legacy business cohorts.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'team-6',
    name: 'Aditya Goenka',
    role: 'Executive Director of Site Privacy & Helipad Operations',
    badge: 'Operational Risk & High-Touch Logistics',
    bio: 'Manages extreme physical site security protocols, helipad arrival sequences, and single-access gate parameters. Highly skilled in guaranteeing flawless confidentiality for C-suite and founder attendees.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  }
];

export const SPEAKERS: Speaker[] = [
  {
    id: 'spk-1',
    name: 'Elena Rostova',
    role: 'Founder & CEO',
    company: 'Horizon Cloud (Exited $1.2B)',
    bio: 'Pioneered enterprise SaaS hyper-scaling. Successfully scaled Horizon Cloud from seed stage to a $1.2B acquisition by Oracle. Expert in recurring revenue optimization and executive-level organizational alignment.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face',
    category: 'Founder',
    featured: true,
    corporateStatus: 'Active Managing Partner at Rostova Capital & Board Director at 3 Enterprise Scale-ups.',
    pastAchievements: [
      'Successfully scaled Horizon Cloud from Seed through to a $1.2B strategic acquisition by Oracle.',
      'Architected early secondary market liquidity rounds returning over $140M in aggregate to original pre-A founders.',
      'Supervised regional GTM expansions into EMEA, driving a 420% increase in recurring enterprise revenues.'
    ],
    linkedin: 'https://linkedin.com/in/elena-rostova-placeholder',
    website: 'https://rostovacapital.com'
  },
  {
    id: 'spk-2',
    name: 'Vikram Malhotra',
    role: 'Managing Partner',
    company: 'Ascent Growth Capital',
    bio: 'Oversees a $3.4B late-stage growth fund. Led primary investments in multiple enterprise category leaders. Specializes in late-stage recapitalizations, debt structures, and preparing founder-led firms for public markets.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
    category: 'Investor',
    featured: true,
    corporateStatus: 'Managing Partner & Investment Committee Chairman at Ascent Growth Capital.',
    pastAchievements: [
      'Deployed $1.8B+ across 22 growth-stage B2B enterprise SaaS and strategic industrial platforms.',
      'Engineered direct recapitalization programs and structured debt protocols for high-density legacy conglomerates.',
      'Advised over 12 legacy founders on successful IPO launch frameworks and post-listing capital allocation.'
    ],
    linkedin: 'https://linkedin.com/in/vikram-malhotra-placeholder',
    website: 'https://ascentgrowthcapital.com'
  },
  {
    id: 'spk-3',
    name: 'Marcus Vance',
    role: 'President',
    company: 'Vance Capital Group',
    bio: 'Leading authority on family office asset allocation and generational transition. Advisor to over 40 family offices representing $12B+ in assets under management. Focused on private equity alignment for business owners.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    category: 'Industry Leader',
    featured: true,
    corporateStatus: 'President & Chief Investment Officer at Vance Family Office Alliance.',
    pastAchievements: [
      'Supervised direct capital allocations and succession programs for 40+ legacy family offices with $12B+ AUM.',
      'Pioneered off-the-record direct peer co-investment networks bypassive of standard fee-drag intermediations.',
      'Advised central banking policy panels on private credit liquidity requirements and long-term asset structures.'
    ],
    linkedin: 'https://linkedin.com/in/marcus-vance-placeholder',
    website: 'https://vancecapitalgroup.com'
  },
  {
    id: 'spk-4',
    name: 'Siddharth Mehta',
    role: 'Managing Director',
    company: 'Mehta Family Office & Co.',
    bio: 'Active direct investor in enterprise infrastructure. Formerly co-founder of NexaTech (acquired for $850M). Passionate about backing second-generation founders seeking systematic growth strategies.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face',
    category: 'Investor',
    featured: false,
    corporateStatus: 'Managing Director of Mehta Family Office & Founder Trustee of NexaTech Foundation.',
    pastAchievements: [
      'Successfully engineered the competitive corporate sale of NexaTech to IBM for $850M.',
      'Led 25+ direct B2B co-investments alongside top-tier global venture and private equity houses.',
      'Maintains active advisory seats on 6 industrial logistics and heavy enterprise cloud infrastructure boards.'
    ],
    linkedin: 'https://linkedin.com/in/siddharth-mehta-placeholder',
    website: 'https://mehtafo.co'
  },
  {
    id: 'spk-5',
    name: 'Diana Thorne',
    role: 'Chief Strategy Officer',
    company: 'Apex Global Logistics',
    bio: 'Expert in global supply chains and cross-border M&A. Spearheaded apex consolidation strategy completing 14 programmatic acquisitions totaling $450M in value over the past 4 years.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
    category: 'Industry Leader',
    featured: false,
    corporateStatus: 'Chief Strategy Officer of Apex Global Logistics & Board Member of Trans-Oceanic Shipping.',
    pastAchievements: [
      'Designed and executed a massive programmatic roll-up strategy completing 14 corporate acquisitions.',
      'Integrated fragmented multi-state shipping routes into a singular high-EBITDA national shipping champion.',
      'Drove structural optimization that expanded consolidated EBITDA margins by 620 basis points within 36 months.'
    ],
    linkedin: 'https://linkedin.com/in/diana-thorne-placeholder',
    website: 'https://apexgloballogistics.com'
  }
];

export const SESSIONS: Session[] = [
  {
    id: 'sess-1',
    time: '08:30 AM - 09:30 AM',
    title: 'Continental Breakfast & Executive Assembly',
    speakerIds: [],
    track: 'Track A: Scaling & Operations',
    description: 'Bespoke check-in, private concierge briefing, and introductory high-value peer networking for the 15-20 designated owners.',
    location: 'Sovereign Boardroom Foyer'
  },
  {
    id: 'sess-2',
    time: '09:30 AM - 11:00 AM',
    title: 'Opening Plenary: Macro Valuation Levers & Institutional Buying Appetite',
    speakerIds: ['spk-2', 'spk-3'],
    track: 'Track A: Scaling & Operations',
    description: 'A highly confidential analysis of private credit markets, debt leverage ratios, and enterprise valuation multiples.',
    location: 'Sovereign Boardroom A'
  },
  {
    id: 'sess-3',
    time: '11:30 AM - 01:00 PM',
    title: 'Masterclass: Surviving & Architecting the Unsolicited Acquisition Offer',
    speakerIds: ['spk-1'],
    track: 'Track B: Capital & Exit',
    description: 'Inside the $1.2B Horizon Cloud exit. Managing incoming sponsor interest without halting daily operations and retaining board dominance.',
    location: 'Sovereign Boardroom B'
  },
  {
    id: 'sess-4',
    time: '02:00 PM - 03:30 PM',
    title: 'Programmatic M&A: Tactical Blueprint for Strategic Consolidation',
    speakerIds: ['spk-5'],
    track: 'Track A: Scaling & Operations',
    description: 'Step-by-step framework to build an internal acquisition engine, execute target due diligence under extreme privacy, and scale enterprise multiple.',
    location: 'Sovereign Boardroom A'
  },
  {
    id: 'sess-5',
    time: '04:00 PM - 05:30 PM',
    title: 'Closed Roundtable: Direct Family Office Co-Investing Parameters',
    speakerIds: ['spk-3', 'spk-4'],
    track: 'Track C: Elite Roundtables',
    description: 'By invitation only. Aligning direct-investment parameters with family offices to bypass third-party intermediary fee-drag.',
    location: 'Napa Private Library'
  }
];

export const SPONSORS: SponsorTier[] = [
  {
    id: 'spon-title',
    name: 'Sovereign Title Partner',
    price: 'Invite Only',
    slotsAvailable: 1,
    benefits: [
      'Exclusive "Presented by" naming rights on all private summit communication',
      'Opening Ceremony keynote briefing (15-minute operational address)',
      '6 Complimentary private VIP all-access guest credentials',
      'Premium private meeting suite reserved for duration of the Napa Valley summit',
      'Host-curated introductory alignments with selected cohort enterprise owners'
    ],
    logoSize: 'Max',
    vipPasses: 6,
    speakingSlot: true,
    exhibitionSpace: true
  },
  {
    id: 'spon-executive',
    name: 'Executive Capital Partner',
    price: 'Inquire',
    slotsAvailable: 2,
    benefits: [
      'Sole sponsorship of one key track (Scaling, Exit, or Roundtables)',
      'Guaranteed panel seat on selected track plenary session',
      '4 Complimentary private VIP all-access guest credentials',
      'Corporate brand listing in the private digital prospectus',
      'Dedicated host introduction package to curated cohort members'
    ],
    logoSize: 'Large',
    vipPasses: 4,
    speakingSlot: true,
    exhibitionSpace: true
  },
  {
    id: 'spon-associate',
    name: 'Associate Alignment Partner',
    price: 'Inquire',
    slotsAvailable: 3,
    benefits: [
      'Co-sponsorship of the Napa estate VIP networking dinner',
      '2 Complimentary private VIP all-access guest credentials',
      'Corporate logo positioning on private badges and briefing guidelines',
      'Strategic prospectus insertion for the exclusive owner cohort'
    ],
    logoSize: 'Medium',
    vipPasses: 2,
    speakingSlot: false,
    exhibitionSpace: false
  }
];

export interface WireframePageSpec {
  id: string;
  title: string;
  strategy: string;
  primaryCta: string;
  sections: {
    name: string;
    description: string;
    elements: string[];
  }[];
}

export const WIREFRAME_SPECS: WireframePageSpec[] = [
  {
    id: 'home',
    title: '1. Summit Overview',
    strategy: 'Establish immediate elite authority, communicate private peer proximity, show dates/venue prominently, and trigger confidential executive inquiries.',
    primaryCta: 'View Private Agenda (Direct link to credentials registration)',
    sections: [
      {
        name: 'HERO',
        description: 'Split grid container. Visually striking high-contrast typographic focus with high-density information elements.',
        elements: [
          'Eyebrow Tag: "CLOSED-DOOR PRIVATE ASSEMBLY | FOR 15-20 HAND-PICKED OWNERS"',
          'H1 Display Headline: "The Uncontested Space of Enterprise Scale and Private Strategic Exit."',
          'Subhead: "An invitation-only, Chatham House Rule summit uniting an ultra-exclusive cohort of 15-20 legacy business owners, high-growth founders, and elite family offices. Secure confidential operational levers and bespoke valuation blueprints."',
          'Main CTA Button: "View Private Agenda" (Primary high-contrast button)',
          'Secondary CTA Button: "Submit Executive Inquiry" (Minimalist border button)',
          'High-density metadata: Dates (Nov 12-14, 2026) | Venue (The Ritz-Carlton Reserve, Napa Valley)',
          'Visual Feature Block: Active live countdown clock indicating days remaining until the private assembly.'
        ]
      },
      {
        name: 'PROXIMITY & AUTHORITY STATS',
        description: 'Full-width clean bento-inspired metrics band to establish immediate credibility without graphic-intensive banners.',
        elements: [
          'Metric 1: "15 - 20" | Label: "Strictly Capped Attendance to Guarantee Direct Boardroom Intimacy"',
          'Metric 2: "$14.2B+" | Label: "Cumulative Owner Portfolio Value Represented by Cohort"',
          'Metric 3: "100%" | Label: "Private Chatham House Rule Environment (No Media, Fully Off-the-Record)"',
          'Metric 4: "94.2%" | Label: "C-Level, Managing Partner, or Founder-Operator Presence"'
        ]
      },
      {
        name: 'CORE STRATEGIC PILLARS',
        description: 'Three-column high-contrast grid outlining the precise strategic focus of Owner\'s Circle.',
        elements: [
          'Pillar 1: "Sovereign Growth Engineering" | Subtext: Operational architectures to bypass traditional growth limits and professionalize executive teams.',
          'Pillar 2: "Private Capital Alignments" | Subtext: Tactical models to handle incoming private equity offers, structure recapitalizations, and execute tax-optimized exits.',
          'Pillar 3: "Generational & Liquidity Blueprints" | Subtext: Bypassing standard intermediation channels to construct permanent co-investment alignments.'
        ]
      },
      {
        name: 'SPEAKER ANCHOR GRID',
        description: 'Elite layout presenting keynote owners who have successfully scaled and exited.',
        elements: [
          'Grid of Featured External Keynote Speakers with high-contrast metadata cards.',
          'Each card contains: Portrait placeholder, speaker name, precise role/firm, exit track summary (e.g. "Exited Horizon Cloud for $1.2B"), and strategic expertise focus.',
          'Sub-CTA Link: "Explore Full Speakers Panel" with hover-transition arrow.'
        ]
      },
      {
        name: 'AGENDA PREVIEW TRACKER',
        description: 'Horizontal high-density timeline displaying the key milestones of Day 1 and Day 2 to prove content depth.',
        elements: [
          'Interactive Track tabs: "Scaling & Operations", "Capital & Exit", "Elite Roundtables"',
          'Preview list of benchmark sessions with time, session title, speaker tag, and room location.',
          'Callout Box: "Closed-door roundtable details are restricted to confirmed VIP credential holders only."'
        ]
      }
    ]
  },
  {
    id: 'about',
    title: '2. Executive Vision',
    strategy: 'Define the institutional history of Owner\'s Circle, share the private summit manifesto, introduce the steering committee, and showcase the executive leadership and management team.',
    primaryCta: 'Inquire to Joint Cohort',
    sections: [
      {
        name: 'EXECUTIVE PROFILE & SUMMIT VISION',
        description: 'Asymmetric narrative layout stating the core mandate and founder vision.',
        elements: [
          'H1 Narrative Title: "The Manifesto of Sovereign Enterprise Owners."',
          'Subhead: "Why standard industry conferences fail elite operators—and how we constructed an alternative ecosystem designed for high-density truth."',
          'Primary Paragraph: Detailed copy explaining the origin of Owner\'s Circle as a closed-door roundtable of 8 founders that evolved into an institutional scale network.'
        ]
      },
      {
        name: 'SUMMIT LEADERSHIP & MANAGEMENT TEAM',
        description: 'Grid layout displaying the ecosystem advisory board and internal management roles.',
        elements: [
          'Leadership cards containing: Management member name, internal role (e.g., Summit Chair, VIP Concierge Lead), and corporate affiliation.',
          'Trustee Mission statement emphasizing alignment of interest, with signatures of the 3 founding partners.'
        ]
      },
      {
        name: 'ECOSYSTEM BY THE NUMBERS',
        description: 'Horizontal data block presenting cumulative historical impact.',
        elements: [
          'Metric: "4 Annual Assemblies Completed" | Metric: "320+ Aligned Owner Alum" | Metric: "14 Multi-Million Co-Investments Catalyzed"'
        ]
      }
    ]
  },
  {
    id: 'agenda',
    title: '3. Strategic Agenda',
    strategy: 'A highly structured, multi-track, chronological timeline designed for a highly intimate 15-20 person cohort. Features custom interactive session bookmarks.',
    primaryCta: 'Secure Private Boardroom Access',
    sections: [
      {
        name: 'CHRONOLOGICAL HEADER',
        description: 'Full-width clean interface control center.',
        elements: [
          'H1 Title: "Chronological Strategic Blueprint"',
          'Description: "Filter sessions below by your core strategic objective. Chatham House rules apply across all tracks."',
          'Track Selectors (Filters): Track A: Scaling & Operations | Track B: Capital & Exit | Track C: Elite Roundtables',
          'Search Input: "Filter sessions by keyword (e.g., M&A, SaaS, Tax)..."'
        ]
      },
      {
        name: 'CHRONOLOGICAL TIMELINE GRID',
        description: 'Deep, structured list view with left-aligned time anchors, central session titles, and right-aligned speaker tags.',
        elements: [
          'Time Frame: "08:00 AM" | Session: "Continental Private Network" | Track: "All" | Location: "Foyer"',
          'Time Frame: "09:00 AM" | Session: "Opening Plenary: Macro Valuations" | Track: "Scaling & Operations" | Speaker tags: "Vikram Malhotra, Marcus Vance"',
          'Time Frame: "10:45 AM" | Session: "Architecting the Unsolicited Offer" | Track: "Capital & Exit" | Speaker tag: "Elena Rostova"',
          'Time Frame: "01:30 PM" | Session: "Programmatic M&A Engine" | Track: "Scaling & Operations" | Speaker tag: "Diana Thorne"',
          'Time Frame: "03:15 PM" | Session: "Co-Investment alignments" | Track: "Elite Roundtables" | Speaker tags: "Marcus Vance, Siddharth Mehta"'
        ]
      },
      {
        name: 'ITINERARY SUMMIT BUILDER',
        description: 'Interactive widget that updates in real-time as users add sessions to their bookmark state.',
        elements: [
          'List of bookmarked sessions with custom export CTA: "Download My Personalized Schedule (PDF/ICS)"'
        ]
      }
    ]
  },
  {
    id: 'speakers',
    title: '4. Keynote Operators',
    strategy: 'Provide a grid of highly vetted external operators and institutional investors to validate content authority. Emphasize actual achievements over industry titles.',
    primaryCta: 'Inquire for Speaking Inquiries',
    sections: [
      {
        name: 'THE ANCHOR INTRO',
        description: 'Clean typographic layout setting high expectation levels.',
        elements: [
          'H1 Header: "Ecosystem Architects & Proven Operators."',
          'Subhead: "We do not host professional speakers. Every panelist is actively directing substantial capital or managing scaled corporate portfolios."',
          'Filter Bar: "All Categories | Founders | Investors | Industry Leaders"'
        ]
      },
      {
        name: 'GRID OF PROVEN OPERATORS',
        description: 'Structured card layout containing verified professional bios.',
        elements: [
          'Portrait Placeholder with clean high-contrast card frame.',
          'Speaker Name: "Elena Rostova" | Bold Badge: "Exited $1.2B SaaS Founder"',
          'Current Role: "CEO, Horizon Cloud & Investor"',
          'Detailed Bio Block: Highlighting concrete operator milestones.',
          'Interactive Control: "Request Private Meet" | "LinkedIn Profile Asset"'
        ]
      }
    ]
  },
  {
    id: 'sponsorship',
    title: '5. Partner Inquiries',
    strategy: 'Display highly exclusive, invite-only partnership alignment vectors for elite professional services (M&A banks, wealth managers, law firms) without public pricing.',
    primaryCta: 'Inquire for Partnership Prospectus',
    sections: [
      {
        name: 'PARTNERSHIP VALUE INTRO',
        description: 'Editorial layout highlighting institutional alignment.',
        elements: [
          'H1 Title: "Align Your Firm with Decisive Enterprise Leaders."',
          'Subtext: "Position your brand inside an ultra-exclusive room of 15-20 enterprise operators. No transactional noise, no general exhibition booths—only custom relationship design."'
        ]
      },
      {
        name: 'TIERED ALIGNMENT MATRIX',
        description: 'Comparing exclusive Title, Executive, and Associate alignment tiers (No pricing displayed).',
        elements: [
          'Title Partner: Strictly limited to 1 firm. Maximum integration, key opening address slot, elite private meeting suite, host-curated private introductions.',
          'Elite Executive: Strictly limited to 3 firms. Single track sponsorship, plenary panel seat, core digital signage branding.',
          'Associate Partner: Strictly limited to 4 firms. Dinner host alignments, credential branding, custom prospectus listing.'
        ]
      }
    ]
  },
  {
    id: 'contact',
    title: '6. Executive Inquiry',
    strategy: 'Single, highly elegant, unified Executive Contact & Inquiry Section providing physical corporate office details, interactive map placeholder, direct phone/email, and secure application form.',
    primaryCta: 'Submit Confidential Inquiry',
    sections: [
      {
        name: 'UNIFIED CONTACT & INQUIRY CONTAINER',
        description: 'Two-column structured layout. Left is the elegant, secure inquiry form; right is the direct corporate physical address, interactive map placeholder, and concierge hotline.',
        elements: [
          'Inquiry Form: Direct contact coordinates (Full Name, Direct Email, Private Phone, Firm Name, EBITDA/Asset Tier, Strategic Goal).',
          'Physical Corporate Address: Napa Valley Executive Office & Resort Venue details.',
          'Interactive Map Placeholder: Beautiful visual representaton of Napa Valley location with zoom / view state controls.',
          'Direct Concierge Hotline: +1 (800) 555-OWNER & direct email concierge@ownerscircle.co.',
          'NDA Vetting Statement: "All attendee applications and inquiries are protected under mutual NDA and reviewed directly by the Steering Committee within 48 hours."'
        ]
      }
    ]
  }
];
