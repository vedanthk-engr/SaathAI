'use client';

import React, { useState } from 'react';
import { Globe2, ShoppingBag, Instagram, Store, Check, ExternalLink } from 'lucide-react';

interface PlatformStatus {
  amazonKarigar?: 'published' | 'pending' | 'not_listed';
  etsy?: 'published' | 'pending' | 'not_listed';
  ondc?: 'published' | 'pending' | 'not_listed';
  instagram?: 'published' | 'pending' | 'not_listed';
}

interface PlatformBadgesProps {
  productId: string;
  initialPlatformStatus?: PlatformStatus | null;
  interactive?: boolean;
}

export default function PlatformBadges({
  productId,
  initialPlatformStatus,
  interactive = false
}: PlatformBadgesProps) {
  const [status, setStatus] = useState<PlatformStatus>(
    initialPlatformStatus || {
      amazonKarigar: 'published',
      etsy: 'published',
      ondc: 'published',
      instagram: 'published',
    }
  );

  const togglePlatform = async (platformKey: keyof PlatformStatus) => {
    if (!interactive) return;

    const currentVal = status[platformKey] || 'not_listed';
    const nextVal = currentVal === 'published' ? 'not_listed' : 'published';

    const updated = { ...status, [platformKey]: nextVal };
    setStatus(updated);

    try {
      await fetch(`/api/products/${productId}/publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platform: platformKey, status: nextVal })
      });
    } catch (e) {
      console.error('Failed to toggle platform status:', e);
    }
  };

  const platforms = [
    { key: 'amazonKarigar', name: 'Amazon Karigar', icon: ShoppingBag, color: 'bg-amber-500 text-white' },
    { key: 'etsy', name: 'Etsy Global', icon: Store, color: 'bg-orange-600 text-white' },
    { key: 'ondc', name: 'ONDC India Network', icon: Globe2, color: 'bg-blue-600 text-white' },
    { key: 'instagram', name: 'Instagram Shop', icon: Instagram, color: 'bg-pink-600 text-white' }
  ];

  return (
    <div className="p-4 rounded-xl bg-white border border-stone-200 space-y-3 font-sans">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
          <Globe2 className="w-4 h-4 text-terracotta" /> Multi-Platform Sync Status
        </span>
        {interactive && <span className="text-[10px] text-stone-400">Click badge to toggle distribution</span>}
      </div>

      <div className="flex flex-wrap gap-2">
        {platforms.map((p) => {
          const st = status[p.key as keyof PlatformStatus] || 'not_listed';
          const isPub = st === 'published';
          const Icon = p.icon;

          return (
            <button
              key={p.key}
              type="button"
              onClick={() => togglePlatform(p.key as keyof PlatformStatus)}
              disabled={!interactive}
              className={`px-3 py-1.5 rounded-badge text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm ${
                isPub
                  ? `${p.color} ring-2 ring-stone-900/10 hover:opacity-90`
                  : 'bg-stone-100 text-stone-400 border border-stone-200 line-through opacity-60'
              } ${interactive ? 'cursor-pointer hover:scale-105' : 'cursor-default'}`}
            >
              <Icon className="w-3.5 h-3.5" />
              {p.name}
              {isPub ? <Check className="w-3 h-3 ml-0.5" /> : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
