import { Speaker, Session, SponsorTier, AttendeePersona } from '../types';

export const SPEAKERS: Speaker[] = [
  {
    id: 'spk-1',
    name: 'Elena Rostova',
    role: 'Founder & CEO',
    company: 'Horizon Cloud (Exited $1.2B)',
    bio: 'Pioneered enterprise SaaS hyper-scaling. Successfully scaled Horizon Cloud from seed stage to a $1.2B acquisition by Oracle. Expert in recurring revenue optimization and executive-level organizational alignment.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face',
    category: 'Founder',
    featured: true
  },
  {
    id: 'spk-2',
    name: 'Vikram Malhotra',
    role: 'Managing Partner',
    company: 'Ascent Growth Capital',
    bio: 'Oversees a $3.4B late-stage growth fund. Led primary investments in multiple enterprise category leaders. Specializes in late-stage recapitalizations, debt structures, and preparing founder-led firms for public markets.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
    category: 'Investor',
    featured: true
  },
  {
    id: 'spk-3',
    name: 'Marcus Vance',
    role: 'President',
    company: 'Vance Capital Group',
    bio: 'Leading authority on family office asset allocation and generational transition. Advisor to over 40 family offices representing $12B+ in assets under management. Focused on private equity alignment for business owners.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    category: 'Industry Leader',
    featured: true
  },
  {
    id: 'spk-4',
    name: 'Siddharth Mehta',
    role: 'Managing Director',
    company: 'Mehta Family Office & Co.',
    bio: 'Active direct investor in enterprise infrastructure. Formerly co-founder of NexaTech (acquired for $850M). Passionate about backing second-generation founders seeking systematic growth strategies.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face',
    category: 'Investor',
    featured: false
  },
  {
    id: 'spk-5',
    name: 'Diana Thorne',
    role: 'Chief Strategy Officer',
    company: 'Apex Global Logistics',
    bio: 'Expert in global supply chains and cross-border M&A. Spearheaded apex consolidation strategy completing 14 programmatic acquisitions totaling $450M in value over the past 4 years.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
    category: 'Industry Leader',
    featured: false
  }
];

export const SESSIONS: Session[] = [
  {
    id: 'sess-1',
    time: '08:00 AM - 09:00 AM',
    title: 'Registration & Private Continental Breakfast Network',
    speakerIds: [],
    track: 'Track A: Scaling & Operations',
    description: 'Welcome badge distribution, VIP credentials verification, and exclusive speed-networking for registered asset owners.',
    location: 'Grand Ballroom Foyer'
  },
  {
    id: 'sess-2',
    time: '09:00 AM - 10:15 AM',
    title: 'Opening Plenary: The State of Enterprise Ownership & Global Capital Flow',
    speakerIds: ['spk-2', 'spk-3'],
    track: 'Track A: Scaling & Operations',
    description: 'An analysis of macroeconomic indicators affecting enterprise valuation, debt leveraging ratios, and current institutional buyer appetites.',
    location: 'Grand Ballroom A'
  },
  {
    id: 'sess-3',
    time: '10:45 AM - 12:00 PM',
    title: 'Architecting the Unsolicited Offer: Defense & Negotiation Mechanics',
    speakerIds: ['spk-1'],
    track: 'Track B: Capital & Exit',
    description: 'Case studies of enterprise SaaS exits. How to manage incoming sponsor interest without interrupting day-to-day operations and retain strategic leverage.',
    location: 'Grand Ballroom B'
  },
  {
    id: 'sess-4',
    time: '01:30 PM - 02:45 PM',
    title: 'Programmatic M&A: Scaling Through Aggressive Strategic Consolidation',
    speakerIds: ['spk-5'],
    track: 'Track A: Scaling & Operations',
    description: 'A tactical blueprint on building an internal M&A engine, running due diligence pipelines, and successfully integrating acquired cultures.',
    location: 'Grand Ballroom A'
  },
  {
    id: 'sess-5',
    time: '03:15 PM - 04:30 PM',
    title: 'Direct Investing & Co-Investment Alignments with Family Offices',
    speakerIds: ['spk-3', 'spk-4'],
    track: 'Track C: Elite Roundtables',
    description: 'Closed-door roundtable for enterprise owners looking to bypass institutional PE to establish direct, long-term capital partnerships.',
    location: 'Executive Boardroom'
  }
];

