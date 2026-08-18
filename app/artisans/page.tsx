'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ArtisanRegistryOverviewPage() {
  const [artisans, setArtisans] = useState([
    {
      id: "ART-00142",
      slug: "artisan-1",
      name: "Sita Devi Mithila",
      age: "58Y",
      lineage: "Master Karigar: Mithila Heritage Guild",
      category: "MADHUBANI",
      authScore: "98%",
      craft: "Madhubani Painting",
      cardBg: "bg-[#F5C538] text-stone-900",
      scoreColor: "text-emerald-700"
    },
    {
      id: "ART-00284",
      slug: "artisan-2",
      name: "Ghulam Hassan Rather",
      age: "62Y",
      lineage: "Master Karigar: Srinagar Sozni Guild",
      category: "PASHMINA",
      authScore: "95%",
      craft: "Royal Sozni Pashmina",
      cardBg: "bg-[#B8CC34] text-stone-900",
      scoreColor: "text-emerald-700"
    },
    {
      id: "ART-00399",
      slug: "artisan-3",
      name: "Rameshwar Bhil",
      age: "45Y",
      lineage: "Master Karigar: Palghar Warli Guild",
      category: "WARLI",
      authScore: "92%",
      craft: "Tarpa Dance Warli",
      cardBg: "bg-[#F59EB7] text-[#3b061a]",
      scoreColor: "text-rose-700"
    },
    {
      id: "ART-00764",
      slug: "artisan-4",
      name: "Bastar Metal Guild",
      age: "38Y",
      lineage: "Master Karigar: Bastar Lost-Wax Guild",
      category: "DHOKRA",
      authScore: "94%",
      craft: "Lost-Wax Brass Dhokra",
      cardBg: "bg-[#8EC0F2] text-stone-900",
      scoreColor: "text-emerald-700"
    }
  ]);

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    e.preventDefault();
    setArtisans(artisans.filter(a => a.id !== id));
  };

  return (
    <div className="space-y-8 font-sans">
      
      {/* Top Header Row */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
            Artisan Intelligence Registry
          </h1>
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1.5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" /> SYSTEM STATUS: OPTIMAL
          </span>
        </div>

        <p className="text-xs sm:text-sm text-stone-500 font-medium max-w-3xl leading-relaxed">
          Select an artisan file to initialize their comprehensive craft and provenance insight dashboard.
        </p>
      </div>

      {/* Grid of 4 Pastel Artisan Cards (Clickable to Inside Profile) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artisans.map((artisan) => (
          <Link
            key={artisan.id}
            href={`/artisan/${artisan.slug}`}
            className={`p-6 rounded-[28px] ${artisan.cardBg} shadow-sm space-y-6 relative overflow-hidden flex flex-col justify-between hover:scale-[1.02] transition-transform cursor-pointer group`}
          >
            {/* Card Header & Delete Button */}
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest opacity-70">
                  {artisan.id} • {artisan.category}
                </span>
                <h3 className="text-2xl font-black mt-1 group-hover:underline">
                  {artisan.name} <span className="text-base font-normal opacity-80">({artisan.age})</span>
                </h3>
                <p className="text-xs font-semibold opacity-80 mt-0.5">{artisan.lineage}</p>
              </div>

              <button
                onClick={(e) => handleDelete(e, artisan.id)}
                className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-rose-500 hover:bg-rose-50 transition-colors shadow-sm flex-shrink-0 z-10"
                title="Remove Artisan File"
              >
                <span className="material-symbols-outlined text-sm">delete</span>
              </button>
            </div>

            {/* Inner White Rounded Sub-Card with Metrics */}
            <div className="p-4 rounded-[20px] bg-white text-stone-900 shadow-sm grid grid-cols-2 gap-4">
              <div>
                <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest block">AUTHENTICITY SCORE</span>
                <span className={`text-3xl font-black ${artisan.scoreColor}`}>{artisan.authScore}</span>
              </div>
              <div>
                <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest block">CRAFT TRADITION</span>
                <span className="text-xs font-black text-stone-900 block leading-tight mt-1">{artisan.craft}</span>
              </div>
            </div>

          </Link>
        ))}
      </div>

    </div>
  );
}
