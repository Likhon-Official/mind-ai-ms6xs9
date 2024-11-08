import React, { useState } from 'react';
import { SendHorizontal, Loader2, AlertCircle, HelpCircle } from 'lucide-react';

type Props = {
  dreamText: string;
  setDreamText: (text: string) => void;
  onSubmit: () => void;
  isAnalyzing: boolean;
  onHowToUse: () => void;
};

function DreamInput({ dreamText, setDreamText, onSubmit, isAnalyzing, onHowToUse }: Props) {
  const [showError, setShowError] = useState(false);

  const handleSubmit = () => {
    if (dreamText.trim().length < 10) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }
    setShowError(false);
    onSubmit();
  };

  return (
    <div className="glass-panel p-4">
      <textarea
        value={dreamText}
        onChange={(e) => setDreamText(e.target.value)}
        placeholder="Describe your dream..."
        className={`glass-input w-full h-32 resize-none text-sm leading-relaxed ${
          showError ? 'border-red-500' : ''
        }`}
        disabled={isAnalyzing}
      />
      {showError && (
        <div className="flex items-center gap-2 text-red-400 mt-2 text-xs">
          <AlertCircle className="w-3 h-3" />
          <span>Please provide more details</span>
        </div>
      )}
      <button
        onClick={handleSubmit}
        disabled={isAnalyzing || dreamText.trim().length < 10}
        className="primary-button mt-3 w-full relative overflow-hidden group"
      >
        <div className={`flex items-center justify-center gap-2 transition-all duration-300 ${
          isAnalyzing ? 'opacity-0' : 'opacity-100'
        }`}>
          <SendHorizontal className="w-4 h-4" />
          Analyze
        </div>
        {isAnalyzing && (
          <div className="absolute inset-0 flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="animate-pulse">Analyzing...</span>
          </div>
        )}
      </button>
      <button
        onClick={onHowToUse}
        className="flex items-center justify-center gap-1.5 mt-4 text-purple-300 hover:text-purple-200 text-sm w-full transition-colors"
      >
        <HelpCircle className="w-3.5 h-3.5" />
        How to Use?
      </button>
    </div>
  );
}

export default DreamInput;