export const SPONSORS: SponsorTier[] = [
  {
    id: 'spon-title',
    name: 'Title Partner',
    price: '$75,000',
    slotsAvailable: 1,
    benefits: [
      'Exclusive "Presented by" naming rights on all main-stage marketing',
      'Opening Ceremony key address slot (15-minute presentation)',
      '12 Complimentary VIP full-access guest credentials',
      'Premium 20x20 central exhibition space in the networking lobby',
      'Double-page corporate profile feature in the summit briefing manual',
      'Private 10-person meeting suite reserved for duration of the event',
      'Dedicated host-curated introductory meetings with 5 target owners'
    ],
    logoSize: 'Max',
    vipPasses: 12,
    speakingSlot: true,
    exhibitionSpace: true
  },
  {
    id: 'spon-executive',
    name: 'Elite Executive',
    price: '$45,000',
    slotsAvailable: 3,
    benefits: [
      'Sole sponsorship of one key track (Scaling, Exit, or Roundtables)',
      'Panel seat guaranteed on selected track plenary session',
      '8 Complimentary VIP full-access guest credentials',
      'Premium 10x10 exhibition space in the networking lobby',
      'Full-page corporate profile in the summit briefing manual',
      'Signage branding at all track sessions and panel digital displays',
      'Dedicated intro package to 3 curated attendees post-event'
    ],
    logoSize: 'Large',
    vipPasses: 8,
    speakingSlot: true,
    exhibitionSpace: true
  },
  {
    id: 'spon-associate',
    name: 'Associate Partner',
    price: '$25,000',
    slotsAvailable: 6,
    benefits: [
      'Co-sponsorship of networking lunches or private VIP dinner',
      '4 Complimentary VIP full-access guest credentials',
      'Standard tabletop display in the networking lobby',
      'Half-page corporate profile in the summit briefing manual',
      'Logo brand positioning on summit website, badges, and slides'
    ],
    logoSize: 'Medium',
    vipPasses: 4,
    speakingSlot: false,
    exhibitionSpace: true
  },
  {
    id: 'spon-supporter',
    name: 'Circle Supporter',
    price: '$12,500',
    slotsAvailable: 10,
    benefits: [
      '2 Complimentary VIP full-access guest credentials',
      'Logo brand positioning on summit website and badges',
      'Standard listing in the summit briefing manual',
      'Brochure/Materials insert inside official delegate welcome kits'
    ],
    logoSize: 'Small',
    vipPasses: 2,
    speakingSlot: false,
    exhibitionSpace: false
  }
];

