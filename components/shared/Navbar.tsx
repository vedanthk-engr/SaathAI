'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Sparkles, User, Mic, Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#F8F3E8]/90 backdrop-blur-md border-b border-[#2A1810]/10">
      
      {/* Decorative Needle Top Indicator */}
      <div className="flex justify-center -mb-2">
        <div className="w-2 h-2 rounded-full border border-[#2A1810] bg-[#F8F3E8] z-10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between font-serif">
        
        {/* Left Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs uppercase tracking-widest text-[#2A1810]/80 font-sans font-medium">
          <Link href="/marketplace" className="hover:text-[#C86A4B] transition-colors flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C86A4B]" /> Marketplace
          </Link>
          <span className="text-[#2A1810]/20">|</span>
          <Link href="/onboard" className="hover:text-[#C86A4B] transition-colors">
            Artisans
          </Link>
          <span className="text-[#2A1810]/20">|</span>
          <Link href="/dashboard" className="hover:text-[#C86A4B] transition-colors">
            Portal
          </Link>
          <span className="text-[#2A1810]/20">|</span>
          <Link href="/marketplace" className="hover:text-[#C86A4B] transition-colors">
            <Search className="w-3.5 h-3.5 inline text-[#2A1810]/60" />
          </Link>
        </nav>

        {/* Center Emblem Logo */}
        <Link href="/" className="flex flex-col items-center group">
          <div className="flex items-center gap-2">
            <span className="text-[#C86A4B] font-serif text-lg font-light">✳</span>
            <span className="font-serif font-semibold text-2xl tracking-[0.2em] text-[#2A1810] uppercase">
              HAATH
            </span>
            <span className="text-[#C86A4B] font-serif text-lg font-light">✳</span>
          </div>
          <span className="text-[9px] font-sans tracking-[0.3em] uppercase text-[#2A1810]/50 -mt-1">
            Artisan AI Marketplace
          </span>
        </Link>

        {/* Right Pill Actions */}
        <div className="hidden lg:flex items-center gap-3 font-sans">
          <Link
            href="/onboard"
            className="px-5 py-2 rounded-full border border-[#2A1810]/40 text-[#2A1810] hover:border-[#2A1810] hover:bg-[#2A1810]/5 text-xs font-semibold uppercase tracking-wider transition-all"
          >
            Log In
          </Link>

          <Link
            href="/dashboard/new"
            className="px-6 py-2.5 rounded-full bg-[#1C100B] text-[#F8F3E8] hover:bg-[#C86A4B] text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm"
          >
            <Mic className="w-3.5 h-3.5 text-[#E5A83B]" />
            Submit Craft (Voice AI)
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#2A1810]"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#2A1810]/10 bg-[#F8F3E8] px-6 py-6 space-y-4 font-serif">
          <Link
            href="/marketplace"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-xl text-[#2A1810] hover:text-[#C86A4B]"
          >
            Browse Marketplace
          </Link>
          <Link
            href="/onboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-xl text-[#2A1810] hover:text-[#C86A4B]"
          >
            Artisan Voice Onboarding
          </Link>
          <Link
            href="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-xl text-[#2A1810] hover:text-[#C86A4B]"
          >
            Artisan Dashboard
          </Link>
          <Link
            href="/dashboard/new"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-xl text-[#C86A4B] font-semibold"
          >
            + Create Voice Listing
          </Link>
        </div>
      )}
    </header>
  );
}
