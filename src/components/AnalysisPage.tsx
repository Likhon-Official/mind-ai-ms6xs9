import React, { useState, useEffect } from 'react';
import { ArrowLeft, Brain, Lightbulb, Compass, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

type Props = {
  analysis: {
    interpretation: string;
    insights: string[];
    recommendations: string[];
  };
  onBack: () => void;
  dreamText: string;
  emotions: string[];
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

function AnalysisPage({ analysis, onBack, dreamText, emotions }: Props) {
  const [showInsights, setShowInsights] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);

  return (
    <div className="min-h-screen px-3 py-4 sm:px-4 sm:py-6 bg-gradient-to-br from-purple-950 via-[#1a0b2e] to-[#16082f]">
      <div className="max-w-xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-purple-300 hover:text-purple-200 transition-colors mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span className="text-sm">Back to Dream Input</span>
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-4 mb-4"
        >
          <div className="flex items-start gap-3 text-purple-200 text-sm">
            <div className="flex-shrink-0 mt-1">
              <Sparkles className="w-4 h-4 text-violet-400" />
            </div>
            <div>
              <p className="font-medium mb-1">Your Dream</p>
              <p className="text-purple-300">{dreamText}</p>
              {emotions.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {emotions.map(emotion => (
                    <span
                      key={emotion}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-violet-500/20 text-violet-300"
                    >
                      {emotion}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>

        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-panel p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <Brain className="w-4 h-4 text-violet-400" />
              <h3 className="text-sm font-medium text-purple-200">Dream Interpretation</h3>
            </div>
            <p className="text-purple-100 text-sm leading-relaxed">
              <TypeWriter 
                text={analysis.interpretation} 
                onComplete={() => setShowInsights(true)}
              />
            </p>
          </motion.div>

          {showInsights && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-panel p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-4 h-4 text-violet-400" />
                <h3 className="text-sm font-medium text-purple-200">Key Insights</h3>
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
            </motion.div>
          )}

          {showRecommendations && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="glass-panel p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <Compass className="w-4 h-4 text-violet-400" />
                <h3 className="text-sm font-medium text-purple-200">Recommendations</h3>
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
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AnalysisPage;