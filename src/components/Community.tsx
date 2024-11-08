import React, { useState } from 'react';
import { Users, MessageSquare, ThumbsUp } from 'lucide-react';
import { type Emotion, emotions } from '../App';

type Post = {
  id: number;
  content: string;
  emotions: string[];
  likes: number;
  comments: number;
};

function Community() {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [posts] = useState<Post[]>([
    {
      id: 1,
      content: "I had a dream about flying over mountains...",
      emotions: ['Joy', 'Peace'],
      likes: 12,
      comments: 5
    },
    {
      id: 2,
      content: "In my dream, I was back in school but couldn't find my classroom...",
      emotions: ['Anxiety', 'Confusion'],
      likes: 8,
      comments: 3
    }
  ]);

  const filteredPosts = selectedFilter
    ? posts.filter(post => post.emotions.includes(selectedFilter))
    : posts;

  return (
    <div className="bg-purple-900/20 backdrop-blur-sm rounded-xl p-4">
      <div className="flex items-center gap-2 mb-4">
        <Users className="w-4 h-4 text-violet-400" />
        <h2 className="text-base font-semibold text-purple-200">Dream Community</h2>
      </div>

      <div className="mb-4">
        <h3 className="text-purple-200 text-sm mb-2">Filter by emotion:</h3>
        <div className="flex flex-wrap gap-2">
          {emotions.map((emotion) => (
            <button
              key={emotion.name}
              onClick={() => setSelectedFilter(
                selectedFilter === emotion.name ? null : emotion.name
              )}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all text-sm ${
                selectedFilter === emotion.name
                  ? 'bg-violet-500 text-white'
                  : 'bg-purple-900/40 text-purple-200 hover:bg-purple-800/40'
              }`}
            >
              {emotion.icon}
              {emotion.name}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-purple-950/30 rounded-lg p-3 border border-purple-700/30"
          >
            <p className="text-purple-100 text-sm mb-2">{post.content}</p>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {post.emotions.map((emotion) => {
                const emotionData = emotions.find(e => e.name === emotion);
                return (
                  <span
                    key={emotion}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs bg-violet-500 text-white"
                  >
                    {emotionData?.icon}
                    {emotion}
                  </span>
                );
              })}
            </div>
            <div className="flex gap-3 text-purple-300">
              <button className="flex items-center gap-1 hover:text-purple-100 text-xs">
                <ThumbsUp className="w-3 h-3" />
                {post.likes}
              </button>
              <button className="flex items-center gap-1 hover:text-purple-100 text-xs">
                <MessageSquare className="w-3 h-3" />
                {post.comments}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Community;