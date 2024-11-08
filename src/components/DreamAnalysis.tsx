import React, { useState, useEffect } from 'react';
import { Brain, Lightbulb, Compass } from 'lucide-react';

type Props = {
  analysis: {
    interpretation: string;
    insights: string[];
    recommendations: string[];
  };
};

function TypeWriter({ text, delay = 30, onComplete }: { text: string; delay?: number; onComplete?: () => void }) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);

      return () => clearTimeout(timer);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, delay, text, onComplete]);

  return <span>{displayedText}</span>;
}

function DreamAnalysis({ analysis }: Props) {
  const [showInsights, setShowInsights] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);

  return (
    <div className="glass-panel p-4">
      <div className="space-y-4">
        <div className="ai-card animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center gap-2 mb-2">
            <Brain className="w-4 h-4 text-violet-400" />
            <h3 className="text-sm font-medium text-purple-200">Your Dream Meaning</h3>
          </div>
          <p className="text-purple-100 text-sm leading-relaxed">
            <TypeWriter 
              text={analysis.interpretation} 
              onComplete={() => setShowInsights(true)}
            />
          </p>
        </div>

        {showInsights && (
          <div className="ai-card animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-4 h-4 text-violet-400" />
              <h3 className="text-sm font-medium text-purple-200">What This Means For You</h3>
            </div>
            <ul className="space-y-3">
              {analysis.insights.map((insight, index) => (
                <li 
                  key={index} 
                  className="flex items-start gap-2 text-sm text-purple-100"
                >
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-violet-400 mt-2" />
                  <TypeWriter 
                    text={insight}
                    delay={20}
                    onComplete={() => {
                      if (index === analysis.insights.length - 1) {
                        setShowRecommendations(true);
                      }
                    }}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}

        {showRecommendations && (
          <div className="ai-card animate-fade-up" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-center gap-2 mb-2">
              <Compass className="w-4 h-4 text-violet-400" />
              <h3 className="text-sm font-medium text-purple-200">Next Steps</h3>
            </div>
            <ul className="space-y-3">
              {analysis.recommendations.map((recommendation, index) => (
                <li 
                  key={index} 
                  className="flex items-start gap-2 text-sm text-purple-100"
                >
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-violet-400 mt-2" />
                  <TypeWriter text={recommendation} delay={20} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default DreamAnalysis;