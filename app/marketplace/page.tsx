'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/marketplace/ProductCard';
import { SEED_PRODUCTS } from '@/lib/seedData';

export default function MarketplacePage() {
  const [products] = useState(SEED_PRODUCTS);
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['ALL', 'GI TAGGED', 'MADHUBANI', 'WARLI', 'PASHMINA', 'DHOKRA'];

  const filteredProducts = products.filter((product) => {
    // Filter pill matching
    if (selectedFilter === 'GI TAGGED' && !product.giTagStatus) return false;
    if (selectedFilter === 'MADHUBANI' && !product.craftTradition.toLowerCase().includes('madhubani')) return false;
    if (selectedFilter === 'WARLI' && !product.craftTradition.toLowerCase().includes('warli')) return false;
    if (selectedFilter === 'PASHMINA' && !product.craftTradition.toLowerCase().includes('pashmina')) return false;
    if (selectedFilter === 'DHOKRA' && !product.craftTradition.toLowerCase().includes('dhokra')) return false;

    // Search query matching
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = product.titleEn.toLowerCase().includes(q);
      const matchCraft = product.craftTradition.toLowerCase().includes(q);
      const matchRegion = product.craftRegion.toLowerCase().includes(q);
      const matchArtisan = product.artisanName ? product.artisanName.toLowerCase().includes(q) : false;
      return matchTitle || matchCraft || matchRegion || matchArtisan;
    }

    return true;
  });

  return (
    <div className="space-y-8 font-sans pb-12 w-full">
      
      {/* Top Hero Banner Card (#8EC0F2 Soft Blue Bento) */}
      <div className="p-8 sm:p-10 rounded-[32px] bg-[#8EC0F2] text-stone-900 shadow-sm space-y-6 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        
        <div className="space-y-3 max-w-2xl">
          <span className="px-3 py-1 rounded-full bg-white/70 backdrop-blur-md text-stone-900 text-[10px] font-mono font-bold uppercase tracking-wider">
            VERIFIED GI HERITAGE COMMERCE
          </span>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-none text-stone-900">
            Artisan Heritage Marketplace
          </h1>

          <p className="text-xs sm:text-sm font-semibold text-stone-800 leading-relaxed">
            Direct artisan payout with zero middleman markup. Every purchase supports verified Indian karigar lineages and includes a smart digital passport certificate.
          </p>
        </div>

        <Link
          href="/dashboard/new"
          className="px-6 py-3.5 rounded-full bg-[#18181A] hover:bg-black text-white font-extrabold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 transition-all flex-shrink-0"
        >
          <span className="material-symbols-outlined text-sm text-[#ffb1c4]">mic</span>
          + SUBMIT AI VOICE CRAFT
        </Link>

      </div>

      {/* Search Input & Category Filter Pills Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 text-xs font-bold font-mono">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-4 py-2 rounded-full uppercase transition-all flex-shrink-0 ${
                selectedFilter === cat
                  ? 'bg-[#18181A] text-white shadow-sm'
                  : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Live Search Bar */}
        <div className="relative flex items-center bg-white rounded-full border border-stone-200 shadow-sm px-4 py-2 text-xs font-semibold text-stone-900 min-w-[260px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search crafts, artisans, regions..."
            className="bg-transparent focus:outline-none w-full text-stone-900 font-bold placeholder-stone-400"
          />
          <span className="material-symbols-outlined text-stone-400 text-sm ml-2">search</span>
        </div>

      </div>

      {/* Grid of Handcrafted Creations */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-stone-900">
            Handcrafted Creations ({filteredProducts.length})
          </h2>
          <span className="text-xs font-bold text-stone-400 font-mono">
            showing {filteredProducts.length} of {products.length} items
          </span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="p-12 rounded-[32px] bg-white border border-stone-200 text-center space-y-2">
            <h3 className="text-lg font-black text-stone-900">No crafts found matching &ldquo;{searchQuery}&rdquo;</h3>
            <p className="text-xs text-stone-500 font-medium">Try clearing your search query or selecting a different category pill above.</p>
            <button
              onClick={() => { setSelectedFilter('ALL'); setSearchQuery(''); }}
              className="px-4 py-2 rounded-full bg-stone-900 text-white font-bold text-xs uppercase"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
