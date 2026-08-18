'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function OverviewPage() {
  const [selectedLang, setSelectedLang] = useState('Hindi');
  const [isRecording, setIsRecording] = useState(false);

  const languages = ['English', 'Hindi', 'Tamil', 'Telugu', 'Malayalam', 'Kannada', 'Bengali', 'Marathi'];

  return (
    <div className="space-y-8 font-sans">
      
      {/* Voice AI Studio Banner Bento Card (#F7D046) */}
      <div className="p-8 rounded-[28px] bg-[#F7D046] text-stone-900 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        
        <div className="space-y-3 max-w-xl">
          <span className="px-3.5 py-1 rounded-full bg-white/80 text-stone-900 text-xs font-bold uppercase tracking-wider">
            Voice-First AI Studio
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Bolkar Bechen — Voice AI Listing Engine
          </h1>
          <p className="text-xs font-semibold text-stone-800 leading-relaxed">
            Empowering non-digitally literate Indian artisans to record spoken craft descriptions in native dialects. GPT-4o automatically generates story, pricing, and global metadata.
          </p>
        </div>

        {/* Record Button */}
        <button
          onClick={() => setIsRecording(!isRecording)}
          className={`w-32 h-32 rounded-full flex flex-col items-center justify-center text-white font-bold transition-all shadow-xl flex-shrink-0 cursor-pointer ${
            isRecording
              ? 'bg-red-600 animate-pulse scale-105'
              : 'bg-[#1C1C1E] hover:bg-black hover:scale-105'
          }`}
        >
          <span className="material-symbols-outlined text-3xl mb-1">mic</span>
          <span className="text-[10px] uppercase font-black tracking-widest">
            {isRecording ? "LISTENING..." : "SPEAK NOW"}
          </span>
        </button>

      </div>

      {/* Language Dialect Selection Pills */}
      <div className="p-6 rounded-[24px] bg-white border border-stone-200 shadow-sm space-y-3">
        <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
          Select Spoken Language Dialect:
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {languages.map((lang) => {
            const isSelected = selectedLang === lang;
            return (
              <button
                key={lang}
                onClick={() => setSelectedLang(lang)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-[#F498B6] text-[#3b061a] shadow-sm scale-105'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {lang}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4 Feature Bento Cards (Yellow, Pink, Green, Blue) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <Link
          href="/dashboard/new"
          className="p-6 rounded-[24px] bg-[#F7D046] text-stone-900 shadow-sm hover:scale-[1.02] transition-transform space-y-3 block"
        >
          <div className="w-10 h-10 rounded-full bg-white/70 flex items-center justify-center">
            <span className="material-symbols-outlined font-bold">mic</span>
          </div>
          <h3 className="font-extrabold text-lg">1. Speak Craft Story</h3>
          <p className="text-xs font-medium text-stone-800 leading-relaxed">
            Record voice note in Hindi, Maithili, Tamil, or Marathi. OpenAI Whisper transcribes instantly.
          </p>
        </Link>

        <Link
          href="/dashboard/new"
          className="p-6 rounded-[24px] bg-[#F498B6] text-[#3b061a] shadow-sm hover:scale-[1.02] transition-transform space-y-3 block"
        >
          <div className="w-10 h-10 rounded-full bg-white/70 flex items-center justify-center">
            <span className="material-symbols-outlined font-bold text-[#3b061a]">photo_camera</span>
          </div>
          <h3 className="font-extrabold text-lg">2. GPT-4o Photo Vision</h3>
          <p className="text-xs font-medium text-[#713245] leading-relaxed">
            Upload product photo. Vision AI detects craft tradition, motif techniques, and natural dye purity.
          </p>
        </Link>

        <Link
          href="/dashboard/new"
          className="p-6 rounded-[24px] bg-[#88B04B] text-stone-900 shadow-sm hover:scale-[1.02] transition-transform space-y-3 block"
        >
          <div className="w-10 h-10 rounded-full bg-white/70 flex items-center justify-center">
            <span className="material-symbols-outlined font-bold">payments</span>
          </div>
          <h3 className="font-extrabold text-lg">3. Fair Price Guard</h3>
          <p className="text-xs font-medium text-stone-800 leading-relaxed">
            Calculates fair pricing based on raw material cost and labor hours to prevent middleman exploitation.
          </p>
        </Link>

        <Link
          href="/marketplace"
          className="p-6 rounded-[24px] bg-[#8BA3E8] text-stone-900 shadow-sm hover:scale-[1.02] transition-transform space-y-3 block"
        >
          <div className="w-10 h-10 rounded-full bg-white/70 flex items-center justify-center">
            <span className="material-symbols-outlined font-bold">verified</span>
          </div>
          <h3 className="font-extrabold text-lg">4. GI Tag Passport</h3>
          <p className="text-xs font-medium text-stone-800 leading-relaxed">
            Generates downloadable PDF certificate of provenance with ElevenLabs audio story narration.
          </p>
        </Link>

      </div>

    </div>
  );
}
