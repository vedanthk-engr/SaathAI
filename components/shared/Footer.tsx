'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Globe, Heart, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const [selectedLang, setSelectedLang] = useState('English');

  return (
    <footer className="bg-[#1C100B] text-[#F8F3E8] font-serif border-t border-[#C86A4B]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="text-[#C86A4B] text-xl">✳</span>
              <span className="font-serif font-semibold text-2xl tracking-[0.2em] text-[#F8F3E8] uppercase">
                HAATH
              </span>
              <span className="text-[#C86A4B] text-xl">✳</span>
            </div>
            <p className="font-serif italic text-sm text-[#F8F3E8]/70 leading-relaxed">
              Every craft has a story. Now it has a market. Empowers Indian craftspeople through voice-first AI storytelling and global access.
            </p>
            <div className="pt-2 flex items-center gap-3 font-sans text-xs">
              <Globe className="w-4 h-4 text-[#E5A83B]" />
              <select
                value={selectedLang}
                onChange={(e) => setSelectedLang(e.target.value)}
                aria-label="Select Interface Language"
                className="bg-[#231510] text-[#F8F3E8] border border-stone-800 text-xs rounded-full px-3 py-1 focus:outline-none focus:border-[#C86A4B]"
              >
                <option value="English">🌐 English</option>
                <option value="Hindi">🇮🇳 हिंदी (Hindi)</option>
                <option value="Maithili">🇮🇳 मैथिली (Maithili)</option>
                <option value="Tamil">🇮🇳 தமிழ் (Tamil)</option>
                <option value="Marathi">🇮🇳 मराठी (Marathi)</option>
              </select>
            </div>
          </div>

          {/* Quick Links */}
          <div className="font-sans text-xs">
            <h3 className="font-serif text-lg font-normal text-[#F8F3E8] mb-4">Marketplace</h3>
            <ul className="space-y-2.5 text-[#F8F3E8]/60">
              <li><Link href="/marketplace?craft=madhubani" className="hover:text-[#C86A4B] transition-colors">Madhubani Paintings</Link></li>
              <li><Link href="/marketplace?craft=pashmina" className="hover:text-[#C86A4B] transition-colors">Kashmiri Pashmina</Link></li>
              <li><Link href="/marketplace?craft=warli" className="hover:text-[#C86A4B] transition-colors">Warli Tribal Art</Link></li>
              <li><Link href="/marketplace?craft=dhokra" className="hover:text-[#C86A4B] transition-colors">Dhokra Lost-Wax Metals</Link></li>
              <li><Link href="/marketplace?craft=kanjivaram" className="hover:text-[#C86A4B] transition-colors">Kanjivaram Silk Sarees</Link></li>
              <li><Link href="/marketplace?giTagged=true" className="hover:text-[#E5A83B] transition-colors text-[#F8F3E8]">GI Tagged Heritage Crafts 🏅</Link></li>
            </ul>
          </div>

          {/* Artisan Portal */}
          <div className="font-sans text-xs">
            <h3 className="font-serif text-lg font-normal text-[#F8F3E8] mb-4">Artisan Portal</h3>
            <ul className="space-y-2.5 text-[#F8F3E8]/60">
              <li><Link href="/onboard" className="hover:text-[#C86A4B] transition-colors">Voice AI Onboarding</Link></li>
              <li><Link href="/dashboard/new" className="hover:text-[#C86A4B] transition-colors">+ Create Voice Listing</Link></li>
              <li><Link href="/dashboard" className="hover:text-[#C86A4B] transition-colors">Artisan Dashboard</Link></li>
              <li><Link href="/dashboard/earnings" className="hover:text-[#C86A4B] transition-colors">Revenue &amp; Fair Pricing</Link></li>
              <li><Link href="/admin" className="hover:text-[#C86A4B] transition-colors">Heritage Verification</Link></li>
            </ul>
          </div>

          {/* Trust */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-normal text-[#F8F3E8] mb-4">Authenticity Promise</h3>
            <div className="p-4 rounded-2xl bg-[#231510] border border-stone-800 space-y-2 font-sans text-xs">
              <div className="flex items-center gap-2 text-[#E5A83B] font-semibold">
                <ShieldCheck className="w-4 h-4" />
                100% Direct Artisan Payout
              </div>
              <p className="text-[#F8F3E8]/60 leading-relaxed">
                Zero middleman markups. Fair trade pricing calculated transparently from raw material cost and labor hours.
              </p>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between text-xs font-sans text-[#F8F3E8]/50 gap-4">
          <p>© 2026 Haath AI Artisan Marketplace. Celebrating Indian Craft Traditions globally.</p>
          <div className="flex items-center gap-1 text-[#F8F3E8]/70">
            Crafted with <Heart className="w-3.5 h-3.5 text-[#C86A4B] fill-current inline" /> for Indian Karigars
          </div>
        </div>
      </div>
    </footer>
  );
}
