'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

export default function RightWidgetPanel() {
  const pathname = usePathname();

  // Exclude RightWidgetPanel (Calendar & Timeline) on specified pages:
  // 1. AI Voice Intake (/dashboard/new)
  // 2. Profile of every artisan (/artisan/[id])
  // 3. Analytics page (/dashboard/analytics)
  // 4. Platform Publish page (/dashboard/listings)
  const isExcludedPath =
    pathname === '/dashboard/new' ||
    pathname.startsWith('/artisan/') ||
    pathname === '/dashboard/analytics' ||
    pathname === '/dashboard/listings' ||
    pathname === '/admin';

  if (isExcludedPath) {
    return null;
  }

  const days = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];
  const calendarDates = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <aside className="w-full lg:w-80 flex-shrink-0 space-y-6 font-sans">
      
      {/* Calendar Card */}
      <div className="p-6 rounded-[28px] bg-white border border-stone-200 shadow-sm space-y-4">
        
        {/* Month Selector */}
        <div className="flex items-center justify-between">
          <span className="material-symbols-outlined text-stone-400 cursor-pointer hover:text-stone-800 text-sm">
            chevron_left
          </span>
          <span className="px-3.5 py-1 rounded-full bg-pink-100 text-pink-900 text-xs font-bold font-mono">
            August 2026
          </span>
          <span className="material-symbols-outlined text-stone-400 cursor-pointer hover:text-stone-800 text-sm">
            chevron_right
          </span>
        </div>

        {/* Days Header */}
        <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-stone-400 uppercase tracking-widest">
          {days.map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>

        {/* Dates Grid */}
        <div className="grid grid-cols-7 gap-1 text-center text-xs">
          {calendarDates.map((date) => {
            const isToday = date === 15 || date === 18;
            return (
              <button
                key={date}
                className={`py-1.5 rounded-full text-xs font-semibold transition-all ${
                  isToday
                    ? 'bg-[#ffb1c4] text-stone-900 shadow-sm font-bold scale-105'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                {date}
              </button>
            );
          })}
        </div>

        {/* Black Add Event Button */}
        <div className="flex items-center gap-2 pt-2">
          <button className="flex-1 py-3 rounded-full bg-[#18181A] hover:bg-black text-white font-bold text-xs uppercase tracking-widest transition-all shadow-sm">
            ADD ARTISAN EVENT
          </button>
        </div>

      </div>

      {/* Timeline List */}
      <div className="p-6 rounded-[28px] bg-white border border-stone-200 shadow-sm space-y-4">
        
        {/* Timeline Header */}
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div>
            <h4 className="font-extrabold text-stone-900 text-sm">August 18</h4>
            <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">TODAY&apos;S TIMELINE</p>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 text-[10px] font-bold">
            All ▾
          </span>
        </div>

        {/* Timeline Items */}
        <div className="space-y-4 text-xs font-sans">
          
          <div className="p-3 rounded-2xl bg-[#FAF8F3] border border-stone-200 flex items-center gap-3 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold flex-shrink-0">
              <span className="material-symbols-outlined text-sm">inventory_2</span>
            </div>
            <div className="overflow-hidden">
              <p className="font-bold text-stone-900 truncate">Order Packaging</p>
              <p className="text-[11px] text-stone-500 truncate">Madhubani Workshop, Room 312</p>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#F5C538]/20 border border-[#F5C538]/50 flex items-center gap-3 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-[#F5C538] text-stone-900 flex items-center justify-center font-bold flex-shrink-0">
              <span className="material-symbols-outlined text-sm">groups</span>
            </div>
            <div className="overflow-hidden">
              <p className="font-bold text-stone-900 truncate">Artisan Guild Consult</p>
              <p className="text-[11px] text-stone-700 truncate">Mithila Heritage Guild, Room 200</p>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#FAF8F3] border border-stone-200 flex items-center gap-3 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold flex-shrink-0">
              <span className="material-symbols-outlined text-sm">mic</span>
            </div>
            <div className="overflow-hidden">
              <p className="font-bold text-stone-900">Voice AI Recording</p>
              <p className="text-[11px] text-stone-500 truncate">Studio 3, Craft Story Narration</p>
            </div>
          </div>

        </div>

      </div>

      {/* AI OPINION CARD (Placed directly below Calendar & Timeline) */}
      <div className="p-6 sm:p-7 rounded-[28px] bg-white border border-stone-200 shadow-sm space-y-5 font-sans">
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-base">lightbulb</span>
            </div>
            <h3 className="text-lg font-black text-stone-900">AI Opinion</h3>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
            BETA
          </span>
        </div>

        {/* Quote Block with Left Yellow Border */}
        <blockquote className="p-3.5 rounded-2xl bg-amber-50/50 border-l-4 border-amber-400 text-stone-800 text-xs font-serif italic leading-relaxed">
          &ldquo;Stress-testing primary hypothesis: International Fair Trade Demand Growth for Indian Craft Lineages.&rdquo;
        </blockquote>

        {/* Sub-card Container for Alternative Considerations */}
        <div className="p-4 rounded-2xl bg-[#F9F9F7] border border-stone-200 space-y-2.5">
          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">
            Alternative Considerations
          </span>

          <ul className="space-y-2.5 text-xs text-stone-700 font-medium">
            <li className="flex items-start gap-2">
              <span className="text-amber-500 font-bold">•</span>
              <span>Direct artisan payout eliminates middleman fees (+35% revenue boost).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500 font-bold">•</span>
              <span>Multi-platform sync to Etsy and Shopify stores.</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-1">
          <button className="w-full py-3 rounded-full border border-stone-300 hover:bg-stone-900 hover:text-white font-extrabold text-xs uppercase tracking-widest transition-all shadow-sm">
            View Full Analysis
          </button>

          <p className="text-center text-xs font-bold text-stone-400 cursor-pointer hover:text-stone-800">
            Test Custom Hypothesis
          </p>
        </div>

      </div>

    </aside>
  );
}
