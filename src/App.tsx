import React, { useState } from 'react';
import { PageId } from './types';
import BlueprintSpecView from './components/BlueprintSpecView';
import InteractiveWireframeView from './components/InteractiveWireframeView';
import { 
  Layout, FileText, Compass, Eye, Layers, Settings, 
  PenTool, HelpCircle, Check, CheckSquare, Sparkles, 
  Plus, Trash2, Columns, Info, ShieldCheck, Share2
} from 'lucide-react';

interface FeedbackNote {
  id: string;
  pageId: PageId;
  author: string;
  text: string;
  timestamp: string;
}

export default function App() {
  const [activePageId, setActivePageId] = useState<PageId>('home');
  const [viewMode, setViewMode] = useState<'blueprint' | 'spec' | 'split'>('split');
  
  // Collaborative feedback notes simulation
  const [feedbackNotes, setFeedbackNotes] = useState<FeedbackNote[]>([
    {
      id: 'note-1',
      pageId: 'home',
      author: 'Steering Committee Member',
      text: 'Ensure the countdown clock is highly visible on mobile. The Napa Valley venue tier needs immediate focus.',
      timestamp: 'Today, 09:12 AM'
    },
    {
      id: 'note-2',
      pageId: 'attendees',
      author: 'Lead UX Architect',
      text: 'The EBITDA valuation calculator is an exceptional interactive anchor. Let\'s make sure we collect this data safely under NDA.',
      timestamp: 'Today, 10:45 AM'
    }
  ]);
  
  const [newFeedbackText, setNewFeedbackText] = useState('');
  const [newFeedbackAuthor, setNewFeedbackAuthor] = useState('Product Owner');

  const addFeedbackNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFeedbackText.trim()) return;
    
    const newNote: FeedbackNote = {
      id: `note-${Date.now()}`,
      pageId: activePageId,
      author: newFeedbackAuthor.trim() || 'Guest Reviewer',
      text: newFeedbackText.trim(),
      timestamp: 'Just now'
    };
    
    setFeedbackNotes(prev => [newNote, ...prev]);
    setNewFeedbackText('');
  };

  const removeFeedbackNote = (id: string) => {
    setFeedbackNotes(prev => prev.filter(n => n.id !== id));
  };

  const pageNames: Record<PageId, string> = {
    home: '1. Home Page',
    about: '2. About Us',
    agenda: '3. Strategic Agenda',
    speakers: '4. Speaker Grid',
    attendees: '5. Who Should Attend',
    sponsorship: '6. Sponsorship Matrix',
    contact: '7. Registration Form'
  };

  return (
    <div className="min-h-screen bg-gray-100/70 text-gray-800 flex flex-col font-sans selection:bg-gray-900 selection:text-white" id="main-ux-workspace">
      
      {/* GLOBAL WORKSPACE HEADER */}
      <header className="bg-gray-900 text-white border-b border-gray-800 px-6 py-4 flex flex-col lg:flex-row items-center justify-between gap-4 shadow-md" id="workspace-top-bar">
        <div className="flex items-center gap-3" id="workspace-title-block">
          <div className="p-2 bg-white/10 rounded-lg text-white border border-white/10">
            <Layout className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-extrabold text-sm tracking-tight text-white flex items-center gap-2">
              Owner&apos;s Circle Summit Wireframe Workspace
              <span className="text-[10px] font-mono px-2 py-0.5 bg-green-500/20 text-green-400 border border-green-500/30 rounded uppercase tracking-wider font-semibold">
                V2.2 Spec Approved
              </span>
            </h1>
            <p className="text-[11px] text-gray-400">
              High-Fidelity Text Wireframes &amp; Interactive Prototypes for the Owner&apos;s Circle IP Microsite
            </p>
          </div>
        </div>

        {/* Workspace Controls */}
        <div className="flex flex-wrap items-center gap-3 text-xs" id="workspace-controls">
          <div className="flex items-center bg-gray-800 rounded-lg p-1 border border-gray-700" id="view-mode-tabs">
            <button
              onClick={() => setViewMode('blueprint')}
              className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 font-semibold transition-all cursor-pointer ${
                viewMode === 'blueprint'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
              id="view-mode-blueprint"
            >
              <Eye className="h-3.5 w-3.5" />
              <span>Blueprint Canvas</span>
            </button>
            <button
              onClick={() => setViewMode('spec')}
              className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 font-semibold transition-all cursor-pointer ${
                viewMode === 'spec'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
              id="view-mode-spec"
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Specification Sheet</span>
            </button>
            <button
              onClick={() => setViewMode('split')}
              className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 font-semibold transition-all cursor-pointer ${
                viewMode === 'split'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
              id="view-mode-split"
            >
              <Columns className="h-3.5 w-3.5" />
              <span>Split Screen</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 bg-gray-800 border border-gray-700 px-3 py-1.5 rounded-lg text-gray-300 font-mono text-[11px]">
            <span className="w-2 h-2 rounded-full bg-green-400"></span>
            <span>HMR Safe Workspace</span>
          </div>
        </div>
      </header>

      {/* CORE SPLIT WORKSPACE AREA */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-0" id="workspace-body">
        
        {/* LEFT WORKSPACE SIDEBAR: PAGES & DESIGN ASSETS */}
        <aside className="w-full lg:w-72 bg-white border-r border-gray-200 flex flex-col divide-y divide-gray-200 flex-shrink-0" id="workspace-left-sidebar">
          
          {/* Section: Pages Navigator */}
          <div className="p-4 space-y-3" id="pages-navigator-section">
            <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider block">
              MICROSITE STRUCTURE PAGES
            </span>
            <div className="space-y-1" id="pages-list-nav">
              {(Object.keys(pageNames) as PageId[]).map((pid) => (
                <button
                  key={pid}
                  onClick={() => setActivePageId(pid)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                    activePageId === pid
                      ? 'bg-gray-900 text-white font-bold'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  id={`sidebar-page-${pid}`}
                >
                  <span className="truncate">{pageNames[pid]}</span>
                  <span className="text-[10px] opacity-60 font-mono font-light uppercase tracking-wide">
                    {pid === 'contact' ? 'Convert' : pid === 'attendees' ? 'Value' : 'View'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Section: Interactive Brand Assets */}
          <div className="p-4 space-y-3" id="brand-assets-section">
            <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider block">
              DESIGN SYSTEM TOKENS (LIGHT COMPLIANT)
            </span>
            <div className="space-y-2 text-xs" id="brand-colors-list">
              <div className="flex items-center justify-between p-2 rounded bg-gray-50 border border-gray-200/50">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-gray-950 border border-gray-900 block shadow-xs"></span>
                  <div>
                    <span className="font-semibold text-gray-800 block leading-none">Charcoal Core</span>
                    <span className="text-[10px] text-gray-400 font-mono">#111827</span>
                  </div>
                </div>
                <span className="text-[10px] text-gray-400">90% Contrast</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded bg-gray-50 border border-gray-200/50">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-white border border-gray-200 block shadow-xs"></span>
                  <div>
                    <span className="font-semibold text-gray-800 block leading-none">Off-White Core</span>
                    <span className="text-[10px] text-gray-400 font-mono">#F9FAFB</span>
                  </div>
                </div>
                <span className="text-[10px] text-gray-400">10% Contrast</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded bg-gray-50 border border-gray-200/50">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-amber-600 block shadow-xs"></span>
                  <div>
                    <span className="font-semibold text-gray-800 block leading-none">VIP Warm Bronze</span>
                    <span className="text-[10px] text-gray-400 font-mono">#D97706</span>
                  </div>
                </div>
                <span className="text-[10px] text-gray-400">Accent Tag</span>
              </div>
            </div>
          </div>

          {/* Section: Interactive Client Feedback Sticky Board */}
          <div className="p-4 flex-1 flex flex-col min-h-0 space-y-3" id="collaboration-board-section">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">
                DESIGN TEAM NOTEBOARD
              </span>
              <span className="text-[10px] px-2 py-0.5 bg-yellow-50 text-yellow-800 border border-yellow-200 font-bold rounded">
                {feedbackNotes.length} Active Notes
              </span>
            </div>

            {/* Quick Sticky Note form */}
            <form onSubmit={addFeedbackNote} className="space-y-2 text-xs" id="sticky-note-form">
              <input 
                type="text" 
                placeholder="Author (e.g. Lead Dev)" 
                value={newFeedbackAuthor}
                onChange={(e) => setNewFeedbackAuthor(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded p-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
              <div className="relative">
                <textarea 
                  required
                  placeholder="Type feedback for this wireframe page..."
                  value={newFeedbackText}
                  onChange={(e) => setNewFeedbackText(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded p-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-gray-400 h-16 resize-none pr-6"
                />
                <button 
                  type="submit"
                  className="absolute bottom-2 right-2 p-1 bg-gray-900 hover:bg-gray-800 text-white rounded cursor-pointer transition-colors"
                  title="Add Sticky Note"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            </form>

            {/* Sticky Notes Render List */}
            <div className="flex-1 overflow-y-auto space-y-2.5 max-h-[220px] pr-1" id="sticky-notes-scroll">
              {feedbackNotes.filter(n => n.pageId === activePageId).length === 0 ? (
                <div className="text-center py-6 text-gray-400 text-xs italic" id="no-notes-for-page">
                  No notes filed for {pageNames[activePageId]}. Add a sticky note above to collaborate.
                </div>
              ) : (
                feedbackNotes
                  .filter(n => n.pageId === activePageId)
                  .map((note) => (
                    <div key={note.id} className="p-2.5 bg-yellow-50/80 border border-yellow-200/80 rounded-md shadow-xs space-y-1 relative" id={`sticky-${note.id}`}>
                      <button 
                        onClick={() => removeFeedbackNote(note.id)}
                        className="absolute top-1.5 right-1.5 text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                        title="Delete note"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                      <div className="flex items-center gap-1">
                        <span className="font-extrabold text-[10px] text-gray-800">{note.author}</span>
                        <span className="text-[9px] text-gray-400">• {note.timestamp}</span>
                      </div>
                      <p className="text-[11px] text-gray-700 leading-tight">
                        {note.text}
                      </p>
                    </div>
                  ))
              )}
            </div>
          </div>

        </aside>

        {/* MAIN DISPLAY CANVAS (DYNAMIC BASED ON VIEW MODE STATE) */}
        <main className="flex-1 flex flex-col lg:flex-row overflow-hidden min-w-0" id="workspace-canvas-main">
          
          {/* VIEW 1: INTERACTIVE WIREFRAME CANVAS */}
          {(viewMode === 'blueprint' || viewMode === 'split') && (
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden" id="canvas-blueprint-pane">
              <InteractiveWireframeView 
                activePageId={activePageId} 
                onNavigate={(pageId) => setActivePageId(pageId)}
              />
            </div>
          )}

          {/* VIEW 2: TECHNICAL SPECIFICATION VIEW */}
          {(viewMode === 'spec' || viewMode === 'split') && (
            <div className="w-full lg:w-[460px] xl:w-[500px] border-l border-gray-200 bg-white flex flex-col flex-shrink-0 overflow-hidden" id="canvas-spec-pane">
              <BlueprintSpecView activePageId={activePageId} />
            </div>
          )}

        </main>

      </div>
      
    </div>
  );
}
