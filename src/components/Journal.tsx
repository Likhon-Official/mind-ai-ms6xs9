import React, { useState } from 'react';
import { BookOpen, Plus } from 'lucide-react';

function Journal() {
  const [entries, setEntries] = useState<{ date: string; content: string }[]>([]);
  const [newEntry, setNewEntry] = useState('');

  const addEntry = () => {
    if (newEntry.trim()) {
      setEntries([
        { date: new Date().toLocaleDateString(), content: newEntry },
        ...entries,
      ]);
      setNewEntry('');
    }
  };

  return (
    <div className="bg-purple-900/20 backdrop-blur-sm rounded-xl p-4">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-4 h-4 text-violet-400" />
        <h2 className="text-base font-semibold text-purple-200">Dream Journal</h2>
      </div>

      <div className="mb-4">
        <textarea
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
          placeholder="Write your thoughts and reflections..."
          className="w-full h-24 bg-purple-950/30 text-purple-100 placeholder-purple-400 rounded-lg p-3 text-sm border border-purple-700/30 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 focus:outline-none resize-none"
        />
        <button
          onClick={addEntry}
          className="mt-2 flex items-center justify-center gap-1.5 bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded-lg transition-colors text-sm w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" />
          Add Entry
        </button>
      </div>

      <div className="space-y-3">
        {entries.map((entry, index) => (
          <div
            key={index}
            className="bg-purple-950/30 rounded-lg p-3 border border-purple-700/30"
          >
            <div className="text-purple-400 text-xs mb-1">{entry.date}</div>
            <p className="text-purple-100 text-sm">{entry.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Journal;