'use client';

import React from 'react';
import { ShieldCheck, CheckCircle2, Award } from 'lucide-react';

interface AuthenticityBadgeProps {
  authenticityStatement?: string | null;
  authenticityMarkers?: string[];
}

export default function AuthenticityBadge({
  authenticityStatement,
  authenticityMarkers = []
}: AuthenticityBadgeProps) {
  return (
    <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 space-y-4 font-sans">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-serif font-bold text-stone-900 text-base">
            Verified Handcrafted Authenticity
          </h4>
          <p className="text-xs text-stone-600">Directly from Certified Artisan Lineage</p>
        </div>
      </div>

      <p className="text-sm text-stone-700 font-medium leading-relaxed bg-white p-3 rounded-xl border border-emerald-100">
        &ldquo;{authenticityStatement || "100% genuine handcrafted piece produced using centuries-old lineage techniques."}&rdquo;
      </p>

      {authenticityMarkers.length > 0 && (
        <div className="space-y-2 pt-1">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">3 Verification Markers</span>
          <div className="grid grid-cols-1 gap-2">
            {authenticityMarkers.map((marker, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-stone-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>{marker}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
