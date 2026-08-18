'use client';

import React, { useState } from 'react';
import { Search, X, Loader2 } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

export default function SearchBar({ onSearch, isLoading = false }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className="relative max-w-2xl w-full mx-auto font-sans">
      <div className="relative flex items-center">
        <div className="absolute left-4 text-[#C86A4B] pointer-events-none font-serif text-lg">
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin text-[#C86A4B]" /> : '✴'}
        </div>
        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Try semantic search e.g. 'hand-painted tree of life canvas from Bihar' or 'pashmina shawls'..."
          className="w-full pl-12 pr-28 py-3.5 rounded-full bg-white/90 border border-[#2A1810]/20 focus:border-[#C86A4B] text-[#2A1810] placeholder-[#2A1810]/40 text-xs font-medium shadow-sm focus:outline-none transition-all"
        />

        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-24 text-stone-400 hover:text-stone-600 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <button
          type="submit"
          className="absolute right-1.5 px-5 py-2 rounded-full bg-[#1C100B] hover:bg-[#C86A4B] text-[#F8F3E8] font-semibold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center gap-1.5"
        >
          <Search className="w-3.5 h-3.5 text-[#E5A83B]" /> Search
        </button>
      </div>
    </form>
  );
}
