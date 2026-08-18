'use client';

import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const data = [
  { month: 'Jan', revenue: 14200 },
  { month: 'Feb', revenue: 22800 },
  { month: 'Mar', revenue: 31000 },
  { month: 'Apr', revenue: 28500 },
  { month: 'May', revenue: 45000 },
  { month: 'Jun', revenue: 62000 },
  { month: 'Jul', revenue: 78000 },
  { month: 'Aug', revenue: 89400 },
];

export default function EarningsChart() {
  return (
    <div className="p-6 rounded-[24px] bg-[#231510] text-[#F8F3E8] border border-[#C86A4B]/20 shadow-xl space-y-4 font-serif">
      <div className="flex items-center justify-between border-b border-stone-800 pb-3">
        <div>
          <h3 className="font-serif font-light text-2xl text-[#F8F3E8]">Revenue Growth (₹)</h3>
          <p className="font-sans text-xs text-[#F8F3E8]/60">AI Voice Listing &amp; Multi-Platform Sync Analytics</p>
        </div>
        <span className="text-[10px] font-sans font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-[#C86A4B]/20 text-[#E5A83B] border border-[#C86A4B]/40">
          +114% YoY Growth
        </span>
      </div>

      <div className="h-64 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorCopperRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#C86A4B" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#C86A4B" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(200, 106, 75, 0.15)" />
            <XAxis dataKey="month" stroke="#E8A598" fontSize={11} tickLine={false} />
            <YAxis stroke="#E8A598" fontSize={11} tickLine={false} tickFormatter={(val) => `₹${val / 1000}k`} />
            <Tooltip
              formatter={(value: any) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Artisan Revenue']}
              contentStyle={{ backgroundColor: '#1C100B', borderRadius: '16px', border: '1px solid #C86A4B', color: '#F8F3E8', fontFamily: 'var(--font-jakarta)' }}
            />
            <Area type="monotone" dataKey="revenue" stroke="#C86A4B" strokeWidth={3} fillOpacity={1} fill="url(#colorCopperRevenue)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
