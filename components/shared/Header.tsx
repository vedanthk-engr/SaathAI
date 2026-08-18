'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useArtisanProfile } from '@/context/ArtisanContext';

export default function Header() {
  const pathname = usePathname();
  const { currentArtisan, setArtisanById, artisans } = useArtisanProfile();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Show "Good morning" banner ONLY on main dashboard or home page
  const isMainDashboard = pathname === '/dashboard' || pathname === '/';

  return (
    <header className="w-full py-2 font-sans space-y-4">
      
      {/* Top Bar with Search & Action Icons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Left Section Title & Status */}
        <div className="flex items-center gap-4">
          <div>
            <h2 className="text-xl font-black text-stone-900 tracking-tight">Haath Platform</h2>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">SYSTEM STATUS:</span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" /> OPTIMAL
              </span>
            </div>
          </div>
        </div>

        {/* Center Search Input */}
        <div className="flex-1 max-w-xl mx-auto w-full">
          <div className="relative flex items-center bg-white rounded-full border border-stone-200 shadow-sm p-1.5">
            <span className="material-symbols-outlined text-stone-400 text-base ml-2 pointer-events-none">
              search
            </span>
            <input
              type="text"
              placeholder="Search crafts, artisans, GI tags, orders..."
              className="w-full bg-transparent text-xs font-medium text-stone-900 placeholder-stone-400 focus:outline-none px-2"
            />
            <span className="px-3 py-1 rounded-full bg-stone-900 text-white text-[10px] font-bold uppercase tracking-wider">
              In: Artisans
            </span>
          </div>
        </div>

        {/* Right 3 Action Icons + ARTISAN PROFILE SWITCHER DROPDOWN */}
        <div className="flex items-center gap-3 self-end md:self-auto relative">
          
          <button className="w-9 h-9 rounded-full bg-[#18181A] text-white flex items-center justify-center shadow-sm hover:scale-105 transition-transform relative">
            <span className="material-symbols-outlined text-sm">notifications</span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#ffb1c4]" />
          </button>
          
          <button className="w-9 h-9 rounded-full bg-[#18181A] text-white flex items-center justify-center shadow-sm hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-sm">settings</span>
          </button>
          
          <button className="w-9 h-9 rounded-full bg-[#18181A] text-white flex items-center justify-center shadow-sm hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-sm">help</span>
          </button>

          {/* ARTISAN PROFILE SWITCHER BUTTON (Initial Circle Badge) */}
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-full bg-white border border-stone-200 shadow-sm hover:bg-stone-50 transition-all text-xs font-bold"
          >
            <div className="w-7 h-7 rounded-full bg-[#ffb1c4] text-[#3b061a] font-black flex items-center justify-center text-xs shadow-sm">
              {currentArtisan.name.charAt(0)}
            </div>
            <span className="text-stone-900 font-extrabold truncate max-w-[110px]">
              {currentArtisan.shortName}
            </span>
            <span className="material-symbols-outlined text-stone-500 text-sm">
              arrow_drop_down
            </span>
          </button>

          {/* ARTISAN SWITCHER POPOVER DROPDOWN MENU */}
          {isDropdownOpen && (
            <div className="absolute top-12 right-0 z-50 w-72 p-3 rounded-[24px] bg-white border border-stone-200 shadow-2xl space-y-2 animate-fadeIn">
              <div className="px-3 py-2 border-b border-stone-100">
                <span className="text-[9px] font-mono font-bold text-stone-400 uppercase tracking-widest block">
                  SWITCH ACTIVE ARTISAN PROFILE
                </span>
                <p className="text-xs font-extrabold text-stone-900 mt-0.5">Select Karigar Account</p>
              </div>

              <div className="space-y-1">
                {artisans.map((artisan) => {
                  const isSelected = artisan.id === currentArtisan.id;
                  return (
                    <button
                      key={artisan.id}
                      onClick={() => {
                        setArtisanById(artisan.id);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full p-2.5 rounded-xl flex items-center justify-between text-left transition-all ${
                        isSelected
                          ? 'bg-[#18181A] text-white shadow-sm'
                          : 'hover:bg-stone-100 text-stone-800'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-full font-black flex items-center justify-center text-xs shadow-sm ${
                          isSelected ? 'bg-[#ffb1c4] text-[#3b061a]' : 'bg-stone-200 text-stone-800'
                        }`}>
                          {artisan.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-xs font-extrabold leading-tight">{artisan.name}</p>
                          <p className={`text-[10px] font-medium ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                            {artisan.craft}
                          </p>
                        </div>
                      </div>
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-[#ffb1c4]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Main Greeting Banner — Rendered ONLY on Dashboard */}
      {isMainDashboard && (
        <div className="space-y-1 pt-2">
          <h1 className="text-4xl font-black text-stone-900 tracking-tight">
            Good morning, {currentArtisan.shortName}
          </h1>
          <p className="text-xs text-stone-500 font-medium max-w-3xl leading-relaxed">
            Haath AI wishes you a good and productive day. Active craft tradition: <strong className="text-stone-900">{currentArtisan.craft}</strong> ({currentArtisan.region}). You have {currentArtisan.pendingListings} voice listing review pending today.
          </p>
        </div>
      )}

    </header>
  );
}
