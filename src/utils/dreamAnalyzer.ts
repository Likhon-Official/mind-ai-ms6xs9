import { generateDreamAnalysis } from './openai';
import { mockDreamAnalysis } from './mockDreamAPI';

type AnalysisResult = {
  interpretation: string;
  insights: string[];
  recommendations: string[];
};

export async function analyzeDream(dreamText: string, emotions: string[]): Promise<AnalysisResult> {
  // Minimum delay of 4-6 seconds to simulate AI thinking
  const minDelay = 4000;
  const maxDelay = 6000;
  const randomDelay = Math.random() * (maxDelay - minDelay) + minDelay;
  await new Promise(resolve => setTimeout(resolve, randomDelay));

  try {
    if (!import.meta.env.VITE_OPENAI_API_KEY || import.meta.env.VITE_OPENAI_API_KEY.trim() === '') {
      console.log('No API key provided, using mock analysis');
      return await mockDreamAnalysis(dreamText, emotions);
    }

    try {
      return await generateDreamAnalysis(dreamText, emotions);
    } catch (error: any) {
      if (error?.message === 'AI_QUOTA_EXCEEDED') {
        console.log('AI quota exceeded, falling back to mock analysis');
      } else {
        console.error('AI analysis failed:', error);
      }
      return await mockDreamAnalysis(dreamText, emotions);
    }
  } catch (error) {
    console.error('Analysis failed:', error);
    return {
      interpretation: "I couldn't analyze your dream right now. Please try again in a moment.",
      insights: ["The analysis system needs a brief break"],
      recommendations: ["Try sharing your dream again in a few moments"]
    };
  }
}