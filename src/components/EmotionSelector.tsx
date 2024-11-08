import React from 'react';
import { type Emotion } from '../App';

type Props = {
  selectedEmotions: string[];
  setSelectedEmotions: (emotions: string[]) => void;
  emotions: Emotion[];
};

function EmotionSelector({ selectedEmotions, setSelectedEmotions, emotions }: Props) {
  const toggleEmotion = (emotionName: string) => {
    setSelectedEmotions(
      selectedEmotions.includes(emotionName)
        ? selectedEmotions.filter((e) => e !== emotionName)
        : [...selectedEmotions, emotionName]
    );
  };

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {emotions.map((emotion) => (
        <button
          key={emotion.name}
          onClick={() => toggleEmotion(emotion.name)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all text-sm ${
            selectedEmotions.includes(emotion.name)
              ? 'bg-violet-500 text-white'
              : 'bg-purple-900/40 text-purple-200 hover:bg-purple-800/40'
          }`}
        >
          {emotion.icon}
          {emotion.name}
        </button>
      ))}
    </div>
  );
}

export default EmotionSelector;