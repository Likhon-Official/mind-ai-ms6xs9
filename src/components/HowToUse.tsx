import React from 'react';
import { ArrowLeft, BookOpen, Sparkles, Brain, Heart } from 'lucide-react';

type Props = {
  onBack: () => void;
};

function HowToUse({ onBack }: Props) {
  return (
    <div className="min-h-screen px-3 py-4 sm:px-4 sm:py-6 bg-gradient-to-br from-purple-950 via-[#1a0b2e] to-[#16082f]">
      <div className="max-w-xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-purple-300 hover:text-purple-200 transition-colors mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span className="text-sm">Back to Dream Analysis</span>
        </button>

        <div className="space-y-6">
          <div className="glass-panel p-6">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-5 h-5 text-violet-400" />
              <h1 className="text-xl font-semibold text-purple-100">How to Use Mind AI</h1>
            </div>
            
            <div className="space-y-6">
              <section className="space-y-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-violet-400" />
                  <h2 className="text-base font-medium text-purple-200">Step 1: Describe Your Dream</h2>
                </div>
                <p className="text-sm text-purple-300 leading-relaxed pl-6">
                  Write down your dream in as much detail as you remember. Include key events, 
                  feelings, people, or objects that stood out to you. The more details you provide, 
                  the better the analysis will be.
                </p>
              </section>

              <section className="space-y-3">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-violet-400" />
                  <h2 className="text-base font-medium text-purple-200">Step 2: Select Emotions</h2>
                </div>
                <p className="text-sm text-purple-300 leading-relaxed pl-6">
                  Choose the emotions that best describe how you felt during or after the dream. 
                  You can select multiple emotions to get a more accurate analysis. These emotions 
                  help provide context for your dream interpretation.
                </p>
              </section>

              <section className="space-y-3">
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-violet-400" />
                  <h2 className="text-base font-medium text-purple-200">Step 3: Analyze</h2>
                </div>
                <p className="text-sm text-purple-300 leading-relaxed pl-6">
                  Click the Analyze button to receive your personalized dream interpretation. 
                  The analysis includes:
                </p>
                <ul className="space-y-2 pl-6">
                  <li className="text-sm text-purple-300 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-1.5 flex-shrink-0" />
                    <span>A detailed interpretation of your dream's meaning</span>
                  </li>
                  <li className="text-sm text-purple-300 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-1.5 flex-shrink-0" />
                    <span>Key insights about your subconscious mind</span>
                  </li>
                  <li className="text-sm text-purple-300 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-1.5 flex-shrink-0" />
                    <span>Personalized recommendations for growth</span>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowToUse;