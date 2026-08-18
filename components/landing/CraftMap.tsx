'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, Award, ArrowRight, Sparkles } from 'lucide-react';

interface StateCraftData {
  state: string;
  craftCount: number;
  topCrafts: string[];
  giTagCount: number;
  xPct: number;
  yPct: number;
}

const STATE_CRAFTS: StateCraftData[] = [
  { state: "Bihar", craftCount: 14, topCrafts: ["Madhubani Painting", "Sujini Embroidery", "Manjusha Art"], giTagCount: 5, xPct: 62, yPct: 40 },
  { state: "Maharashtra", craftCount: 18, topCrafts: ["Warli Tribal Art", "Paithani Saree", "Kolhapuri Chappl"], giTagCount: 8, xPct: 35, yPct: 58 },
  { state: "Jammu & Kashmir", craftCount: 12, topCrafts: ["Kashmiri Pashmina", "Kani Shawls", "Papier-Mâché"], giTagCount: 7, xPct: 32, yPct: 15 },
  { state: "Chhattisgarh", craftCount: 9, topCrafts: ["Dhokra Metal Casting", "Tussar Silk", "Bastar Wooden Craft"], giTagCount: 4, xPct: 52, yPct: 50 },
  { state: "Tamil Nadu", craftCount: 22, topCrafts: ["Kanjivaram Silk", "Tanjore Painting", "Swamimalai Bronze"], giTagCount: 11, xPct: 42, yPct: 82 },
  { state: "Karnataka", craftCount: 16, topCrafts: ["Bidriware", "Channapatna Wooden Toys", "Mysore Silk"], giTagCount: 9, xPct: 36, yPct: 70 },
  { state: "Punjab", craftCount: 8, topCrafts: ["Phulkari Embroidery", "Jutti Footwear"], giTagCount: 3, xPct: 34, yPct: 24 },
  { state: "Odisha", craftCount: 15, topCrafts: ["Odisha Pattachitra", "Sambalpuri Handloom", "Silver Filigree"], giTagCount: 6, xPct: 60, yPct: 52 },
  { state: "Andhra Pradesh", craftCount: 13, topCrafts: ["Srikalahasti Kalamkari", "Mangalagiri Silk", "Kondapalli Toys"], giTagCount: 6, xPct: 45, yPct: 68 },
];

export default function CraftMap() {
  const [activeState, setActiveState] = useState<StateCraftData>(STATE_CRAFTS[0]);

  return (
    <section className="py-24 bg-[#F8F3E8] border-t border-[#2A1810]/10 font-serif">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-[#C86A4B]/40 text-[#C86A4B] text-xs font-sans font-semibold tracking-widest uppercase">
            <span>✴</span> Cultural Heritage Geography
          </div>
          <h2 className="font-serif font-light text-4xl sm:text-6xl text-[#2A1810] tracking-tight">
            India&apos;s Living Craft Map
          </h2>
          <p className="font-serif italic text-base sm:text-xl text-[#2A1810]/75">
            Discover regional heritage traditions, GI tags, and direct master artisan profiles across India.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Map Interactive Container */}
          <div className="lg:col-span-7 bg-white/80 p-8 rounded-[24px] border border-[#2A1810]/15 shadow-xl relative min-h-[460px] flex items-center justify-center overflow-hidden">
            
            <svg viewBox="0 0 600 650" className="w-full h-full max-h-[480px] opacity-15 text-[#2A1810] fill-current">
              <path d="M 220 50 L 300 40 L 350 70 L 320 120 L 400 150 L 480 200 L 420 280 L 450 350 L 380 440 L 300 550 L 250 620 L 220 540 L 160 420 L 140 320 L 180 220 L 150 160 Z" />
            </svg>

            {STATE_CRAFTS.map((sc) => {
              const isSelected = activeState.state === sc.state;
              return (
                <button
                  key={sc.state}
                  onClick={() => setActiveState(sc)}
                  onMouseEnter={() => setActiveState(sc)}
                  style={{ left: `${sc.xPct}%`, top: `${sc.yPct}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-full transition-all duration-300 flex items-center gap-1.5 font-sans ${
                    isSelected
                      ? 'bg-[#C86A4B] text-white scale-125 z-30 shadow-copper-glow ring-4 ring-[#C86A4B]/20'
                      : 'bg-[#1C100B]/80 hover:bg-[#C86A4B] text-white scale-100 z-20'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5 text-[#E5A83B]" />
                  <span className="text-[11px] font-semibold px-1 hidden sm:inline">{sc.state}</span>
                  <span className="w-4 h-4 rounded-full bg-[#E5A83B] text-[#1C100B] text-[10px] font-bold flex items-center justify-center">
                    {sc.craftCount}
                  </span>
                </button>
              );
            })}

          </div>

          {/* Active State Panel (Espresso Card in Inspiration Style) */}
          <div className="lg:col-span-5">
            <div className="p-8 rounded-[24px] bg-[#1C100B] text-[#F8F3E8] shadow-2xl border border-[#C86A4B]/30 space-y-6">
              
              <div className="flex items-center justify-between border-b border-stone-800 pb-4">
                <div>
                  <span className="text-[10px] font-sans font-semibold text-[#E5A83B] uppercase tracking-widest">Selected Region</span>
                  <h3 className="font-serif font-normal text-3xl text-[#F8F3E8] mt-1 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#C86A4B]" /> {activeState.state}
                  </h3>
                </div>
                <div className="text-right font-serif">
                  <span className="text-3xl text-[#E5A83B] font-light">{activeState.craftCount}</span>
                  <p className="text-[10px] font-sans text-[#F8F3E8]/60 uppercase tracking-wider">Traditions</p>
                </div>
              </div>

              <div className="space-y-3">
                <span className="text-[10px] font-sans font-bold text-[#E8A598] uppercase tracking-widest flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-[#E5A83B]" /> Registered Traditions
                </span>

                <div className="space-y-2 font-sans text-xs">
                  {activeState.topCrafts.map((craft, i) => (
                    <div key={i} className="p-3 rounded-xl bg-[#231510] border border-stone-800 text-[#F8F3E8] flex items-center justify-between">
                      <span>{craft}</span>
                      <span className="text-[10px] text-[#E5A83B] font-mono">GI Certified</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-stone-800 flex items-center justify-between font-sans text-xs">
                <span className="text-[#F8F3E8]/60">{activeState.giTagCount} Registered GI Certifications</span>
                <Link
                  href={`/marketplace?region=${encodeURIComponent(activeState.state)}`}
                  className="px-5 py-2.5 rounded-full bg-[#C86A4B] hover:bg-[#AA4E31] text-[#F8F3E8] font-semibold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-sm"
                >
                  Browse {activeState.state} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
