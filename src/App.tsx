import React, { useState } from 'react';
import { CircuitBoard, Smile, Skull, Cloud, Brain, Heart, HelpCircle } from 'lucide-react';
import DreamInput from './components/DreamInput';
import EmotionSelector from './components/EmotionSelector';
import Navigation from './components/Navigation';
import Journal from './components/Journal';
import Community from './components/Community';
import AnalysisPage from './components/AnalysisPage';
import HowToUse from './components/HowToUse';
import Footer from './components/Footer';
import { analyzeDream } from './utils/dreamAnalyzer';

export type Emotion = {
  name: string;
  icon: React.ReactNode;
  color: string;
};

export const emotions: Emotion[] = [
  { name: 'Joy', icon: <Smile className="w-3.5 h-3.5" />, color: 'bg-yellow-500' },
  { name: 'Fear', icon: <Skull className="w-3.5 h-3.5" />, color: 'bg-red-500' },
  { name: 'Sadness', icon: <Cloud className="w-3.5 h-3.5" />, color: 'bg-blue-500' },
  { name: 'Anxiety', icon: <Brain className="w-3.5 h-3.5" />, color: 'bg-orange-500' },
  { name: 'Peace', icon: <Heart className="w-3.5 h-3.5" />, color: 'bg-green-500' },
  { name: 'Confusion', icon: <HelpCircle className="w-3.5 h-3.5" />, color: 'bg-purple-500' },
];

function App() {
  const [activeTab, setActiveTab] = useState<'analyze' | 'community' | 'journal'>('analyze');
  const [dreamText, setDreamText] = useState('');
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [analysis, setAnalysis] = useState<Awaited<ReturnType<typeof analyzeDream>> | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showHowToUse, setShowHowToUse] = useState(false);

  const handleDreamSubmit = async () => {
    if (dreamText.trim()) {
      setIsAnalyzing(true);
      try {
        const result = await analyzeDream(dreamText, selectedEmotions);
        setAnalysis(result);
      } catch (error) {
        console.error('Analysis failed:', error);
      } finally {
        setIsAnalyzing(false);
      }
    }
  };

  const resetAnalysis = () => {
    setAnalysis(null);
    setDreamText('');
    setSelectedEmotions([]);
    setShowHowToUse(false);
  };

  if (showHowToUse) {
    return <HowToUse onBack={() => setShowHowToUse(false)} />;
  }

  if (analysis) {
    return <AnalysisPage analysis={analysis} onBack={resetAnalysis} dreamText={dreamText} emotions={selectedEmotions} />;
  }

  return (
    <div className="min-h-screen px-3 py-4 sm:px-4 sm:py-6 relative bg-gradient-to-br from-purple-950 via-[#1a0b2e] to-[#16082f]">
      <div className="max-w-xl mx-auto relative">
        <header className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-1">
            <CircuitBoard className="w-6 h-6 text-violet-400" />
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-purple-400">
              Mind AI
            </h1>
          </div>
          <p className="text-purple-300/80 text-xs">AI-Powered Dream Analysis</p>
        </header>

        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="mt-4">
          {activeTab === 'analyze' && (
            <div className="space-y-4">
              <DreamInput
                dreamText={dreamText}
                setDreamText={setDreamText}
                onSubmit={handleDreamSubmit}
                isAnalyzing={isAnalyzing}
                onHowToUse={() => setShowHowToUse(true)}
              />
              <EmotionSelector
                selectedEmotions={selectedEmotions}
                setSelectedEmotions={setSelectedEmotions}
                emotions={emotions}
              />
            </div>
          )}
          {activeTab === 'community' && <Community />}
          {activeTab === 'journal' && <Journal />}
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;