import React, { useState, useEffect } from 'react';
import { PageId, Speaker, Session, SponsorTier } from '../types';
import { SPEAKERS, SESSIONS, SPONSORS, LEADERSHIP_TEAM } from '../data/mockData';
import { 
  Clock, Calendar, MapPin, Users, CheckCircle2, ArrowRight, 
  ChevronRight, Info, Sparkles, ShieldCheck, 
  Bookmark, BookmarkCheck, UserCheck, X, Mail, Phone, Map, 
  ChevronLeft, Send, ZoomIn, ZoomOut, Compass, InfoIcon, Menu
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
  const [inquirySubmitted, setInquirySubmitted] = useState<boolean>(false);
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
            {(['home', 'about', 'agenda', 'speakers', 'sponsorship'] as PageId[]).map((pid) => (
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
                {pid === 'home' ? 'Home' : pid === 'about' ? 'Vision' : pid === 'agenda' ? 'Agenda' : pid === 'speakers' ? 'Speakers' : 'Partners'}
              </button>
            ))}
          </div>

          {/* Action button - Desktop Only */}
          <div className="hidden md:block">
            <button
              onClick={() => onNavigate('contact')}
              className="text-xs bg-gray-950 text-white hover:bg-gray-800 font-bold px-5 py-2.5 rounded-md transition-all duration-200 cursor-pointer shadow-sm tracking-wide"
              id="nav-action-button"
            >
              Submit Inquiry
            </button>
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
                    { label: 'Partners', id: 'sponsorship' },
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
                <h4 className="font-extrabold text-sm tracking-wide">Inquiry Authenticated</h4>
                <p className="text-xs text-gray-400 leading-relaxed font-medium">
                  Your registration token has been generated. The Steering Committee will review your firm metadata within 24 business hours.
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

            {/* SECTION: PROXIMITY STATS BAND (py-16, wide) */}
            <ScrollAnimatedSection className="bg-gray-950 text-white py-16 px-6 lg:px-12 relative border-y border-gray-900" id="wireframe-section-stats-band">
              <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-800">
                <div className="p-3 space-y-1">
                  <div className="text-3xl md:text-4xl font-black font-display text-white tracking-tight">150 Only</div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold font-mono">Cohort</div>
                </div>
                <div className="p-3 space-y-1 pt-6 md:pt-2">
                  <div className="text-3xl md:text-4xl font-black font-display text-white tracking-tight">$14.2B+</div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold font-mono">Portfolio Assets</div>
                </div>
                <div className="p-3 space-y-1 pt-6 md:pt-2">
                  <div className="text-3xl md:text-4xl font-black font-display text-white tracking-tight">12+ Major Cities</div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold font-mono">Pan-India Footprint</div>
                </div>
                <div className="p-3 space-y-1 pt-6 md:pt-2">
                  <div className="text-3xl md:text-4xl font-black font-display text-white tracking-tight">94.2%</div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold font-mono">C-Suite &amp; Founders</div>
                </div>
              </div>
            </ScrollAnimatedSection>

            {/* SECTION: VALUE PROPS & PILLARS (py-24 to py-36) */}
            <ScrollAnimatedSection className="px-6 py-24 md:py-32 space-y-16 max-w-7xl mx-auto w-full" id="wireframe-section-value-props">
              <div className="max-w-3xl space-y-4">
                <span className="text-[10px] font-bold text-amber-700 tracking-widest uppercase font-mono block">OUR FUNDAMENTAL MANDATES</span>
                <h2 className="text-3xl md:text-4xl font-black tracking-tight text-gray-900 font-display">
                  Architected for Substantial, Sovereign Business Milestones.
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed max-w-xl">
                  Every boardroom masterclass, closed panel session, and private networking circle is engineered to generate clear private exit leverage.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="space-y-4 bg-white p-2">
                  <span className="w-10 h-10 rounded-md bg-gray-50 text-gray-900 border border-gray-150 flex items-center justify-center font-black text-sm shadow-xs font-mono">01</span>
                  <h3 className="font-extrabold text-gray-900 text-lg">Sovereign Growth Engineering</h3>
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
                        <p className="text-xs text-gray-300 max-w-md">Fully locked-down sovereign compound. No public access, no media registries, fully secured networking zones.</p>
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
                      This is not a general learning seminar; it is a high-density, peer-validated operations room for sovereign founders targeting generational liquidity and systematic enterprise scale.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollAnimatedSection>

            {/* HIGH-STATURE LEADERSHIP PROFILE CARDS (Marcus Vance, Elena Rostova, Siddharth Mehta) */}
            <ScrollAnimatedSection className="py-28 px-6 lg:px-12 relative max-w-7xl mx-auto w-full space-y-16" id="wireframe-section-about-leadership">
              <div className="text-center space-y-3 max-w-2xl mx-auto">
                <span className="text-[10px] font-bold text-amber-700 tracking-widest uppercase font-mono block">STABILIZING THE TABLE</span>
                <h2 className="text-3xl font-black text-gray-900 font-display tracking-tight">Summit Leadership &amp; Trustees</h2>
                <p className="text-xs text-gray-500">The dedicated organizing partners directing the private alignments and high-touch concierge logistics.</p>
              </div>

              {/* Dynamic rendering of custom requested profiles */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pt-4">
                {LEADERSHIP_TEAM.map((member) => (
                  <div key={member.id} className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm flex flex-col justify-between space-y-6">
                    <div className="space-y-5">
                      <div className="relative flex justify-center">
                        <CustomAvatar name={member.name} size="lg" />
                        {member.badge && (
                          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gray-900 text-white border border-gray-800 font-mono text-[8px] font-bold px-2 py-0.5 rounded shadow-sm whitespace-nowrap">
                            {member.badge}
                          </span>
                        )}
                      </div>
                      <div className="text-center pt-2">
                        <h4 className="font-extrabold text-base text-gray-900">{member.name}</h4>
                        <p className="text-[10px] text-amber-700 font-mono font-bold uppercase mt-1 tracking-widest">{member.role}</p>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed text-center">
                        {member.bio}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollAnimatedSection>

            {/* HISTORIC ECOSYSTEM IMPACT METRICS BANNER */}
            <ScrollAnimatedSection className="bg-gray-950 text-white py-28 px-6 lg:px-12 text-center border-t border-gray-900" id="wireframe-section-about-metrics">
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 divide-y md:divide-y-0 md:divide-x divide-gray-800">
                <div className="p-2 space-y-2">
                  <span className="block text-3xl font-black text-white font-display">4 Assemblies</span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold font-mono">Successfully Completed</span>
                </div>
                <div className="p-2 pt-6 md:pt-2 space-y-2">
                  <span className="block text-3xl font-black text-white font-display">320+ Alumni</span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold font-mono">Aligned Global Owner Network</span>
                </div>
                <div className="p-2 pt-6 md:pt-2 space-y-2">
                  <span className="block text-3xl font-black text-white font-display">14 Ventures</span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold font-mono">Direct Co-Investments Catalyzed</span>
                </div>
              </div>
            </ScrollAnimatedSection>

          </div>
        )}

        {/* ==================== STRATEGIC AGENDA PAGE ==================== */}
        {activePageId === 'agenda' && (
          <div className="flex-1 py-28 px-6 lg:px-12 max-w-7xl mx-auto w-full space-y-12 border-t border-gray-100" id="page-agenda-rendered">
            
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
        )}

        {/* ==================== SPEAKERS PAGE ==================== */}
        {activePageId === 'speakers' && (
          <div className="flex-1 py-28 px-6 lg:px-12 space-y-12 max-w-7xl mx-auto w-full border-t border-gray-100" id="page-speakers-rendered">
            
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
 
              {/* Categorization tabs */}
              <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-2">
                {['All', 'Founder', 'Investor', 'Industry Leader'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedSpeakerCat(cat)}
                    className={`px-4 py-2.5 text-xs font-bold rounded-t-lg transition-all cursor-pointer ${
                      selectedSpeakerCat === cat
                        ? 'bg-gray-950 text-white border-b-2 border-gray-950 font-black'
                        : 'text-gray-500 hover:text-gray-950 hover:bg-gray-50'
                    }`}
                    id={`speaker-filter-${cat}`}
                  >
                    {cat === 'All' ? 'All Roles' : `${cat}s`}
                  </button>
                ))}
              </div>
            </ScrollAnimatedSection>

            {/* SPEAKER GRID WITH PROMINENT PROFILE CARDS */}
            <ScrollAnimatedSection className="grid grid-cols-1 md:grid-cols-2 gap-8" id="speakers-rendered-grid">
              {SPEAKERS.filter(spk => selectedSpeakerCat === 'All' || spk.category === selectedSpeakerCat).map((speaker) => (
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
        )}

        {/* ==================== PARTNERS PAGE ==================== */}
        {activePageId === 'sponsorship' && (
          <div className="flex-1 py-28 px-6 lg:px-12 space-y-12 max-w-7xl mx-auto w-full border-t border-gray-100" id="page-sponsorship-rendered">
            
            <ScrollAnimatedSection className="space-y-6 pt-4 w-full" id="partners-page-intro-section">
              <span className="inline-block text-[11px] font-mono uppercase text-amber-700 border border-amber-500/20 px-3.5 py-1.5 rounded bg-amber-500/5 tracking-widest font-bold" id="sponsorship-eyebrow">
                PARTNERSHIP ALIGNMENTS
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-gray-900 font-display tracking-tight leading-tight md:leading-none" id="sponsorship-heading">
                Bespoke Partnership Opportunities By Private Invitation Only
              </h1>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-3xl" id="sponsorship-subhead">
                Position your professional services or investment brand inside an ultra-exclusive room of 15-20 enterprise operators. No transactional trade booths, no general advertising—only direct relationship design.
              </p>
            </ScrollAnimatedSection>

            {/* Exclusive Partnership comparison matrices (No public pricing) */}
            <ScrollAnimatedSection className="space-y-12 w-full" id="sponsorship-matrix-and-benefits">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="sponsorship-comparison-matrix">
                {SPONSORS.map((spon) => (
                  <div 
                    key={spon.id} 
                    onClick={() => setSelectedSponsorTier(spon.id)}
                    className={`border rounded-xl p-8 cursor-pointer transition-all flex flex-col justify-between space-y-6 ${
                      selectedSponsorTier === spon.id
                        ? 'border-gray-950 bg-gray-50/50 ring-1 ring-gray-950 shadow-md'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                    id={`sponsor-tier-card-${spon.id}`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-mono font-bold text-gray-400 tracking-wider">[{spon.slotsAvailable} STRICT SLOT{spon.slotsAvailable > 1 ? 'S' : ''}]</span>
                        {selectedSponsorTier === spon.id && <CheckCircle2 className="h-5 w-5 text-gray-950" />}
                      </div>
                      <h3 className="font-black text-gray-950 text-lg leading-tight">{spon.name}</h3>
                      <p className="text-xs font-bold text-amber-700 font-mono tracking-wider uppercase mt-1">By Private Board Invitation Only</p>
                    </div>

                    <div className="pt-4 border-t border-gray-100 text-[11px] text-gray-600 space-y-2 font-sans font-medium">
                      <div className="flex justify-between">
                        <span>VIP Pass Allocation:</span>
                        <strong className="text-gray-900">{spon.vipPasses} credentials</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Executive Keynote Slot:</span>
                        <strong className="text-gray-900">{spon.speakingSlot ? 'Guaranteed Presence' : 'Board Invitation Vetted'}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Subterranean Suite Access:</span>
                        <strong className="text-gray-900">{spon.exhibitionSpace ? 'Private Boardroom Reserved' : 'Common Lounge Only'}</strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Partnership benefits detail block */}
              {selectedSponsorTier && (
                <div className="border border-gray-200 rounded-xl p-8 bg-gray-50/50 space-y-4 animate-fade-in" id="sponsorship-tier-details">
                  {(() => {
                    const tier = SPONSORS.find(s => s.id === selectedSponsorTier);
                    if (!tier) return null;
                    return (
                      <div className="space-y-4" id={`benefits-${tier.id}`}>
                        <span className="text-[10px] font-mono font-black text-gray-900 uppercase tracking-widest block">
                          Bespoke Strategic Activations for {tier.name}:
                        </span>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs text-gray-700 list-inside list-disc font-medium">
                          {tier.benefits.map((benefit, bIdx) => (
                            <li key={bIdx} className="leading-relaxed">{benefit}</li>
                          ))}
                        </ul>
                      </div>
                    );
                  })()}
                </div>
              )}
            </ScrollAnimatedSection>

            {/* Partnership CTA */}
            <ScrollAnimatedSection className="text-center pt-4" id="partnerships-outro-cta">
              <button 
                onClick={() => onNavigate('contact')}
                className="bg-gray-950 hover:bg-gray-800 text-white font-bold text-xs px-8 py-4 rounded-md shadow-md cursor-pointer transition-colors tracking-wide uppercase"
              >
                Request Private Partnership Prospectus
              </button>
            </ScrollAnimatedSection>

          </div>
        )}

        {/* ==================== UNIFIED EXECUTIVE CONTACT & INQUIRY ==================== */}
        {activePageId === 'contact' && (
          <div className="flex-1 max-w-7xl mx-auto w-full px-6 lg:px-12 py-28 space-y-12 border-t border-gray-100" id="page-contact-rendered">
            
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
                      <span className="text-[10px] font-mono uppercase text-amber-700 font-black block tracking-widest">[APPLICATION FORM]</span>
                      <h2 className="text-xl font-bold text-gray-900 tracking-tight">VIP Candidate Details</h2>
                      <p className="text-gray-500 text-[11px]">All submissions are secure-encrypted and protected by an operational non-disclosure agreement.</p>
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

                      {/* Message field */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono uppercase text-gray-500 block font-bold tracking-wider">Message</label>
                        <textarea 
                          placeholder="Please state your current enterprise scale (EBITDA), key exit timeline parameters, or specific summit expectations..."
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
                        <span>Submit Secure Strategic Inquiry</span>
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

            <div className="p-8 space-y-6" id="modal-body">
              <div className="flex gap-4 items-start pb-5 border-b border-gray-100">
                <img 
                  src={activeSpeaker.image} 
                  alt={activeSpeaker.name} 
                  className="w-16 h-16 rounded-full border border-gray-200 object-cover bg-gray-50 shadow-sm"
                  referrerPolicy="no-referrer"
                />
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest block">{activeSpeaker.company}</span>
                  <h3 className="text-lg font-black text-gray-900 leading-none">{activeSpeaker.name}</h3>
                  <p className="text-xs text-gray-700 font-bold">{activeSpeaker.role}</p>
                  <span className="inline-block text-[9px] font-bold px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-100/60 rounded uppercase tracking-wider mt-1">
                    Verified {activeSpeaker.category}
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-gray-600" id="modal-bio-section">
                <span className="font-mono text-[9px] uppercase text-gray-400 font-bold tracking-wider block">Vetted Operational Milestone Bio:</span>
                <p className="leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-100 font-medium">
                  {activeSpeaker.bio}
                </p>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  onClick={() => {
                    alert(`Private boardroom booking request for ${activeSpeaker.name} logged securely.`);
                    setActiveSpeaker(null);
                  }}
                  className="w-full bg-gray-950 text-white text-xs font-bold py-3 rounded-md text-center hover:bg-gray-800 transition-colors cursor-pointer tracking-wider uppercase"
                  id="modal-request-btn"
                >
                  Request Appointment Slot
                </button>
                <button
                  onClick={() => setActiveSpeaker(null)}
                  className="w-24 border border-gray-200 text-gray-600 hover:text-gray-900 text-xs font-semibold rounded-md text-center hover:bg-gray-50 transition-colors cursor-pointer"
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
