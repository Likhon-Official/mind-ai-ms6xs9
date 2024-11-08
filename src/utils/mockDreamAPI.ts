import { type Emotion } from '../App';

const dreamThemes = {
  flying: {
    meaning: 'feeling free and limitless',
    insights: [
      'You might be looking for more freedom in your life',
      'You have a strong desire to rise above current challenges',
      'Your spirit is ready to explore new possibilities',
      'You want to break free from something holding you back'
    ]
  },
  falling: {
    meaning: 'feeling uncertain or worried',
    insights: [
      'You might be worried about losing control',
      'Something in your life feels unstable',
      'You need to learn to let go and trust',
      'A situation is making you feel helpless'
    ]
  },
  water: {
    meaning: 'dealing with emotions',
    insights: [
      'Your emotions are trying to tell you something',
      'You need to address some deep feelings',
      'It\'s time to go with the flow of life',
      'Your feelings need attention and care'
    ]
  },
  chase: {
    meaning: 'avoiding something important',
    insights: [
      'There\'s something you need to face',
      'You might be running from a decision',
      'It\'s time to stop avoiding a challenge',
      'Face your fears to find peace'
    ]
  },
  teeth: {
    meaning: 'concerns about strength or confidence',
    insights: [
      'You might be feeling powerless',
      'Your confidence needs attention',
      'It\'s time to speak up for yourself',
      'You\'re going through personal growth'
    ]
  }
};

const emotionalInsights = {
  Joy: ['You\'re in a good place for growth', 'Your happiness is showing you the way', 'Keep following what brings you joy'],
  Fear: ['Face your fears one step at a time', 'Your fears are pointing to what needs attention', 'Trust your inner strength'],
  Sadness: ['Give yourself time to heal', 'Your feelings are valid', 'This too shall pass'],
  Anxiety: ['Take things one day at a time', 'Remember to breathe', 'Small steps lead to big changes'],
  Peace: ['You\'re on the right path', 'Trust your inner wisdom', 'Keep nurturing your peace'],
  Confusion: ['Clarity will come with time', 'Trust your gut feelings', 'Take time to reflect']
};

const personalGrowthRecommendations = {
  Joy: [
    'Share your happiness with others',
    'Write down what makes you happy',
    'Build on this positive energy'
  ],
  Fear: [
    'Take small steps to face your fears',
    'Talk to someone you trust',
    'Practice deep breathing when scared'
  ],
  Sadness: [
    'Be gentle with yourself',
    'Do something that comforts you',
    'Connect with supportive friends'
  ],
  Anxiety: [
    'Try a simple breathing exercise',
    'Take a calming walk',
    'Write down your worries'
  ],
  Peace: [
    'Make time for quiet moments',
    'Continue your peaceful practices',
    'Share your calm with others'
  ],
  Confusion: [
    'Take time to sit quietly',
    'Write down your thoughts',
    'Talk it out with someone'
  ]
};

function analyzeContent(text: string): string[] {
  const words = text.toLowerCase().split(' ');
  return Object.keys(dreamThemes).filter(theme => words.includes(theme));
}

function generatePersonalizedInsights(themes: string[], emotions: string[]): string[] {
  const insights: string[] = [];
  
  themes.forEach(theme => {
    const themeData = dreamThemes[theme as keyof typeof dreamThemes];
    if (themeData) {
      insights.push(...themeData.insights);
    }
  });

  emotions.forEach(emotion => {
    const emotionData = emotionalInsights[emotion as keyof typeof emotionalInsights];
    if (emotionData) {
      insights.push(...emotionData);
    }
  });

  return [...new Set(insights)];
}

function generateRecommendations(emotions: string[]): string[] {
  const recommendations: string[] = [
    'Keep a dream journal by your bed',
    'Take a moment to reflect each morning',
    'Notice patterns in your dreams'
  ];

  emotions.forEach(emotion => {
    const emotionRecs = personalGrowthRecommendations[emotion as keyof typeof personalGrowthRecommendations];
    if (emotionRecs) {
      recommendations.push(...emotionRecs);
    }
  });

  return [...new Set(recommendations)];
}

function generateInterpretation(themes: string[], emotions: string[]): string {
  let interpretation = 'Your dream suggests that ';

  // Theme interpretation
  if (themes.length > 0) {
    interpretation += themes.map(theme => {
      const themeData = dreamThemes[theme as keyof typeof dreamThemes];
      return `you're ${themeData.meaning}`;
    }).join(', and ') + '. ';
  }

  // Emotional analysis
  if (emotions.length > 0) {
    interpretation += '\n\nYour feelings in the dream show that ' + emotions.map(emotion => {
      const insights = emotionalInsights[emotion as keyof typeof emotionalInsights];
      return insights?.[0].toLowerCase();
    }).join(', and ') + '. ';
  }

  // Add supportive message
  interpretation += '\n\nRemember, dreams often reflect our inner thoughts and feelings. Let\'s explore what this means for you.';

  return interpretation;
}

export async function mockDreamAnalysis(dreamText: string, emotions: string[]) {
  const themes = analyzeContent(dreamText);
  const insights = generatePersonalizedInsights(themes, emotions);
  const recommendations = generateRecommendations(emotions);
  const interpretation = generateInterpretation(themes, emotions);

  return {
    interpretation,
    insights: insights.slice(0, 4),
    recommendations: recommendations.slice(0, 3)
  };
}