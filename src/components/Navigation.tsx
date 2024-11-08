import React from 'react';
import { Brain, Users, BookOpen } from 'lucide-react';

type Props = {
  activeTab: 'analyze' | 'community' | 'journal';
  setActiveTab: (tab: 'analyze' | 'community' | 'journal') => void;
};

function Navigation({ activeTab, setActiveTab }: Props) {
  return (
    <nav className="flex flex-wrap justify-center gap-2">
      <button
        onClick={() => setActiveTab('analyze')}
        className={`nav-button ${
          activeTab === 'analyze' ? 'nav-button-active' : 'nav-button-inactive'
        }`}
      >
        <Brain className="w-3.5 h-3.5" />
        Analyze Dream
      </button>
      <button
        onClick={() => setActiveTab('community')}
        className={`nav-button ${
          activeTab === 'community' ? 'nav-button-active' : 'nav-button-inactive'
        }`}
      >
        <Users className="w-3.5 h-3.5" />
        Community
      </button>
      <button
        onClick={() => setActiveTab('journal')}
        className={`nav-button ${
          activeTab === 'journal' ? 'nav-button-active' : 'nav-button-inactive'
        }`}
      >
        <BookOpen className="w-3.5 h-3.5" />
        Journal
      </button>
    </nav>
  );
}

export default Navigation;