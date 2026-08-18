'use client';

import React from 'react';
import Link from 'next/link';
import { Play, Mic, ShoppingBag } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative min-h-[88vh] bg-[#F8F3E8] flex flex-col justify-between overflow-hidden pt-8 pb-0 font-serif">
      
      {/* Background Radial Sun Glow */}
      <div className="absolute inset-0 bg-radial-sun pointer-events-none" />

      {/* Main Hero Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex-1 flex flex-col justify-center items-center text-center">
        
        {/* Top Header Emblems & Hero Section */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 items-center gap-6 mb-6">
          
          {/* Left Circular Emblem Stamp */}
          <div className="hidden lg:flex lg:col-span-3 flex-col items-center">
            <div className="relative w-28 h-28 rounded-full border border-[#2A1810]/20 flex items-center justify-center p-2">
              <div className="w-full h-full rounded-full bg-[#E8A598]/20 flex items-center justify-center">
                <span className="text-[#C86A4B] text-xl">👁</span>
              </div>
              {/* Circular Text SVG with explicit fontSize */}
              <svg className="absolute inset-0 w-full h-full animate-spin-slow pointer-events-none" viewBox="0 0 100 100">
                <path id="circlePathLeft" d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" fill="none" />
                <text fill="#2A1810" fontSize="5.5" letterSpacing="1.2">
                  <textPath href="#circlePathLeft" startOffset="0%">
                    LIVING HERITAGE • VOICE AI • HERITAGE •
                  </textPath>
                </text>
              </svg>
            </div>
            <span className="font-serif italic text-xs text-[#2A1810]/70 mt-3">Artisan Lineage</span>
          </div>

          {/* Center Giant Editorial Heading */}
          <div className="lg:col-span-6 space-y-4">
            <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl text-[#2A1810] tracking-tight leading-[0.95] font-light">
              <span className="italic block font-serif">Haath</span>
              <div className="flex items-center justify-center gap-3 my-2">
                {/* Pill Video / Craft Audio Cutout */}
                <div className="pill-frame relative w-36 sm:w-48 h-16 sm:h-20 overflow-hidden bg-[#231510] inline-flex items-center justify-center group cursor-pointer">
                  {/* eslint-disable-next-html-element-suppression */}
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Dhokra_handicrafts_statue.jpg/800px-Dhokra_handicrafts_statue.jpg"
                    alt="Craft Sculpture"
                    className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute w-9 h-9 rounded-full bg-[#F8F3E8]/90 text-[#2A1810] flex items-center justify-center shadow-md">
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </div>
                </div>
                <span className="font-serif font-normal">Craft</span>
              </div>
            </h1>

            <p className="font-serif italic text-lg sm:text-2xl text-[#2A1810]/75 max-w-xl mx-auto leading-relaxed pt-2">
              &ldquo;Every craft has a story. Now it has a market.&rdquo;
            </p>
          </div>

          {/* Right Circular Emblem Stamp */}
          <div className="hidden lg:flex lg:col-span-3 flex-col items-center">
            <div className="relative w-28 h-28 rounded-full border border-[#2A1810]/20 flex items-center justify-center p-2">
              <div className="w-full h-full rounded-full bg-[#E5A83B]/20 flex items-center justify-center">
                <span className="text-[#E5A83B] text-xl">✴</span>
              </div>
              <svg className="absolute inset-0 w-full h-full animate-spin-slow pointer-events-none" viewBox="0 0 100 100">
                <path id="circlePathRight" d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" fill="none" />
                <text fill="#2A1810" fontSize="5.5" letterSpacing="1.2">
                  <textPath href="#circlePathRight" startOffset="0%">
                    GI TAGGED • FAIR TRADE • VERIFIED •
                  </textPath>
                </text>
              </svg>
            </div>
            <span className="font-serif italic text-xs text-[#2A1810]/70 mt-3">Cultural Provenance</span>
          </div>

        </div>

        {/* CTA Buttons Row */}
        <div className="flex flex-wrap items-center justify-center gap-4 my-4 font-sans">
          <Link
            href="/onboard"
            className="px-8 py-3.5 rounded-full bg-[#C86A4B] text-[#F8F3E8] hover:bg-[#AA4E31] font-semibold text-xs uppercase tracking-widest transition-all shadow-copper-glow flex items-center gap-2"
          >
            <Mic className="w-4 h-4 text-[#E5A83B]" /> I&apos;m an Artisan (बोलकर बेचें)
          </Link>
          <Link
            href="/marketplace"
            className="px-8 py-3.5 rounded-full border border-[#2A1810] text-[#2A1810] hover:bg-[#2A1810] hover:text-[#F8F3E8] font-semibold text-xs uppercase tracking-widest transition-all flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" /> Browse Marketplace
          </Link>
        </div>

        {/* Center Vertical Divider Needle */}
        <div className="flex flex-col items-center my-3">
          <div className="w-0.5 h-10 bg-[#2A1810]/30" />
        </div>

      </div>

      {/* DARK FEATURED BANNER STRIP (Matching Inspiration Image) */}
      <div className="w-full bg-[#1C100B] text-[#F8F3E8] py-3.5 px-6 border-t border-[#C86A4B]/30 flex items-center justify-between font-serif text-sm sm:text-base overflow-hidden">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-6">
          
          <div className="flex items-center gap-3">
            <span className="text-[#C86A4B] text-xl">✴</span>
            <span className="font-serif italic text-xl tracking-wide">art</span>
            <span className="text-stone-500">•</span>
          </div>

          {/* Pill cutout banner image */}
          <div className="hidden sm:flex items-center gap-4 bg-[#231510] px-4 py-1.5 rounded-full border border-stone-800">
            <div className="w-12 h-6 rounded-full overflow-hidden">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Madhubani_art.jpg/800px-Madhubani_art.jpg" alt="Featured Art" className="w-full h-full object-cover" />
            </div>
            <span className="font-serif text-base tracking-wider text-[#F8F3E8]">
              Today&apos;s featured crafts &amp; living heritage
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-stone-500">•</span>
            <span className="font-serif italic text-xl text-[#E5A83B]">GI Verified</span>
            <span className="text-[#C86A4B] text-xl">👁</span>
          </div>

        </div>
      </div>

    </div>
  );
}
