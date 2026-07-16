import React, { useState, useEffect } from 'react';
import { PageId, Speaker, Session, SponsorTier } from '../types';
import { SPEAKERS, SESSIONS, SPONSORS, LEADERSHIP_TEAM } from '../data/mockData';
import { 
  Clock, Calendar, MapPin, Users, CheckCircle2, ArrowRight, 
  ChevronRight, Info, Sparkles, ShieldCheck, 
  Bookmark, BookmarkCheck, UserCheck, X, Mail, Phone, Map, 
  ChevronLeft, Send, ZoomIn, ZoomOut, Compass, InfoIcon, Menu,
  Linkedin, Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Reusable Scroll Animated Section with fluid transition effects as per requirements
const ScrollAnimatedSection = ({ children, id, className = '' }: { children: React.ReactNode; id?: string; className?: string }) => {
  return (
    <motion.div
      id={id}
      className={className}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
};

interface InteractiveWireframeViewProps {
  activePageId: PageId;
  onNavigate: (pageId: PageId) => void;
}

const CustomAvatar = ({ name, size = 'md' }: { name: string; size?: 'sm' | 'md' | 'lg' }) => {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
  
  const sizeClasses = {
    sm: 'w-10 h-10 text-xs',
    md: 'w-14 h-14 text-xs font-bold',
    lg: 'w-20 h-20 text-sm font-extrabold',
  };
  
  return (
    <div className={`rounded-full border border-amber-500/20 bg-gray-950 text-amber-500 flex items-center justify-center tracking-tight font-mono shadow-inner flex-shrink-0 ${sizeClasses[size]}`}>
      {initials}
    </div>
  );
};

// Reusable Summit Partners Showcase Grid component
const SummitPartnersShowcase = () => {
  return (
    <div className="border border-gray-800 rounded-2xl bg-gray-950 p-8 lg:p-12 space-y-10 shadow-2xl relative overflow-hidden" id="partners-showcase-container">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,119,6,0.03),transparent_60%)] pointer-events-none" />
      
      <div className="space-y-3 text-center relative z-10 max-w-2xl mx-auto">
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-500 bg-amber-500/10 px-3 py-1 rounded border border-amber-500/20">
          Summit Alignments &amp; Alliances
        </span>
        <h3 className="text-xl md:text-2xl font-bold font-display text-white tracking-tight">The Alliance Guild</h3>
        <p className="text-xs text-gray-400 font-medium">
          Representing elite capital structures, leading cross-border legal trusts, and premier transactional architects.
        </p>
      </div>

      <div className="space-y-8 relative z-10">
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <span className="text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap">PRESENTING PARTNER</span>
            <div className="h-[1px] bg-gray-800 flex-1" />
          </div>
          <div className="flex justify-center">
            <div className="w-full max-w-sm bg-gray-900/60 border border-gray-800 rounded-xl p-6 hover:border-amber-500/30 hover:bg-gray-900 transition-all text-center flex flex-col items-center justify-center gap-1.5 shadow-md">
              <span className="font-extrabold text-amber-500 font-sans tracking-widest text-base uppercase">GLOBAL WEALTH ASSOCIATION</span>
              <span className="text-[9px] font-mono text-gray-500 uppercase font-semibold">Global Generational Capital Trust</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <span className="text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap">DIAMOND PARTNERS</span>
            <div className="h-[1px] bg-gray-800 flex-1" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5 hover:border-amber-500/30 hover:bg-gray-900 transition-all text-center flex flex-col items-center justify-center gap-1 shadow-md">
              <span className="font-bold text-white tracking-wider text-sm uppercase">VANCE PRIVATE ADVISORS</span>
              <span className="text-[8px] font-mono text-gray-500 uppercase font-semibold">Asset Protection &amp; Capital Allocation</span>
            </div>
            <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5 hover:border-amber-500/30 hover:bg-gray-900 transition-all text-center flex flex-col items-center justify-center gap-1 shadow-md">
              <span className="font-bold text-white tracking-wider text-sm uppercase">HORIZON VENTURES TRUST</span>
              <span className="text-[8px] font-mono text-gray-500 uppercase font-semibold">Secondary Market Liquidity Systems</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <span className="text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap">GOLD PARTNERS</span>
            <div className="h-[1px] bg-gray-800 flex-1" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-4 hover:border-amber-500/30 hover:bg-gray-900 transition-all text-center flex flex-col justify-center gap-0.5 shadow-sm">
              <span className="font-bold text-gray-300 tracking-wide text-xs uppercase">CROWN TRUSTS</span>
              <span className="text-[8px] font-mono text-gray-600 uppercase">Legacy Protection</span>
            </div>
            <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-4 hover:border-amber-500/30 hover:bg-gray-900 transition-all text-center flex flex-col justify-center gap-0.5 shadow-sm">
              <span className="font-bold text-gray-300 tracking-wide text-xs uppercase">MEADOWOOD CHAMBERS</span>
              <span className="text-[8px] font-mono text-gray-600 uppercase">Secured Estates</span>
            </div>
            <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-4 hover:border-amber-500/30 hover:bg-gray-900 transition-all text-center flex flex-col justify-center gap-0.5 shadow-sm">
              <span className="font-bold text-gray-300 tracking-wide text-xs uppercase">SOCIETE JURIDIQUE</span>
              <span className="text-[8px] font-mono text-gray-600 uppercase">Cross-Border Tax</span>
            </div>
            <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-4 hover:border-amber-500/30 hover:bg-gray-900 transition-all text-center flex flex-col justify-center gap-0.5 shadow-sm">
              <span className="font-bold text-gray-300 tracking-wide text-xs uppercase">NEXA GLOBAL M&amp;A</span>
              <span className="text-[8px] font-mono text-gray-600 uppercase">Transaction Architects</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Animated India Connectivity Network Component
const IndiaConnectivityGlobe = () => {
  const cities = [
    { name: 'Delhi', x: 210, y: 140, tag: 'NCT State Corridor', info: 'Capital Pool Access' },
    { name: 'Mumbai', x: 130, y: 350, tag: 'Financial Hub Sector', info: 'Liquidity Pipelines' },
    { name: 'Bengaluru', x: 215, y: 480, tag: 'Tech Enterprise Cluster', info: 'Founder Foundations' },
    { name: 'Pune', x: 145, y: 375, tag: 'Industrial Corridor', info: 'Family Offices' },
    { name: 'Hyderabad', x: 235, y: 400, tag: 'Enterprise Cloud Core', info: 'Primary Asset Base' },
    { name: 'Chennai', x: 250, y: 490, tag: 'Maritime Export Gate', info: 'Strategic Alliances' },
    { name: 'Kolkata', x: 390, y: 280, tag: 'Heritage Owner Base', info: 'Legacy Consolidations' }
  ];

  const connections = [
    { from: 'Mumbai', to: 'Delhi' },
    { from: 'Delhi', to: 'Bengaluru' },
    { from: 'Bengaluru', to: 'Pune' },
    { from: 'Hyderabad', to: 'Mumbai' },
    { from: 'Delhi', to: 'Kolkata' },
    { from: 'Mumbai', to: 'Bengaluru' },
    { from: 'Chennai', to: 'Hyderabad' }
  ];

  const getCityCoords = (name: string) => {
    const city = cities.find(c => c.name === name);
    return city ? { x: city.x, y: city.y } : { x: 0, y: 0 };
  };

  return (
    <div className="bg-gray-950 py-16 md:py-24 px-6 lg:px-12 w-full relative overflow-hidden" id="india-connectivity-globe-container">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,119,6,0.03),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-center w-full">
        <div className="lg:w-4/12 space-y-6 relative z-10 text-left">
        <span className="inline-block text-[9px] font-mono uppercase text-amber-500 border border-amber-500/20 px-3.5 py-1.5 rounded bg-amber-500/5 tracking-widest font-bold">
          • MULTI-CITY CONTINUOUS ALIGNMENT
        </span>
        <h3 className="text-2xl lg:text-3xl font-bold font-display text-white tracking-tight leading-tight">
          The Animated India Connectivity Network
        </h3>
        <p className="text-gray-400 text-xs leading-relaxed font-sans font-medium">
          Our exclusive footprint spans the country&apos;s leading capital markets and industrial corridors. Continuous transactions and confidential liquidity networks bind India&apos;s primary legacy founders in a single, resilient operational loop.
        </p>
      </div>

      <div className="lg:w-8/12 w-full flex justify-center relative z-10">
        <div className="relative w-full aspect-[460/540] bg-gray-900/30 border border-gray-800/60 rounded-xl p-4 overflow-hidden shadow-inner flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 460 540">
            <defs>
              <pattern id="grid-pattern" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#374151" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          </svg>

          <svg className="w-full h-full relative z-10" viewBox="0 0 460 540" fill="none" xmlns="http://www.w3.org/2000/svg">
            {connections.map((conn, idx) => {
              const start = getCityCoords(conn.from);
              const end = getCityCoords(conn.to);
              const dx = end.x - start.x;
              const dy = end.y - start.y;
              const dr = Math.sqrt(dx * dx + dy * dy) * 1.1;

              return (
                <g key={idx}>
                  <path
                    d={`M ${start.x} ${start.y} A ${dr} ${dr} 0 0 1 ${end.x} ${end.y}`}
                    stroke="#1f2937"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <motion.path
                    d={`M ${start.x} ${start.y} A ${dr} ${dr} 0 0 1 ${end.x} ${end.y}`}
                    stroke="url(#arcGradient)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0.1 }}
                    animate={{ 
                      pathLength: [0, 1, 1],
                      pathOffset: [0, 0, 1],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: idx * 0.7,
                      ease: "easeInOut"
                    }}
                  />
                </g>
              );
            })}

            <defs>
              <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d97706" stopOpacity="0" />
                <stop offset="50%" stopColor="#fbbf24" stopOpacity="1" />
                <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
              </linearGradient>
            </defs>

            {cities.map((city) => (
              <g key={city.name} className="cursor-pointer group">
                <circle
                  cx={city.x}
                  cy={city.y}
                  r="10"
                  fill="transparent"
                  stroke="#d97706"
                  strokeWidth="1"
                  className="animate-ping opacity-25"
                  style={{ transformOrigin: `${city.x}px ${city.y}px`, animationDuration: '3s' }}
                />
                
                <circle
                  cx={city.x}
                  cy={city.y}
                  r="6"
                  fill="#111827"
                  stroke="#fbbf24"
                  strokeWidth="1.5"
                  className="group-hover:fill-amber-600 transition-colors"
                />

                <circle
                  cx={city.x}
                  cy={city.y}
                  r="2.5"
                  fill="#fbbf24"
                />

                <text
                  x={city.x}
                  y={city.y - 12}
                  textAnchor="middle"
                  fill="#f3f4f6"
                  fontSize="9.5"
                  fontWeight="bold"
                  fontFamily="monospace"
                  className="tracking-wider select-none pointer-events-none font-bold"
                >
                  {city.name.toUpperCase()}
                </text>

                <title>{`${city.name}: ${city.info} (${city.tag})`}</title>
              </g>
            ))}
          </svg>
        </div>
      </div>
    </div>
    </div>
  );
};

