'use client';

import React, { useState } from 'react';

export default function ArtisanDashboardPage() {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

  const artisanItems = [
    {
      id: "1",
      name: "Sita Devi Mithila",
      craft: "Madhubani Tree of Life",
      riskBadge: "GI Tagged • ₹5,200",
      iconBg: "bg-pink-100 text-pink-600",
      artisanId: "ART-00142",
      age: "28 Yrs Exp",
      craftRegion: "Madhubani, Bihar • Natural Mineral Dyes",
      pricing: "₹5,200",
      tags: ["Madhubani", "Natural Dye", "GI Certified", "Direct Pay"],
      rationale: "Calculated based on 42 hours of intricate freehand penmanship, rare natural mineral pigment extraction, and verified master artisan provenance.",
      authenticity: "Certified 100% handcrafted Madhubani artwork created with natural pigments and bamboo pens. Includes ElevenLabs audio story."
    },
    {
      id: "2",
      name: "Ghulam Hassan Rather",
      craft: "Royal Sozni Pashmina",
      riskBadge: "Verified • ₹32,000",
      iconBg: "bg-[#8EC0F2]/30 text-blue-700",
      artisanId: "ART-00284",
      age: "35 Yrs Exp",
      craftRegion: "Srinagar, J&K • Sozni Embroidery",
      pricing: "₹32,000",
      tags: ["Pashmina", "Sozni Needlework", "GI Hallmark", "Direct Pay"],
      rationale: "Reflects 180 hours of fine needle Sozni embroidery, rare high-altitude Changthangi cashmere fiber purity, and official GI hallmark verification.",
      authenticity: "Certified 100% pure hand-spun Pashmina with verified GI Hallmark and audio provenance."
    },
    {
      id: "3",
      name: "Rameshwar Bhil",
      craft: "Tarpa Dance Warli Art",
      riskBadge: "GI Tagged • ₹3,200",
      iconBg: "bg-purple-100 text-purple-600",
      artisanId: "ART-00310",
      age: "22 Yrs Exp",
      craftRegion: "Palghar, Maharashtra • Rice Paste",
      pricing: "₹3,200",
      tags: ["Warli", "Rice Paste Medium", "GI Tagged", "Direct Pay"],
      rationale: "Valued according to traditional rice medium preparation, tribal iconographic complexity, and master Warli heritage guild certification.",
      authenticity: "Certified authentic Warli painting crafted using natural rice paste on terracotta wash."
    },
    {
      id: "4",
      name: "Bastar Metal Guild",
      craft: "Dhokra Musician Brass",
      riskBadge: "Verified • ₹4,800",
      iconBg: "bg-emerald-100 text-emerald-600",
      artisanId: "ART-00412",
      age: "30 Yrs Lineage",
      craftRegion: "Bastar, Chhattisgarh • Lost Wax Brass",
      pricing: "₹4,800",
      tags: ["Dhokra", "Lost Wax Metallurgy", "Heritage", "Direct Pay"],
      rationale: "Priced based on single-use lost wax mold labor, beeswax thread detail density, and tribal metallurgy heritage preservation.",
      authenticity: "Certified authentic lost-wax brass Dhokra sculpture cast directly by Bastar tribal artisans."
    }
  ];

  const currentItem = artisanItems[selectedItemIndex];

  return (
    <div className="space-y-6 font-sans">
      
      {/* TOP 4 BENTO CARDS (Artisan Platform Metrics & 3D Shapes) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* 1. Yellow Bento Card (#F5C538) - Active Crafts */}
        <div className="p-6 rounded-[28px] bg-[#F5C538] text-stone-900 shadow-sm flex flex-col justify-between space-y-4 relative overflow-hidden">
          {/* Top Right Huge 3D Gold Plus (+) Cross Shape */}
          <div className="absolute top-2 right-2 text-[#DDB028] font-black text-8xl leading-none select-none pointer-events-none opacity-80">
            +
          </div>

          <div className="space-y-4 relative z-10">
            <h3 className="text-2xl font-black">Active Crafts:</h3>
            
            <div className="grid grid-cols-3 gap-2">
              <div>
                <span className="text-3xl font-black">4 <span className="text-xs font-normal">crafts</span></span>
                <p className="text-[10px] font-bold text-stone-800 uppercase tracking-widest mt-0.5">LISTED</p>
              </div>
              <div>
                <span className="text-3xl font-black">1 <span className="text-xs font-normal">craft</span></span>
                <p className="text-[10px] font-bold text-stone-800 uppercase tracking-widest mt-0.5">DRAFT</p>
              </div>
              <div>
                <span className="text-3xl font-black">3 <span className="text-xs font-normal">crafts</span></span>
                <p className="text-[10px] font-bold text-stone-800 uppercase tracking-widest mt-0.5">SOLD</p>
              </div>
            </div>
          </div>

          {/* Bar Chart Graphic */}
          <div className="h-16 flex items-end justify-start gap-2.5 pt-2 relative z-10">
            {[45, 65, 30, 95, 100, 50, 40].map((h, i) => (
              <div key={i} className="w-3.5 bg-stone-900 rounded-t-full" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>

        {/* 2. Pink Bento Card (#F59EB7) - Revenue Summary */}
        <div className="p-6 rounded-[28px] bg-[#F59EB7] text-[#3b061a] shadow-sm flex flex-col justify-between space-y-4 relative overflow-hidden">
          {/* Top Right Huge 3D Translucent Heart Shape */}
          <div className="absolute top-2 right-2 text-[#DB7E9B] font-black text-8xl leading-none select-none pointer-events-none opacity-80">
            ♥
          </div>

          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-black">Revenue summary:</h3>
              <span className="text-xs font-semibold underline text-[#3b061a] cursor-pointer">Show all ...</span>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              <div>
                <span className="text-3xl font-black">₹89.4k</span>
                <p className="text-[10px] font-bold text-[#713245] uppercase tracking-widest mt-0.5">total <span className="block text-[8px] font-normal">TOTAL EARNINGS</span></p>
              </div>
              <div>
                <span className="text-3xl font-black">₹5.2k</span>
                <p className="text-[10px] font-bold text-[#713245] uppercase tracking-widest mt-0.5">avg <span className="block text-[8px] font-normal">AVERAGE PRICE</span></p>
              </div>
              <div>
                <span className="text-3xl font-black">100%</span>
                <p className="text-[10px] font-bold text-[#713245] uppercase tracking-widest mt-0.5">direct <span className="block text-[8px] font-normal">DIRECT PAY</span></p>
              </div>
            </div>
          </div>

          {/* Smooth Line Chart Graphic with Data Dots */}
          <div className="h-16 relative flex items-center justify-center z-10">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 300 60">
              <path
                d="M 0,55 Q 80,60 160,35 T 260,25 T 300,50"
                fill="none"
                stroke="#3b061a"
                strokeWidth="3"
              />
              <circle cx="160" cy="35" r="4" fill="#3b061a" />
              <circle cx="260" cy="25" r="4" fill="#3b061a" />
            </svg>
          </div>
        </div>

        {/* 3. Green Bento Card (#B8CC34) - By GI Tag Status */}
        <div className="p-6 rounded-[28px] bg-[#B8CC34] text-stone-900 shadow-sm flex flex-col justify-between space-y-4 relative overflow-hidden">
          {/* Top Right Huge 3D Translucent Triangle Pyramid Shape */}
          <div className="absolute top-2 right-2 text-[#9EB324] font-black text-8xl leading-none select-none pointer-events-none opacity-80">
            ▲
          </div>

          <div className="space-y-4 relative z-10">
            <h3 className="text-2xl font-black">By GI Tag status:</h3>
            
            <div className="grid grid-cols-3 gap-2">
              <div>
                <span className="text-3xl font-black">3 <span className="text-xs font-normal">crafts</span></span>
                <p className="text-[10px] font-bold text-stone-800 uppercase tracking-widest mt-0.5">GI CERTIFIED</p>
              </div>
              <div>
                <span className="text-3xl font-black">0 <span className="text-xs font-normal">crafts</span></span>
                <p className="text-[10px] font-bold text-stone-800 uppercase tracking-widest mt-0.5">PENDING</p>
              </div>
              <div>
                <span className="text-3xl font-black">1 <span className="text-xs font-normal">craft</span></span>
                <p className="text-[10px] font-bold text-stone-800 uppercase tracking-widest mt-0.5">IN REVIEW</p>
              </div>
            </div>
          </div>

          <div className="h-10" />
        </div>

        {/* 4. Blue Bento Card (#8EC0F2) - Voice AI Studio */}
        <div className="p-6 rounded-[28px] bg-[#8EC0F2] text-stone-900 shadow-sm flex flex-col justify-between space-y-4 relative overflow-hidden">
          {/* Top Right Huge 3D Translucent 5-Point Star Shape */}
          <div className="absolute top-2 right-2 text-[#70A7DB] font-black text-8xl leading-none select-none pointer-events-none opacity-80">
            ★
          </div>

          <div className="space-y-4 relative z-10">
            <h3 className="text-2xl font-black">Voice AI studio:</h3>
            
            <div className="grid grid-cols-3 gap-2">
              <div>
                <span className="text-2xl font-black">02:45 <span className="text-xs block font-bold">h</span></span>
                <p className="text-[9px] font-bold text-stone-800 uppercase tracking-widest mt-0.5">IN STUDIO</p>
              </div>
              <div>
                <span className="text-2xl font-black">01:30 <span className="text-xs block font-bold">min</span></span>
                <p className="text-[9px] font-bold text-stone-800 uppercase tracking-widest mt-0.5">VOICE AI</p>
              </div>
              <div>
                <span className="text-2xl font-black">00:15 <span className="text-xs block font-bold">min</span></span>
                <p className="text-[9px] font-bold text-stone-800 uppercase tracking-widest mt-0.5">TTS AUDIO</p>
              </div>
            </div>
          </div>

          <div className="h-10" />
        </div>

      </div>

      {/* BOTTOM SECTION: Left Artisan Portfolio List & Right Craft & Provenance Details */}
      <div className="space-y-4 pt-2">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Stacked Artisan Portfolio List */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-extrabold text-stone-900">Artisan&apos;s portfolio list</h2>
              <span className="px-3 py-1 rounded-full bg-[#18181A] text-white text-xs font-bold">Today ▾</span>
            </div>

            {artisanItems.map((item, idx) => {
              const isSelected = selectedItemIndex === idx;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItemIndex(idx)}
                  className={`p-3.5 rounded-full border transition-all cursor-pointer flex items-center justify-between shadow-sm ${
                    isSelected
                      ? 'bg-[#FCE3EC] border-[#18181A] ring-2 ring-[#18181A]/20 scale-[1.01]'
                      : 'bg-white border-stone-200 hover:border-stone-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-pink-100 text-[#EC4899] flex items-center justify-center font-black text-sm">
                      ✳
                    </div>
                    <div>
                      <p className="font-black text-stone-900 text-xs">{item.name}</p>
                      <p className="text-[11px] text-[#EC4899] font-semibold">{item.craft}</p>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-white text-stone-900 text-[10px] font-bold shadow-sm">
                    {item.riskBadge}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Right Selected Detail Card (#FCE3EC Soft Pink) */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-extrabold text-stone-900">Craft &amp; Provenance details</h2>
            </div>

            <div className="p-6 rounded-[28px] bg-[#FCE3EC] text-[#3b061a] shadow-sm space-y-4 border border-[#F59EB7]/40">
              
              <div className="flex items-center justify-between border-b border-[#713245]/20 pb-3">
                <div>
                  <h3 className="text-xl font-black text-[#3b061a] underline decoration-[#EC4899] decoration-2 underline-offset-4">
                    {currentItem.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#713245] mt-1">{currentItem.age} • {currentItem.craftRegion}</p>
                </div>
                <span className="px-3.5 py-1 rounded-full bg-white text-[#3b061a] text-xs font-mono font-bold shadow-sm">
                  ID: {currentItem.artisanId}
                </span>
              </div>

              {/* Tag Pills */}
              <div className="flex flex-wrap gap-2">
                {currentItem.tags.map((tag: string, i: number) => (
                  <span key={i} className="px-3 py-1 rounded-full bg-[#F59EB7]/40 text-[#3b061a] text-xs font-bold">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Price Rationale */}
              <div className="p-4 rounded-2xl bg-white/70 space-y-1 text-xs">
                <span className="font-bold text-[#713245] uppercase text-[10px]">GPT-4o Pricing Rationale:</span>
                <p className="font-medium text-[#3b061a] leading-relaxed">{currentItem.rationale}</p>
              </div>

              {/* Authentication Statement */}
              <div className="p-4 rounded-2xl bg-white/70 space-y-1 text-xs">
                <span className="font-bold text-[#713245] uppercase text-[10px]">Verified Cultural Authentication:</span>
                <p className="font-medium text-[#3b061a] leading-relaxed">{currentItem.authenticity}</p>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
