'use client';

import React, { useState, useRef } from 'react';
import { Play, Pause, BookOpen, Sparkles } from 'lucide-react';

interface CulturalStoryPlayerProps {
  narrationUrl?: string | null;
  provenanceNote: string;
  artisanName: string;
  craftTradition: string;
}

export default function CulturalStoryPlayer({
  narrationUrl,
  provenanceNote,
  artisanName,
  craftTradition
}: CulturalStoryPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(e => console.log('Audio autoplay:', e));
      setIsPlaying(true);
    }
  };

  const activeAudioSrc = narrationUrl || "https://actions.google.com/sounds/v1/speech/greeting.ogg";

  return (
    <div className="p-8 rounded-[24px] bg-gradient-to-br from-[#231510] via-[#1C100B] to-[#140A07] text-[#F8F3E8] border border-[#C86A4B]/30 shadow-espresso-card space-y-6 font-serif relative overflow-hidden">
      
      {/* Background Watermark */}
      <div className="absolute -right-8 -bottom-8 opacity-5 pointer-events-none select-none font-serif text-9xl text-[#C86A4B]">
        कथा
      </div>

      <audio ref={audioRef} src={activeAudioSrc} onEnded={() => setIsPlaying(false)} />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-stone-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#C86A4B] text-[#F8F3E8] flex items-center justify-center shadow-md">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif font-normal text-2xl text-[#F8F3E8] flex items-center gap-2">
              Cultural Story &amp; Provenance
            </h3>
            <p className="font-sans text-xs text-[#F8F3E8]/60">Narrated Audio Story of {craftTradition} by {artisanName}</p>
          </div>
        </div>

        <button
          onClick={toggleAudio}
          className="px-6 py-2.5 rounded-full bg-[#C86A4B] hover:bg-[#AA4E31] text-[#F8F3E8] font-sans font-semibold text-xs uppercase tracking-widest flex items-center gap-2 shadow-copper-glow transition-all"
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          {isPlaying ? "Pause Story" : "Listen to Provenance"}
        </button>
      </div>

      {/* Waveform graphic */}
      <div className="flex items-center gap-1.5 py-2 justify-center">
        {[40, 65, 30, 85, 95, 50, 70, 90, 40, 60, 100, 75, 45, 80, 55, 35, 90, 65, 40, 85].map((height, i) => (
          <div
            key={i}
            className={`w-1.5 rounded-full transition-all duration-300 ${
              isPlaying ? 'bg-[#C86A4B] animate-pulse' : 'bg-stone-700'
            }`}
            style={{ height: isPlaying ? `${height}%` : `${height * 0.4}%`, maxHeight: '36px', minHeight: '8px' }}
          />
        ))}
      </div>

      {/* Styled Blockquote with Craft Border */}
      <blockquote className="p-6 rounded-2xl bg-[#1C100B] border-l-4 border-[#C86A4B] shadow-inner space-y-3 relative">
        <div className="flex items-center gap-1.5 text-[10px] font-sans font-bold text-[#E8A598] uppercase tracking-widest">
          <span>✴</span> Living Heritage Provenance Note
        </div>
        <p className="font-serif italic text-[#F8F3E8] text-lg leading-relaxed">
          &ldquo;{provenanceNote}&rdquo;
        </p>
        <footer className="text-xs text-[#F8F3E8]/60 font-sans pt-1">
          — Documented from {artisanName}, Master Practitioner of {craftTradition}
        </footer>
      </blockquote>

    </div>
  );
}
