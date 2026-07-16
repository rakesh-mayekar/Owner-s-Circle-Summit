import React, { useState } from 'react';
import { PageId } from './types';
import InteractiveWireframeView from './components/InteractiveWireframeView';

export default function App() {
  const [activePageId, setActivePageId] = useState<PageId>('home');

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col font-sans selection:bg-gray-900 selection:text-white" id="main-ux-site">
      <InteractiveWireframeView 
        activePageId={activePageId} 
        onNavigate={setActivePageId}
      />
    </div>
  );
}
