'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function PriceGuardPage() {
  const [artisans, setArtisans] = useState([
    { id: 'a1', name: 'Sita Devi Mithila', craft: 'Madhubani Painting', region: 'Madhubani, Bihar', floorPrice: '₹5,200', isEnforced: true, giTag: 'GI-145' },
    { id: 'a2', name: 'Ghulam Hassan Rather', craft: 'Royal Sozni Pashmina', region: 'Srinagar, J&K', floorPrice: '₹32,000', isEnforced: true, giTag: 'GI-46' },
    { id: 'a3', name: 'Rameshwar Bhil', craft: 'Tarpa Dance Warli Art', region: 'Palghar, Maharashtra', floorPrice: '₹3,200', isEnforced: true, giTag: 'GI-209' },
    { id: 'a4', name: 'Bastar Metal Guild', craft: 'Lost-Wax Brass Dhokra', region: 'Bastar, Chhattisgarh', floorPrice: '₹4,800', isEnforced: true, giTag: 'GI-108' },
  ]);

  const [newCraftName, setNewCraftName] = useState('');
  const [newCraftState, setNewCraftState] = useState('');
  const [newFloorPrice, setNewFloorPrice] = useState('');

  const toggleEnforce = (id: string) => {
    setArtisans(prev => prev.map(a => a.id === id ? { ...a, isEnforced: !a.isEnforced } : a));
  };

  const handleRegisterCraft = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCraftName) return;

    const newItem = {
      id: `a${artisans.length + 1}`,
      name: `New Artisan (${newCraftName})`,
      craft: newCraftName,
      region: newCraftState || 'India',
      floorPrice: newFloorPrice ? `₹${newFloorPrice}` : '₹4,500',
      isEnforced: true,
      giTag: `GI-${Math.floor(Math.random() * 300)}`
    };

    setArtisans([...artisans, newItem]);
    setNewCraftName('');
    setNewCraftState('');
    setNewFloorPrice('');
  };

  return (
    <div className="space-y-8 font-sans pb-12 w-full">
      
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-black text-stone-900 tracking-tight">Price Guard Governance</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" /> SYSTEM STATUS: OPTIMAL
            </span>
          </div>
          <p className="text-xs text-stone-500 font-medium mt-1">
            Automated price undercut detection, fair trade floor enforcement, and GI tag heritage registration.
          </p>
        </div>

        <Link
          href="/dashboard/new"
          className="px-5 py-2.5 rounded-full bg-[#18181A] hover:bg-black text-white text-xs font-extrabold uppercase tracking-wider shadow-sm transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <span className="material-symbols-outlined text-sm text-[#ffb1c4]">mic</span> Voice Intake
        </Link>
      </div>

      {/* TOP 4 BENTO CARDS (Yellow, Pink, Green, Blue matching UI theme) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        
        {/* Yellow Card (#F5C538) */}
        <div className="p-6 rounded-[28px] bg-[#F5C538] text-stone-900 shadow-sm flex flex-col justify-between min-h-[150px] space-y-2">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-stone-800 block">
            FAIR PRICE FLOOR:
          </span>
          <div>
            <h3 className="text-2xl font-black text-stone-900 leading-tight">
              100% Enforced
            </h3>
            <p className="text-xs font-bold text-stone-900 font-mono mt-1">
              0 Active Undercuts
            </p>
          </div>
        </div>

        {/* Pink Card (#F59EB7) */}
        <div className="p-6 rounded-[28px] bg-[#F59EB7] text-[#3b061a] shadow-sm flex flex-col justify-between min-h-[150px] space-y-2">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#713245] block">
            UNAUTHORIZED RESELLERS:
          </span>
          <div>
            <h3 className="text-2xl font-black text-[#3b061a] leading-tight">
              0 Blocked
            </h3>
            <p className="text-xs font-bold text-[#713245] font-mono mt-1">
              2 Audited In Review
            </p>
          </div>
        </div>

        {/* Green Card (#B8CC34) */}
        <div className="p-6 rounded-[28px] bg-[#B8CC34] text-stone-900 shadow-sm flex flex-col justify-between min-h-[150px] space-y-2">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-stone-800 block">
            VERIFIED ARTISANS:
          </span>
          <div>
            <h3 className="text-2xl font-black text-stone-900 leading-tight">
              {artisans.length} Karigars
            </h3>
            <p className="text-xs font-bold text-stone-900 font-mono mt-1">
              100% GI Certifications
            </p>
          </div>
        </div>

        {/* Blue Card (#8EC0F2) */}
        <div className="p-6 rounded-[28px] bg-[#8EC0F2] text-stone-900 shadow-sm flex flex-col justify-between min-h-[150px] space-y-2">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-stone-800 block">
            EXPORT PASSPORTS:
          </span>
          <div>
            <h3 className="text-2xl font-black text-stone-900 leading-tight">
              12 Active
            </h3>
            <p className="text-xs font-bold text-stone-900 font-mono mt-1">
              0% Middleman Deduction
            </p>
          </div>
        </div>

      </div>

      {/* MAIN TWO-COLUMN SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (7 cols): Artisan Price Floor Enforcement Table */}
        <div className="lg:col-span-7 p-8 rounded-[32px] bg-white border border-stone-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-stone-100 pb-4">
            <div>
              <h3 className="text-xl font-black text-stone-900">Artisan Price Floor Registry</h3>
              <p className="text-xs font-semibold text-stone-500 mt-0.5">Enforce fair minimum pricing per craft tradition</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase">
              ACTIVE GUARD
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-sans">
              <thead>
                <tr className="text-[10px] font-mono font-extrabold text-stone-400 uppercase tracking-widest border-b border-stone-100">
                  <th className="pb-3">Artisan &amp; Craft</th>
                  <th className="pb-3 px-2">GI Tag</th>
                  <th className="pb-3 px-2">Floor Price</th>
                  <th className="pb-3 text-right">Protection</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {artisans.map((a) => (
                  <tr key={a.id} className="hover:bg-stone-50/80 transition-colors">
                    <td className="py-4">
                      <p className="font-extrabold text-stone-900">{a.name}</p>
                      <p className="text-[11px] text-stone-500 font-medium">{a.craft} • {a.region}</p>
                    </td>
                    <td className="py-4 px-2 font-mono font-bold text-stone-700">
                      <span className="px-2 py-0.5 rounded-full bg-stone-100 text-stone-800 text-[10px]">
                        {a.giTag}
                      </span>
                    </td>
                    <td className="py-4 px-2 font-black text-stone-900 text-sm">
                      {a.floorPrice}
                    </td>
                    <td className="py-4 text-right">
                      <button
                        onClick={() => toggleEnforce(a.id)}
                        className={`px-3 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider transition-all shadow-sm ${
                          a.isEnforced
                            ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                            : 'bg-stone-100 text-stone-500'
                        }`}
                      >
                        {a.isEnforced ? 'Enforced ✓' : 'Paused'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column (5 cols): Register GI Craft Tradition Form Card (#F5C538 Yellow Bento) */}
        <div className="lg:col-span-5 p-8 rounded-[32px] bg-[#F5C538] text-stone-900 shadow-sm space-y-6">
          <div>
            <h3 className="text-2xl font-black tracking-tight">Register GI Craft Tradition</h3>
            <p className="text-xs font-bold text-stone-800 mt-0.5">
              Add new Indian heritage craft tradition to the official Price Guard ledger
            </p>
          </div>

          <form onSubmit={handleRegisterCraft} className="space-y-4 text-xs font-sans">
            <div className="space-y-1">
              <label className="font-extrabold text-stone-900">Craft Name</label>
              <input
                type="text"
                value={newCraftName}
                onChange={(e) => setNewCraftName(e.target.value)}
                placeholder="e.g. Chikankari Hand Embroidery"
                className="w-full p-3 rounded-2xl bg-white border-none shadow-sm text-stone-900 font-semibold focus:outline-none"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="font-extrabold text-stone-900">State / Region</label>
              <input
                type="text"
                value={newCraftState}
                onChange={(e) => setNewCraftState(e.target.value)}
                placeholder="e.g. Lucknow, Uttar Pradesh"
                className="w-full p-3 rounded-2xl bg-white border-none shadow-sm text-stone-900 font-semibold focus:outline-none"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="font-extrabold text-stone-900">Fair Minimum Floor Price (₹)</label>
              <input
                type="text"
                value={newFloorPrice}
                onChange={(e) => setNewFloorPrice(e.target.value)}
                placeholder="4500"
                className="w-full p-3 rounded-2xl bg-white border-none shadow-sm text-stone-900 font-semibold focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-[#18181A] hover:bg-black text-white font-black text-xs uppercase tracking-wider shadow-md transition-all pt-3"
            >
              + Register GI Craft Tradition
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