export const ATTENDEES: AttendeePersona[] = [
  {
    id: 'per-1',
    segment: 'High-Growth Tech Founders',
    challenges: [
      'Overcoming growth plateaus at $10M-$50M ARR',
      'Managing venture-debt liquidity and cap-table dilution',
      'Evaluating late-stage cashout vs. recapitalization offers'
    ],
    roiTriggers: [
      'Direct peer comparisons and case studies on strategic exits',
      'Confidential interaction with leading tech buyout partners',
      'Frameworks for scalable leadership development and executive transition'
    ],
    valueProposition: 'Equips founders with strategic levers to navigate institutional boardrooms and maximize their equity exit outcomes.',
    engagementFocus: 'VIP Roundtables, Capital Advisory panels'
  },
  {
    id: 'per-2',
    segment: 'Multi-Generational Business Owners',
    challenges: [
      'Modernizing legacy operating frameworks for competitive edge',
      'Planning tax-efficient, multi-generational equity transfers',
      'Resolving stakeholder friction between active and silent members'
    ],
    roiTriggers: [
      'Legal and structural advice from leading trust and estate counsels',
      'Workshops on professionalizing family management boards',
      'Case reviews of non-disruptive generational ownership transitions'
    ],
    valueProposition: 'Ensures structural longevity and smooth transition pathways while sustaining operational cash-flows and family unity.',
    engagementFocus: 'Family Wealth Tracks, Transition Roundtables'
  },
  {
    id: 'per-3',
    segment: 'Family Offices & Private Investors',
    challenges: [
      'Sourcing high-quality, non-intermediated proprietary deal-flow',
      'Aligning direct investing structures with founder risk profiles',
      'Mitigating fee-drag associated with traditional fund-of-funds'
    ],
    roiTriggers: [
      'Direct interaction with profitable, owner-operated private firms',
      'Co-investment syndication networks with peer family offices',
      'Access to direct transaction standard templates and structures'
    ],
    valueProposition: 'Unlocks pre-vetted, direct enterprise investments and standardizes direct-capital co-investment parameters.',
    engagementFocus: 'Closed-Door Co-Investment Sessions'
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
    title: '1. Home Page',
    strategy: 'Establish immediate elite authority, communicate exclusive peer proximity, show dates/venue prominently, and trigger high-intent delegate applications or partnership inquiries.',
    primaryCta: 'Request VIP Delegate Credentials (High-intent conversion form link)',
    sections: [
      {
        name: 'HERO',
        description: 'Split grid container. Visually striking high-contrast typographic focus with high-density information elements.',
        elements: [
          'Eyebrow Tag: "ANNUAL PRIVATE ASSEMBLY | FOR OWNER-OPERATORS & FOUNDERS"',
          'H1 Display Headline: "The Absolute Convergence of Enterprise Scale and Strategic Capital Exit."',
          'Subhead: "An invitation-only, Chatham House Rule summit uniting 150 legacy business owners, high-growth founders, and elite family offices. Secure the operational levers and valuation blueprints driving modern scale and generational transition."',
          'Main CTA Button: "Request VIP Invitation" (Primary high-contrast button)',
          'Secondary CTA Button: "View Private Agenda" (Minimalist text link / border button)',
          'High-density metadata: Dates (Nov 12-14, 2026) | Venue (The Ritz-Carlton, Napa Valley) | Status (114/150 Seats Allocated)',
          'Visual Feature Block: Animated countdown timer indicating remaining invitation requests.'
        ]
      },
      {
        name: 'PROXIMITY & AUTHORITY STATS',
        description: 'Full-width clean bento-inspired metrics band to establish immediate credibility without graphic-intensive banners.',
        elements: [
          'Metric 1: "$14.2B+" | Label: "Cumulative Owner Portfolio Value Represented"',
          'Metric 2: "150 Only" | Label: "Strictly Capped Attendance to Preserve High-Density Peer Exchange"',
          'Metric 3: "94.2%" | Label: "C-Level, Managing Partner, or Founder-Operator Presence"',
          'Metric 4: "100%" | Label: "Private Chatham House Rule Environment (No Media)"'
        ]
      },
      {
        name: 'CORE CONGENIAL VALUE SHAPERS',
        description: 'Three-column high-contrast grid outlining the precise strategic pillars of Owner\'s Circle.',
        elements: [
          'Pillar 1: "Sovereign Growth Engineering" | Subtext: Operational architectures to bypass traditional growth limits and professionalize executive teams.',
          'Pillar 2: "Institutional Exit & Liquidity" | Subtext: Tactical models to handle incoming private equity offers, structure recapitalizations, and execute tax-optimized exits.',
          'Pillar 3: "Family Office & Direct Capital" | Subtext: Bypassing standard intermediation channels to construct permanent co-investment alignments.'
        ]
      },
      {
        name: 'SPEAKER ANCHOR GRID',
        description: 'Elite layout presenting keynote owners who have successfully scaled and exited.',
        elements: [
          'Grid of 3 Featured Speakers with full high-contrast cards.',
          'Each card contains: High-res professional portrait placeholder, speaker name, precise role/firm, exit track summary (e.g. "Exited Horizon Cloud for $1.2B"), and 1-sentence strategic expertise focus.',
          'Sub-CTA Link: "Explore Full Speakers Panel (5+ Elite Operators)" with hover-transition arrow.'
        ]
      },
      {
        name: 'AGENDA PREVIEW TRACKER',
        description: 'Horizontal high-density timeline displaying the key milestones of Day 1 and Day 2 to prove content depth.',
        elements: [
          'Interactive Track tabs: "Operations & Scaling", "Capital & Exit", "Elite Roundtables"',
          'Preview list of 3 benchmark sessions with time, session title, speaker tag, and room location.',
          'Callout Box: "Closed-door roundtable details are restricted to confirmed VIP credential holders only."'
        ]
      },
      {
        name: 'REGISTRATION QUICK TRIGGER',
        description: 'Two-column low-friction application section designed for maximum immediate conversion.',
        elements: [
          'Left Box: "Apply for Delegate Access" with quick-text input (Email, Organization, Portfolio size tier) and submission CTA button.',
          'Right Box: "Inquire About Partnership Tiers" with corporate link.'
        ]
      }
    ]
  },
  {
    id: 'about',
    title: '2. About Us Page',
    strategy: 'Define the institutional history of Owner\'s Circle, build trust in the founding committee, explain Chatham House Rule compliance, and justify the strict admission criteria.',
    primaryCta: 'Apply to Joint Founding Cohort',
    sections: [
      {
        name: 'INTENTIONAL NARRATIVE HERO',
        description: 'Asymmetric layout. High-quality typographic block stating the mandate.',
        elements: [
          'H1 Narrative Title: "The Manifesto of Sovereign Enterprise Owners."',
          'Subhead: "Why standard industry conferences fail elite operators—and how we constructed an alternative ecosystem designed for high-density truth."',
          'Primary Paragraph: Detailed copy explaining the origin of Owner\'s Circle as a closed-door roundtable of 8 founders that evolved into an institutional scale network.'
        ]
      },
      {
        name: 'THE CONSTITUTION / RULES',
        description: 'Two-column highly structured matrix outlining our operating protocols.',
        elements: [
          'Rule 1: Chatham House Compliance | Detail: Participants are free to use the information received, but neither the identity nor the affiliation of the speakers, nor that of any other participant, may be revealed.',
          'Rule 2: Strictly No Press & No Recording | Detail: No audio, video, or transcription is permitted inside any panel or boardroom. No social media check-ins.',
          'Rule 3: Peer-Only Standard | Detail: Standard service-providers, agencies, and transactional brokers are barred unless admitted under direct corporate sponsorship with verified strategic assets.'
        ]
      },
      {
        name: 'STEERING COMMITTEE & TRUSTEES',
        description: 'Grid layout displaying the ecosystem advisory board.',
        elements: [
          '4 Committee cards containing: Advisory member name, core background (e.g., Former IPO Chairman, Trust Counsel), and corporate affiliation.',
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
    title: '3. Agenda Page',
    strategy: 'A highly structured, multi-track, chronological timeline that allows executive attendees to review sessions, filter by strategic tracks, and plan their custom summit itinerary.',
    primaryCta: 'Secure All-Access Pass & Personal Calendar Lock',
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
          'Time Frame: "08:00 AM - 09:00 AM" | Session: "Continental Private Network" | Track: "All" | Location: "Foyer"',
          'Time Frame: "09:00 AM - 10:15 AM" | Session: "Opening Plenary: Macro Valuations" | Track: "Scaling & Operations" | Speaker tags: "Vikram Malhotra, Marcus Vance"',
          'Time Frame: "10:45 AM - 12:00 PM" | Session: "Architecting the Unsolicited Offer" | Track: "Capital & Exit" | Speaker tag: "Elena Rostova" | Interactive: Add to Personal Calendar button.',
          'Time Frame: "01:30 PM - 02:45 PM" | Session: "Programmatic M&A Engine" | Track: "Scaling & Operations" | Speaker tag: "Diana Thorne"',
          'Time Frame: "03:15 PM - 04:30 PM" | Session: "Co-Investment alignments" | Track: "Elite Roundtables" | Speaker tags: "Marcus Vance, Siddharth Mehta"'
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
    title: '4. Speakers Page',
    strategy: 'Provide a grid of highly vetted operators and institutional investors to validate content authority. Emphasize actual achievements over industry titles.',
    primaryCta: 'Apply to Speak or Nominate an Operator',
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
          'Detailed Bio Block: Highlighting concrete operator milestones (e.g. "Scaled from 0 to 180 enterprise accounts...").',
          'Interactive Control: "Request Private Meet" (for premium ticket holders) | "LinkedIn Profile Asset"'
        ]
      },
      {
        name: 'NOMINATION PANEL',
        description: 'Centered form designed to capture incoming speaking inquiries from equivalent operators.',
        elements: [
          'Title: "Nominate a Sovereign Peer"',
          'Input Fields: Nominee Name, Nominee Venture, Key Exit Milestone / Portfolio Value, Your Email.',
          'Submit Button: "Submit Strategic Nomination"'
        ]
      }
    ]
  },
  {
    id: 'attendees',
    title: '5. Who Should Attend Page',
    strategy: 'Provide immediate peer validation by segments. Visually prove the exclusive network caliber so target prospects feel they belong, and filter out low-value service providers.',
    primaryCta: 'Inquire to Join the Cohort',
    sections: [
      {
        name: 'SEGMENT FOCUS HERO',
        description: 'Three-way segmented screen split addressing target audiences directly.',
        elements: [
          'Segment 1: High-Growth Tech Founders',
          'Segment 2: Multi-Generational Business Owners',
          'Segment 3: Family Offices & Sovereign Investors'
        ]
      },
      {
        name: 'DETAILED SEGMENTED TAXONOMY',
        description: 'Expandable columns outlining core challenges, customized value proposition, and focus tracks for each segment.',
        elements: [
          'Column 1: High-Growth Tech Founders | Challenges: Scale plateaus, venture debt dilution, late-stage exit liquidity | ROI Trigger: Strategic buyers panel, non-dilutive capital networks.',
          'Column 2: Multi-Generational Business Owners | Challenges: Legacy operating systems, tax-efficient transfer, silent board members | ROI Trigger: Trust & Estate counsel roundtables.',
          'Column 3: Family Offices & Sovereign Investors | Challenges: Non-intermediated proprietary deal flow, co-investment alignments | ROI Trigger: Profitable private owner networking.'
        ]
      },
      {
        name: 'ROI ASSESSMENT CALCULATOR',
        description: 'Interactive questionnaire allowing prospects to calculate potential valuation increases based on implementing Owner\'s Circle blueprints.',
        elements: [
          'Inputs: Current annual EBITDA, Industry sector, Exit timeline goal.',
          'Dynamic ROI estimation message demonstrating strategic value of tax optimization and bidding competition frameworks.'
        ]
      }
    ]
  },
  {
    id: 'sponsorship',
    title: '6. Sponsorship Page',
    strategy: 'Display clear, tiered branding opportunities and institutional integration vectors for professional services (M&A banks, wealth managers, law firms).',
    primaryCta: 'Download Comprehensive Partnership Kit',
    sections: [
      {
        name: 'SPONSOR VALUE INTRO',
        description: 'Editorial layout highlighting institutional alignment.',
        elements: [
          'H1 Title: "Position Your Firm at the Decisive Table."',
          'Subtext: "Gain structured access to 150 legacy business owners. No generic booths, no transactional noise—only high-context relationship design."'
        ]
      },
      {
        name: 'TIERED BENEFIT MATRIX',
        description: 'Tabular structure or grid columns comparing Title, Executive, Associate, and Supporter tiers.',
        elements: [
          'Title Partner: $75,000 | 1 available | Main-stage naming rights, opening speech slot, 12 VIP passes, private 10-person meeting suite.',
          'Elite Executive: $45,000 | 3 available | Sole track sponsorship, panel seat, 8 VIP passes, lobby exhibition space.',
          'Associate Partner: $25,000 | 6 available | Lunch/Dinner sponsorship, 4 VIP passes, tabletop display.',
          'Circle Supporter: $12,500 | 10 available | Brand placement, 2 VIP passes, delegate kit insert.'
        ]
      },
      {
        name: 'SPONSOR PACKAGE ESTIMATOR',
        description: 'Interactive widget letting partners select extra add-ons (e.g. dinner host, badge branding, boardroom naming) to see a custom pricing estimate.',
        elements: [
          'Interactive toggles, instant total quote, and "Book Strategic Briefing" instant CTA form.'
        ]
      }
    ]
  },
  {
    id: 'contact',
    title: '7. Contact & Registration Page',
    strategy: 'The primary conversion engine. Minimalist, premium, progressive flow designed for high-end founders with immediate validations, custom tier selections, and secure venue references.',
    primaryCta: 'Submit Secure Delegate Application',
    sections: [
      {
        name: 'CONVERSION FORM CONTAINER',
        description: 'Two-column structured layout. Left is the progressive multi-step registration wizard; right is high-touch concierge contact info.',
        elements: [
          'Step 1: Contact Coordinates (Full Name, Direct Email, Private Phone).',
          'Step 2: Organization Profile (Firm Name, Industry, Annual EBITDA/Asset Tier: Under $5M, $5M-$20M, $20M-$50M, $50M+).',
          'Step 3: Strategic Focus (What is your primary goal: Scale Operations, Generational Exit, Capital Partnerships, Direct Investing).',
          'Interactive Validation: Client-side confirmation, security credentials assurance label, strict NDA notice.'
        ]
      },
      {
        name: 'HIGH-TOUCH CONCIERGE INFORMATION',
        description: 'Right column container highlighting personal service.',
        elements: [
          'Direct Contact: "VIP Concierge Hotline: +1 (800) 555-OWNER"',
          'Direct Email: concierge@ownerscircle.co',
          'Venue Highlight Card: The Ritz-Carlton Reserve, Napa Valley. Map location info, check-in instructions, and airport transfer booking support.',
          'Security Statement: "All attendee applications are reviewed directly by the Steering Committee within 48 business hours."'
        ]
      }
    ]
  }
];
