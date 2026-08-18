'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function BuyerDashboardPage() {
  const [selectedPassport, setSelectedPassport] = useState<any | null>(null);

  const buyerOrders = [
    {
      id: 'ord-101',
      title: 'Hand-painted Sacred Tree of Life Madhubani Canvas',
      artisan: 'Sita Devi Mithila',
      craft: 'Madhubani Painting',
      region: 'Madhubani, Bihar',
      price: '₹5,200',
      giTag: 'GI-145',
      status: 'DELIVERED',
      dispatchDate: 'Aug 14, 2026',
      photoUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
      txnHash: 'TXN-RAZORPAY-884920',
      provenanceDetails: 'Created over 42 hours using organic indigo and turmeric dye extract on handloom cotton.'
    },
    {
      id: 'ord-102',
      title: 'Royal Sozni Hand-Embroidered Pure Pashmina Shawl',
      artisan: 'Ghulam Hassan Rather',
      craft: 'Kashmiri Pashmina',
      region: 'Srinagar, J&K',
      price: '₹32,000',
      giTag: 'GI-46',
      status: 'IN TRANSIT',
      dispatchDate: 'Aug 16, 2026',
      photoUrl: 'https://images.unsplash.com/photo-1606760227091-3dd858d97240?auto=format&fit=crop&w=800&q=80',
      txnHash: 'TXN-RAZORPAY-993821',
      provenanceDetails: '100% Changthangi goat cashmere spun on traditional Kashmiri charkha with fine needlework.'
    },
    {
      id: 'ord-103',
      title: 'Tarpa Dance Celebration Warli Tribal Canvas',
      artisan: 'Rameshwar Bhil',
      craft: 'Warli Art',
      region: 'Palghar, Maharashtra',
      price: '₹3,200',
      giTag: 'GI-209',
      status: 'DELIVERED',
      dispatchDate: 'Aug 10, 2026',
      photoUrl: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=800&q=80',
      txnHash: 'TXN-RAZORPAY-772910',
      provenanceDetails: 'Painted with crushed rice flour paste on terracotta primed cotton ground in Palghar village.'
    }
  ];

  return (
    <div className="space-y-8 font-sans pb-12 w-full">
      
      {/* Top Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-black text-stone-900 tracking-tight">Buyer Heritage Dashboard</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" /> DIRECT KARIGAR PAYOUT ACTIVE
            </span>
          </div>
          <p className="text-xs text-stone-500 font-medium mt-1">
            Welcome back, Ananya Sharma. 100% of your purchases go directly to master artisan bank accounts.
          </p>
        </div>

        <Link
          href="/marketplace"
          className="px-5 py-2.5 rounded-full bg-[#18181A] hover:bg-black text-white text-xs font-extrabold uppercase tracking-wider shadow-sm transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <span className="material-symbols-outlined text-sm text-[#ffb1c4]">shopping_bag</span> Explore Marketplace
        </Link>
      </div>

      {/* TOP 4 BENTO CARDS (Yellow, Pink, Green, Blue matching UI theme) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        
        {/* Yellow Card (#F5C538) */}
        <div className="p-6 rounded-[28px] bg-[#F5C538] text-stone-900 shadow-sm flex flex-col justify-between min-h-[150px] space-y-2">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-stone-800 block">
            TOTAL HERITAGE PURCHASES:
          </span>
          <div>
            <h3 className="text-2xl font-black text-stone-900 leading-tight">
              ₹40,400 Total
            </h3>
            <p className="text-xs font-bold text-stone-900 font-mono mt-1">
              3 Authentic Creations
            </p>
          </div>
        </div>

        {/* Pink Card (#F59EB7) */}
        <div className="p-6 rounded-[28px] bg-[#F59EB7] text-[#3b061a] shadow-sm flex flex-col justify-between min-h-[150px] space-y-2">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#713245] block">
            DIRECT KARIGAR PAYOUT:
          </span>
          <div>
            <h3 className="text-2xl font-black text-[#3b061a] leading-tight">
              100% Direct
            </h3>
            <p className="text-xs font-bold text-[#713245] font-mono mt-1">
              ₹0 Middleman Fee
            </p>
          </div>
        </div>

        {/* Green Card (#B8CC34) */}
        <div className="p-6 rounded-[28px] bg-[#B8CC34] text-stone-900 shadow-sm flex flex-col justify-between min-h-[150px] space-y-2">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-stone-800 block">
            DIGITAL QR PASSPORTS:
          </span>
          <div>
            <h3 className="text-2xl font-black text-stone-900 leading-tight">
              3 Verified
            </h3>
            <p className="text-xs font-bold text-stone-900 font-mono mt-1">
              Blockchain Verified
            </p>
          </div>
        </div>

        {/* Blue Card (#8EC0F2) */}
        <div className="p-6 rounded-[28px] bg-[#8EC0F2] text-stone-900 shadow-sm flex flex-col justify-between min-h-[150px] space-y-2">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-stone-800 block">
            FAIR TRADE SCORE:
          </span>
          <div>
            <h3 className="text-2xl font-black text-stone-900 leading-tight">
              99.8% Impact
            </h3>
            <p className="text-xs font-bold text-stone-900 font-mono mt-1">
              Top 1% Global Collector
            </p>
          </div>
        </div>

      </div>

      {/* MY HERITAGE COLLECTION BENTO GRID SYSTEM */}
      <div className="p-8 rounded-[32px] bg-white border border-stone-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-stone-100 pb-4">
          <div>
            <h3 className="text-2xl font-black text-stone-900">My Purchased Heritage Collection ({buyerOrders.length})</h3>
            <p className="text-xs font-semibold text-stone-500 mt-0.5">Click any item to view digital QR provenance passport</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase">
            VERIFIED COLLECTOR
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {buyerOrders.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-[28px] bg-[#FAF8F3] border border-stone-200 shadow-sm space-y-4 flex flex-col justify-between hover:shadow-md transition-all"
            >
              <div className="space-y-3">
                {/* Photo */}
                <div className="relative w-full h-48 rounded-[20px] overflow-hidden bg-stone-100">
                  {/* eslint-disable-next-html-element-suppression */}
                  <img
                    src={item.photoUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#F5C538] text-stone-900 text-[10px] font-mono font-bold">
                    {item.giTag}
                  </span>
                  <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-white/90 text-stone-900 text-[10px] font-extrabold uppercase">
                    {item.status}
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-black text-stone-900 leading-snug line-clamp-2">{item.title}</h4>
                  <p className="text-xs text-stone-600 font-bold mt-1">{item.artisan} • {item.region}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-200 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-stone-500">Paid Amount:</span>
                  <span className="text-lg font-black text-stone-900">{item.price}</span>
                </div>

                <button
                  onClick={() => setSelectedPassport(item)}
                  className="w-full py-3 rounded-full bg-[#18181A] hover:bg-black text-white font-extrabold text-xs uppercase tracking-wider text-center transition-all shadow-sm"
                >
                  VIEW DIGITAL QR PASSPORT →
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* DIGITAL QR PROVENANCE PASSPORT MODAL */}
      {selectedPassport && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] max-w-lg w-full p-8 shadow-2xl space-y-6 relative border border-stone-200">
            <button
              onClick={() => setSelectedPassport(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 hover:bg-stone-200"
            >
              ✕
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                AUTHENTICATED HERITAGE PASSPORT
              </span>
              <h3 className="text-2xl font-black text-stone-900 mt-2">{selectedPassport.title}</h3>
              <p className="text-xs font-bold text-stone-500">
                Created by {selectedPassport.artisan} ({selectedPassport.region})
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-stone-200 text-xs font-serif leading-relaxed italic text-stone-800">
              &ldquo;{selectedPassport.provenanceDetails}&rdquo;
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-[9px] font-bold text-stone-400 uppercase block">GI TAG NUMBER</span>
                <span className="font-extrabold text-stone-900 font-mono">{selectedPassport.giTag}</span>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-[9px] font-bold text-stone-400 uppercase block">RAZORPAY TXN</span>
                <span className="font-extrabold text-stone-900 font-mono">{selectedPassport.txnHash}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3">
              <span className="material-symbols-outlined text-emerald-700">verified</span>
              <div>
                <p className="font-extrabold text-emerald-950 text-xs">100% Direct Artisan Payout Verified</p>
                <p className="text-[11px] text-emerald-800 font-medium">Funds transferred directly to {selectedPassport.artisan}&apos;s UPI account.</p>
              </div>
            </div>

            <button
              onClick={() => setSelectedPassport(null)}
              className="w-full py-3 rounded-full bg-[#18181A] hover:bg-black text-white text-xs font-extrabold uppercase tracking-wider shadow-md"
            >
              Close Digital Passport
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
