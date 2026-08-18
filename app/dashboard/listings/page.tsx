'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function PlatformPublishPage() {
  const [listings, setListings] = useState([
    {
      id: 'l1',
      title: 'Sacred Tree of Life Canvas',
      artisan: 'Sita Devi Mithila',
      craft: 'Madhubani Painting',
      price: '₹5,200',
      channels: { etsy: true, shopify: true, amazon: false },
      stock: '5 in stock'
    },
    {
      id: 'l2',
      title: 'Imperial Sozni Needle Pashmina',
      artisan: 'Ghulam Hassan Rather',
      craft: 'Royal Sozni Pashmina',
      price: '₹32,000',
      channels: { etsy: true, shopify: true, amazon: true },
      stock: '2 in stock'
    },
    {
      id: 'l3',
      title: 'Tarpa Dance Circle Canvas',
      artisan: 'Rameshwar Bhil',
      craft: 'Tarpa Dance Warli',
      price: '₹3,200',
      channels: { etsy: true, shopify: false, amazon: true },
      stock: '8 in stock'
    },
    {
      id: 'l4',
      title: 'Tribal Musician Brass Figurine',
      artisan: 'Bastar Metal Guild',
      craft: 'Lost-Wax Brass Dhokra',
      price: '₹4,800',
      channels: { etsy: false, shopify: true, amazon: true },
      stock: '6 in stock'
    }
  ]);

  const toggleChannel = (id: string, channel: 'etsy' | 'shopify' | 'amazon') => {
    setListings(prev =>
      prev.map(item => {
        if (item.id === id) {
          return {
            ...item,
            channels: {
              ...item.channels,
              [channel]: !item.channels[channel]
            }
          };
        }
        return item;
      })
    );
  };

  return (
    <div className="space-y-8 font-sans pb-12 w-full">
      
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-black text-stone-900 tracking-tight">Platform Publish</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" /> MULTI-CHANNEL SYNC
            </span>
          </div>
          <p className="text-xs text-stone-500 font-medium mt-1">
            Publish and sync handcrafted creations across Etsy, Shopify, Amazon Karigar, and global direct buyers.
          </p>
        </div>

        <Link
          href="/dashboard/new"
          className="px-5 py-2.5 rounded-full bg-[#18181A] hover:bg-black text-white text-xs font-extrabold uppercase tracking-wider shadow-sm transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <span className="material-symbols-outlined text-sm text-[#ffb1c4]">mic</span> + New AI Listing
        </Link>
      </div>

      {/* TOP 4 BENTO CARDS (Yellow, Pink, Green, Blue matching UI theme) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        
        {/* Yellow Card (#F5C538) */}
        <div className="p-6 rounded-[28px] bg-[#F5C538] text-stone-900 shadow-sm flex flex-col justify-between min-h-[150px] space-y-2">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-stone-800 block">
            MULTI-CHANNEL SYNC:
          </span>
          <div>
            <h3 className="text-2xl font-black text-stone-900 leading-tight">
              4 Stores Active
            </h3>
            <p className="text-xs font-bold text-stone-900 font-mono mt-1">
              Etsy &amp; Shopify Direct
            </p>
          </div>
        </div>

        {/* Pink Card (#F59EB7) */}
        <div className="p-6 rounded-[28px] bg-[#F59EB7] text-[#3b061a] shadow-sm flex flex-col justify-between min-h-[150px] space-y-2">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#713245] block">
            ACTIVE LISTINGS:
          </span>
          <div>
            <h3 className="text-2xl font-black text-[#3b061a] leading-tight">
              {listings.length} Handcrafted Items
            </h3>
            <p className="text-xs font-bold text-[#713245] font-mono mt-1">
              ₹89.4k Total Value
            </p>
          </div>
        </div>

        {/* Green Card (#B8CC34) */}
        <div className="p-6 rounded-[28px] bg-[#B8CC34] text-stone-900 shadow-sm flex flex-col justify-between min-h-[150px] space-y-2">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-stone-800 block">
            BUYER CONVERSION:
          </span>
          <div>
            <h3 className="text-2xl font-black text-stone-900 leading-tight">
              +28% QoQ
            </h3>
            <p className="text-xs font-bold text-stone-900 font-mono mt-1">
              High Global Efficiency
            </p>
          </div>
        </div>

        {/* Blue Card (#8EC0F2) */}
        <div className="p-6 rounded-[28px] bg-[#8EC0F2] text-stone-900 shadow-sm flex flex-col justify-between min-h-[150px] space-y-2">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-stone-800 block">
            DIRECT PAYOUTS:
          </span>
          <div>
            <h3 className="text-2xl font-black text-stone-900 leading-tight">
              100% Direct Payout
            </h3>
            <p className="text-xs font-bold text-stone-900 font-mono mt-1">
              0% Platform Middleman Cut
            </p>
          </div>
        </div>

      </div>

      {/* CRAFT LISTINGS BENTO GRID SYSTEM */}
      <div className="p-8 rounded-[32px] bg-white border border-stone-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-stone-100 pb-4">
          <div>
            <h3 className="text-2xl font-black text-stone-900">Active Multi-Channel Listings ({listings.length})</h3>
            <p className="text-xs font-semibold text-stone-500 mt-0.5">Toggle channel sync for global distribution</p>
          </div>

          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase">
            LIVE SYNC
          </span>
        </div>

        {/* Grid of Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {listings.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-[28px] bg-[#FAF8F3] border border-stone-200 shadow-sm space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-white text-stone-700 text-[10px] font-mono font-bold border border-stone-200">
                    {item.stock}
                  </span>
                  <span className="text-xl font-black text-stone-900">{item.price}</span>
                </div>

                <h4 className="text-xl font-black text-stone-900 leading-tight">{item.title}</h4>
                <p className="text-xs text-stone-600 font-semibold">{item.artisan} • {item.craft}</p>
              </div>

              {/* Channel Sync Toggles */}
              <div className="pt-4 border-t border-stone-200/80 space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-stone-400 block">
                  CHANNEL DISTRIBUTION SYNC
                </span>

                <div className="grid grid-cols-3 gap-2 text-xs font-bold">
                  {/* Etsy */}
                  <button
                    onClick={() => toggleChannel(item.id, 'etsy')}
                    className={`py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                      item.channels.etsy
                        ? 'bg-amber-100 text-amber-900 border border-amber-300 shadow-sm'
                        : 'bg-stone-200/60 text-stone-500'
                    }`}
                  >
                    Etsy {item.channels.etsy ? '✓' : ''}
                  </button>

                  {/* Shopify */}
                  <button
                    onClick={() => toggleChannel(item.id, 'shopify')}
                    className={`py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                      item.channels.shopify
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 shadow-sm'
                        : 'bg-stone-200/60 text-stone-500'
                    }`}
                  >
                    Shopify {item.channels.shopify ? '✓' : ''}
                  </button>

                  {/* Amazon */}
                  <button
                    onClick={() => toggleChannel(item.id, 'amazon')}
                    className={`py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                      item.channels.amazon
                        ? 'bg-purple-100 text-purple-900 border border-purple-300 shadow-sm'
                        : 'bg-stone-200/60 text-stone-500'
                    }`}
                  >
                    Amazon {item.channels.amazon ? '✓' : ''}
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
