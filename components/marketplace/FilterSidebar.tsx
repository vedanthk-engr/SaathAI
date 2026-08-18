'use client';

import React, { useState } from 'react';
import { Filter, RotateCcw, Check, ShieldCheck } from 'lucide-react';
import { CRAFT_TRADITIONS } from '@/lib/craftTraditions';

interface FilterSidebarProps {
  onFilterChange: (filters: {
    crafts: string[];
    regions: string[];
    giOnly: boolean;
    maxPrice: number;
  }) => void;
}

export default function FilterSidebar({ onFilterChange }: FilterSidebarProps) {
  const [selectedCrafts, setSelectedCrafts] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [giOnly, setGiOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(50000);

  const regionsList = ["Bihar", "Maharashtra", "Jammu & Kashmir", "Chhattisgarh", "Tamil Nadu", "Karnataka", "Punjab", "Odisha", "Andhra Pradesh"];

  const toggleCraft = (craftId: string) => {
    const updated = selectedCrafts.includes(craftId)
      ? selectedCrafts.filter(c => c !== craftId)
      : [...selectedCrafts, craftId];
    setSelectedCrafts(updated);
    notify(updated, selectedRegions, giOnly, maxPrice);
  };

  const toggleRegion = (region: string) => {
    const updated = selectedRegions.includes(region)
      ? selectedRegions.filter(r => r !== region)
      : [...selectedRegions, region];
    setSelectedRegions(updated);
    notify(selectedCrafts, updated, giOnly, maxPrice);
  };

  const handleGiToggle = () => {
    const updated = !giOnly;
    setGiOnly(updated);
    notify(selectedCrafts, selectedRegions, updated, maxPrice);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setMaxPrice(val);
    notify(selectedCrafts, selectedRegions, giOnly, val);
  };

  const resetFilters = () => {
    setSelectedCrafts([]);
    setSelectedRegions([]);
    setGiOnly(false);
    setMaxPrice(50000);
    onFilterChange({ crafts: [], regions: [], giOnly: false, maxPrice: 50000 });
  };

  const notify = (crafts: string[], regions: string[], gi: boolean, price: number) => {
    onFilterChange({ crafts, regions, giOnly: gi, maxPrice: price });
  };

  return (
    <aside className="p-6 rounded-[24px] bg-[#231510] text-[#F8F3E8] border border-[#C86A4B]/20 shadow-xl space-y-6 font-sans text-xs">
      <div className="flex items-center justify-between border-b border-stone-800 pb-4 font-serif">
        <h3 className="font-serif font-light text-xl text-[#F8F3E8] flex items-center gap-2">
          <span className="text-[#C86A4B]">✴</span> Filter Heritage
        </h3>
        <button
          onClick={resetFilters}
          className="text-[10px] text-[#E8A598] hover:text-[#C86A4B] flex items-center gap-1 font-sans uppercase tracking-wider font-semibold"
        >
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
      </div>

      {/* GI Tag Toggle */}
      <div
        className="p-3.5 rounded-xl bg-[#1C100B] border border-[#C86A4B]/30 flex items-center justify-between cursor-pointer hover:border-[#C86A4B] transition-all"
        onClick={handleGiToggle}
      >
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#E5A83B]" />
          <span className="font-semibold text-[#F8F3E8]">GI Tagged Heritage Only</span>
        </div>
        <input
          type="checkbox"
          checked={giOnly}
          onChange={() => {}}
          className="rounded border-stone-700 text-[#C86A4B] focus:ring-[#C86A4B]"
        />
      </div>

      {/* Price Range Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-[#F8F3E8]/70">
          <span>Max Price:</span>
          <span className="font-mono text-[#E5A83B]">₹{maxPrice.toLocaleString('en-IN')}</span>
        </div>
        <input
          type="range"
          min={500}
          max={50000}
          step={500}
          value={maxPrice}
          onChange={handlePriceChange}
          className="w-full accent-[#C86A4B] cursor-pointer"
        />
      </div>

      {/* Craft Traditions Multiselect */}
      <div className="space-y-2.5">
        <span className="text-[10px] font-bold text-[#E8A598] uppercase tracking-widest">Craft Traditions</span>
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          {CRAFT_TRADITIONS.map((c) => {
            const isChecked = selectedCrafts.includes(c.id);
            return (
              <label
                key={c.id}
                onClick={() => toggleCraft(c.id)}
                className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                  isChecked ? 'bg-[#C86A4B]/20 text-[#E5A83B] font-semibold border border-[#C86A4B]/40' : 'text-[#F8F3E8]/80 hover:bg-[#1C100B]'
                }`}
              >
                <span>{c.name}</span>
                {isChecked && <Check className="w-3.5 h-3.5 text-[#E5A83B]" />}
              </label>
            );
          })}
        </div>
      </div>

      {/* Regions Multiselect */}
      <div className="space-y-2.5 pt-3 border-t border-stone-800">
        <span className="text-[10px] font-bold text-[#E8A598] uppercase tracking-widest">State / Region</span>
        <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
          {regionsList.map((r) => {
            const isChecked = selectedRegions.includes(r);
            return (
              <label
                key={r}
                onClick={() => toggleRegion(r)}
                className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                  isChecked ? 'bg-[#C86A4B]/20 text-[#E5A83B] font-semibold border border-[#C86A4B]/40' : 'text-[#F8F3E8]/80 hover:bg-[#1C100B]'
                }`}
              >
                <span>{r}</span>
                {isChecked && <Check className="w-3.5 h-3.5 text-[#E5A83B]" />}
              </label>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
