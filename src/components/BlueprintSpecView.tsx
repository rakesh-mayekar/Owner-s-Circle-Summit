import React, { useState } from 'react';
import { WIREFRAME_SPECS, WireframePageSpec } from '../data/mockData';
import { Clipboard, Check, Search, FileText, Compass, ExternalLink } from 'lucide-react';

interface BlueprintSpecViewProps {
  activePageId: string;
}

export default function BlueprintSpecView({ activePageId }: BlueprintSpecViewProps) {
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const activeSpec = WIREFRAME_SPECS.find(s => s.id === activePageId) || WIREFRAME_SPECS[0];

  // Generate the formatted markdown representation for copying
  const generateMarkdown = (spec: WireframePageSpec) => {
    let md = `# ${spec.title.toUpperCase()}\n`;
    md += `- **Page Strategy & Objective:** ${spec.strategy}\n`;
    md += `- **Primary CTA:** ${spec.primaryCta}\n\n`;
    md += `## COMPONENT ARCHITECTURE\n\n`;

    spec.sections.forEach(section => {
      md += `--- \n`;
      md += `[SECTION: ${section.name}]\n`;
      md += `- **Layout & UX Objective:** ${section.description}\n`;
      md += `- **Key Elements:**\n`;
      section.elements.forEach(el => {
        md += `  - ${el}\n`;
      });
      md += `--- \n\n`;
    });

    return md;
  };

  const handleCopy = () => {
    const text = generateMarkdown(activeSpec);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Filter specs across all pages or just the active page if queried
  const allSpecs = WIREFRAME_SPECS;
  const filteredSpecs = searchQuery
    ? allSpecs.map(spec => {
        const matchesTitle = spec.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStrategy = spec.strategy.toLowerCase().includes(searchQuery.toLowerCase());
        const filteredSections = spec.sections.filter(
          sect =>
            sect.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            sect.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            sect.elements.some(el => el.toLowerCase().includes(searchQuery.toLowerCase()))
        );

        if (matchesTitle || matchesStrategy || filteredSections.length > 0) {
          return {
            ...spec,
            sections: filteredSections.length > 0 ? filteredSections : spec.sections
          };
        }
        return null;
      }).filter((s): s is WireframePageSpec => s !== null)
    : [activeSpec];

  return (
    <div className="flex flex-col h-full bg-white text-gray-800" id="blueprint-spec-panel">
      {/* Search and Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 p-4 gap-3 bg-gray-50/50">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-gray-500" id="file-text-icon" />
          <div>
            <h3 className="font-semibold text-gray-900 text-sm" id="spec-header-title">
              Technical Wireframe Specification
            </h3>
            <p className="text-xs text-gray-500" id="spec-header-subtitle">
              Detailed structural microcopy and component specifications
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" id="spec-search-icon" />
            <input
              type="text"
              placeholder="Search specs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 w-44 transition-all"
              id="spec-search-input"
            />
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-gray-900 rounded-md hover:bg-gray-800 transition-colors cursor-pointer"
            id="copy-spec-btn"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" id="check-icon" />
                <span>Copied Spec!</span>
              </>
            ) : (
              <>
                <Clipboard className="h-3.5 w-3.5" id="clipboard-icon" />
                <span>Copy Markdown</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Spec Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 max-w-4xl mx-auto w-full font-mono text-sm leading-relaxed select-text">
        {searchQuery && (
          <div className="bg-gray-50 border border-gray-200/60 p-3 rounded-lg text-xs text-gray-600 flex items-center gap-2" id="search-feedback">
            <Compass className="h-4 w-4 text-gray-500" />
            <span>
              Showing search results across all wireframe sheets matching &quot;<strong className="text-gray-900">{searchQuery}</strong>&quot;. Clear the search input to return to the active page view.
            </span>
          </div>
        )}

        {filteredSpecs.length === 0 ? (
          <div className="text-center py-12 text-gray-400" id="no-specs-found">
            <p>No specifications found matching your query.</p>
          </div>
        ) : (
          filteredSpecs.map((spec) => (
            <div key={spec.id} className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm space-y-4" id={`spec-card-${spec.id}`}>
              {/* Page Identifier */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-3" id={`spec-title-wrapper-${spec.id}`}>
                <h4 className="text-base font-bold text-gray-900 font-sans tracking-tight" id={`spec-title-${spec.id}`}>
                  {spec.title}
                </h4>
                <span className="text-xs font-semibold px-2 py-0.5 bg-gray-100 text-gray-600 rounded uppercase font-sans tracking-wide" id={`spec-badge-${spec.id}`}>
                  {spec.id} spec
                </span>
              </div>

              {/* Strategy Block */}
              <div className="p-4 bg-gray-50 rounded-md border-l-4 border-gray-900 text-xs space-y-1.5" id={`strategy-block-${spec.id}`}>
                <div className="font-bold font-sans text-gray-900 uppercase tracking-wide">Page Strategy &amp; Objective</div>
                <div className="text-gray-700 font-sans leading-relaxed">{spec.strategy}</div>
                <div className="pt-2 border-t border-gray-200 mt-2">
                  <span className="font-bold font-sans text-gray-900 uppercase tracking-wide">Primary CTA Goal: </span>
                  <span className="font-sans text-gray-800 font-medium decoration-gray-400 underline decoration-1 underline-offset-2">{spec.primaryCta}</span>
                </div>
              </div>

              {/* Component Architecture List */}
              <div className="space-y-4 mt-6" id={`components-list-${spec.id}`}>
                <div className="font-bold text-xs text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-2 font-sans">
                  Component Architecture Map
                </div>

                {spec.sections.map((sect, sIdx) => (
                  <div key={sIdx} className="border border-gray-100 rounded-md overflow-hidden bg-gray-50/20" id={`section-${spec.id}-${sIdx}`}>
                    {/* Section Header Banner */}
                    <div className="bg-gray-100/60 p-3 flex items-center justify-between border-b border-gray-200/50" id={`section-banner-${spec.id}-${sIdx}`}>
                      <span className="font-bold text-xs text-gray-900 font-sans uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-gray-900 rounded-full"></span>
                        [SECTION: {sect.name}]
                      </span>
                    </div>

                    <div className="p-4 space-y-3" id={`section-body-${spec.id}-${sIdx}`}>
                      {/* Layout Strategy */}
                      <div className="text-xs text-gray-600 font-sans" id={`section-desc-${spec.id}-${sIdx}`}>
                        <span className="font-bold text-gray-800">UX Architecture &amp; Layout:</span> {sect.description}
                      </div>

                      {/* Elements Bullets */}
                      <div className="space-y-1.5 mt-2" id={`section-elements-${spec.id}-${sIdx}`}>
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider font-sans mb-1">
                          Key Content &amp; UX Elements:
                        </div>
                        <ul className="list-disc list-inside space-y-1 text-xs text-gray-700 font-sans pl-1" id={`section-bullets-${spec.id}-${sIdx}`}>
                          {sect.elements.map((el, elIdx) => (
                            <li key={elIdx} className="leading-relaxed hover:text-gray-900 transition-colors">
                              {el}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer Info */}
      <div className="border-t border-gray-100 p-3 bg-gray-50 text-center text-[11px] text-gray-400 font-sans">
        Owner&apos;s Circle IP Microsite Technical Wireframe • Formats conform to ET Edge B2B Summit Benchmarks.
      </div>
    </div>
  );
}
