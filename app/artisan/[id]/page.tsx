'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ProvenanceCertificate from '@/components/product/ProvenanceCertificate';
import CulturalStoryPlayer from '@/components/product/CulturalStoryPlayer';
import AuthenticityBadge from '@/components/product/AuthenticityBadge';
import PlatformBadges from '@/components/product/PlatformBadges';

export default function ArtisanDetailProfilePage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'provenance' | 'products'>('dashboard');
  const [metricTab, setMetricTab] = useState<'price' | 'cost' | 'hours'>('price');
  const [newProductModal, setNewProductModal] = useState(false);

  const artisanProfiles: Record<string, any> = {
    'artisan-1': {
      id: "ART-00142",
      name: "Sita Devi Mithila",
      age: "58 Years",
      gender: "Female",
      location: "Madhubani, Bihar",
      craft: "Madhubani Painting",
      score: "98%",
      scoreLabel: "Authenticity: 98%",
      aiSummary: "Artisan voice note recorded in Maithili dialect. Multilingual Whisper & GPT-4o Vision verified authentic Madhubani double-outline technique using natural indigo, turmeric, and neem pigments. Zero chemical additives detected.",
      price: "₹5,200",
      priceGrowth: "+14% since last listing",
      giScore: 98,
      fairPriceScore: 94,
      giNumber: "GI-145 (Mithila Paintings)",
      provenanceNote: "Madhubani painting originated during the Ramayana era in Mithila. Passed orally through matriarchal lines, artists prepare natural dyes from indigo, turmeric, neem leaves, and crushed sea shells.",
      authenticityMarkers: [
        "Double outline border with geometric filling",
        "Natural organic indigo & turmeric dye bleeding",
        "Handloom cotton canvas texture"
      ],
      products: [
        { id: 'p1', name: "1. Sacred Tree of Life (Canvas)", details: "Natural Pigment • 42 Hrs Labor", price: "₹5,200", stock: "5 in stock" },
        { id: 'p2', name: "2. Mithila Peacock & Lotus Motif", details: "Hand-painted Bamboo Paper • 28 Hrs", price: "₹3,800", stock: "3 in stock" },
        { id: 'p3', name: "3. Indigo Radha Krishna Canvas", details: "Traditional Mineral Dyes • 35 Hrs", price: "₹6,500", stock: "2 in stock" }
      ],
      insights: [
        "Voice note transcribed in Maithili and auto-translated to English, Hindi & German.",
        "ElevenLabs cultural provenance audio story generated and embedded in QR code.",
        "Registered under Geographical Indication (GI-145) Mithila Artisan Guild."
      ]
    },
    'artisan-2': {
      id: "ART-00284",
      name: "Ghulam Hassan Rather",
      age: "62 Years",
      gender: "Male",
      location: "Srinagar, J&K",
      craft: "Royal Sozni Pashmina",
      score: "95%",
      scoreLabel: "Authenticity: 95%",
      aiSummary: "Spoken Kashmiri voice transcript verified by GPT-4o. High-altitude Changthangi cashmere fiber purity validated with fine needle Sozni embroidery motifs. Official GI Hallmark certified.",
      price: "₹32,000",
      priceGrowth: "+22% since last listing",
      giScore: 95,
      fairPriceScore: 92,
      giNumber: "GI-46 (Kashmir Pashmina)",
      provenanceNote: "Pashmina wool comes from the undercoat of Changthangi goats living 14,000 feet above sea level. Spun manually on charkhas, each shawl is passed through a ring to verify micro-fineness.",
      authenticityMarkers: [
        "Micro-fiber diameter under 15 microns",
        "Visible single-strand needlework stitches",
        "Official GI micro-seal tag attached"
      ],
      products: [
        { id: 'p1', name: "1. Imperial Sozni Needle Pashmina", details: "Pure Changthangi Fiber • 180 Hrs", price: "₹32,000", stock: "2 in stock" },
        { id: 'p2', name: "2. Kashmiri Jamawar Handloom Shawl", details: "Traditional Needlework • 240 Hrs", price: "₹45,000", stock: "1 in stock" }
      ],
      insights: [
        "Kashmiri voice note recorded and verified by GPT-4o listing generator.",
        "Official Kashmir Pashmina GI Tag Hallmark (GI-46) registered.",
        "Direct pay payout initialized directly to artisan bank account."
      ]
    },
    'artisan-3': {
      id: "ART-00399",
      name: "Rameshwar Bhil",
      age: "45 Years",
      gender: "Male",
      location: "Palghar, Maharashtra",
      craft: "Tarpa Dance Warli Art",
      score: "92%",
      scoreLabel: "Authenticity: 92%",
      aiSummary: "Marathi voice note converted to global listing metadata. Traditional rice paste medium on natural mud wash base verified by Vision AI. Ritual motif integrity score: 92%.",
      price: "₹3,200",
      priceGrowth: "+18% since last listing",
      giScore: 92,
      fairPriceScore: 90,
      giNumber: "GI-209 (Warli Paintings)",
      provenanceNote: "Warli art dates back to 2500 BCE. The Warli tribe uses basic geometric shapes — circle, triangle, and square — to communicate life without written script.",
      authenticityMarkers: [
        "White rice paste stroke texture",
        "Classic twin-triangle body structure",
        "Terracotta earth wash background tone"
      ],
      products: [
        { id: 'p1', name: "1. Tarpa Dance Circle Canvas", details: "Rice Paste on Mud Wash • 18 Hrs", price: "₹3,200", stock: "8 in stock" },
        { id: 'p2', name: "2. Tribal Village Harvest Festival", details: "Traditional Motif • 24 Hrs", price: "₹4,500", stock: "4 in stock" }
      ],
      insights: [
        "Marathi voice note processed with zero loss of cultural context.",
        "Verified Geographical Indication (GI-209) Warli Art Guild.",
        "Fair price guard recommendation: ₹3,200 based on labor hours."
      ]
    },
    'artisan-4': {
      id: "ART-00764",
      name: "Bastar Metal Guild",
      age: "38 Years Lineage",
      gender: "Guild",
      location: "Bastar, Chhattisgarh",
      craft: "Lost-Wax Brass Dhokra",
      score: "94%",
      scoreLabel: "Authenticity: 94%",
      aiSummary: "Chhattisgarhi voice note verified. Lost-wax casting technique validated via vision analysis of beeswax thread density and natural clay mold texture.",
      price: "₹4,800",
      priceGrowth: "+15% since last listing",
      giScore: 94,
      fairPriceScore: 96,
      giNumber: "GI-108 (Bastar Dhokra)",
      provenanceNote: "Dhokra is one of the earliest known methods of metal casting, dating back 4,000 years. Artisan families wrap beeswax threads over clay cores before encasing in river mud.",
      authenticityMarkers: [
        "Beeswax coil texture lines in metal",
        "Core clay residue inside cavity",
        "Hand-filed seam lines"
      ],
      products: [
        { id: 'p1', name: "1. Tribal Musician Brass Figurine", details: "Single-use Mold Lost Wax • 36 Hrs", price: "₹4,800", stock: "6 in stock" },
        { id: 'p2', name: "2. Dhokra Elephant Processional Sculpture", details: "Beeswax Thread Casting • 50 Hrs", price: "₹8,500", stock: "2 in stock" }
      ],
      insights: [
        "Single-use clay mold casting certified authentic Dhokra metallurgy.",
        "Registered under Bastar Dhokra GI Tag (GI-108).",
        "Direct export certificate generated with ElevenLabs audio story."
      ]
    }
  };

  const currentArtisan = artisanProfiles[params.id] || artisanProfiles['artisan-1'];

  return (
    <div className="space-y-6 font-sans pb-12 w-full">
      
      {/* TOP PROFILE HEADER BAR */}
      <div className="space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
          
          {/* Back Arrow to /artisans, Name, Score Badge & Meta */}
          <div className="flex items-center gap-4">
            <Link
              href="/artisans"
              className="w-9 h-9 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-700 hover:bg-stone-100 transition-colors shadow-sm cursor-pointer"
              title="Back to Artisan Registry"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
            </Link>

            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-black text-stone-900 tracking-tight">
                  {currentArtisan.name}
                </h1>
                <span className="px-3 py-1 rounded-full bg-pink-100 text-pink-800 text-xs font-extrabold shadow-sm">
                  ⚠️ {currentArtisan.scoreLabel}
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs font-semibold text-stone-500 mt-1">
                <span>{currentArtisan.age}</span>
                <span>•</span>
                <span>ID: {currentArtisan.id}</span>
                <span>•</span>
                <span>{currentArtisan.location}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons Top Right (ASK AGENT & BUYER MODE) */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <Link
              href="/dashboard/new"
              className="px-4 py-2 rounded-full bg-[#18181A] hover:bg-black text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition-all"
            >
              <span className="material-symbols-outlined text-sm text-[#ffb1c4]">mic</span> ASK AGENT
            </Link>
            <Link
              href="/marketplace"
              className="px-4 py-2 rounded-full bg-[#18181A] hover:bg-black text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition-all"
            >
              <span className="material-symbols-outlined text-sm">shopping_bag</span> BUYER MODE
            </Link>
          </div>

        </div>

        {/* Navigation Sub-Tabs */}
        <div className="flex items-center gap-6 border-b border-stone-200 text-xs font-bold text-stone-500">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`pb-3 transition-colors relative ${
              activeTab === 'dashboard'
                ? 'text-stone-900 border-b-2 border-stone-900 font-extrabold'
                : 'hover:text-stone-800'
            }`}
          >
            Artisan Dashboard
          </button>
          <button
            onClick={() => setActiveTab('provenance')}
            className={`pb-3 transition-colors relative ${
              activeTab === 'provenance'
                ? 'text-stone-900 border-b-2 border-stone-900 font-extrabold'
                : 'hover:text-stone-800'
            }`}
          >
            Craft Provenance &amp; GI Tag Passport
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`pb-3 transition-colors relative ${
              activeTab === 'products'
                ? 'text-stone-900 border-b-2 border-stone-900 font-extrabold'
                : 'hover:text-stone-800'
            }`}
          >
            Product Collection ({currentArtisan.products.length})
          </button>
        </div>

      </div>

      {/* TAB 1: ARTISAN DASHBOARD */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* TOP AI PRE-LISTING BANNER CARD */}
          <div className="p-7 rounded-[28px] bg-[#F5C538] text-stone-900 shadow-sm space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined font-bold">smart_toy</span>
                <h3 className="text-xl font-black">AI Pre-listing Analysis</h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-white/70 text-stone-900 text-[10px] font-bold uppercase tracking-wider">
                GENERATED 2H AGO
              </span>
            </div>

            <p className="text-xs font-semibold text-stone-900 leading-relaxed max-w-4xl">
              {currentArtisan.aiSummary}
            </p>
          </div>

          {/* BENTO GRID SYSTEM */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column (4 cols): Somatic Heritage Map */}
            <div className="lg:col-span-4 p-6 rounded-[28px] bg-[#8EC0F2] text-stone-900 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined">account_tree</span>
                <h3 className="text-xl font-black">Somatic Heritage Map</h3>
              </div>

              <div className="p-5 rounded-[22px] bg-white/60 backdrop-blur-sm border border-stone-900/10 space-y-4 text-xs font-sans">
                <div className="p-3 rounded-xl bg-white border border-stone-200 space-y-1">
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">CRAFT TECHNIQUE</span>
                  <p className="font-extrabold text-stone-900">{currentArtisan.craft}</p>
                </div>

                <div className="p-3 rounded-xl bg-white border border-stone-200 space-y-1">
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">ORIGIN &amp; LINEAGE</span>
                  <p className="font-extrabold text-stone-900">{currentArtisan.location}</p>
                </div>

                <div className="p-3 rounded-xl bg-white border border-stone-200 space-y-1">
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">DIRECT PAYOUT STATUS</span>
                  <p className="font-extrabold text-emerald-800 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-600" /> 100% Direct Bank Account Sync
                  </p>
                </div>
              </div>

              {/* Multi-Channel Platform Status Badges Component */}
              <PlatformBadges
                productId={currentArtisan.id}
                initialPlatformStatus={{
                  amazonKarigar: 'published',
                  etsy: 'published',
                  ondc: 'published',
                  instagram: 'published'
                }}
              />
            </div>

            {/* Center Column (5 cols): Biometrics Chart & Risk Assessment */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="p-6 rounded-[28px] bg-[#F59EB7] text-[#3b061a] shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined font-bold">show_chart</span>
                    <h3 className="text-xl font-black">Craft Biometrics</h3>
                  </div>

                  <div className="flex items-center gap-1 bg-white/60 p-1 rounded-full text-[10px] font-bold">
                    {(['price', 'cost', 'hours'] as const).map((m) => (
                      <button
                        key={m}
                        onClick={() => setMetricTab(m)}
                        className={`px-2.5 py-1 rounded-full uppercase transition-all ${
                          metricTab === m ? 'bg-[#3b061a] text-white' : 'text-[#3b061a]'
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-3xl font-black">{currentArtisan.price}</span>
                  <p className="text-[11px] font-bold text-[#713245]">{currentArtisan.priceGrowth}</p>
                </div>

                <div className="h-20 pt-2">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 300 60">
                    <path
                      d="M 0,50 L 60,45 L 120,40 L 180,30 L 240,25 L 300,15"
                      fill="none"
                      stroke="#3b061a"
                      strokeWidth="3"
                    />
                    <circle cx="300" cy="15" r="4" fill="#3b061a" />
                  </svg>
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#713245] font-bold pt-1">
                    <span>FEB 26</span>
                    <span>MAR 26</span>
                    <span>APR 26</span>
                    <span>MAY 26</span>
                    <span>JUN 26</span>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-[28px] bg-[#F5C538] text-stone-900 shadow-sm space-y-4">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined font-bold">shield</span>
                  <h3 className="text-xl font-black">Provenance Risk Assessment</h3>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-4 rounded-2xl bg-white/70 backdrop-blur-sm space-y-2">
                    <div className="w-16 h-16 rounded-full border-4 border-emerald-600 flex items-center justify-center mx-auto text-xl font-black text-emerald-800">
                      {currentArtisan.giScore}%
                    </div>
                    <span className="text-[10px] font-bold text-stone-800 uppercase tracking-widest block">GI TAG AUTHENTICITY</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/70 backdrop-blur-sm space-y-2">
                    <div className="w-16 h-16 rounded-full border-4 border-stone-900 flex items-center justify-center mx-auto text-xl font-black text-stone-900">
                      {currentArtisan.fairPriceScore}%
                    </div>
                    <span className="text-[10px] font-bold text-stone-800 uppercase tracking-widest block">FAIR PRICE SCORE</span>
                  </div>
                </div>
              </div>

              {/* Authenticity Markers Component */}
              <AuthenticityBadge
                authenticityMarkers={currentArtisan.authenticityMarkers}
                authenticityStatement="Certified authentic handcrafted artwork created with natural pigments and bamboo pens."
              />

            </div>

            {/* Right Column (3 cols): Active Regimen & Insights */}
            <div className="lg:col-span-3 space-y-6">
              
              <div className="p-6 rounded-[28px] bg-[#B8CC34] text-stone-900 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined font-bold">view_in_ar</span>
                    <h3 className="text-base font-black">Current Regimen</h3>
                  </div>
                </div>

                <div className="space-y-2 text-xs font-sans">
                  {currentArtisan.products.map((prod: any, idx: number) => (
                    <div key={idx} className="p-3 rounded-2xl bg-white text-stone-900 space-y-1 shadow-sm">
                      <p className="font-extrabold truncate">{prod.name}</p>
                      <p className="text-[10px] text-stone-500 font-medium">{prod.details}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-[28px] bg-white border border-stone-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-amber-500">lightbulb</span>
                  <h3 className="text-base font-black text-stone-900">Karigar Insights</h3>
                </div>

                <ul className="space-y-3 text-xs text-stone-700 font-medium font-sans">
                  {currentArtisan.insights.map((ins: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{ins}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* TAB 2: CRAFT PROVENANCE & GI TAG PASSPORT */}
      {activeTab === 'provenance' && (
        <div className="space-y-6">
          {/* Living Cultural Story Player Component */}
          <CulturalStoryPlayer
            provenanceNote={currentArtisan.provenanceNote}
            artisanName={currentArtisan.name}
            craftTradition={currentArtisan.craft}
          />

          {/* Full PDF & QR Provenance Passport Certificate Component */}
          <ProvenanceCertificate
            productId={currentArtisan.id}
            productTitle={`${currentArtisan.craft} Heritage Masterpiece`}
            craftTradition={currentArtisan.craft}
            region={currentArtisan.location}
            artisanName={currentArtisan.name}
            authenticityMarkers={currentArtisan.authenticityMarkers}
            giTagStatus={currentArtisan.giNumber}
          />
        </div>
      )}

      {/* TAB 3: PRODUCT COLLECTION */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-stone-900">
              Active Handcrafted Creations ({currentArtisan.products.length})
            </h2>
            <button
              onClick={() => setNewProductModal(true)}
              className="px-5 py-2.5 rounded-full bg-[#18181A] text-white text-xs font-extrabold uppercase tracking-wider shadow-md hover:bg-black transition-all"
            >
              + Add Product
            </button>
          </div>

          {/* Grid of Product Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentArtisan.products.map((prod: any, idx: number) => (
              <div key={idx} className="p-6 rounded-[28px] bg-white border border-stone-200 shadow-sm space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 text-[10px] font-bold font-mono">
                    {prod.stock}
                  </span>
                  <h3 className="text-lg font-black text-stone-900 leading-snug">{prod.name}</h3>
                  <p className="text-xs text-stone-500 font-medium">{prod.details}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                  <span className="text-2xl font-black text-stone-900">{prod.price}</span>
                  <Link
                    href="/marketplace"
                    className="px-4 py-1.5 rounded-full bg-[#F5C538] text-stone-900 text-xs font-extrabold shadow-sm"
                  >
                    View Listing
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {newProductModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] p-8 max-w-md w-full space-y-6 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-stone-900">Add New Craft Product</h3>
              <button onClick={() => setNewProductModal(false)} className="text-stone-400 hover:text-stone-700">
                ✕
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); setNewProductModal(false); }} className="space-y-4 text-xs font-sans">
              <div className="space-y-1">
                <label className="font-extrabold text-stone-700">Product Name</label>
                <input type="text" placeholder="e.g. Peacock Lotus Hand-painted Silk" className="w-full p-3 rounded-xl border border-stone-300" required />
              </div>
              <div className="space-y-1">
                <label className="font-extrabold text-stone-700">Fair Price Target (₹)</label>
                <input type="text" placeholder="5200" className="w-full p-3 rounded-xl border border-stone-300" required />
              </div>
              <button type="submit" className="w-full py-3 rounded-full bg-[#18181A] text-white font-extrabold uppercase tracking-wider text-xs shadow-md">
                Publish Product
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
