import React, { useState, useEffect } from 'react';
import { PageId, Speaker, Session, SponsorTier, AttendeePersona } from '../types';
import { SPEAKERS, SESSIONS, SPONSORS, ATTENDEES } from '../data/mockData';
import { 
  Clock, Calendar, MapPin, Users, CheckCircle2, ArrowRight, 
  ChevronRight, Info, Sparkles, Calculator, ShieldCheck, 
  Bookmark, BookmarkCheck, UserCheck, Plus, X, Briefcase, 
  DollarSign, Award, Mail, Phone, Map, ChevronLeft, Send
} from 'lucide-react';

interface InteractiveWireframeViewProps {
  activePageId: PageId;
  onNavigate: (pageId: PageId) => void;
}

export default function InteractiveWireframeView({ activePageId, onNavigate }: InteractiveWireframeViewProps) {
  // Global / Cross-page states for interactivity
  const [bookmarkedSessions, setBookmarkedSessions] = useState<string[]>([]);
  const [activeSpeaker, setActiveSpeaker] = useState<Speaker | null>(null);
  
  // Home countdown state
  const [countdown, setCountdown] = useState({ days: 121, hours: 14, minutes: 35, seconds: 40 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Home Quick Registration form state
  const [homeQuickForm, setHomeQuickForm] = useState({ email: '', org: '', portfolio: 'Under $10M' });
  const [homeQuickSubmitted, setHomeQuickSubmitted] = useState(false);

  // Agenda Filter states
  const [selectedTrack, setSelectedTrack] = useState<string>('All');
  const [agendaSearch, setAgendaSearch] = useState<string>('');

  // Speakers Filter states
  const [selectedSpeakerCat, setSelectedSpeakerCat] = useState<string>('All');
  const [speakerNomination, setSpeakerNomination] = useState({ name: '', company: '', milestone: '', email: '' });
  const [speakerNominated, setSpeakerNominated] = useState(false);

  // Attendees states
  const [selectedAttendeeId, setSelectedAttendeeId] = useState<string>('per-1');
  const [roiEbitda, setRoiEbitda] = useState<number>(8500000); // 8.5M default
  const [roiTimeline, setRoiTimeline] = useState<number>(3); // 3 years default
  const [roiCalculated, setRoiCalculated] = useState(false);
  const [roiEstimate, setRoiEstimate] = useState<number>(0);

  // Sponsorship Calculator states
  const [selectedSponsorTier, setSelectedSponsorTier] = useState<string>('spon-executive');
  const [extraVIPPasses, setExtraVIPPasses] = useState<number>(0);
  const [addOnDinnerHost, setAddOnDinnerHost] = useState<boolean>(false);
  const [addOnBadgeBranding, setAddOnBadgeBranding] = useState<boolean>(false);
  const [addOnSuiteUpgrade, setAddOnSuiteUpgrade] = useState<boolean>(false);

  // Registration Progressive Form States
  const [regStep, setRegStep] = useState<number>(1);
  const [regForm, setRegForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    firmName: '',
    industry: 'Technology / SaaS',
    ebitdaTier: '$5M - $20M',
    strategicFocus: 'Scale Operations',
    specialRequirements: ''
  });
  const [regSubmitted, setRegSubmitted] = useState<boolean>(false);

  // Handlers
  const toggleBookmark = (sessionId: string) => {
    setBookmarkedSessions(prev => 
      prev.includes(sessionId) ? prev.filter(id => id !== sessionId) : [...prev, sessionId]
    );
  };

  const handleCalculateROI = (e: React.FormEvent) => {
    e.preventDefault();
    // Simplified Enterprise Value increase calculation based on elite operational blueprints (roughly 1.5x - 2.2x multiple expansion)
    const baseMultiple = 7;
    const optimizedMultiple = baseMultiple + (roiTimeline * 0.8) + 1.5; // multiplier expansion
    const currentValuation = roiEbitda * baseMultiple;
    const projectedValuation = roiEbitda * optimizedMultiple;
    const valuationDelta = projectedValuation - currentValuation;
    
    setRoiEstimate(valuationDelta);
    setRoiCalculated(true);
  };

  const calculateSponsorshipTotal = () => {
    const tier = SPONSORS.find(s => s.id === selectedSponsorTier);
    if (!tier) return 0;
    
    let basePrice = parseInt(tier.price.replace('$', '').replace(',', ''), 10);
    let extras = extraVIPPasses * 1500; // $1,500 per extra executive VIP pass
    if (addOnDinnerHost) extras += 15000; // $15,000 for dinner host
    if (addOnBadgeBranding) extras += 7500; // $7,500 for badge branding
    if (addOnSuiteUpgrade) extras += 10000; // $10,000 for suite upgrade
    
    return basePrice + extras;
  };

  return (
    <div className="flex-1 bg-gray-50/40 p-4 lg:p-8 overflow-y-auto relative" style={{ backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)', backgroundSize: '16px 16px' }} id="wireframe-workspace-canvas">
      
      {/* Visual Canvas Guideline / Header */}
      <div className="max-w-5xl mx-auto mb-6 bg-yellow-50/80 border border-yellow-200 rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs text-yellow-800 shadow-sm" id="canvas-blueprint-infobar">
        <div className="flex items-start gap-2.5">
          <span className="flex-shrink-0 p-1 bg-yellow-100 rounded-md text-yellow-700">
            <Info className="h-4 w-4" />
          </span>
          <div>
            <span className="font-bold uppercase tracking-wide text-yellow-900 block mb-0.5">Interactive Blueprint Canvas Mode</span>
            This interactive wireframe visualizes the layout, visual spacing, content priority, and human microcopy of the <strong className="text-yellow-900">Owner&apos;s Circle IP microsite</strong>. Click components to simulate interactions.
          </div>
        </div>
        <div className="text-right text-yellow-700 font-mono whitespace-nowrap bg-white/60 border border-yellow-200/40 px-2 py-1 rounded">
          Active Wireframe: {activePageId.toUpperCase()}
        </div>
      </div>

      {/* Main Structural Frame */}
      <div className="max-w-5xl mx-auto bg-white border border-gray-200 shadow-xl rounded-xl overflow-hidden min-h-[700px] flex flex-col" id="wireframe-browser-window">
        
        {/* Mock Browser Title bar */}
        <div className="bg-gray-100 border-b border-gray-200 px-4 py-3 flex items-center justify-between" id="browser-chrome-bar">
          <div className="flex items-center gap-1.5" id="browser-dot-indicators">
            <span className="w-3 h-3 rounded-full bg-red-400 block"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-400 block"></span>
            <span className="w-3 h-3 rounded-full bg-green-400 block"></span>
            <span className="text-xs text-gray-400 ml-3 font-mono">https://ownerscircle.co/{activePageId}</span>
          </div>
          <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-gray-200 text-gray-500 rounded tracking-wide font-semibold">
            B2B High-Conversion Architecture
          </span>
        </div>

        {/* Mock Wireframe Header Navigation */}
        <nav className="bg-white border-b border-gray-100 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4" id="wireframe-microsite-navigation">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => onNavigate('home')} id="nav-brand-wrapper">
            <div className="w-8 h-8 rounded bg-gray-900 text-white flex items-center justify-center font-bold tracking-tight text-sm font-sans">
              OC
            </div>
            <div>
              <span className="font-extrabold text-sm text-gray-900 tracking-tight block">OWNER&apos;S CIRCLE</span>
              <span className="text-[9px] uppercase tracking-wider font-mono text-gray-400 block">Enterprise IP Assembly</span>
            </div>
          </div>

          {/* Nav links styled with structural wireframe guidelines */}
          <div className="flex items-center flex-wrap justify-center gap-1 text-xs font-medium" id="nav-links-wrapper">
            {(['home', 'about', 'agenda', 'speakers', 'attendees', 'sponsorship', 'contact'] as PageId[]).map((pid) => (
              <button
                key={pid}
                onClick={() => onNavigate(pid)}
                className={`px-2.5 py-1.5 rounded transition-all capitalize font-sans ${
                  activePageId === pid
                    ? 'bg-gray-900 text-white font-semibold'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100/50'
                }`}
                id={`nav-link-${pid}`}
              >
                {pid === 'attendees' ? 'Who Should Attend' : pid === 'sponsorship' ? 'Sponsorship' : pid === 'contact' ? 'Register' : pid}
              </button>
            ))}
          </div>

          <button
            onClick={() => onNavigate('contact')}
            className="text-xs bg-transparent border-2 border-dashed border-gray-900 text-gray-900 font-bold px-4 py-2 rounded hover:bg-gray-900 hover:text-white transition-all duration-200 cursor-pointer"
            id="nav-action-button"
          >
            [CTA: Apply VIP Pass]
          </button>
        </nav>

        {/* PAGE CONTENT CONTAINER */}
        <div className="flex-1 flex flex-col bg-white" id="wireframe-rendered-page">
          
          {/* 1. HOME PAGE */}
          {activePageId === 'home' && (
            <div className="flex-1 flex flex-col" id="page-home-rendered">
              {/* SECTION: HERO */}
              <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-12 lg:py-20 relative overflow-hidden" id="wireframe-section-hero">
                {/* Structural Section Tag */}
                <div className="absolute top-2 left-2 bg-gray-900/10 text-gray-500 text-[9px] font-mono uppercase px-1.5 py-0.5 rounded">
                  [SECTION: HERO | SPLIT GRID CONTAINER]
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                  <div className="lg:col-span-7 space-y-6">
                    <span className="inline-block text-[11px] font-mono uppercase text-gray-500 border border-gray-300 px-2.5 py-1 rounded-full bg-white tracking-wider" id="hero-eyebrow">
                      • Annual Private Assembly | For Owner-Operators &amp; Founders
                    </span>
                    <h1 className="text-3xl lg:text-5xl font-extrabold text-gray-900 font-display tracking-tight leading-none" id="hero-heading">
                      The Absolute Convergence of Enterprise Scale and Strategic Capital Exit.
                    </h1>
                    <p className="text-gray-600 text-sm lg:text-base leading-relaxed" id="hero-subhead">
                      An invitation-only, Chatham House Rule summit uniting 150 legacy business owners, high-growth founders, and elite family offices. Secure the operational levers and valuation blueprints driving modern scale and generational transition.
                    </p>
                    <div className="flex flex-wrap items-center gap-3 pt-2" id="hero-ctas">
                      <button 
                        onClick={() => onNavigate('contact')}
                        className="bg-gray-900 text-white font-bold text-xs px-6 py-3.5 rounded hover:bg-gray-800 transition-all flex items-center gap-2 cursor-pointer shadow-md"
                        id="hero-primary-cta"
                      >
                        Request VIP Invitation
                        <ArrowRight className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => onNavigate('agenda')}
                        className="border border-gray-300 hover:border-gray-900 text-gray-700 hover:text-gray-900 font-bold text-xs px-6 py-3.5 rounded transition-all cursor-pointer bg-white"
                        id="hero-secondary-cta"
                      >
                        View Private Agenda
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-5" id="hero-widget-column">
                    <div className="border border-dashed border-gray-300 rounded-lg p-6 bg-white shadow-sm space-y-4" id="hero-countdown-widget">
                      <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                        <span className="text-[10px] font-mono uppercase text-gray-400">[WIDGET: REGISTRATION STATUS]</span>
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="text-xs font-semibold text-gray-500">Summit Countdown Clock:</div>
                        <div className="grid grid-cols-4 gap-2 text-center font-mono" id="countdown-grid">
                          <div className="bg-gray-900 text-white p-2.5 rounded">
                            <span className="block font-bold text-lg leading-tight">{countdown.days}</span>
                            <span className="text-[9px] uppercase text-gray-400">days</span>
                          </div>
                          <div className="bg-gray-900 text-white p-2.5 rounded">
                            <span className="block font-bold text-lg leading-tight">{countdown.hours}</span>
                            <span className="text-[9px] uppercase text-gray-400">hours</span>
                          </div>
                          <div className="bg-gray-900 text-white p-2.5 rounded">
                            <span className="block font-bold text-lg leading-tight">{countdown.minutes}</span>
                            <span className="text-[9px] uppercase text-gray-400">mins</span>
                          </div>
                          <div className="bg-gray-900 text-white p-2.5 rounded">
                            <span className="block font-bold text-lg leading-tight">{countdown.seconds}</span>
                            <span className="text-[9px] uppercase text-gray-400">secs</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-gray-100 space-y-2 text-xs">
                        <div className="flex justify-between text-gray-500">
                          <span>Verified Registrations:</span>
                          <strong className="text-gray-900">114 / 150 Attendees</strong>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                          <div className="bg-gray-900 h-1.5 rounded-full" style={{ width: '76%' }}></div>
                        </div>
                        <div className="text-[10px] text-yellow-700 font-medium flex items-center gap-1.5 bg-yellow-50 p-2 rounded border border-yellow-100 mt-2">
                          <ShieldCheck className="h-3.5 w-3.5" />
                          <span>Strictly limited allocation for qualified asset owners.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200/60 flex flex-wrap gap-x-8 gap-y-3 text-xs text-gray-500" id="hero-metadata">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span><strong>Dates:</strong> November 12-14, 2026</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span><strong>Venue:</strong> The Ritz-Carlton Reserve, Napa Valley</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span><strong>Chatham House:</strong> Strict Peer Protocol enforced</span>
                  </div>
                </div>
              </div>

              {/* SECTION: STATS BAND */}
              <div className="bg-gray-900 text-white py-8 px-6 relative" id="wireframe-section-stats-band">
                <div className="absolute top-2 left-2 text-white/20 text-[9px] font-mono uppercase">
                  [SECTION: PROXIMITY &amp; AUTHORITY STATS]
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-gray-800">
                  <div className="p-2 space-y-1">
                    <div className="text-2xl lg:text-3xl font-black font-display text-gray-100">$14.2B+</div>
                    <div className="text-[10px] text-gray-400 uppercase tracking-wide">Owner Portfolio Represented</div>
                  </div>
                  <div className="p-2 space-y-1 pt-6 md:pt-2">
                    <div className="text-2xl lg:text-3xl font-black font-display text-gray-100">150 Only</div>
                    <div className="text-[10px] text-gray-400 uppercase tracking-wide">Strict Capacity Cap</div>
                  </div>
                  <div className="p-2 space-y-1 pt-6 md:pt-2">
                    <div className="text-2xl lg:text-3xl font-black font-display text-gray-100">94.2%</div>
                    <div className="text-[10px] text-gray-400 uppercase tracking-wide">C-Suite &amp; Founder Share</div>
                  </div>
                  <div className="p-2 space-y-1 pt-6 md:pt-2">
                    <div className="text-2xl lg:text-3xl font-black font-display text-gray-100">100%</div>
                    <div className="text-[10px] text-gray-400 uppercase tracking-wide">Chatham House Compliant</div>
                  </div>
                </div>
              </div>

              {/* SECTION: VALUE PROPS */}
              <div className="px-6 py-12 lg:py-16 space-y-8 relative" id="wireframe-section-value-props">
                <div className="absolute top-2 left-2 bg-gray-900/10 text-gray-500 text-[9px] font-mono uppercase px-1.5 py-0.5 rounded">
                  [SECTION: CORE CONGENIAL VALUE SHAPERS]
                </div>
                <div className="max-w-2xl mx-auto text-center space-y-2">
                  <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 font-display">
                    Architected for High-Impact Sovereign Business Decisions.
                  </h2>
                  <p className="text-gray-500 text-xs">
                    Every agenda session, round-table talk, and networking node is engineered to generate clear tactical breakthroughs.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="border border-gray-200 rounded-lg p-5 space-y-3 bg-white hover:shadow-md transition-shadow">
                    <span className="w-8 h-8 rounded bg-gray-100 text-gray-800 flex items-center justify-center font-bold text-sm">01</span>
                    <h3 className="font-bold text-gray-900 text-sm">Sovereign Growth Engineering</h3>
                    <p className="text-gray-500 text-xs leading-relaxed">
                      Learn the exact organizational systems, programmatic acquisitions, and scaling frameworks needed to professionalize founder-led ventures and bypass market ceilings.
                    </p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-5 space-y-3 bg-white hover:shadow-md transition-shadow">
                    <span className="w-8 h-8 rounded bg-gray-100 text-gray-800 flex items-center justify-center font-bold text-sm">02</span>
                    <h3 className="font-bold text-gray-900 text-sm">Institutional Exit &amp; Liquidity</h3>
                    <p className="text-gray-500 text-xs leading-relaxed">
                      Tactical guidelines to survive incoming private equity interest, align trust and tax counsels, and establish competitive bidding parameters to ensure max value.
                    </p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-5 space-y-3 bg-white hover:shadow-md transition-shadow">
                    <span className="w-8 h-8 rounded bg-gray-100 text-gray-800 flex items-center justify-center font-bold text-sm">03</span>
                    <h3 className="font-bold text-gray-900 text-sm">Family Office &amp; Direct Capital</h3>
                    <p className="text-gray-500 text-xs leading-relaxed">
                      Skip standard PE intermediation networks. Build co-investment alignments directly with aligned peer family offices who back second-generation strategic operators.
                    </p>
                  </div>
                </div>
              </div>

              {/* SECTION: SPEAKERS PREVIEW */}
              <div className="bg-gray-50 px-6 py-12 relative border-t border-b border-gray-100" id="wireframe-section-speakers-preview">
                <div className="absolute top-2 left-2 bg-gray-900/10 text-gray-500 text-[9px] font-mono uppercase px-1.5 py-0.5 rounded">
                  [SECTION: SPEAKER ANCHOR GRID]
                </div>
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
                  <div>
                    <h2 className="text-xl font-bold tracking-tight text-gray-900 font-display">Featured Operator Panelists</h2>
                    <p className="text-xs text-gray-500">Unveiling our high-density, real-world speaker authority.</p>
                  </div>
                  <button 
                    onClick={() => onNavigate('speakers')}
                    className="text-xs text-gray-900 font-semibold underline underline-offset-4 flex items-center gap-1 hover:text-gray-600 transition-colors cursor-pointer"
                    id="speakers-preview-link"
                  >
                    Explore Full Speakers Panel ({SPEAKERS.length} operators)
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {SPEAKERS.slice(0, 3).map((speaker) => (
                    <div 
                      key={speaker.id} 
                      onClick={() => setActiveSpeaker(speaker)}
                      className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-all cursor-pointer flex gap-4"
                      id={`home-speaker-${speaker.id}`}
                    >
                      <img 
                        src={speaker.image} 
                        alt={speaker.name} 
                        className="w-12 h-12 rounded-full border border-gray-100 object-cover bg-gray-100 flex-shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="space-y-1">
                        <span className="text-[10px] font-semibold text-gray-500 uppercase">{speaker.company}</span>
                        <h3 className="font-bold text-gray-900 text-sm leading-tight">{speaker.name}</h3>
                        <p className="text-[11px] text-gray-600 font-medium leading-tight">{speaker.role}</p>
                        <p className="text-[11px] text-gray-400 leading-tight pt-1 border-t border-gray-50 mt-1 line-clamp-2">
                          {speaker.bio}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION: QUICK APPLICATION FORM */}
              <div className="px-6 py-12 relative" id="wireframe-section-home-form">
                <div className="absolute top-2 left-2 bg-gray-900/10 text-gray-500 text-[9px] font-mono uppercase px-1.5 py-0.5 rounded">
                  [SECTION: REGISTRATION QUICK TRIGGER]
                </div>
                <div className="border border-dashed border-gray-300 rounded-lg p-6 bg-white max-w-2xl mx-auto space-y-4" id="home-quick-form-card">
                  <div className="text-center space-y-1.5">
                    <span className="inline-block p-1 bg-gray-100 text-gray-800 rounded text-[10px] font-mono uppercase tracking-wider font-semibold">
                      [FORM: Low-Friction Request Access]
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 font-sans">Apply for VIP Delegate Pass</h3>
                    <p className="text-xs text-gray-500">
                      We prioritize enterprise owners with validated portfolios or venture backing.
                    </p>
                  </div>

                  {homeQuickSubmitted ? (
                    <div className="bg-green-50 border border-green-200 p-4 rounded text-center space-y-2 text-xs text-green-800" id="home-quick-success">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" />
                      <span className="font-bold block text-green-900">Application Submitted for Committee Review</span>
                      We will contact you at <strong className="text-green-900">{homeQuickForm.email}</strong> within 48 business hours with verified credential status.
                    </div>
                  ) : (
                    <form 
                      onSubmit={(e) => { e.preventDefault(); setHomeQuickSubmitted(true); }}
                      className="space-y-3.5"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono uppercase text-gray-400 block">Direct Email</label>
                          <input 
                            required
                            type="email" 
                            placeholder="you@company.com" 
                            value={homeQuickForm.email}
                            onChange={(e) => setHomeQuickForm(prev => ({ ...prev, email: e.target.value }))}
                            className="w-full text-xs border border-gray-200 rounded p-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono uppercase text-gray-400 block">Organization Name</label>
                          <input 
                            required
                            type="text" 
                            placeholder="Enterprise Inc." 
                            value={homeQuickForm.org}
                            onChange={(e) => setHomeQuickForm(prev => ({ ...prev, org: e.target.value }))}
                            className="w-full text-xs border border-gray-200 rounded p-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono uppercase text-gray-400 block">Annual EBITDA / Portfolio Size Tier</label>
                        <select 
                          value={homeQuickForm.portfolio}
                          onChange={(e) => setHomeQuickForm(prev => ({ ...prev, portfolio: e.target.value }))}
                          className="w-full text-xs border border-gray-200 bg-white rounded p-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
                        >
                          <option>Under $5M EBITDA</option>
                          <option>$5M - $20M EBITDA</option>
                          <option>$20M - $50M EBITDA</option>
                          <option>$50M+ EBITDA / Institutional asset LP</option>
                        </select>
                      </div>

                      <button 
                        type="submit"
                        className="w-full bg-gray-900 text-white font-bold text-xs py-2.5 rounded hover:bg-gray-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        id="home-quick-submit-btn"
                      >
                        Submit Request for Review
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 2. ABOUT US PAGE */}
          {activePageId === 'about' && (
            <div className="flex-1 p-6 space-y-8 relative" id="page-about-rendered">
              <div className="absolute top-2 left-2 bg-gray-900/10 text-gray-500 text-[9px] font-mono uppercase px-1.5 py-0.5 rounded">
                [SECTION: INTENTIONAL NARRATIVE HERO]
              </div>

              <div className="max-w-3xl mx-auto space-y-4 pt-4">
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 font-display" id="about-heading">
                  The Manifesto of Sovereign Enterprise Owners.
                </h1>
                <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider font-mono">
                  Why standard industry conferences fail elite operators—and how we constructed an alternative ecosystem designed for high-density truth.
                </p>
                <div className="border-t border-gray-100 pt-4 text-xs text-gray-600 space-y-4 leading-relaxed font-sans" id="about-manifesto-text">
                  <p>
                    Standard industry events are designed for volume. They prioritize sponsor booths, vendor monetization pipelines, and generalized speeches. The result is a highly diluted environment where true business owners find limited peer resonance.
                  </p>
                  <p>
                    <strong>Owner&apos;s Circle</strong> was founded as a self-funded corrective. We do not accept sponsorship configurations that dilute the core value of the table. We maintain strict vetting protocols because high-density truth is only possible in rooms where every participant shares equal stakes and operating parameters.
                  </p>
                </div>
              </div>

              {/* SECTION: RULES */}
              <div className="border-t border-b border-gray-100 py-8 relative bg-gray-50/40" id="wireframe-section-about-rules">
                <div className="absolute top-2 left-2 bg-gray-900/10 text-gray-500 text-[9px] font-mono uppercase px-1.5 py-0.5 rounded">
                  [SECTION: THE CONSTITUTION / RULES]
                </div>
                <div className="max-w-3xl mx-auto space-y-4">
                  <h3 className="font-bold text-gray-900 text-xs uppercase tracking-wider font-mono text-center">Summit Rules &amp; Protocols</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white border border-gray-200 rounded p-4 space-y-2">
                      <div className="font-bold text-xs text-gray-900 font-sans flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-gray-900 rounded-full"></span>
                        Rule 1: Chatham House Rule
                      </div>
                      <p className="text-[11px] text-gray-500 leading-relaxed">
                        Participants are free to use the information received, but neither the identity nor the affiliation of the speakers, nor that of any other participant, may be revealed.
                      </p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded p-4 space-y-2">
                      <div className="font-bold text-xs text-gray-900 font-sans flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-gray-900 rounded-full"></span>
                        Rule 2: Zero Recording Policy
                      </div>
                      <p className="text-[11px] text-gray-500 leading-relaxed">
                        No audio, video, or transcriptions are permitted inside panel boardrooms. Public social check-ins or live updates are strictly barred.
                      </p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded p-4 space-y-2">
                      <div className="font-bold text-xs text-gray-900 font-sans flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-gray-900 rounded-full"></span>
                        Rule 3: Peer-Only Standard
                      </div>
                      <p className="text-[11px] text-gray-500 leading-relaxed">
                        Transactional brokers, recruiters, and traditional agencies are barred. Standard admission is limited to corporate stakeholders.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION: COMMITTEE */}
              <div className="max-w-3xl mx-auto space-y-6 relative" id="wireframe-section-about-committee">
                <div className="absolute top-2 left-2 bg-gray-900/10 text-gray-500 text-[9px] font-mono uppercase px-1.5 py-0.5 rounded">
                  [SECTION: STEERING COMMITTEE &amp; TRUSTEES]
                </div>
                <div className="text-center space-y-1">
                  <h3 className="font-bold text-gray-900 text-sm">Steering Committee &amp; Trustees</h3>
                  <p className="text-xs text-gray-500">Industry veterans guarding the interest alignment of the Circle.</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {SPEAKERS.map((trustee) => (
                    <div key={trustee.id} className="border border-gray-100 rounded p-3 text-center bg-white shadow-sm space-y-2">
                      <img 
                        src={trustee.image} 
                        alt={trustee.name} 
                        className="w-12 h-12 rounded-full mx-auto object-cover border border-gray-200"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h4 className="font-bold text-xs text-gray-900">{trustee.name}</h4>
                        <p className="text-[10px] text-gray-500">{trustee.company}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 3. AGENDA PAGE */}
          {activePageId === 'agenda' && (
            <div className="flex-1 flex flex-col md:flex-row border-t border-gray-100" id="page-agenda-rendered">
              {/* Main Agenda list */}
              <div className="flex-1 p-6 space-y-6 relative border-r border-gray-100" id="agenda-main-area">
                <div className="absolute top-2 left-2 bg-gray-900/10 text-gray-500 text-[9px] font-mono uppercase px-1.5 py-0.5 rounded">
                  [SECTION: CHRONOLOGICAL HEADER &amp; TIMELINE GRID]
                </div>

                <div className="space-y-4 pt-4">
                  <div>
                    <h1 className="text-2xl font-extrabold text-gray-900 font-display">Chronological Strategic Blueprint</h1>
                    <p className="text-xs text-gray-500">Filter sessions below by your core strategic objective. Chatham House rules apply across all tracks.</p>
                  </div>

                  {/* Interactive Filters inside wireframe */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gray-50 p-3 rounded border border-gray-200" id="agenda-interactive-filters">
                    <div className="flex flex-wrap gap-1">
                      {['All', 'Scaling & Operations', 'Capital & Exit', 'Elite Roundtables'].map((track) => (
                        <button
                          key={track}
                          onClick={() => setSelectedTrack(track)}
                          className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                            selectedTrack === track || (track === 'All' && selectedTrack === 'All')
                              ? 'bg-gray-900 text-white'
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
                      placeholder="Search session keywords..."
                      value={agendaSearch}
                      onChange={(e) => setAgendaSearch(e.target.value)}
                      className="text-xs bg-white border border-gray-200 rounded px-2.5 py-1 focus:outline-none focus:ring-1 focus:ring-gray-400"
                    />
                  </div>
                </div>

                {/* Timeline rendering */}
                <div className="space-y-4" id="agenda-rendered-timeline">
                  {SESSIONS.filter(session => {
                    const matchesTrack = selectedTrack === 'All' || session.track.includes(selectedTrack);
                    const matchesSearch = session.title.toLowerCase().includes(agendaSearch.toLowerCase()) || 
                                          session.description.toLowerCase().includes(agendaSearch.toLowerCase());
                    return matchesTrack && matchesSearch;
                  }).map((session) => (
                    <div 
                      key={session.id} 
                      className={`border rounded-lg p-4 bg-white transition-all ${
                        bookmarkedSessions.includes(session.id) ? 'border-gray-900 bg-gray-50/40' : 'border-gray-200'
                      }`}
                      id={`session-card-${session.id}`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div className="space-y-1.5 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[10px] font-mono font-bold bg-gray-900 text-white px-2 py-0.5 rounded">
                              {session.time}
                            </span>
                            <span className="text-[10px] font-semibold text-gray-500 uppercase">
                              {session.location}
                            </span>
                            <span className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                              {session.track}
                            </span>
                          </div>
                          <h3 className="font-bold text-gray-900 text-sm">{session.title}</h3>
                          <p className="text-xs text-gray-500 leading-relaxed">{session.description}</p>
                          
                          {/* Render Speakers Tags */}
                          {session.speakerIds.length > 0 && (
                            <div className="flex flex-wrap items-center gap-2 pt-1.5">
                              <span className="text-[10px] font-mono uppercase text-gray-400">Panelists:</span>
                              {session.speakerIds.map(sid => {
                                const spk = SPEAKERS.find(s => s.id === sid);
                                return spk ? (
                                  <span 
                                    key={sid} 
                                    onClick={() => setActiveSpeaker(spk)}
                                    className="text-[10px] bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold px-2 py-0.5 rounded border border-gray-100 cursor-pointer transition-all"
                                  >
                                    {spk.name} ({spk.company})
                                  </span>
                                ) : null;
                              })}
                            </div>
                          )}
                        </div>

                        <button
                          onClick={() => toggleBookmark(session.id)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold transition-colors cursor-pointer ${
                            bookmarkedSessions.includes(session.id)
                              ? 'bg-gray-900 text-white hover:bg-gray-800'
                              : 'border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                          }`}
                          id={`bookmark-btn-${session.id}`}
                        >
                          {bookmarkedSessions.includes(session.id) ? (
                            <>
                              <BookmarkCheck className="h-3.5 w-3.5 text-yellow-400" />
                              <span>Bookmarked</span>
                            </>
                          ) : (
                            <>
                              <Bookmark className="h-3.5 w-3.5" />
                              <span>Add Itinerary</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar Itinerary Builder widget */}
              <div className="w-full md:w-80 p-6 bg-gray-50/50 flex flex-col space-y-4 relative" id="agenda-sidebar-itinerary">
                <div className="absolute top-2 left-2 bg-gray-900/10 text-gray-500 text-[9px] font-mono uppercase px-1.5 py-0.5 rounded">
                  [SECTION: ITINERARY SUMMIT BUILDER]
                </div>

                <div className="space-y-2 pt-4">
                  <h3 className="font-bold text-gray-900 text-xs uppercase tracking-wider font-mono">My Strategic Itinerary</h3>
                  <p className="text-[11px] text-gray-500">Bookmarks generated here persist through your interactive session workspace.</p>
                </div>

                <div className="flex-1 border border-dashed border-gray-200 rounded-lg p-4 bg-white min-h-[250px] flex flex-col justify-between" id="itinerary-content-card">
                  {bookmarkedSessions.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-400 py-12" id="itinerary-empty">
                      <Bookmark className="h-8 w-8 mb-2 stroke-1" />
                      <span className="text-xs">No sessions added yet.</span>
                      <p className="text-[10px] text-gray-400 mt-1">Select &quot;Add Itinerary&quot; on sessions to build custom chronological files.</p>
                    </div>
                  ) : (
                    <div className="flex-1 space-y-2.5 overflow-y-auto max-h-[350px] pr-1" id="itinerary-list">
                      {bookmarkedSessions.map(id => {
                        const sess = SESSIONS.find(s => s.id === id);
                        if (!sess) return null;
                        return (
                          <div key={id} className="p-2 border border-gray-100 rounded text-xs hover:bg-gray-50 transition-all relative group" id={`itinerary-item-${id}`}>
                            <button 
                              onClick={() => toggleBookmark(id)}
                              className="absolute top-1 right-1 text-gray-400 hover:text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                            >
                              <X className="h-3 w-3" />
                            </button>
                            <span className="text-[9px] font-mono font-bold text-gray-500 block">{sess.time}</span>
                            <span className="font-semibold text-gray-800 line-clamp-1">{sess.title}</span>
                            <span className="text-[9px] text-gray-400 block">{sess.location}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {bookmarkedSessions.length > 0 && (
                    <div className="pt-3 border-t border-gray-100 mt-3" id="itinerary-actions">
                      <button 
                        onClick={() => alert(`Strategic agenda download initialized: ${bookmarkedSessions.length} session entries serialized into PDF export schema.`)}
                        className="w-full bg-gray-900 text-white font-bold text-xs py-2 rounded text-center hover:bg-gray-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        id="download-itinerary-btn"
                      >
                        Download Custom Calendar (.ics)
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 4. SPEAKERS PAGE */}
          {activePageId === 'speakers' && (
            <div className="flex-1 p-6 space-y-8 relative" id="page-speakers-rendered">
              <div className="absolute top-2 left-2 bg-gray-900/10 text-gray-500 text-[9px] font-mono uppercase px-1.5 py-0.5 rounded">
                [SECTION: THE ANCHOR INTRO &amp; GRID]
              </div>

              {/* Speaker Header & Search filters */}
              <div className="space-y-4 pt-4">
                <div>
                  <h1 className="text-2xl font-extrabold text-gray-900 font-display">Ecosystem Architects &amp; Proven Operators</h1>
                  <p className="text-xs text-gray-500">We do not host professional speakers. Every panelist is actively directing substantial capital or managing scaled corporate portfolios.</p>
                </div>

                <div className="flex flex-wrap gap-1.5 border-b border-gray-200 pb-2">
                  {['All', 'Founder', 'Investor', 'Industry Leader'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedSpeakerCat(cat)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-t-md transition-all ${
                        selectedSpeakerCat === cat
                          ? 'bg-gray-900 text-white border-b-2 border-gray-900'
                          : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                      id={`speaker-filter-${cat}`}
                    >
                      {cat}s
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="speakers-rendered-grid">
                {SPEAKERS.filter(spk => selectedSpeakerCat === 'All' || spk.category === selectedSpeakerCat).map((speaker) => (
                  <div 
                    key={speaker.id} 
                    className="border border-gray-200 rounded-lg p-5 bg-white flex gap-5 hover:shadow-md transition-shadow relative"
                    id={`speaker-page-card-${speaker.id}`}
                  >
                    <img 
                      src={speaker.image} 
                      alt={speaker.name} 
                      className="w-16 h-16 rounded-full border border-gray-200 object-cover bg-gray-100 flex-shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold uppercase text-gray-500">{speaker.company}</span>
                        <span className="text-[10px] px-2 py-0.5 bg-gray-100 rounded text-gray-600 font-semibold uppercase font-sans">
                          {speaker.category}
                        </span>
                      </div>
                      <h3 className="font-extrabold text-gray-900 text-sm">{speaker.name}</h3>
                      <p className="text-xs text-gray-600 font-medium">{speaker.role}</p>
                      <p className="text-xs text-gray-500 leading-relaxed pt-2 border-t border-gray-50 mt-2">
                        {speaker.bio}
                      </p>
                      
                      <div className="pt-3 flex gap-2">
                        <button
                          onClick={() => setActiveSpeaker(speaker)}
                          className="bg-gray-900 text-white text-[10px] font-bold px-3 py-1.5 rounded hover:bg-gray-800 transition-all cursor-pointer"
                          id={`speaker-bio-btn-${speaker.id}`}
                        >
                          Inspect Blueprint Bio
                        </button>
                        <button
                          onClick={() => alert(`Private appointment scheduling triggered with ${speaker.name} of ${speaker.company}. Verified VIP Pass credentials verified at check-in.`)}
                          className="border border-gray-200 hover:border-gray-900 text-gray-600 hover:text-gray-900 text-[10px] font-bold px-3 py-1.5 rounded transition-all cursor-pointer bg-white"
                          id={`speaker-meet-btn-${speaker.id}`}
                        >
                          Request Private Meeting
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* SECTION: NOMINATION */}
              <div className="border border-dashed border-gray-300 rounded-lg p-6 bg-white max-w-2xl mx-auto space-y-4" id="speakers-nomination-container">
                <div className="absolute top-2 left-2 bg-gray-900/10 text-gray-500 text-[9px] font-mono uppercase px-1.5 py-0.5 rounded">
                  [SECTION: NOMINATION PANEL]
                </div>
                <div className="text-center space-y-1">
                  <span className="inline-block p-1 bg-gray-100 text-gray-800 rounded text-[10px] font-mono uppercase tracking-wider font-semibold">
                    [FORM: Strategic Nominee Vetting]
                  </span>
                  <h3 className="text-base font-bold text-gray-900">Nominate a Sovereign Peer</h3>
                  <p className="text-xs text-gray-500">We continuously source equivalent high-profile operators who possess validated portfolio exits.</p>
                </div>

                {speakerNominated ? (
                  <div className="bg-green-50 border border-green-200 p-4 rounded text-center text-xs text-green-800 space-y-1.5" id="nomination-success">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" />
                    <span className="font-bold block text-green-900">Nomination Successfully Serialized</span>
                    Our selection committee will inspect <strong className="text-green-900">{speakerNomination.name}</strong>&apos;s corporate footprint and contact you at <strong className="text-green-900">{speakerNomination.email}</strong>.
                  </div>
                ) : (
                  <form 
                    onSubmit={(e) => { e.preventDefault(); setSpeakerNominated(true); }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs"
                    id="nomination-form"
                  >
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase text-gray-400 block">Nominee Full Name</label>
                      <input 
                        required
                        type="text" 
                        placeholder="John Doe"
                        value={speakerNomination.name}
                        onChange={(e) => setSpeakerNomination(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full border border-gray-200 rounded p-2 focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase text-gray-400 block">Venture/Affiliation</label>
                      <input 
                        required
                        type="text" 
                        placeholder="Acme Enterprise"
                        value={speakerNomination.company}
                        onChange={(e) => setSpeakerNomination(prev => ({ ...prev, company: e.target.value }))}
                        className="w-full border border-gray-200 rounded p-2 focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase text-gray-400 block">Exit Milestone / Portfolio Value</label>
                      <input 
                        required
                        type="text" 
                        placeholder="e.g. Exited $400M company / $2B portfolio"
                        value={speakerNomination.milestone}
                        onChange={(e) => setSpeakerNomination(prev => ({ ...prev, milestone: e.target.value }))}
                        className="w-full border border-gray-200 rounded p-2 focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase text-gray-400 block">Your Contact Email</label>
                      <input 
                        required
                        type="email" 
                        placeholder="you@firm.com"
                        value={speakerNomination.email}
                        onChange={(e) => setSpeakerNomination(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full border border-gray-200 rounded p-2 focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white"
                      />
                    </div>
                    <button 
                      type="submit" 
                      className="sm:col-span-2 bg-gray-900 text-white font-bold py-2.5 rounded hover:bg-gray-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      id="nomination-submit-btn"
                    >
                      Submit Strategic Nomination
                      <Send className="h-3.5 w-3.5" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}

          {/* 5. WHO SHOULD ATTEND PAGE */}
          {activePageId === 'attendees' && (
            <div className="flex-1 p-6 space-y-8 relative" id="page-attendees-rendered">
              <div className="absolute top-2 left-2 bg-gray-900/10 text-gray-500 text-[9px] font-mono uppercase px-1.5 py-0.5 rounded">
                [SECTION: SEGMENT FOCUS HERO &amp; DETAILED TAXONOMY]
              </div>

              <div className="space-y-2 pt-4">
                <h1 className="text-2xl font-extrabold text-gray-900 font-display">Segmented Audience Alignment</h1>
                <p className="text-xs text-gray-500">We curate equal weight tables. Examine the precise challenges and ROI triggers aligned for each core attendee segment.</p>
              </div>

              {/* Segment Toggle columns inside the visual wireframe */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="attendees-segmented-tabs">
                {ATTENDEES.map((att) => (
                  <div 
                    key={att.id}
                    onClick={() => setSelectedAttendeeId(att.id)}
                    className={`border rounded-lg p-5 cursor-pointer transition-all ${
                      selectedAttendeeId === att.id 
                        ? 'border-gray-900 bg-gray-50/60 ring-1 ring-gray-900 shadow-sm' 
                        : 'border-gray-200 bg-white hover:bg-gray-50/50'
                    }`}
                    id={`attendee-segment-card-${att.id}`}
                  >
                    <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-3">
                      <span className="text-[10px] font-mono uppercase text-gray-400">[SEGMENT]</span>
                      {selectedAttendeeId === att.id && <UserCheck className="h-4 w-4 text-gray-900" />}
                    </div>
                    <h3 className="font-extrabold text-gray-900 text-sm mb-2">{att.segment}</h3>
                    <p className="text-[11px] text-gray-500 leading-relaxed mb-3">
                      {att.valueProposition}
                    </p>
                    <div className="pt-2 border-t border-gray-100">
                      <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Key Focus Area:</span>
                      <p className="text-[11px] font-bold text-gray-900 mt-0.5">{att.engagementFocus}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Segment focus detail inspect block */}
              {selectedAttendeeId && (
                <div className="border border-gray-200 rounded-lg p-5 bg-gray-50/50 space-y-4" id="segment-inspect-block">
                  {(() => {
                    const activeAtt = ATTENDEES.find(a => a.id === selectedAttendeeId);
                    if (!activeAtt) return null;
                    return (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs" id={`inspect-${activeAtt.id}`}>
                        <div className="space-y-2">
                          <span className="text-[10px] font-mono font-bold text-red-600 bg-red-50 border border-red-100 px-2 py-0.5 rounded uppercase">
                            Core Strategic Friction Points (Challenges)
                          </span>
                          <ul className="list-disc list-inside space-y-1.5 text-gray-700 pl-1">
                            {activeAtt.challenges.map((challenge, cIdx) => (
                              <li key={cIdx} className="leading-relaxed">{challenge}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-2">
                          <span className="text-[10px] font-mono font-bold text-green-700 bg-green-50 border border-green-100 px-2 py-0.5 rounded uppercase">
                            Primary ROI Engagement Triggers
                          </span>
                          <ul className="list-disc list-inside space-y-1.5 text-gray-700 pl-1">
                            {activeAtt.roiTriggers.map((trigger, tIdx) => (
                              <li key={tIdx} className="leading-relaxed">{trigger}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* SECTION: ROI CALCULATOR */}
              <div className="border border-dashed border-gray-300 rounded-lg p-6 bg-white max-w-2xl mx-auto space-y-5 relative" id="attendees-roi-calculator-container">
                <div className="absolute top-2 left-2 bg-gray-900/10 text-gray-500 text-[9px] font-mono uppercase px-1.5 py-0.5 rounded">
                  [SECTION: ROI ASSESSMENT CALCULATOR]
                </div>
                <div className="text-center space-y-1">
                  <span className="inline-block p-1 bg-gray-100 text-gray-800 rounded text-[10px] font-mono uppercase tracking-wider font-semibold">
                    [WIDGET: Interactive EBITDA Multiple expansion estimator]
                  </span>
                  <h3 className="text-base font-bold text-gray-900">Ecosystem Strategic Value Calculator</h3>
                  <p className="text-xs text-gray-500">Calculate the potential impact of corporate governance and programmatic exit competitive bidding on your company valuation.</p>
                </div>

                <form onSubmit={handleCalculateROI} className="space-y-4 text-xs" id="roi-form">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase text-gray-400 block">Current Firm Annual EBITDA</label>
                      <div className="relative">
                        <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                        <input 
                          type="number" 
                          value={roiEbitda}
                          onChange={(e) => setRoiEbitda(Number(e.target.value))}
                          className="w-full border border-gray-200 rounded pl-8 pr-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white"
                        />
                      </div>
                      <p className="text-[10px] text-gray-400">Enter approximate net profit/EBITDA of your operating firm.</p>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase text-gray-400 block">Intended Strategic Exit Horizon (Years)</label>
                      <select 
                        value={roiTimeline}
                        onChange={(e) => setRoiTimeline(Number(e.target.value))}
                        className="w-full border border-gray-200 rounded p-2 focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white"
                      >
                        <option value={1}>1 Year (Immediate positioning)</option>
                        <option value={3}>3 Years (Programmatic growth &amp; recap)</option>
                        <option value={5}>5+ Years (Generational governance transition)</option>
                      </select>
                      <p className="text-[10px] text-gray-400">Your target timeline to execute private capitalization shifts.</p>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-gray-900 text-white font-bold py-2.5 rounded hover:bg-gray-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    id="calc-roi-btn"
                  >
                    Compute Valuation Lever Opportunities
                    <Calculator className="h-4 w-4" />
                  </button>
                </form>

                {roiCalculated && (
                  <div className="bg-gray-50 border border-gray-200 rounded p-4 space-y-2" id="roi-calc-results">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900 uppercase">
                      <Sparkles className="h-4 w-4 text-yellow-600" />
                      Strategic Leverage Assessment Output:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2 border-t border-gray-100">
                      <div>
                        <span className="text-gray-500">Estimated Multiple Expansion potential:</span>
                        <p className="text-lg font-black text-gray-900">
                          +{((roiTimeline * 0.8) + 1.5).toFixed(1)}x EBITDA Multiple
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-500">Unlocking Corporate Valuation increase:</span>
                        <p className="text-lg font-black text-green-700">
                          +${(roiEstimate / 1000000).toFixed(2)}M in Exit Equity Value
                        </p>
                      </div>
                    </div>
                    <p className="text-[10px] text-gray-400 leading-relaxed pt-2 mt-2 border-t border-dashed border-gray-200">
                      *Estimates are calculated using standard mid-market SaaS/Enterprise multiples (assuming programmatic scale, optimized capital structure, and multi-buyer competitive tension as mapped out in Day 2 blueprints).
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 6. SPONSORSHIP PAGE */}
          {activePageId === 'sponsorship' && (
            <div className="flex-1 p-6 space-y-8 relative" id="page-sponsorship-rendered">
              <div className="absolute top-2 left-2 bg-gray-900/10 text-gray-500 text-[9px] font-mono uppercase px-1.5 py-0.5 rounded">
                [SECTION: SPONSOR VALUE INTRO &amp; BENEFIT MATRIX]
              </div>

              <div className="max-w-2xl mx-auto text-center space-y-2 pt-4">
                <h1 className="text-2xl font-extrabold text-gray-900 font-display">Position Your Firm at the Decisive Table</h1>
                <p className="text-xs text-gray-500">Gain structured access to 150 legacy business owners. No generic booths, no transactional noise—only high-context relationship design.</p>
              </div>

              {/* Tier Comparison Cards inside the wireframe */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4" id="sponsorship-comparison-matrix">
                {SPONSORS.map((spon) => (
                  <div 
                    key={spon.id} 
                    onClick={() => setSelectedSponsorTier(spon.id)}
                    className={`border rounded-lg p-4 cursor-pointer transition-all flex flex-col justify-between ${
                      selectedSponsorTier === spon.id
                        ? 'border-gray-900 bg-gray-50/60 ring-1 ring-gray-900 shadow-sm'
                        : 'border-gray-200 bg-white hover:bg-gray-50/30'
                    }`}
                    id={`sponsor-tier-card-${spon.id}`}
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-mono font-bold text-gray-400">[{spon.slotsAvailable} slot{spon.slotsAvailable > 1 ? 's' : ''}]</span>
                        {selectedSponsorTier === spon.id && <CheckCircle2 className="h-3.5 w-3.5 text-gray-900" />}
                      </div>
                      <h3 className="font-extrabold text-gray-900 text-xs">{spon.name}</h3>
                      <p className="text-lg font-black text-gray-900 font-display leading-tight">{spon.price}</p>
                    </div>

                    <div className="pt-3 border-t border-gray-100 mt-4 text-[10px] text-gray-500 space-y-1 font-sans">
                      <div className="flex justify-between">
                        <span>VIP Passes:</span>
                        <strong className="text-gray-900">{spon.vipPasses}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Logo Placement:</span>
                        <strong className="text-gray-900">{spon.logoSize}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Speaking Slot:</span>
                        <strong className="text-gray-900">{spon.speakingSlot ? 'Guaranteed' : 'None'}</strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Selected Tier Benefits list */}
              {selectedSponsorTier && (
                <div className="border border-gray-200 rounded-lg p-5 bg-gray-50/50 space-y-3" id="sponsorship-tier-details">
                  {(() => {
                    const tier = SPONSORS.find(s => s.id === selectedSponsorTier);
                    if (!tier) return null;
                    return (
                      <div className="space-y-2" id={`benefits-${tier.id}`}>
                        <span className="text-[10px] font-mono font-bold text-gray-900 uppercase">
                          Included benefits &amp; activations for {tier.name}:
                        </span>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-700 list-inside list-disc pl-1">
                          {tier.benefits.map((benefit, bIdx) => (
                            <li key={bIdx} className="leading-relaxed">{benefit}</li>
                          ))}
                        </ul>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* SECTION: CALCULATOR / ESTIMATOR */}
              <div className="border border-dashed border-gray-300 rounded-lg p-6 bg-white max-w-2xl mx-auto space-y-4 relative" id="sponsorship-estimator-container">
                <div className="absolute top-2 left-2 bg-gray-900/10 text-gray-500 text-[9px] font-mono uppercase px-1.5 py-0.5 rounded">
                  [SECTION: SPONSOR PACKAGE ESTIMATOR]
                </div>
                <div className="text-center space-y-1">
                  <span className="inline-block p-1 bg-gray-100 text-gray-800 rounded text-[10px] font-mono uppercase tracking-wider font-semibold">
                    [WIDGET: Interactive Partnership Package Planner]
                  </span>
                  <h3 className="text-base font-bold text-gray-900">Custom Partnership Quote Builder</h3>
                  <p className="text-xs text-gray-500">Select extra corporate activations to estimate a tailored institutional partnership proposal.</p>
                </div>

                <div className="space-y-4 text-xs" id="estimator-interactive-elements">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2 bg-gray-50 p-3 rounded border border-gray-100">
                      <span className="text-[10px] font-mono uppercase text-gray-400 font-bold block">Available Add-ons</span>
                      
                      <label className="flex items-center gap-2 cursor-pointer py-1 text-xs">
                        <input 
                          type="checkbox" 
                          checked={addOnDinnerHost}
                          onChange={(e) => setAddOnDinnerHost(e.target.checked)}
                          className="rounded text-gray-950 focus:ring-gray-950"
                        />
                        <div>
                          <span className="font-semibold block">VIP Dinner Co-Host (+$15,000)</span>
                          <span className="text-[10px] text-gray-500 block">Sole branding at the Day 1 Napa estate dinner.</span>
                        </div>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer py-1 text-xs">
                        <input 
                          type="checkbox" 
                          checked={addOnBadgeBranding}
                          onChange={(e) => setAddOnBadgeBranding(e.target.checked)}
                          className="rounded text-gray-950 focus:ring-gray-950"
                        />
                        <div>
                          <span className="font-semibold block">Credential Badge Sponsor (+$7,500)</span>
                          <span className="text-[10px] text-gray-500 block">Corporate logo on all verified asset attendee badges.</span>
                        </div>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer py-1 text-xs">
                        <input 
                          type="checkbox" 
                          checked={addOnSuiteUpgrade}
                          onChange={(e) => setAddOnSuiteUpgrade(e.target.checked)}
                          className="rounded text-gray-950 focus:ring-gray-950"
                        />
                        <div>
                          <span className="font-semibold block">Private Meeting Suite upgrade (+$10,000)</span>
                          <span className="text-[10px] text-gray-500 block">Dedicated 8-person Napa boardroom room suite.</span>
                        </div>
                      </label>
                    </div>

                    <div className="space-y-3 bg-gray-50 p-3 rounded border border-gray-100 flex flex-col justify-between">
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-mono uppercase text-gray-400 font-bold block">Extra Executive VIP Passes</span>
                        <div className="flex items-center gap-2">
                          <button 
                            type="button" 
                            disabled={extraVIPPasses === 0}
                            onClick={() => setExtraVIPPasses(prev => Math.max(0, prev - 1))}
                            className="bg-white border border-gray-200 text-gray-900 rounded w-8 h-8 flex items-center justify-center font-bold text-lg disabled:opacity-50 cursor-pointer"
                          >
                            -
                          </button>
                          <span className="text-sm font-bold w-12 text-center">{extraVIPPasses} passes</span>
                          <button 
                            type="button" 
                            onClick={() => setExtraVIPPasses(prev => prev + 1)}
                            className="bg-white border border-gray-200 text-gray-900 rounded w-8 h-8 flex items-center justify-center font-bold text-lg cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-[10px] text-gray-400 block">$1,500 per additional credentials access.</span>
                      </div>

                      <div className="pt-2 border-t border-gray-200 mt-2">
                        <span className="text-gray-500">Sponsorship Estimate Quote:</span>
                        <p className="text-2xl font-black text-gray-900 font-display">
                          ${calculateSponsorshipTotal().toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => alert(`Sponsorship Package Proposal serialized! Selected tier: ${selectedSponsorTier}. Total Estimate: $${calculateSponsorshipTotal().toLocaleString()}. VIP concierge team will follow up with formal legal contract documents.`)}
                    className="w-full bg-gray-900 text-white font-bold py-2.5 rounded hover:bg-gray-800 transition-colors text-center flex items-center justify-center gap-1.5 cursor-pointer"
                    id="submit-sponsorship-proposal-btn"
                  >
                    Secure Selected Partnership Tier Options
                    <Award className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 7. CONTACT US / REGISTRATION FORM */}
          {activePageId === 'contact' && (
            <div className="flex-1 flex flex-col md:flex-row border-t border-gray-100" id="page-contact-rendered">
              {/* Progressive registration form */}
              <div className="flex-1 p-6 space-y-6 relative border-r border-gray-100" id="contact-main-area">
                <div className="absolute top-2 left-2 bg-gray-900/10 text-gray-500 text-[9px] font-mono uppercase px-1.5 py-0.5 rounded">
                  [SECTION: CONVERSION FORM CONTAINER]
                </div>

                <div className="space-y-4 pt-4">
                  <div>
                    <h1 className="text-xl font-extrabold text-gray-900 font-sans">Secure Executive Delegate Credentials</h1>
                    <p className="text-xs text-gray-500">Please complete the progressive validation form. Credentials are reviewed and serialized manually by our committee board.</p>
                  </div>

                  {/* Step Indicators */}
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-gray-400 border-b border-gray-100 pb-2" id="reg-step-indicators">
                    <span className={regStep >= 1 ? 'text-gray-900' : ''}>1. CONTACT</span>
                    <span className="text-gray-200 font-light">&gt;&gt;</span>
                    <span className={regStep >= 2 ? 'text-gray-900' : ''}>2. FIRM PROFILE</span>
                    <span className="text-gray-200 font-light">&gt;&gt;</span>
                    <span className={regStep >= 3 ? 'text-gray-900' : ''}>3. FOCUS</span>
                  </div>
                </div>

                {regSubmitted ? (
                  <div className="bg-green-50 border border-green-200 p-6 rounded-lg text-center space-y-3 text-xs text-green-800" id="reg-submitted-success">
                    <CheckCircle2 className="h-8 w-8 text-green-600 mx-auto" />
                    <h3 className="font-extrabold text-lg text-green-900">Delegate Request Serialized</h3>
                    <p className="max-w-md mx-auto text-green-800 leading-relaxed">
                      Thank you, <strong className="text-green-900">{regForm.fullName}</strong>. Your request for Owner&apos;s Circle access for <strong className="text-green-900">{regForm.firmName}</strong> has been secured with pending ID <strong>#OC-{Math.floor(Math.random() * 9000) + 1000}</strong>.
                    </p>
                    <div className="bg-white/80 border border-green-200/50 p-4 rounded text-left space-y-2 max-w-md mx-auto text-gray-700 mt-4">
                      <span className="font-bold text-gray-900 block border-b pb-1">Secured Application Meta:</span>
                      <div><strong>Direct Email:</strong> {regForm.email}</div>
                      <div><strong>EBITDA Tier:</strong> {regForm.ebitdaTier}</div>
                      <div><strong>Primary Strategic Need:</strong> {regForm.strategicFocus}</div>
                    </div>
                    <p className="text-[10px] text-gray-400 pt-3">
                      Steering Committee approval notifications are delivered within 48 business hours.
                    </p>
                  </div>
                ) : (
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (regStep < 3) {
                        setRegStep(prev => prev + 1);
                      } else {
                        setRegSubmitted(true);
                      }
                    }}
                    className="space-y-4 text-xs"
                    id="registration-form"
                  >
                    {/* STEP 1: CONTACT */}
                    {regStep === 1 && (
                      <div className="space-y-3" id="step-1-inputs">
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono uppercase text-gray-400 block">Full Legal Name</label>
                          <input 
                            required
                            type="text" 
                            placeholder="Elena Rostova"
                            value={regForm.fullName}
                            onChange={(e) => setRegForm(prev => ({ ...prev, fullName: e.target.value }))}
                            className="w-full border border-gray-200 rounded p-2 focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono uppercase text-gray-400 block">Direct Corporate Email</label>
                          <input 
                            required
                            type="email" 
                            placeholder="elena@horizoncloud.com"
                            value={regForm.email}
                            onChange={(e) => setRegForm(prev => ({ ...prev, email: e.target.value }))}
                            className="w-full border border-gray-200 rounded p-2 focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono uppercase text-gray-400 block">Direct Private Phone</label>
                          <input 
                            required
                            type="tel" 
                            placeholder="+1 (555) 019-2834"
                            value={regForm.phone}
                            onChange={(e) => setRegForm(prev => ({ ...prev, phone: e.target.value }))}
                            className="w-full border border-gray-200 rounded p-2 focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white"
                          />
                        </div>
                      </div>
                    )}

                    {/* STEP 2: FIRM PROFILE */}
                    {regStep === 2 && (
                      <div className="space-y-3" id="step-2-inputs">
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono uppercase text-gray-400 block">Operating Firm Name</label>
                          <input 
                            required
                            type="text" 
                            placeholder="Horizon Cloud Services"
                            value={regForm.firmName}
                            onChange={(e) => setRegForm(prev => ({ ...prev, firmName: e.target.value }))}
                            className="w-full border border-gray-200 rounded p-2 focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono uppercase text-gray-400 block">Industry Sector</label>
                          <select 
                            value={regForm.industry}
                            onChange={(e) => setRegForm(prev => ({ ...prev, industry: e.target.value }))}
                            className="w-full border border-gray-200 rounded p-2 focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white"
                          >
                            <option>Technology / SaaS</option>
                            <option>Logistics &amp; Supply Chain</option>
                            <option>Manufacturing &amp; Heavy Industry</option>
                            <option>Financial Services / Family Office</option>
                            <option>Healthcare &amp; Life Sciences</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono uppercase text-gray-400 block">Approximate Annual EBITDA Tier</label>
                          <select 
                            value={regForm.ebitdaTier}
                            onChange={(e) => setRegForm(prev => ({ ...prev, ebitdaTier: e.target.value }))}
                            className="w-full border border-gray-200 rounded p-2 focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white"
                          >
                            <option>Under $5M EBITDA</option>
                            <option>$5M - $20M EBITDA</option>
                            <option>$20M - $50M EBITDA</option>
                            <option>$50M+ EBITDA</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {/* STEP 3: STRATEGIC FOCUS */}
                    {regStep === 3 && (
                      <div className="space-y-3" id="step-3-inputs">
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono uppercase text-gray-400 block">Primary Strategic Focus</label>
                          <select 
                            value={regForm.strategicFocus}
                            onChange={(e) => setRegForm(prev => ({ ...prev, strategicFocus: e.target.value }))}
                            className="w-full border border-gray-200 rounded p-2 focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white"
                          >
                            <option>Scale Operations &amp; Professionalize</option>
                            <option>Execute Generational Trust / Exit</option>
                            <option>Sorce Family Office Capital Direct</option>
                            <option>Direct Equity Co-Investments</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono uppercase text-gray-400 block">Special Requirements / Concierge Notes</label>
                          <textarea 
                            placeholder="e.g. Dietary configurations, special trust counsel meeting requested..."
                            value={regForm.specialRequirements}
                            onChange={(e) => setRegForm(prev => ({ ...prev, specialRequirements: e.target.value }))}
                            className="w-full border border-gray-200 rounded p-2 focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white h-20 resize-none"
                          />
                        </div>
                      </div>
                    )}

                    {/* Form Controls */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100" id="reg-form-controls">
                      {regStep > 1 ? (
                        <button 
                          type="button"
                          onClick={() => setRegStep(prev => prev - 1)}
                          className="flex items-center gap-1 text-gray-500 hover:text-gray-900 font-bold cursor-pointer"
                          id="reg-back-btn"
                        >
                          <ChevronLeft className="h-4 w-4" />
                          <span>Back Step</span>
                        </button>
                      ) : (
                        <span className="text-gray-300">No Back step</span>
                      )}

                      <button 
                        type="submit"
                        className="bg-gray-900 text-white font-bold py-2 px-5 rounded hover:bg-gray-800 transition-colors flex items-center gap-1 cursor-pointer"
                        id="reg-next-btn"
                      >
                        <span>{regStep === 3 ? 'Submit Secured Registration' : 'Next Step'}</span>
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Concierge Side Info card */}
              <div className="w-full md:w-80 p-6 bg-gray-50/50 space-y-4 relative" id="contact-sidebar-info">
                <div className="absolute top-2 left-2 bg-gray-900/10 text-gray-500 text-[9px] font-mono uppercase px-1.5 py-0.5 rounded">
                  [SECTION: HIGH-TOUCH CONCIERGE INFORMATION]
                </div>

                <div className="space-y-2 pt-4">
                  <h3 className="font-bold text-gray-900 text-xs uppercase tracking-wider font-mono">High-Touch Concierge</h3>
                  <p className="text-[11px] text-gray-500">Every attendee is supported by our dedicated Napa Valley planning staff.</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm space-y-4" id="concierge-details-card">
                  <div className="space-y-2.5 text-xs">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Phone className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      <span><strong>Hotline:</strong> +1 (800) 555-OWNER</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Mail className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      <span><strong>Email:</strong> concierge@ownerscircle.co</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Map className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      <span><strong>Office:</strong> Napa Valley, CA</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-100 mt-2 space-y-2" id="venue-reference-card">
                    <span className="text-[10px] font-mono uppercase text-gray-400 font-bold block">Venue Spot</span>
                    <div className="bg-gray-50 p-2 rounded text-[11px] text-gray-600 space-y-1 border border-gray-200/60" id="venue-spot-details">
                      <strong className="text-gray-900 block">The Ritz-Carlton Reserve</strong>
                      <p>Napa Valley Estate Resort</p>
                      <p className="text-[10px] text-gray-400">Complimentary private transport provided from SFO &amp; OAK airports.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Mock Wireframe Footer */}
        <footer className="bg-gray-900 text-gray-400 px-6 py-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between text-[11px] gap-3" id="wireframe-rendered-footer">
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-200">OWNER&apos;S CIRCLE IP ASSEMBLY</span>
            <span className="text-gray-600">|</span>
            <span>Chatham House Protocols Enforced</span>
          </div>
          <div className="text-gray-500">
            © 2026 Owner&apos;s Circle Ltd. Optimized for high-fidelity technical wireframes.
          </div>
        </footer>

      </div>

      {/* Speaker Bio Inspector Modal Drawer Overlay (Dynamic Interactivity!) */}
      {activeSpeaker && (
        <div className="fixed inset-0 bg-gray-950/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in" id="speaker-overlay-modal">
          <div className="bg-white border border-gray-200 rounded-lg max-w-lg w-full overflow-hidden shadow-2xl relative animate-scale-up" id="speaker-overlay-content">
            {/* Modal header */}
            <div className="bg-gray-900 text-white p-4 flex items-center justify-between" id="modal-header">
              <span className="text-[10px] font-mono uppercase tracking-wide text-gray-400">
                [INSPECTOR: EXECUTIVE BLUEPRINT PROFILE]
              </span>
              <button 
                onClick={() => setActiveSpeaker(null)}
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Profile body */}
            <div className="p-6 space-y-4" id="modal-body">
              <div className="flex gap-4 items-start pb-4 border-b border-gray-100">
                <img 
                  src={activeSpeaker.image} 
                  alt={activeSpeaker.name} 
                  className="w-16 h-16 rounded-full border border-gray-200 object-cover bg-gray-100"
                  referrerPolicy="no-referrer"
                />
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-gray-500 uppercase">{activeSpeaker.company}</span>
                  <h3 className="text-lg font-black text-gray-900">{activeSpeaker.name}</h3>
                  <p className="text-xs text-gray-700 font-medium">{activeSpeaker.role}</p>
                  <span className="inline-block text-[9px] font-bold px-2 py-0.5 bg-gray-100 text-gray-600 rounded uppercase tracking-wide mt-1">
                    {activeSpeaker.category} panelist
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-gray-600" id="modal-bio-section">
                <span className="font-mono text-[10px] uppercase text-gray-400 font-bold block">Vetted Milestone Bio:</span>
                <p className="leading-relaxed bg-gray-50 p-3 rounded border border-gray-100">
                  {activeSpeaker.bio}
                </p>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => {
                    alert(`Private appointment request for ${activeSpeaker.name} scheduled for Thursday slot at Ritz-Carlton Napa Boardroom A.`);
                    setActiveSpeaker(null);
                  }}
                  className="w-full bg-gray-900 text-white text-xs font-bold py-2 rounded text-center hover:bg-gray-800 transition-colors cursor-pointer"
                  id="modal-request-btn"
                >
                  Confirm Appointment Booking Slot
                </button>
                <button
                  onClick={() => setActiveSpeaker(null)}
                  className="w-24 border border-gray-200 text-gray-600 hover:text-gray-900 text-xs font-semibold rounded text-center hover:bg-gray-50 transition-colors cursor-pointer"
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
