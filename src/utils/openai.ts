import OpenAI from 'openai';

let openai: OpenAI | null = null;

try {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  if (apiKey && apiKey.trim() !== '') {
    openai = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true
    });
  } else {
    console.warn('OpenAI API key not provided');
  }
} catch (error) {
  console.warn('OpenAI client initialization failed:', error);
}

export async function generateDreamAnalysis(dreamText: string, emotions: string[]) {
  if (!openai) {
    throw new Error('OpenAI client not initialized');
  }

  try {
    const prompt = `As an expert dream analyst combining Jungian psychology, modern neuroscience, and therapeutic approaches, analyze this dream with deep psychological insight:

Dream Content: "${dreamText}"

Emotional Context: The dreamer identified these emotions: ${emotions.join(', ')}

Please provide a comprehensive analysis including:

1. Psychological Interpretation:
- Core symbols and their meanings
- Archetypal elements present
- Emotional significance
- Connection to waking life

2. Key Insights:
- Subconscious patterns revealed
- Inner conflicts or desires expressed
- Personal growth opportunities
- Relationship dynamics

3. Growth Recommendations:
- Practical steps for self-reflection
- Mindfulness practices
- Journaling prompts
- Action items for personal development

Format the response with clear sections for interpretation, insights, and recommendations, focusing on personal growth and psychological understanding.`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert dream analyst combining Jungian psychology, modern neuroscience, and therapeutic approaches. Provide detailed, insightful interpretations that focus on personal growth and psychological understanding. Connect dream symbols to the dreamer's emotional state and offer practical guidance for self-development."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    const analysis = response.choices[0].message.content;
    return parseAIResponse(analysis || '');
  } catch (error: any) {
    if (error?.error?.type === 'insufficient_quota') {
      throw new Error('AI_QUOTA_EXCEEDED');
    }
    throw error;
  }
}

function parseAIResponse(response: string) {
  const sections = response.split('\n\n');
  
  // Extract interpretation (first section)
  const interpretation = sections[0]?.replace(/^(Psychological Interpretation|1\.)[:\s]*/i, '') || 
    "Unable to generate interpretation.";

  // Extract insights (second section)
  const insightsSection = sections.find(s => s.toLowerCase().includes('key insights')) || '';
  const insights = insightsSection
    .split('\n')
    .map(line => line.replace(/^[-•*]\s*/, '').trim())
    .filter(line => line && !line.toLowerCase().includes('key insights'));

  // Extract recommendations (third section)
  const recommendationsSection = sections.find(s => s.toLowerCase().includes('growth recommendations')) || '';
  const recommendations = recommendationsSection
    .split('\n')
    .map(line => line.replace(/^[-•*]\s*/, '').trim())
    .filter(line => line && !line.toLowerCase().includes('growth recommendations'));

  return {
    interpretation,
    insights: insights.length ? insights : ["Unable to generate insights."],
    recommendations: recommendations.length ? recommendations : ["Unable to generate recommendations."]
  };
}