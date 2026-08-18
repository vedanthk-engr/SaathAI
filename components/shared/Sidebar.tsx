'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useArtisanProfile } from '@/context/ArtisanContext';

export default function Sidebar() {
  const pathname = usePathname();
  const { currentArtisan } = useArtisanProfile();
  const [isBuyerMode, setIsBuyerMode] = useState(pathname.startsWith('/buyer') || pathname.startsWith('/marketplace'));

  const navGeneralArtisan = [
    { name: 'Dashboard', href: '/dashboard', icon: 'dashboard', badge: false },
    { name: 'Artisans', href: '/artisans', icon: 'groups', badge: false },
    { name: 'Forecasts', href: '/dashboard/earnings', icon: 'show_chart', badge: false },
    { name: 'Analytics', href: '/dashboard/analytics', icon: 'analytics', badge: false },
    { name: 'Alerts', href: '/orders', icon: 'notifications', badge: true },
  ];

  const navToolsArtisan = [
    { name: 'AI Voice Intake', href: '/dashboard/new', icon: 'upload' },
    { name: 'Price Guard', href: '/admin', icon: 'verified_user' },
    { name: 'Platform Publish', href: '/dashboard/listings', icon: 'publish' },
  ];

  const navGeneralBuyer = [
    { name: 'Buyer Dashboard', href: '/buyer', icon: 'space_dashboard', badge: false },
    { name: 'Marketplace', href: '/marketplace', icon: 'storefront', badge: false },
    { name: 'My Direct Orders', href: '/orders', icon: 'local_shipping', badge: false },
    { name: 'Price Guard', href: '/admin', icon: 'verified_user', badge: false },
  ];

  const currentNavGeneral = isBuyerMode ? navGeneralBuyer : navGeneralArtisan;

  return (
    <aside className="w-64 bg-[#18181A] text-white rounded-[28px] p-6 flex flex-col justify-between flex-shrink-0 font-sans shadow-xl hidden lg:flex border border-stone-800 h-[calc(100vh-2rem)] sticky top-4">
      
      {/* Brand Header */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <Link href="/" className="flex items-center gap-1">
            <span className="text-3xl font-extrabold tracking-tight text-white">haath</span>
            <span className="text-2xl font-bold text-[#ffb1c4]">+</span>
          </Link>
        </div>

        {/* ROLE MODE SWITCHER TOGGLE (Artisan Studio ⇄ Buyer Mode) */}
        <div className="p-1 rounded-full bg-[#2C2C2E] flex items-center gap-1 text-[11px] font-extrabold">
          <button
            onClick={() => setIsBuyerMode(false)}
            className={`flex-1 py-1.5 rounded-full transition-all text-center ${
              !isBuyerMode ? 'bg-[#ffb1c4] text-[#3b061a] shadow-sm font-black' : 'text-stone-400 hover:text-white'
            }`}
          >
            ARTISAN
          </button>
          <button
            onClick={() => setIsBuyerMode(true)}
            className={`flex-1 py-1.5 rounded-full transition-all text-center ${
              isBuyerMode ? 'bg-[#F5C538] text-stone-900 shadow-sm font-black' : 'text-stone-400 hover:text-white'
            }`}
          >
            BUYER
          </button>
        </div>

        {/* General Section */}
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest px-3 block mb-2">
            {isBuyerMode ? 'BUYER NAVIGATION' : 'GENERAL'}
          </span>
          {currentNavGeneral.map((item) => {
            const isActive = pathname === item.href || (item.name === 'Artisans' && pathname.startsWith('/artisan'));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold transition-all relative group ${
                  isActive
                    ? 'bg-[#2C2C2E] text-white font-bold shadow-sm after:content-[""] after:absolute after:right-4 after:w-2.5 after:h-2.5 after:bg-[#ffb1c4] after:rounded-full'
                    : 'text-stone-400 hover:bg-[#2C2C2E]/60 hover:text-white'
                }`}
              >
                <span className={`material-symbols-outlined text-base ${isActive ? 'icon-fill text-white' : 'text-stone-400 group-hover:text-white'}`}>
                  {item.icon}
                </span>
                <span>{item.name}</span>
                {item.badge && !isActive && (
                  <span className="absolute right-4 w-2 h-2 rounded-full bg-[#ffb1c4]" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Tools Section (Only in Artisan Mode) */}
        {!isBuyerMode && (
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest px-3 block mb-2">
              TOOLS
            </span>
            {navToolsArtisan.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold transition-all group ${
                    isActive
                      ? 'bg-[#2C2C2E] text-white font-bold shadow-sm'
                      : 'text-stone-400 hover:bg-[#2C2C2E]/60 hover:text-white'
                  }`}
                >
                  <span className={`material-symbols-outlined text-base ${isActive ? 'icon-fill text-white' : 'text-stone-400 group-hover:text-white'}`}>
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer Profile — DYNAMICALLY CONNECTED TO CURRENT ACTIVE ARTISAN (Initial Badge) */}
      <div className="pt-4 border-t border-stone-800 space-y-3">
        {isBuyerMode ? (
          <Link
            href="/marketplace"
            className="w-full py-2.5 rounded-full bg-[#F5C538] hover:bg-[#e2b22b] text-stone-900 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-1 shadow-md transition-all"
          >
            Explore Marketplace
          </Link>
        ) : (
          <Link
            href="/onboard"
            className="w-full py-2.5 rounded-full bg-[#F5C538] hover:bg-[#e2b22b] text-stone-900 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-1 shadow-md transition-all"
          >
            + New Artisan
          </Link>
        )}

        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-full bg-[#ffb1c4] text-[#3b061a] font-black flex items-center justify-center text-xs shadow-md">
            {isBuyerMode ? 'A' : currentArtisan.name.charAt(0)}
          </div>

          <div className="flex-1 overflow-hidden text-left">
            <p className="text-xs font-bold text-white truncate">
              {isBuyerMode ? 'Ananya Sharma' : currentArtisan.name}
            </p>
            <p className="text-[10px] text-stone-400 truncate">
              {isBuyerMode ? 'Verified Buyer' : currentArtisan.craft}
            </p>
          </div>
        </div>
      </div>

    </aside>
  );
}