// Magazine & Media Collage Component
const MagazineMediaCollage = () => {
  const covers = [
    {
      title: "THE STRATEGIC EXIT",
      subtitle: "Napa Valley Special Edition",
      issue: "ISSUE IV // VOL XII",
      bgClass: "bg-zinc-950 text-white border-zinc-800",
      accentText: "text-amber-500",
      desc: "An exhaustive lookbook chronicling our continuous scale-ups and high-EBITDA liquidity architecture frameworks."
    },
    {
      title: "THE CHATHAM RECORDERS",
      subtitle: "De-Risking Legacy Assets",
      issue: "FALL 2026 INDEX",
      bgClass: "bg-white text-zinc-900 border-zinc-200",
      accentText: "text-zinc-500",
      desc: "Strategic insights dissecting macro multi-generational succession patterns bypassive of public markets."
    },
    {
      title: "SUMMIT INSIGHTS",
      subtitle: "Chatham House Dispatch",
      issue: "VOL XIV // NO. 3",
      bgClass: "bg-zinc-100 text-zinc-950 border-zinc-300",
      accentText: "text-amber-700",
      desc: "A highly classified report on outbound private credit leverage structures and competitive boardroom negotiations."
    }
  ];

  return (
    <div className="space-y-10" id="magazine-collage-main-container">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-[10px] font-bold text-amber-700 tracking-widest uppercase font-mono block">
          PRINT &amp; EDITORIAL ARCHIVES
        </span>
        <h2 className="text-3xl font-black text-gray-900 font-display tracking-tight">
          Magazine &amp; Media Presence
        </h2>
        <p className="text-xs text-gray-500 font-medium">
          Simulating high-fidelity physical lookbooks, legacy reports, and editorial dispatches from our restricted publication press.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
        {covers.map((cov, idx) => (
          <div
            key={idx}
            className={`border rounded-xl p-8 flex flex-col justify-between aspect-[3/4] shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 relative overflow-hidden ${cov.bgClass}`}
            id={`magazine-cover-${idx}`}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="space-y-2 text-left">
              <span className="text-[9px] font-mono tracking-widest uppercase block opacity-60 font-bold">{cov.issue}</span>
              <div className="h-[1px] bg-amber-500/20 w-12 my-2" />
              <h3 className="text-2xl font-black font-display tracking-tight leading-none mt-4 font-serif">
                {cov.title}
              </h3>
              <p className={`text-[10px] font-mono uppercase tracking-widest font-semibold ${cov.accentText}`}>
                {cov.subtitle}
              </p>
            </div>

            <div className="space-y-4 text-left">
              <p className="text-xs leading-relaxed opacity-80 font-medium">
                {cov.desc}
              </p>
              <div className="border-t border-current/10 pt-4 flex items-center justify-between">
                <span className="text-[9px] font-mono uppercase tracking-widest font-bold">RESTRICTED PRINT // COHORT ONLY</span>
                <span className="text-xs font-bold font-serif">→</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Strategic Vision Frameworks Component
const StrategicVisionFrameworks = () => {
  const frameworks = [
    {
      num: "01",
      title: "Systemic Asset De-Risking Strategy",
      subtitle: "Confidential Transition of Illiquid Holdings",
      desc: "Standard public offerings expose operations to hostile competitor actions and public scrutiny. We structure advanced direct-to-family-office transfers that lock in premium valuation multiples under strict reciprocal NDAs.",
      bullets: [
        "Advanced family-trust shielding systems.",
        "Programmatic exit negotiations bypassive of intermediaries.",
        "Tax-advantaged succession structures."
      ]
    },
    {
      num: "02",
      title: "Board Independence & Leadership Control",
      subtitle: "Bypassing Invasive Investor Demands",
      desc: "Equity investment often comes with restrictive terms that limit the founder's control. We connect owners with non-restrictive private capital networks to preserve complete business decision control.",
      bullets: [
        "Non-restrictive growth debt configurations.",
        "Generational leadership preservation frameworks.",
        "Structured board-vetoing rights templates."
      ]
    },
    {
      num: "03",
      title: "Cross-Border Transactional Security",
      subtitle: "Mitigating Geopolitical Asset Vulnerabilities",
      desc: "Large businesses must protect cash flows across different regions. We establish secure multi-city corporate structures that protect business profits and holdings from local market changes.",
      bullets: [
        "Bespoke helipad transport logistically aligned.",
        "Offshore currency stability hedges.",
        "Confidential capital routing indexes."
      ]
    }
  ];

  return (
    <div className="space-y-12" id="vision-strategic-frameworks">
      <div className="text-left space-y-3">
        <span className="text-[10px] font-mono font-bold text-amber-700 tracking-widest uppercase block">[STRATEGIC VISION FRAMEWORKS]</span>
        <h2 className="text-2xl md:text-3xl font-black text-gray-900 font-display tracking-tight leading-none">
          Multilevel Architectural Mandates
        </h2>
        <p className="text-xs text-gray-500 leading-relaxed max-w-xl">
          Deep-dive tactical structures replacing standard trade slide-decks with highly execution-ready blueprints.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-4">
        {frameworks.map((fw) => (
          <div key={fw.num} className="bg-gray-50/50 border border-gray-150 rounded-xl p-8 space-y-6 flex flex-col justify-between text-left" id={`framework-card-${fw.num}`}>
            <div className="space-y-4">
              <span className="w-10 h-10 rounded-md bg-gray-950 text-white flex items-center justify-center font-black text-xs font-mono shadow-md">{fw.num}</span>
              <div>
                <h3 className="font-extrabold text-gray-900 text-base tracking-tight leading-snug">{fw.title}</h3>
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-amber-700 mt-1 block">{fw.subtitle}</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                {fw.desc}
              </p>
            </div>

            <ul className="space-y-2 border-t border-gray-200/60 pt-4 text-xs font-sans text-gray-700 font-semibold">
              {fw.bullets.map((b, bIdx) => (
                <li key={bIdx} className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-amber-600 flex-shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function InteractiveWireframeView({ activePageId, onNavigate }: InteractiveWireframeViewProps) {
  // Global / Cross-page states for interactivity
  const [bookmarkedSessions, setBookmarkedSessions] = useState<string[]>([]);
  const [activeSpeaker, setActiveSpeaker] = useState<Speaker | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  
  // Home countdown state (Days Remaining till the private assembly)
  const [countdown, setCountdown] = useState({ days: 58, hours: 14, minutes: 35, seconds: 40 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        } else {
          return prev;
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Agenda Filter states
  const [selectedTrack, setSelectedTrack] = useState<string>('All');
  const [agendaSearch, setAgendaSearch] = useState<string>('');

  // Speakers Filter states
  const [selectedSpeakerCat, setSelectedSpeakerCat] = useState<string>('All');

  // Partnership Selected Tier state
  const [selectedSponsorTier, setSelectedSponsorTier] = useState<string>('spon-executive');

  // Interactive Map Placeholder states
  const [mapZoom, setMapZoom] = useState<number>(14);
  const [selectedPoi, setSelectedPoi] = useState<string>('venue');
  const [mapStyle, setMapStyle] = useState<'blueprint' | 'satellite'>('blueprint');

  const POIS = {
    venue: {
      name: 'Meadowood Summit Chambers',
      desc: 'Napa Valley private estate reserved fully for the Owner\'s Circle assembly. Highly secured, single-entry gate parameters.',
      address: '800 Meadowood Lane, St. Helena, CA 94574',
      coordinates: '38.5218° N, 122.4494° W',
    },
    helipad: {
      name: 'Helipad Transfer Terminal',
      desc: 'Exclusive landing point for pre-scheduled helicopter transfers from SFO/OAK, skipping bay traffic.',
      address: 'Napa County Heli-Sector D, CA',
      coordinates: '38.2251° N, 122.2801° W',
    },
    reserve: {
      name: 'Napa Valley Private Reserve Club',
      desc: 'Private estate cave and vineyard grounds hosting the Day 1 Sovereign welcome dinner and rare vintage tasting.',
      address: 'St. Helena Wine District, CA',
      coordinates: '38.5064° N, 122.4691° W',
    }
  };

  // Unified Secure Contact / Inquiry Form State
  const [inquiryTab, setInquiryTab] = useState<'sponsorship' | 'advertising' | 'speakers'>('sponsorship');
  const [toastMessage, setToastMessage] = useState<string>('Your strategic inquiry has been authenticated.');
  const [inquirySubmitted, setInquirySubmitted] = useState<boolean>(false);
  const [partnershipAmount, setPartnershipAmount] = useState<string>('50000');
  const [customAmount, setCustomAmount] = useState<string>('');
  const [inquiryForm, setInquiryForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    firmName: '',
    ebitdaTier: '$5M - $20M EBITDA',
    strategicGoal: 'Scale Operations',
    conciergeNotes: ''
  });

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);
    let msg = 'Your registration credentials have been authenticated.';
    if (inquiryTab === 'sponsorship') {
      msg = 'Sponsorship Proposal Authenticated. Reference generated under mutual NDA.';
    } else if (inquiryTab === 'advertising') {
      msg = 'Media & Advertising Alignments recorded. Editorial review queued.';
    } else if (inquiryTab === 'speakers') {
      msg = 'Keynote Nomination received. Steering Committee vetting initialized.';
    }
    setToastMessage(msg);
    setShowToast(true);
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const toggleBookmark = (sessionId: string) => {
    setBookmarkedSessions(prev => 
      prev.includes(sessionId) ? prev.filter(id => id !== sessionId) : [...prev, sessionId]
    );
  };

  return (
    <div className="flex-1 bg-white flex flex-col min-h-screen" id="wireframe-workspace-canvas">
      
      {/* 1. STICKY TOP-ANCHORED GLOBAL NAVIGATION HEADER */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-gray-100 px-6 py-5 sticky top-0 z-40" id="wireframe-microsite-navigation">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')} id="nav-brand-wrapper">
            <div className="w-9 h-9 rounded bg-gray-950 text-white flex items-center justify-center font-bold tracking-tight text-base font-sans shadow-md">
              OC
            </div>
            <div>
              <span className="font-black text-sm lg:text-base text-gray-900 tracking-wider block">OWNER&apos;S CIRCLE</span>
              <span className="text-[9px] uppercase tracking-widest font-mono text-gray-500 block font-bold">EXCLUSIVE PRIVATE SUMMIT</span>
            </div>
          </div>

          {/* Navigation Links - Desktop Only */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2 text-xs font-semibold uppercase tracking-wide font-sans" id="nav-links-wrapper">
            {(['home', 'about', 'agenda', 'speakers', 'contact'] as PageId[]).map((pid) => (
              <button
                key={pid}
                onClick={() => onNavigate(pid)}
                className={`px-4 py-2 rounded-md transition-all font-semibold tracking-wider cursor-pointer ${
                  activePageId === pid
                    ? 'text-gray-950 bg-gray-100 font-bold'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
                id={`nav-link-${pid}`}
              >
                {pid === 'home' ? 'Home' : pid === 'about' ? 'Vision' : pid === 'agenda' ? 'Agenda' : pid === 'speakers' ? 'Speakers' : 'Inquiry'}
              </button>
            ))}
          </div>



          {/* Menu Toggle - Mobile Only */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden p-2 text-gray-900 hover:text-gray-600 focus:outline-none transition-colors cursor-pointer"
            id="mobile-menu-toggle"
            aria-label="Open navigation menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {/* Responsive Slide-Out Mobile Drawer Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-gray-950/60 backdrop-blur-xs z-50 md:hidden"
              id="mobile-drawer-backdrop"
            />

            {/* Sliding Drawer Content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-80 bg-white shadow-2xl z-50 flex flex-col justify-between p-6 md:hidden border-l border-gray-150"
              id="mobile-drawer-container"
            >
              <div className="space-y-8">
                {/* Drawer Header */}
                <div className="flex items-center justify-between border-b border-gray-100 pb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-gray-950 text-white flex items-center justify-center font-bold tracking-tight text-sm font-sans shadow">
                      OC
                    </div>
                    <div>
                      <span className="font-extrabold text-xs text-gray-900 tracking-wider block">OWNER&apos;S CIRCLE</span>
                      <span className="text-[8px] uppercase tracking-widest font-mono text-gray-400 block font-bold">PRIVATE SUMMIT</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 text-gray-500 hover:text-gray-900 focus:outline-none transition-colors cursor-pointer"
                    id="mobile-drawer-close"
                    aria-label="Close navigation menu"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Drawer Links */}
                <div className="flex flex-col gap-2" id="mobile-drawer-links">
                  {([
                    { label: 'Home', id: 'home' },
                    { label: 'Vision', id: 'about' },
                    { label: 'Agenda', id: 'agenda' },
                    { label: 'Speakers', id: 'speakers' },
                    { label: 'Inquiry', id: 'contact' }
                  ] as const).map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        onNavigate(item.id);
                        setIsMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3.5 rounded-lg text-xs font-bold tracking-widest uppercase transition-all cursor-pointer ${
                        activePageId === item.id
                          ? 'bg-gray-150 text-gray-950 font-black border-l-4 border-gray-950'
                          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                      id={`mobile-nav-link-${item.id}`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Drawer Footer Status */}
              <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl text-[10px] space-y-1.5 font-sans">
                <span className="font-bold text-gray-900 uppercase tracking-widest block font-mono">CHATHAM HOUSE ACTIVE</span>
                <p className="text-gray-500 leading-relaxed font-medium">All sessions locked. Strict peer validation required for dynamic admissions.</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Dynamic Success Toast Notification System */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4"
            id="toast-notification-system"
          >
            <div className="bg-gray-950 text-white border border-gray-900 rounded-xl p-4 shadow-2xl flex items-start gap-3.5">
              <div className="p-2 bg-amber-500/10 text-amber-500 rounded-lg border border-amber-500/20 flex-shrink-0">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div className="space-y-1 flex-1">
                <h4 className="font-extrabold text-sm tracking-wide text-white uppercase font-mono text-[10px] tracking-widest">[SECURE REGISTER STATUS]</h4>
                <p className="text-xs text-gray-300 leading-relaxed font-medium">
                  {toastMessage}
                </p>
              </div>
              <button 
                onClick={() => setShowToast(false)}
                className="text-gray-500 hover:text-white transition-colors p-1 cursor-pointer"
                aria-label="Dismiss notification"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. DYNAMIC PAGE CONTENT WITH MASSIVE VERTICAL BREATHING ROOM */}
      <div className="flex-1 flex flex-col bg-white" id="wireframe-rendered-page">
        
        {/* ==================== HOME PAGE ==================== */}
        {activePageId === 'home' && (
          <div className="flex-1 flex flex-col" id="page-home-rendered">
            
            {/* EDITORIAL HERO SECTION (py-24 to py-36, min-h-[85vh]) */}
            <ScrollAnimatedSection className="min-h-[85vh] flex flex-col justify-center border-b border-gray-100 bg-gray-50/50 py-24 md:py-36 px-6 lg:px-12 relative overflow-hidden" id="wireframe-section-hero">
              <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                
                {/* Hero left text block */}
                <div className="lg:col-span-7 space-y-8">
                  <span className="inline-block text-[11px] font-mono uppercase text-amber-700 border border-amber-500/20 px-3.5 py-1.5 rounded bg-amber-500/5 tracking-widest font-bold" id="hero-eyebrow">
                    • CLOSED-DOOR PRIVATE ASSEMBLY | 15-20 SEATS MAXIMUM
                  </span>
                  <h1 className="text-4xl md:text-6xl font-black text-gray-900 font-display tracking-tight leading-none" id="hero-heading">
                    The Uncontested Space of Enterprise Scale and Private Exit.
                  </h1>
                  <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-2xl" id="hero-subhead">
                    An invitation-only, Chatham House Rule summit uniting an ultra-exclusive cohort of 15-20 legacy business owners, high-growth founders, and elite family offices. Secure confidential operational levers, exit methodologies, and direct co-investment paths.
                  </p>
                  
                  {/* Single Core Primary CTA Button: View Private Agenda */}
                  <div className="flex flex-wrap items-center gap-4 pt-4" id="hero-ctas">
                    <button 
                      onClick={() => onNavigate('agenda')}
                      className="bg-gray-950 text-white font-bold text-sm px-8 py-4 rounded-md hover:bg-gray-800 transition-all flex items-center gap-2 cursor-pointer shadow-lg tracking-wide"
                      id="hero-primary-cta"
                    >
                      View Private Agenda
                      <ArrowRight className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => onNavigate('contact')}
                      className="text-gray-600 hover:text-gray-950 font-semibold text-sm px-6 py-4 rounded-md transition-all cursor-pointer underline underline-offset-4"
                      id="hero-secondary-cta"
                    >
                      Submit Confidential Inquiry
                    </button>
                  </div>
                </div>

                {/* Hero right: Understated Countdown Widget */}
                <div className="lg:col-span-5" id="hero-widget-column">
                  <div className="border border-gray-200 rounded-xl p-8 bg-white shadow-xl space-y-6" id="hero-countdown-widget">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                      <span className="text-[10px] font-mono uppercase text-gray-400 font-bold tracking-wider">[ASSEMBLY LIVENESS STATUS]</span>
                      <span className="flex items-center gap-1.5 text-[10px] text-amber-700 font-bold uppercase font-mono">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-600 animate-pulse inline-block"></span>
                        Vetted Seats Capped
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="text-xs font-bold text-gray-500 uppercase tracking-wider font-mono">Days Remaining to Private Convene:</div>
                      <div className="grid grid-cols-4 gap-3 text-center font-mono" id="countdown-grid">
                        <div className="bg-gray-950 text-white p-3.5 rounded-lg shadow-sm">
                          <span className="block font-black text-2xl leading-none">{countdown.days}</span>
                          <span className="text-[9px] uppercase text-gray-400 font-semibold tracking-widest mt-1 block">days</span>
                        </div>
                        <div className="bg-gray-950 text-white p-3.5 rounded-lg shadow-sm">
                          <span className="block font-black text-2xl leading-none">{countdown.hours}</span>
                          <span className="text-[9px] uppercase text-gray-400 font-semibold tracking-widest mt-1 block">hours</span>
                        </div>
                        <div className="bg-gray-950 text-white p-3.5 rounded-lg shadow-sm">
                          <span className="block font-black text-2xl leading-none">{countdown.minutes}</span>
                          <span className="text-[9px] uppercase text-gray-400 font-semibold tracking-widest mt-1 block">mins</span>
                        </div>
                        <div className="bg-gray-950 text-white p-3.5 rounded-lg shadow-sm">
                          <span className="block font-black text-2xl leading-none">{countdown.seconds}</span>
                          <span className="text-[9px] uppercase text-gray-400 font-semibold tracking-widest mt-1 block">secs</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100 space-y-3 text-xs leading-relaxed">
                      <div className="text-gray-700">
                        We enforce strict cohort limits to preserve the trust density of Chatham House exchanges. All guest credentials must be validated under reciprocal NDA.
                      </div>
                      <div className="text-[10px] text-amber-800 font-bold flex items-center gap-2 bg-amber-50 p-3 rounded-lg border border-amber-100/60">
                        <ShieldCheck className="h-4 w-4 flex-shrink-0" />
                        <span>Requires board validation prior to attendance.</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Seamless Bottom Metadata Bar */}
              <div className="max-w-7xl mx-auto w-full mt-16 pt-8 border-t border-gray-200/60 flex flex-wrap gap-x-12 gap-y-4 text-xs text-gray-500 font-medium font-sans" id="hero-metadata">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <span><strong>Timeline:</strong> November 12-14, 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <span><strong>Venue Location:</strong> St. Helena Estate, Napa Valley</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-gray-400" />
                  <span><strong>Protocol:</strong> Chatham House Rule (NDA Enforced)</span>
                </div>
              </div>
            </ScrollAnimatedSection>

            {/* THE ANIMATED INDIA CONNECTIVITY NETWORK GLOBE */}
            <ScrollAnimatedSection className="w-full border-b border-gray-100" id="home-globe-section">
              <IndiaConnectivityGlobe />
            </ScrollAnimatedSection>

            {/* SECTION: VALUE PROPS & PILLARS (py-24 to py-36) */}
            <ScrollAnimatedSection className="px-6 py-24 md:py-32 space-y-16 max-w-7xl mx-auto w-full" id="wireframe-section-value-props">
              <div className="max-w-3xl space-y-4">
                <span className="text-[10px] font-bold text-amber-700 tracking-widest uppercase font-mono block">OUR FUNDAMENTAL MANDATES</span>
                <h2 className="text-3xl md:text-4xl font-black tracking-tight text-gray-900 font-display">
                  Architected for Substantial, Major Business Milestones.
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed max-w-xl">
                  Every boardroom masterclass, closed panel session, and private networking circle is engineered to generate clear private exit leverage.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="space-y-4 bg-white p-2">
                  <span className="w-10 h-10 rounded-md bg-gray-50 text-gray-900 border border-gray-150 flex items-center justify-center font-black text-sm shadow-xs font-mono">01</span>
                  <h3 className="font-extrabold text-gray-900 text-lg">Independent Growth Engineering</h3>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    Deploy the precise organizational frameworks, algorithmic scaling protocols, and programmatic M&A pipelines to professionalize owner-led operations and bypass systemic industry limitations.
                  </p>
                </div>
                <div className="space-y-4 bg-white p-2">
                  <span className="w-10 h-10 rounded-md bg-gray-50 text-gray-900 border border-gray-150 flex items-center justify-center font-black text-sm shadow-xs font-mono">02</span>
                  <h3 className="font-extrabold text-gray-900 text-lg">Private Capital Alignments</h3>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    Obtain tactical models to survive hostile sponsor buyouts, leverage private credit channels, coordinate legal and tax trust structures, and build high-value competitive bidding fields.
                  </p>
                </div>
                <div className="space-y-4 bg-white p-2">
                  <span className="w-10 h-10 rounded-md bg-gray-50 text-gray-900 border border-gray-150 flex items-center justify-center font-black text-sm shadow-xs font-mono">03</span>
                  <h3 className="font-extrabold text-gray-900 text-lg">Generational &amp; Liquidity Blueprints</h3>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    Skip traditional banking and PE intermediary margins. Build long-term co-investment alignments directly with family offices representing genuine generational assets and legacy operational values.
                  </p>
                </div>
              </div>
            </ScrollAnimatedSection>

            {/* NEW SECTION: VENUE ILLUSTRATIVE PLACEHOLDER FRAME */}
            <ScrollAnimatedSection className="bg-gray-50 border-t border-b border-gray-100 py-24 md:py-32 px-6 lg:px-12" id="wireframe-section-venue-showcase">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                
                {/* Text column */}
                <div className="lg:col-span-5 space-y-6">
                  <span className="text-[10px] font-bold text-amber-700 tracking-widest uppercase font-mono block">SUMMIT RESIDENCE &amp; CHAMBERS</span>
                  <h2 className="text-3xl md:text-4xl font-black text-gray-900 font-display tracking-tight">
                    Strict Operational Secrecy in St. Helena, Napa Valley.
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Owner&apos;s Circle has acquired full exclusivity of the Meadowood Estate chambers for the duration of the summit. Set across pristine forest valleys, the location provides absolute seclusion from corporate media, competitors, and industry vendors.
                  </p>
                  <ul className="space-y-3.5 text-xs text-gray-700 font-semibold font-sans">
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="h-4.5 w-4.5 text-amber-700 flex-shrink-0" />
                      <span>Single-access private security gates</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="h-4.5 w-4.5 text-amber-700 flex-shrink-0" />
                      <span>Dedicated helicopter transfers from SFO/OAK</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="h-4.5 w-4.5 text-amber-700 flex-shrink-0" />
                      <span>Private subterranean wine vaults for evening sessions</span>
                    </li>
                  </ul>
                  <div className="pt-2">
                    <button 
                      onClick={() => onNavigate('contact')}
                      className="border border-gray-300 hover:border-gray-950 text-gray-800 hover:text-gray-950 font-bold text-xs px-6 py-3 rounded-md transition-all cursor-pointer bg-white"
                    >
                      Request Concierge Landing Coordinates
                    </button>
                  </div>
                </div>

                {/* IMAGE PLACEHOLDER FRAME (No minimal lines - structural luxury representation) */}
                <div className="lg:col-span-7">
                  <div className="border border-gray-200 bg-white rounded-2xl p-4 shadow-xl">
                    <div 
                      className="aspect-video w-full rounded-xl relative overflow-hidden flex flex-col justify-end p-8 bg-gray-950 text-white border border-gray-800"
                    >
                      <div className="absolute top-4 right-4 bg-gray-950/80 border border-white/20 text-white font-mono text-[9px] uppercase px-2.5 py-1 rounded tracking-widest font-bold">
                        [CHAMBERS SATELLITE MARKER]
                      </div>
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono tracking-widest uppercase text-amber-400 font-bold">ST. HELENA PRIVATE ESTATE CHAMBERS</span>
                        <h4 className="text-xl md:text-2xl font-bold font-display tracking-tight text-white">Meadowood Lane, California</h4>
                        <p className="text-xs text-gray-300 max-w-md">Fully locked-down private compound. No public access, no media presence, and fully secured networking rooms.</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </ScrollAnimatedSection>



            {/* SECTION: SPEAKERS PREVIEW */}
            <ScrollAnimatedSection className="max-w-7xl mx-auto w-full px-6 py-24 md:py-32 space-y-12" id="wireframe-section-speakers-preview">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-amber-700 tracking-widest uppercase font-mono block">PROVEN TRACK PANELISTS</span>
                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 font-display tracking-tight">Vetted Keynote Operators</h2>
                  <p className="text-xs text-gray-500">A preview of verified business builders presenting actual, massive-scale milestones.</p>
                </div>
                <button 
                  onClick={() => onNavigate('speakers')}
                  className="text-xs text-gray-900 font-bold underline underline-offset-4 flex items-center gap-1.5 hover:text-gray-600 transition-colors cursor-pointer"
                  id="speakers-preview-link"
                >
                  Explore Full Panel ({SPEAKERS.length} operators)
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {SPEAKERS.slice(0, 3).map((speaker) => (
                  <div 
                    key={speaker.id} 
                    onClick={() => setActiveSpeaker(speaker)}
                    className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer flex gap-5"
                    id={`home-speaker-${speaker.id}`}
                  >
                    <CustomAvatar name={speaker.name} size="md" />
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <span className="text-[9px] font-bold font-mono text-gray-400 uppercase tracking-widest block truncate">{speaker.company}</span>
                      <h3 className="font-extrabold text-gray-900 text-sm leading-tight">{speaker.name}</h3>
                      <p className="text-xs text-gray-600 font-medium leading-none">{speaker.role}</p>
                      <p className="text-[11px] text-gray-500 leading-relaxed pt-2 border-t border-gray-50 mt-2 line-clamp-2">
                        {speaker.bio}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollAnimatedSection>

            {/* SECTION: CTA OUTRO PANEL (py-24) */}
            <ScrollAnimatedSection className="bg-gray-50 border-t border-gray-100 py-24 px-6 relative text-center" id="wireframe-section-home-form">
              <div className="max-w-3xl mx-auto space-y-6" id="home-outro-card">
                <span className="text-[10px] font-bold text-amber-700 tracking-widest uppercase font-mono block">STRICT ADMISSION PROTOCOL</span>
                <h3 className="text-3xl font-black text-gray-900 font-display tracking-tight">Apply for Private Assembly Access</h3>
                <p className="text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
                  We maintain strict cumulative asset guidelines. Submissions are processed manually by our Steering Committee to ensure peer resonance of cohort interests.
                </p>
                <div className="pt-4">
                  <button 
                    onClick={() => onNavigate('contact')}
                    className="inline-flex items-center gap-2 bg-gray-950 hover:bg-gray-800 text-white font-bold text-xs px-8 py-4 rounded-md cursor-pointer shadow-md transition-colors tracking-wide"
                  >
                    <span>Submit Secure Application Inquiry</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </ScrollAnimatedSection>

          </div>
        )}

        {/* ==================== VISION (ABOUT) PAGE ==================== */}
        {activePageId === 'about' && (
          <div className="flex-1 flex flex-col" id="page-about-rendered">
            
            {/* MANIFESTO NARRATIVE HERO (py-28, min-h-[75vh]) */}
            <ScrollAnimatedSection className="border-b border-gray-100 bg-gray-50/50 py-28 px-6 lg:px-12 relative min-h-[75vh] flex flex-col justify-center" id="page-about-hero-section">
              <div className="max-w-7xl mx-auto w-full space-y-8">
                <span className="inline-block text-[11px] font-mono uppercase text-amber-700 border border-amber-500/20 px-3.5 py-1.5 rounded bg-amber-500/5 tracking-widest font-bold" id="about-eyebrow">
                  THE SUMMIT CHARTER
                </span>
                <h1 className="text-4xl md:text-6xl font-black tracking-tight text-gray-900 font-display leading-tight md:leading-none" id="about-heading">
                  The Manifesto of Enterprise Owners.
                </h1>
                <p className="text-amber-800 text-sm md:text-base font-bold uppercase tracking-wider font-mono bg-amber-500/5 border border-amber-500/15 p-4 rounded-lg max-w-3xl" id="about-subhead-warning">
                  Why standard trade events fail elite operator expectations—and how we constructed an alternative ecosystem designed purely for high-density truth.
                </p>
                
                {/* Asymmetric story text */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-gray-600 text-xs sm:text-sm leading-relaxed pt-4 border-t border-gray-200/60 font-sans" id="about-manifesto-text">
                  <div className="space-y-4">
                    <p>
                      Standard industry events are inherently structured for volume. They prioritize sponsor booth monetization metrics, transactional service vendors, and generalized slide-deck presentations. The inevitable consequence is a highly diluted atmosphere where genuine enterprise scale is obscured by sales pitches.
                    </p>
                    <p>
                      <strong>Owner&apos;s Circle</strong> was founded as a self-funded operational corrective. We do not accept sponsorship deals that dilute the absolute discretion of the board. We maintain strict validation protocols because transparent, strategic exchange is only possible in environments where every participant possesses similar stakes and operating scales.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <p>
                      Our private Napa Valley assembly cap of 15-20 owners facilitates complete, off-the-record transparency. Protected by strict Chatham House Rules, delegates dissect capitalization adjustments, complex tax succession methodologies, and exit negotiation blueprints that would never be discussed in a public forum.
                    </p>
                    <p>
                      This is not a general learning seminar; it is a high-density, peer-validated operations room for independent founders targeting generational wealth and systematic enterprise scale.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollAnimatedSection>

            {/* MAGAZINE MEDIA COLLAGE */}
            <ScrollAnimatedSection className="py-28 px-6 lg:px-12 bg-gray-50/50 border-t border-b border-gray-100 w-full" id="vision-magazine-collage-section">
              <div className="max-w-7xl mx-auto">
                <MagazineMediaCollage />
              </div>
            </ScrollAnimatedSection>

            {/* STRATEGIC VISION FRAMEWORKS */}
            <ScrollAnimatedSection className="py-28 px-6 lg:px-12 w-full max-w-7xl mx-auto" id="vision-strategic-frameworks-section">
              <StrategicVisionFrameworks />
            </ScrollAnimatedSection>

          </div>
        )}

        {/* ==================== STRATEGIC AGENDA PAGE ==================== */}
        {activePageId === 'agenda' && (
          <div className="flex-1 w-full px-6 py-28 border-t border-gray-100 bg-white" id="page-agenda-rendered">
            <div className="max-w-7xl mx-auto w-full space-y-12">
            
            <ScrollAnimatedSection className="space-y-6 pt-4 w-full" id="agenda-page-intro-section">
              <span className="inline-block text-[11px] font-mono uppercase text-amber-700 border border-amber-500/20 px-3.5 py-1.5 rounded bg-amber-500/5 tracking-widest font-bold" id="agenda-eyebrow">
                TIMELINE CHRONOLOGY
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-gray-900 font-display tracking-tight leading-tight md:leading-none" id="agenda-heading">
                Chronological Strategic Blueprint / Boardroom Agenda
              </h1>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-3xl" id="agenda-subhead">
                Deep, chronological lanes structured for the 15-20 cohort. Interactive filters assist in scanning modules focused on operational scaling, capitalization transitions, and private boardroom roundtable setups.
              </p>
 
              {/* Interactive Agenda Filter Panel */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200" id="agenda-interactive-filters">
                <div className="flex flex-wrap gap-2">
                  {['All', 'Scaling & Operations', 'Capital & Exit', 'Elite Roundtables'].map((track) => (
                    <button
                      key={track}
                      onClick={() => setSelectedTrack(track)}
                      className={`px-4 py-2 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                        selectedTrack === track
                          ? 'bg-gray-950 text-white font-black shadow-sm'
                          : 'text-gray-600 hover:text-gray-900 bg-white border border-gray-200'
                      }`}
                      id={`agenda-filter-${track.replace(/ /g, '-')}`}
                    >
                      {track}
                    </button>
                  ))}
                </div>
                <input 
                  type="text" 
                  placeholder="Search keywords..."
                  value={agendaSearch}
                  onChange={(e) => setAgendaSearch(e.target.value)}
                  className="text-xs bg-white border border-gray-200 rounded-md px-3.5 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400 w-full sm:w-56"
                />
              </div>
            </ScrollAnimatedSection>

            {/* CHRONOLOGICAL WIDE TIMELINE LANES */}
            <ScrollAnimatedSection className="space-y-6 w-full" id="agenda-rendered-timeline">
              {SESSIONS.filter(session => {
                const matchesTrack = selectedTrack === 'All' || session.track.includes(selectedTrack);
                const matchesSearch = session.title.toLowerCase().includes(agendaSearch.toLowerCase()) || 
                                      session.description.toLowerCase().includes(agendaSearch.toLowerCase());
                return matchesTrack && matchesSearch;
              }).map((session) => (
                <div 
                  key={session.id} 
                  className={`border rounded-xl p-8 bg-white transition-all duration-200 ${
                    bookmarkedSessions.includes(session.id) ? 'border-gray-950 bg-gray-50/50 shadow-sm' : 'border-gray-200 hover:border-gray-350 shadow-sm hover:shadow-md'
                  }`}
                  id={`session-card-${session.id}`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                    
                    {/* Left: session metadata + content */}
                    <div className="space-y-3.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="text-[10px] font-mono font-bold bg-gray-950 text-white px-2.5 py-1 rounded">
                          {session.time}
                        </span>
                        <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">
                          {session.location}
                        </span>
                        <span className="text-[10px] px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md font-medium">
                          {session.track}
                        </span>
                      </div>
                      <h3 className="font-extrabold text-gray-900 text-base">{session.title}</h3>
                      <p className="text-xs text-gray-600 leading-relaxed max-w-4xl">{session.description}</p>
                      
                      {/* Panelist chips */}
                      {session.speakerIds.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2.5 pt-2">
                          <span className="text-[9px] font-mono uppercase text-gray-400 font-bold tracking-wider">Panel Speakers:</span>
                          {session.speakerIds.map(sid => {
                            const spk = SPEAKERS.find(s => s.id === sid);
                            return spk ? (
                              <span 
                                key={sid} 
                                onClick={() => setActiveSpeaker(spk)}
                                className="text-[10px] bg-gray-50 hover:bg-gray-100 text-gray-800 font-bold px-2.5 py-1 rounded border border-gray-150 cursor-pointer transition-all"
                              >
                                {spk.name} ({spk.company})
                              </span>
                            ) : null;
                          })}
                        </div>
                      )}
                    </div>

                    {/* Right: bookmark action button */}
                    <button
                      onClick={() => toggleBookmark(session.id)}
                      className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer w-full lg:w-auto ${
                        bookmarkedSessions.includes(session.id)
                          ? 'bg-gray-950 text-white shadow-sm'
                          : 'border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                      id={`bookmark-btn-${session.id}`}
                    >
                      {bookmarkedSessions.includes(session.id) ? (
                        <>
                          <BookmarkCheck className="h-4 w-4 text-amber-500" />
                          <span>Bookmarked</span>
                        </>
                      ) : (
                        <>
                          <Bookmark className="h-4 w-4" />
                          <span>Bookmark Slot</span>
                        </>
                      )}
                    </button>

                  </div>
                </div>
              ))}
            </ScrollAnimatedSection>

            {/* INTEGRATED EXECUTIVE SCHEDULE BUILDER SUMMARY */}
            {bookmarkedSessions.length > 0 && (
              <ScrollAnimatedSection className="mt-12 bg-gray-950 text-white rounded-xl p-8 border border-gray-900 space-y-6" id="integrated-itinerary-summary">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-4">
                  <div>
                    <h3 className="font-extrabold text-sm uppercase tracking-wider font-mono text-amber-500">Your Serialized Strategic Itinerary ({bookmarkedSessions.length} slots)</h3>
                    <p className="text-[11px] text-gray-400 mt-1">These selected slots are stored locally in your active session browser state.</p>
                  </div>
                  <button 
                    onClick={() => alert(`Strategic agenda download initialized: ${bookmarkedSessions.length} session entries serialized into custom PDF prospectus.`)}
                    className="bg-white hover:bg-gray-100 text-gray-950 font-bold text-xs py-2.5 px-5 rounded-md flex items-center gap-1.5 cursor-pointer shadow-sm tracking-wide transition-all"
                    id="download-itinerary-btn"
                  >
                    Download Custom Calendar (.ics)
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {bookmarkedSessions.map(id => {
                    const sess = SESSIONS.find(s => s.id === id);
                    if (!sess) return null;
                    return (
                      <div key={id} className="p-4 bg-gray-900 border border-gray-800 rounded-lg text-xs relative group" id={`itinerary-item-${id}`}>
                        <button 
                          onClick={() => toggleBookmark(id)}
                          className="absolute top-3 right-3 text-gray-500 hover:text-white transition-opacity cursor-pointer"
                        >
                          <X className="h-4 w-4" />
                        </button>
                        <span className="text-[9px] font-mono font-bold text-gray-500 block tracking-wider uppercase">{sess.time}</span>
                        <span className="font-bold text-white block mt-1 line-clamp-1 pr-4">{sess.title}</span>
                        <span className="text-[9px] text-amber-500 block font-semibold mt-1">{sess.location}</span>
                      </div>
                    );
                  })}
                </div>
              </ScrollAnimatedSection>
            )}

            </div>
          </div>
        )}

        {/* ==================== SPEAKERS PAGE ==================== */}
        {activePageId === 'speakers' && (
          <div className="flex-1 w-full px-6 py-28 border-t border-gray-100 bg-white" id="page-speakers-rendered">
            <div className="max-w-7xl mx-auto w-full space-y-12">
            
            <ScrollAnimatedSection className="space-y-6 pt-4 w-full" id="speakers-page-intro-section">
              <span className="inline-block text-[11px] font-mono uppercase text-amber-700 border border-amber-500/20 px-3.5 py-1.5 rounded bg-amber-500/5 tracking-widest font-bold" id="speakers-eyebrow">
                THE OPERATOR ASSEMBLY
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-gray-900 font-display tracking-tight leading-tight md:leading-none" id="speakers-heading">
                Keynote Operator Panel
              </h1>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-3xl" id="speakers-subhead">
                We do not host professional generalist speakers or consultants. Every panelist is actively directing substantial capital, scale, or managing legacy corporate investments.
              </p>
            </ScrollAnimatedSection>

            {/* SPEAKER GRID WITH PROMINENT PROFILE CARDS */}
            <ScrollAnimatedSection className="grid grid-cols-1 md:grid-cols-2 gap-8" id="speakers-rendered-grid">
              {SPEAKERS.map((speaker) => (
                <div 
                  key={speaker.id} 
                  className="border border-gray-200 rounded-xl p-8 bg-white flex flex-col sm:flex-row gap-6 hover:shadow-lg transition-all relative"
                  id={`speaker-page-card-${speaker.id}`}
                >
                  <img 
                    src={speaker.image} 
                    alt={speaker.name} 
                    className="w-20 h-20 rounded-full border-2 border-gray-100 object-cover bg-gray-50 flex-shrink-0 shadow-sm mx-auto sm:mx-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400">{speaker.company}</span>
                      <span className="text-[9px] px-2 py-0.5 bg-gray-100 rounded font-bold uppercase font-mono tracking-wider text-gray-600">
                        {speaker.category}
                      </span>
                    </div>
                    <h3 className="font-black text-gray-900 text-lg leading-tight text-center sm:text-left">{speaker.name}</h3>
                    <p className="text-xs text-gray-600 font-bold text-center sm:text-left leading-none">{speaker.role}</p>
                    <p className="text-xs text-gray-500 leading-relaxed pt-3 border-t border-gray-50 mt-3">
                      {speaker.bio}
                    </p>
                    
                    <div className="pt-4 flex flex-wrap gap-2 justify-center sm:justify-start">
                      <button
                        onClick={() => setActiveSpeaker(speaker)}
                        className="bg-gray-950 text-white text-[10px] font-bold px-4 py-2.5 rounded-md hover:bg-gray-800 transition-all cursor-pointer tracking-wider uppercase"
                        id={`speaker-bio-btn-${speaker.id}`}
                      >
                        Inspect Bio
                      </button>
                      <button
                        onClick={() => alert(`Private appointment scheduling triggered with ${speaker.name} of ${speaker.company}.`)}
                        className="border border-gray-200 hover:border-gray-950 text-gray-600 hover:text-gray-900 text-[10px] font-bold px-4 py-2.5 rounded-md transition-all cursor-pointer bg-white"
                        id={`speaker-meet-btn-${speaker.id}`}
                      >
                        Request Boardroom Slot
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </ScrollAnimatedSection>

            </div>
          </div>
        )}

        {/* ==================== UNIFIED EXECUTIVE CONTACT & INQUIRY ==================== */}
        {activePageId === 'contact' && (
          <div className="flex-1 w-full px-6 py-28 border-t border-gray-100 bg-white" id="page-contact-rendered">
            <div className="max-w-7xl mx-auto w-full space-y-12">
            
            {/* Top title and description matching the global typography scale */}
            <ScrollAnimatedSection className="space-y-6 pt-4 w-full text-left" id="contact-page-intro-section">
              <span className="inline-block text-[11px] font-mono uppercase text-amber-700 border border-amber-500/20 px-3.5 py-1.5 rounded bg-amber-500/5 tracking-widest font-bold" id="contact-eyebrow">
                VIP REGISTRATION ENDPOINT
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-gray-900 font-display tracking-tight leading-tight md:leading-none" id="contact-heading">
                Secure Executive Inquiry Portal
              </h1>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-3xl" id="contact-subhead">
                Submit your credentials directly to our Steering Committee. All applications are treated with strict confidentiality under reciprocal mutual NDA.
              </p>
            </ScrollAnimatedSection>

            {/* 1. Top Container (Full-Width Map Block) */}
            <ScrollAnimatedSection className="w-full space-y-4" id="google-map-interactive-container">
              {/* Grand, high-contrast black placeholder container representing Google Map */}
              <div className="border border-gray-800 rounded-2xl overflow-hidden bg-gray-950 shadow-2xl space-y-3 p-4 relative" id="contact-full-map-block">
                <div className="bg-gray-900 text-gray-300 p-3.5 rounded-xl flex items-center justify-between text-[10px] font-mono border border-gray-800">
                  <div className="flex items-center gap-2">
                    <Map className="h-4 w-4 text-amber-500 animate-pulse" />
                    <span className="font-bold uppercase tracking-widest">NAPA_VALLEY_SATELLITE_COORDINATES_INDEX</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-semibold">
                    <span className="text-gray-400">POI: <strong className="text-white uppercase font-mono">{POIS[selectedPoi as keyof typeof POIS].name}</strong></span>
                    <span className="text-gray-400">|</span>
                    <span className="text-gray-400">Zoom: <strong className="text-white">{mapZoom}x</strong></span>
                  </div>
                </div>

                {/* Visual Map Canvas Grid */}
                <div 
                  className="h-96 w-full bg-black rounded-xl relative overflow-hidden flex flex-col justify-between p-6 select-none border border-gray-800/50"
                >
                  {/* Dynamic Live Google Map iframe with requested Grayscale and High-Contrast Filter */}
                  <iframe
                    className="absolute inset-0 w-full h-full border-0 z-0 grayscale contrast-125 opacity-80"
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(
                      selectedPoi === 'venue' 
                        ? 'Meadowood Napa Valley, California' 
                        : selectedPoi === 'helipad' 
                        ? 'Napa County Airport, California' 
                        : '800 Meadowood Lane, St. Helena, CA'
                    )}&t=${mapStyle === 'satellite' ? 'k' : 'm'}&z=${mapZoom + 2}&ie=UTF8&iwloc=&output=embed`}
                    allowFullScreen
                    loading="lazy"
                    title="Live Google Map of Napa Valley"
                  />

                  {/* Active Coordinates info HUD */}
                  <div className="bg-gray-950/90 border border-gray-800 p-3 rounded-lg text-[10px] font-mono text-gray-300 w-fit shadow-lg backdrop-blur-md space-y-1 relative z-10">
                    <div className="text-gray-500 font-bold text-[8px] uppercase tracking-wider">Active Sector Coordinates</div>
                    <div className="text-amber-500 font-black">{POIS[selectedPoi as keyof typeof POIS].coordinates}</div>
                  </div>

                  {/* Interactive Clickable Pins representing points of interest */}
                  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    
                    {/* POI Pin 1: Venue */}
                    <button 
                      type="button"
                      onClick={() => setSelectedPoi('venue')}
                      className={`absolute cursor-pointer p-2 rounded-full transition-all duration-300 pointer-events-auto ${
                        selectedPoi === 'venue' 
                          ? 'bg-amber-500 text-white ring-4 ring-amber-500/30 scale-125 z-20 shadow-md' 
                          : 'bg-gray-950 text-gray-300 hover:bg-gray-800 scale-100 z-10 border border-gray-800'
                      }`}
                      style={{ top: '35%', left: '48%' }}
                      title="Summit Chambers"
                    >
                      <MapPin className="h-4.5 w-4.5" />
                    </button>

                    {/* POI Pin 2: Helipad */}
                    <button 
                      type="button"
                      onClick={() => setSelectedPoi('helipad')}
                      className={`absolute cursor-pointer p-2 rounded-full transition-all duration-300 pointer-events-auto ${
                        selectedPoi === 'helipad' 
                          ? 'bg-amber-500 text-white ring-4 ring-amber-500/30 scale-125 z-20 shadow-md' 
                          : 'bg-gray-950 text-gray-300 hover:bg-gray-800 scale-100 z-10 border border-gray-800'
                      }`}
                      style={{ top: '65%', left: '25%' }}
                      title="Helipad"
                    >
                      <Compass className="h-4.5 w-4.5" />
                    </button>

                    {/* POI Pin 3: Wine Reserve */}
                    <button 
                      type="button"
                      onClick={() => setSelectedPoi('reserve')}
                      className={`absolute cursor-pointer p-2 rounded-full transition-all duration-300 pointer-events-auto ${
                        selectedPoi === 'reserve' 
                          ? 'bg-amber-500 text-white ring-4 ring-amber-500/30 scale-125 z-20 shadow-md' 
                          : 'bg-gray-950 text-gray-300 hover:bg-gray-800 scale-100 z-10 border border-gray-800'
                      }`}
                      style={{ top: '50%', left: '72%' }}
                      title="Private Wine Reserve"
                    >
                      <Sparkles className="h-4.5 w-4.5" />
                    </button>
                  </div>

                  {/* Bottom Map Controller Panel */}
                  <div className="flex items-center justify-between w-full mt-auto relative z-10">
                    <div className="flex gap-1.5 bg-gray-950/95 border border-gray-800 p-1 rounded-lg text-[9px] font-mono shadow-md backdrop-blur-md">
                      <button 
                        type="button"
                        onClick={() => setMapStyle('blueprint')} 
                        className={`px-3 py-1 rounded-md cursor-pointer transition-colors ${mapStyle === 'blueprint' ? 'bg-white text-gray-950 font-black' : 'text-gray-400 hover:text-white'}`}
                      >
                        Blueprint
                      </button>
                      <button 
                        type="button"
                        onClick={() => setMapStyle('satellite')} 
                        className={`px-3 py-1 rounded-md cursor-pointer transition-colors ${mapStyle === 'satellite' ? 'bg-white text-gray-950 font-black' : 'text-gray-400 hover:text-white'}`}
                      >
                        Satellite
                      </button>
                    </div>

                    {/* Zoom controls */}
                    <div className="flex gap-1.5">
                      <button 
                        type="button"
                        onClick={() => setMapZoom(prev => Math.min(18, prev + 1))}
                        className="bg-gray-950 hover:bg-gray-900 border border-gray-800 text-white p-2 rounded-lg cursor-pointer transition-colors shadow-md"
                        title="Zoom In"
                      >
                        <ZoomIn className="h-4 w-4" />
                      </button>
                      <button 
                        type="button"
                        onClick={() => setMapZoom(prev => Math.max(10, prev - 1))}
                        className="bg-gray-950 hover:bg-gray-900 border border-gray-800 text-white p-2 rounded-lg cursor-pointer transition-colors shadow-md"
                        title="Zoom Out"
                      >
                        <ZoomOut className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Active Point of Interest Detailed HUD */}
                <div className="bg-gray-900 border border-gray-800 p-4 rounded-xl text-xs space-y-1.5 shadow-lg" id="poi-details-hud">
                  <span className="text-[10px] font-mono font-bold text-amber-500 uppercase tracking-widest block">
                    [POINT OF INTEREST INDEX: {POIS[selectedPoi as keyof typeof POIS].name}]
                  </span>
                  <p className="text-white font-extrabold text-sm leading-tight">
                    {POIS[selectedPoi as keyof typeof POIS].address}
                  </p>
                  <p className="text-gray-400 text-xs leading-relaxed font-medium">
                    {POIS[selectedPoi as keyof typeof POIS].desc}
                  </p>
                </div>
              </div>
            </ScrollAnimatedSection>

            {/* 3-Tab Selection Interface for Inquiry Types */}
            <ScrollAnimatedSection className="w-full" id="inquiry-tab-selection-container">
              <div className="bg-gray-50 border border-gray-200 p-2 rounded-2xl max-w-2xl mx-auto flex gap-2">
                <button
                  type="button"
                  onClick={() => setInquiryTab('sponsorship')}
                  className={`flex-1 py-3 px-4 text-xs font-bold rounded-xl transition-all cursor-pointer text-center ${
                    inquiryTab === 'sponsorship'
                      ? 'bg-gray-950 text-white shadow-md'
                      : 'text-gray-500 hover:text-gray-950 hover:bg-gray-100'
                  }`}
                  id="inquiry-tab-sponsorship"
                >
                  Sponsorship
                </button>
                <button
                  type="button"
                  onClick={() => setInquiryTab('advertising')}
                  className={`flex-1 py-3 px-4 text-xs font-bold rounded-xl transition-all cursor-pointer text-center ${
                    inquiryTab === 'advertising'
                      ? 'bg-gray-950 text-white shadow-md'
                      : 'text-gray-500 hover:text-gray-950 hover:bg-gray-100'
                  }`}
                  id="inquiry-tab-advertising"
                >
                  Advertising &amp; Media
                </button>
                <button
                  type="button"
                  onClick={() => setInquiryTab('speakers')}
                  className={`flex-1 py-3 px-4 text-xs font-bold rounded-xl transition-all cursor-pointer text-center ${
                    inquiryTab === 'speakers'
                      ? 'bg-gray-950 text-white shadow-md'
                      : 'text-gray-500 hover:text-gray-950 hover:bg-gray-100'
                  }`}
                  id="inquiry-tab-speakers"
                >
                  Keynote Speaker Vetting
                </button>
              </div>
            </ScrollAnimatedSection>

            {/* 2. Bottom Container (Two-Column Master Grid) */}
            <ScrollAnimatedSection className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start pt-4" id="contact-bottom-master-grid">
              
              {/* Left Column: Secure Inquiry Form (7/12 width) */}
              <div className="lg:col-span-7 space-y-8 relative" id="executive-inquiry-form">
                
                {inquirySubmitted ? (
                  <div className="bg-green-50 border border-green-200 p-8 rounded-2xl space-y-5 text-xs text-green-800 animate-fade-in" id="reg-submitted-success">
                    <CheckCircle2 className="h-12 w-12 text-green-600" />
                    <h3 className="font-black text-2xl text-green-900 tracking-tight">Executive Inquiry Secure-Logged</h3>
                    <p className="max-w-md text-sm text-green-800 leading-relaxed font-medium">
                      Thank you, <strong className="text-green-900">{inquiryForm.fullName}</strong>. Your corporate coordinates regarding your inquiry have been recorded under reference ID <strong>#OC-{Math.floor(Math.random() * 9000) + 1000}</strong>.
                    </p>
                    <div className="bg-white border border-green-200 p-6 rounded-xl space-y-3 max-w-md text-gray-700 shadow-sm">
                      <span className="font-black text-gray-900 block border-b pb-2 text-[10px] font-mono tracking-wider uppercase">Recorded Credentials:</span>
                      <div className="grid grid-cols-2 gap-y-2 text-xs">
                        <div><strong>Full Name:</strong></div>
                        <div>{inquiryForm.fullName}</div>
                        <div><strong>Direct Email:</strong></div>
                        <div>{inquiryForm.email}</div>
                        <div><strong>Direct Line:</strong></div>
                        <div>{inquiryForm.phone}</div>
                      </div>
                    </div>
                    <p className="text-[11px] text-gray-400 italic pt-2 block">
                      The Steering Committee will verify the operating markers and deliver direct entry confirmation details via secure email within 48 business hours.
                    </p>
                  </div>
                ) : (
                  <form 
                    onSubmit={handleInquirySubmit}
                    className="space-y-6 text-xs bg-gray-50/50 p-8 rounded-2xl border border-gray-150 text-left"
                    id="registration-form"
                  >
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono uppercase text-amber-700 font-black block tracking-widest">
                        {inquiryTab === 'sponsorship' ? '[SPONSORSHIP REGISTRATION PORTAL]' : inquiryTab === 'advertising' ? '[MEDIA & ADVERTISING AGREEMENT]' : '[KEYNOTE OPERATOR NOMINATION]'}
                      </span>
                      <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                        {inquiryTab === 'sponsorship' ? 'Sponsorship Credentials' : inquiryTab === 'advertising' ? 'Brand & Media Coordinates' : 'Vetted Operator Credentials'}
                      </h2>
                      <p className="text-gray-500 text-[11px]">
                        {inquiryTab === 'sponsorship' ? 'Position your brand inside our high-density chambers. All applications are protected by mutual NDA.' : inquiryTab === 'advertising' ? 'Inquire about digital or physical magazine catalog inclusion, media banners, and print placements.' : 'Nominate yourself or an enterprise peer to address the 15-20 boardroom delegation.'}
                      </p>
                    </div>

                    <div className="space-y-4">
                      {/* Full Name field */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono uppercase text-gray-500 block font-bold tracking-wider">Full Name</label>
                        <input 
                          required
                          type="text" 
                          placeholder="Elena Rostova"
                          value={inquiryForm.fullName}
                          onChange={(e) => setInquiryForm(prev => ({ ...prev, fullName: e.target.value }))}
                          className="w-full border border-gray-200 rounded-lg p-4 focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white text-gray-800 text-xs transition-all shadow-sm"
                        />
                        <span className="text-[9px] text-gray-400 block font-mono italic">Please enter your full legal or corporate registered name.</span>
                      </div>

                      {/* Corporate Email field */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono uppercase text-gray-500 block font-bold tracking-wider">Corporate Email</label>
                        <input 
                          required
                          type="email" 
                          placeholder="elena@horizoncloud.com"
                          value={inquiryForm.email}
                          onChange={(e) => setInquiryForm(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full border border-gray-200 rounded-lg p-4 focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white text-gray-800 text-xs transition-all shadow-sm"
                        />
                        <span className="text-[9px] text-gray-400 block font-mono italic font-medium text-amber-800 bg-amber-500/5 px-2.5 py-1 rounded border border-amber-500/10 w-fit">Strictly professional business email handles required.</span>
                      </div>

                      {/* Direct Line field */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono uppercase text-gray-500 block font-bold tracking-wider">Direct Line</label>
                        <input 
                          required
                          type="tel" 
                          placeholder="+1 (555) 019-2834"
                          value={inquiryForm.phone}
                          onChange={(e) => setInquiryForm(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full border border-gray-200 rounded-lg p-4 focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white text-gray-800 text-xs transition-all shadow-sm"
                        />
                        <span className="text-[9px] text-gray-400 block font-mono italic">Ensure this is a direct private cellular line or secure executive desk line.</span>
                      </div>

                      {/* Proposed/Intended Partnership Amount field - Sponsorship Only */}
                      {inquiryTab === 'sponsorship' && (
                        <div className="space-y-2">
                          <label className="text-[10px] font-mono uppercase text-gray-500 block font-bold tracking-wider">Proposed/Intended Partnership Amount</label>
                          <div className="relative">
                            <select 
                              value={partnershipAmount}
                              onChange={(e) => setPartnershipAmount(e.target.value)}
                              className="w-full border border-gray-200 rounded-lg p-4 focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white text-gray-800 text-xs font-semibold transition-all shadow-sm cursor-pointer"
                            >
                              <option value="25000">$25,000 - Keynote Delegate Partner</option>
                              <option value="50000">$50,000 - Boardroom Session Partner</option>
                              <option value="100000">$100,000 - Private Roundtable Co-Host</option>
                              <option value="250000">$250,000 - Presenting Summit Partner</option>
                              <option value="custom">Custom Commitment Amount...</option>
                            </select>
                          </div>
                          {partnershipAmount === 'custom' && (
                            <div className="relative mt-2">
                              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold font-mono text-xs">$</span>
                              <input 
                                required
                                type="number"
                                min="10000"
                                placeholder="Enter customized amount (min $10,000)..."
                                value={customAmount}
                                onChange={(e) => setCustomAmount(e.target.value)}
                                className="w-full border border-gray-200 rounded-lg p-4 pl-8 focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white text-gray-800 text-xs transition-all shadow-sm"
                              />
                            </div>
                          )}
                          <span className="text-[9px] text-gray-400 block font-mono italic">State your targeted commitment amount. Minimum partnership entry is $10,000.</span>
                        </div>
                      )}

                      {/* Message field */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono uppercase text-gray-500 block font-bold tracking-wider">Message Details</label>
                        <textarea 
                          placeholder={
                            inquiryTab === 'sponsorship' 
                              ? 'Describe your target partnership budget alignment or bespoke spatial requirements...'
                              : inquiryTab === 'advertising'
                              ? 'State your target catalog advertising slots, media channels, or physical signage formats...'
                              : 'Detail the nominee’s active corporate EBITDA scale, previous board/keynote achievements, or specific operational focus area...'
                          }
                          value={inquiryForm.conciergeNotes}
                          onChange={(e) => setInquiryForm(prev => ({ ...prev, conciergeNotes: e.target.value }))}
                          className="w-full border border-gray-200 rounded-lg p-4 focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white text-gray-800 text-xs h-32 resize-none transition-all shadow-sm"
                        />
                        <span className="text-[9px] text-gray-400 block font-mono">Include any strategic milestones or private access coordinates.</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button 
                        type="submit"
                        className="w-full bg-gray-950 text-white font-bold py-4 rounded-lg hover:bg-gray-800 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md text-xs uppercase tracking-widest font-sans"
                      >
                        <span>
                          {inquiryTab === 'sponsorship' ? 'Submit Sponsorship Inquiry' : inquiryTab === 'advertising' ? 'Submit Media Inquiry' : 'Submit Speaker Nomination'}
                        </span>
                        <Send className="h-4 w-4" />
                      </button>
                    </div>

                    <p className="text-[9px] text-gray-400 italic text-center font-mono mt-2 block">
                      🔒 Secured through bank-grade cryptographic endpoint transfer tunnels.
                    </p>
                  </form>
                )}
              </div>

              {/* Right Column: High-Touch Executive Contact Details (5/12 width) */}
              <div className="lg:col-span-5 space-y-8 text-left" id="contact-sidebar-info">
                
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-amber-700 tracking-widest uppercase font-mono block">CONCIERGE DIRECTORIES</span>
                  <h3 className="text-xl font-extrabold text-gray-900 tracking-tight">High-Touch Executive Contacts</h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-sans">
                    Reach out directly through vetted offline communications for immediate corporate response.
                  </p>
                </div>

                <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-lg space-y-6" id="concierge-details-card">
                  
                  {/* Physical Address */}
                  <div className="flex items-start gap-4 pb-6 border-b border-gray-100">
                    <div className="p-3 bg-amber-500/5 border border-amber-500/10 rounded-xl text-amber-700 flex-shrink-0">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Physical Address</span>
                      <p className="font-extrabold text-gray-900 text-sm leading-snug">
                        St. Helena Summit Chambers
                      </p>
                      <p className="text-gray-600 text-xs font-semibold">
                        800 Meadowood Lane, St. Helena, CA 94574
                      </p>
                    </div>
                  </div>

                  {/* Concierge Secure Line */}
                  <div className="flex items-start gap-4 pb-6 border-b border-gray-100">
                    <div className="p-3 bg-amber-500/5 border border-amber-500/10 rounded-xl text-amber-700 flex-shrink-0">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Concierge Secure Line</span>
                      <p className="font-extrabold text-gray-900 text-sm leading-snug">
                        Direct Desk Registry
                      </p>
                      <p className="text-gray-600 text-xs font-semibold">
                        +1 (800) 555-OWNER (Private Routing)
                      </p>
                    </div>
                  </div>

                  {/* Direct High-Touch Email Address */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-amber-500/5 border border-amber-500/10 rounded-xl text-amber-700 flex-shrink-0">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Direct High-Touch Email</span>
                      <p className="font-extrabold text-gray-900 text-sm leading-snug">
                        Steering Committee Secure Box
                      </p>
                      <p className="text-gray-600 text-xs font-semibold">
                        concierge@ownerscircle.co
                      </p>
                    </div>
                  </div>

                </div>

                {/* Subtext info panel */}
                <div className="bg-amber-500/5 border border-amber-500/10 p-5 rounded-2xl space-y-2 text-xs">
                  <span className="font-mono text-[9px] font-bold text-amber-800 uppercase tracking-widest block">Security Protocol Warning:</span>
                  <p className="text-amber-900 font-medium leading-relaxed text-[11px]">
                    All digital communications are screened by military-grade filters. Physical arrivals without verified digital biometric clearance tokens issued in advance will be systematically turned back at the Meadowood outer gates.
                  </p>
                </div>

              </div>

            </ScrollAnimatedSection>
            </div>
          </div>
        )}

      </div>

      {/* 3. MULTI-PAGE SECURE COMPLIANT FOOTER */}
      <footer className="bg-gray-950 text-gray-400 px-6 lg:px-12 py-12 border-t border-gray-900 text-xs" id="wireframe-rendered-footer">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
            <span className="font-bold text-white tracking-wider">OWNER&apos;S CIRCLE IP ASSEMBLY</span>
            <span className="text-gray-800 hidden md:inline">|</span>
            <span>All Chatham House Protocols Rigorously Enforced</span>
          </div>
          <div className="text-gray-500 font-mono text-[10px] text-center md:text-right space-y-1">
            <div>© 2026 Owner&apos;s Circle Ltd. All rights reserved. Secured and non-indexed.</div>
            <div>Designed with high-fidelity, presentation-grade editorial Wireframes.</div>
          </div>
        </div>
      </footer>

      {/* Speaker Bio Overlay modal */}
      {activeSpeaker && (
        <div className="fixed inset-0 bg-gray-950/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in" id="speaker-overlay-modal">
          <div className="bg-white border border-gray-200 rounded-xl max-w-lg w-full overflow-hidden shadow-2xl relative" id="speaker-overlay-content">
            <div className="bg-gray-950 text-white p-4 flex items-center justify-between" id="modal-header">
              <span className="text-[9px] font-mono uppercase tracking-widest text-gray-400 font-bold">
                [EXECUTIVE OPERATOR VETTING REGISTER]
              </span>
              <button 
                onClick={() => setActiveSpeaker(null)}
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-8 space-y-6 overflow-y-auto max-h-[80vh]" id="modal-body">
              <div className="flex gap-4 items-start pb-5 border-b border-gray-100">
                <img 
                  src={activeSpeaker.image} 
                  alt={activeSpeaker.name} 
                  className="w-16 h-16 rounded-full border border-gray-200 object-cover bg-gray-50 shadow-sm"
                  referrerPolicy="no-referrer"
                />
                <div className="space-y-1.5 flex-1 min-w-0">
                  <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest block truncate">{activeSpeaker.company}</span>
                  <h3 className="text-lg font-black text-gray-900 leading-none">{activeSpeaker.name}</h3>
                  <p className="text-xs text-gray-700 font-bold">{activeSpeaker.role}</p>
                  
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="inline-block text-[9px] font-bold px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-100/60 rounded uppercase tracking-wider">
                      Verified {activeSpeaker.category}
                    </span>
                    {activeSpeaker.corporateStatus && (
                      <span className="inline-block text-[9px] font-bold px-2 py-0.5 bg-gray-100 text-gray-800 border border-gray-200 rounded uppercase tracking-wider">
                        {activeSpeaker.corporateStatus}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs text-gray-600" id="modal-bio-section">
                <span className="font-mono text-[9px] uppercase text-gray-400 font-bold tracking-wider block">Vetted Operational Milestone Bio:</span>
                <p className="leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-100 font-medium">
                  {activeSpeaker.bio}
                </p>
              </div>

              {activeSpeaker.pastAchievements && activeSpeaker.pastAchievements.length > 0 && (
                <div className="space-y-2 text-xs text-gray-600" id="modal-achievements-section">
                  <span className="font-mono text-[9px] uppercase text-amber-800 font-bold tracking-wider block">[VERIFIED MILESTONES & ACHIEVEMENTS]</span>
                  <ul className="space-y-2 bg-amber-500/5 p-4 rounded-lg border border-amber-500/10 font-medium">
                    {activeSpeaker.pastAchievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-800">
                        <CheckCircle2 className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Digital Coordinates (Linkedin and Website) */}
              {activeSpeaker.linkedin && (
                <div className="pt-2" id="modal-socials-section">
                  <a 
                    href={activeSpeaker.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 border border-gray-200 hover:border-gray-900 rounded-lg p-3 text-xs font-semibold text-gray-700 hover:text-gray-950 transition-colors bg-white w-full shadow-sm"
                    id="modal-linkedin-link"
                  >
                    <Linkedin className="h-4 w-4 text-amber-700" />
                    <span>LinkedIn Profile</span>
                  </a>
                </div>
              )}

              <div className="pt-4 flex border-t border-gray-100">
                <button
                  onClick={() => setActiveSpeaker(null)}
                  className="w-full bg-gray-950 hover:bg-gray-800 text-white text-xs font-bold py-3.5 rounded-md text-center transition-colors cursor-pointer uppercase tracking-wider"
                  id="modal-close-btn"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
