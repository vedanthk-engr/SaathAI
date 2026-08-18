'use client';

import React from 'react';
import { IndianRupee, ShoppingBag, Clock, Eye, TrendingUp } from 'lucide-react';

interface StatCardsProps {
  totalEarnings?: number;
  activeListings?: number;
  pendingOrders?: number;
  profileViews?: number;
}

export default function StatCards({
  totalEarnings = 89400,
  activeListings = 5,
  pendingOrders = 2,
  profileViews = 1420
}: StatCardsProps) {
  const stats = [
    {
      title: "Total Artisan Revenue",
      value: `₹${totalEarnings.toLocaleString('en-IN')}`,
      change: "+18% this month",
      icon: IndianRupee,
      cardBg: "bg-[#231510] text-[#F8F3E8] border-[#C86A4B]/40",
      accentColor: "text-[#E5A83B]"
    },
    {
      title: "Active AI Listings",
      value: activeListings.toString(),
      change: "Global Sync Active",
      icon: ShoppingBag,
      cardBg: "bg-white text-[#2A1810] border-[#2A1810]/15",
      accentColor: "text-[#C86A4B]"
    },
    {
      title: "Pending Orders",
      value: pendingOrders.toString(),
      change: "Packaging Required",
      icon: Clock,
      cardBg: "bg-white text-[#2A1810] border-[#2A1810]/15",
      accentColor: "text-[#E5A83B]"
    },
    {
      title: "Global Story Views",
      value: profileViews.toLocaleString('en-IN'),
      change: "+340 views this week",
      icon: Eye,
      cardBg: "bg-[#1C100B] text-[#F8F3E8] border-stone-800",
      accentColor: "text-[#E8A598]"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 font-serif">
      {stats.map((st, i) => {
        const Icon = st.icon;
        return (
          <div key={i} className={`p-6 rounded-[20px] border-1.5 ${st.cardBg} shadow-sm space-y-3`}>
            <div className="flex items-center justify-between font-sans text-xs">
              <span className="font-semibold opacity-70 uppercase tracking-wider text-[10px]">{st.title}</span>
              <Icon className={`w-4 h-4 ${st.accentColor}`} />
            </div>

            <div className="space-y-1">
              <h3 className="font-serif font-light text-3xl">{st.value}</h3>
              <p className="text-[11px] font-sans font-medium text-emerald-600 flex items-center gap-1">
                <TrendingUp className="w-3 h-3 inline" /> {st.change}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
