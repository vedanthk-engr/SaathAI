'use client';

import React, { useState } from 'react';

export default function ArtisanAnalyticsPage() {
  const [useCohortBenchmark, setUseCohortBenchmark] = useState(false);
  const [selectedCell, setSelectedCell] = useState<{ craft: string; metric: string; val: number } | null>(null);
  const [selectedSpike, setSelectedSpike] = useState<string | null>(null);

  const correlationMatrix = [
    { craft: 'Madhubani Painting', price: 0.95, hours: 0.48, auth: 0.98, gi: 0.94, voice: 0.88, direct: 0.92 },
    { craft: 'Royal Sozni Pashmina', price: 0.88, hours: 0.92, auth: 0.95, gi: 0.98, voice: 0.76, direct: 0.95 },
    { craft: 'Tarpa Warli Canvas', price: 0.65, hours: 0.42, auth: 0.92, gi: 0.90, voice: 0.82, direct: 0.88 },
    { craft: 'Lost-Wax Brass Dhokra', price: 0.78, hours: 0.85, auth: 0.94, gi: 0.92, voice: 0.70, direct: 0.90 },
    { craft: 'Chanderi Handloom Silk', price: 0.82, hours: 0.68, auth: 0.90, gi: 0.86, voice: 0.85, direct: 0.94 },
  ];

  const spikeEvents: Record<string, string> = {
    'Jan 25': 'Festive Export Spike: International demand for Madhubani double-outline canvases surged 65%.',
    'May 25': 'GI Tag Awareness Campaign: 100% direct buyer conversion rate achieved across Mithila Guild.',
    'Feb 26': 'Voice AI Multilingual Release: German & French buyer inquiries increased revenue by +42%.'
  };

  const buyerCohorts = [
    { name: 'European Heritage Collectors', pct: 42, rev: '₹12.4L', color: 'bg-emerald-600' },
    { name: 'Domestic Luxury Boutiques', pct: 35, rev: '₹8.9L', color: 'bg-amber-500' },
    { name: 'Direct GI Export Channels', pct: 23, rev: '₹6.2L', color: 'bg-purple-600' },
  ];

  return (
    <div className="space-y-8 font-sans pb-12 w-full">
      
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-stone-900 tracking-tight">Artisan analytics:</h1>
          <p className="text-xs text-stone-500 font-medium mt-1">
            Detailed craft tracking, material purity, and correlative analysis across your active artisan cohort.
          </p>
        </div>

        {/* Toggle Pill: Personal Baseline vs Cohort Benchmarks */}
        <div className="flex items-center gap-3 bg-white p-1.5 rounded-full border border-stone-200 shadow-sm text-xs font-bold font-mono">
          <span className={!useCohortBenchmark ? 'text-pink-600 font-extrabold' : 'text-stone-400'}>
            PERSONAL BASELINE
          </span>
          <button
            onClick={() => setUseCohortBenchmark(!useCohortBenchmark)}
            className={`w-12 h-6 rounded-full p-0.5 transition-colors duration-300 flex items-center ${
              useCohortBenchmark ? 'bg-stone-900 justify-end' : 'bg-stone-300 justify-start'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-white shadow-md block" />
          </button>
          <span className={useCohortBenchmark ? 'text-stone-900 font-extrabold' : 'text-stone-400'}>
            COHORT BENCHMARKS
          </span>
        </div>
      </div>

      {/* NEW LAYER 1: MATERIAL PURITY & SUSTAINABILITY INDEX (3 Metric Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-[28px] bg-white border border-stone-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">NATURAL DYE ECO-INDEX</span>
            <span className="text-3xl font-black text-emerald-800">99.4%</span>
            <p className="text-[11px] text-stone-500 font-medium mt-0.5">Organic Pigment Verified</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-black">
            🌱
          </div>
        </div>

        <div className="p-6 rounded-[28px] bg-white border border-stone-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">CHEMICAL PURITY</span>
            <span className="text-3xl font-black text-stone-900">100%</span>
            <p className="text-[11px] text-stone-500 font-medium mt-0.5">Zero Additives Detected</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-black">
            🔬
          </div>
        </div>

        <div className="p-6 rounded-[28px] bg-white border border-stone-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">DIRECT PAY EFFICIENCY</span>
            <span className="text-3xl font-black text-purple-900">100%</span>
            <p className="text-[11px] text-stone-500 font-medium mt-0.5">Zero Middleman Cut</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center font-black">
            ⚡
          </div>
        </div>
      </div>

      {/* TOP WIDE BENTO CARDS (Yellow & Pink matching Screenshot) */}
      <div className="space-y-6">
        
        {/* Yellow Card (#F5C538) - Sita Devi Mithila */}
        <div className="p-7 rounded-[32px] bg-[#F5C538] text-stone-900 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-900/10 pb-4">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-black">Sita Devi Mithila</h3>
                <span className="px-3 py-0.5 rounded-full bg-white/70 text-stone-900 text-[10px] font-extrabold uppercase">
                  Elevated Demand
                </span>
              </div>
              <p className="text-xs font-semibold text-stone-800 mt-0.5">
                ID: ART-00142 • Age: 58 • Mithila Heritage Guild
              </p>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 items-center">
              <div>
                <span className="text-[9px] font-bold text-stone-800 uppercase tracking-widest block">FAIR PRICE</span>
                <span className="text-2xl font-black">₹5,200</span>
                <div className="w-16 h-1.5 bg-stone-900/20 rounded-full mt-1 overflow-hidden">
                  <div className="w-3/4 h-full bg-stone-900 rounded-full" />
                </div>
              </div>

              <div>
                <span className="text-[9px] font-bold text-stone-800 uppercase tracking-widest block">LABOR HOURS</span>
                <span className="text-2xl font-black">42 hrs</span>
                <div className="w-16 h-1.5 bg-stone-900/20 rounded-full mt-1 overflow-hidden">
                  <div className="w-4/5 h-full bg-stone-900 rounded-full" />
                </div>
              </div>

              <div>
                <span className="text-[9px] font-bold text-stone-800 uppercase tracking-widest block">AUTHENTICITY</span>
                <span className="text-2xl font-black">98%</span>
                <div className="w-16 h-1.5 bg-stone-900/20 rounded-full mt-1 overflow-hidden">
                  <div className="w-full h-full bg-emerald-800 rounded-full" />
                </div>
              </div>

              <div>
                <span className="text-[9px] font-bold text-stone-800 uppercase tracking-widest block">GI ADHERENCE</span>
                <span className="text-2xl font-black">94%</span>
                <div className="w-full h-2 bg-stone-900/20 rounded-full mt-1 overflow-hidden">
                  <div className="w-[94%] h-full bg-stone-900 rounded-full" />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Pink Card (#F59EB7) - Ghulam Hassan Rather */}
        <div className="p-7 rounded-[32px] bg-[#F59EB7] text-[#3b061a] shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#3b061a]/10 pb-4">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-black">Ghulam Hassan Rather</h3>
                <span className="px-3 py-0.5 rounded-full bg-white/70 text-[#3b061a] text-[10px] font-extrabold uppercase">
                  Stable Premium
                </span>
              </div>
              <p className="text-xs font-semibold text-[#713245] mt-0.5">
                ID: ART-00284 • Age: 62 • Srinagar Sozni Guild
              </p>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 items-center">
              <div>
                <span className="text-[9px] font-bold text-[#713245] uppercase tracking-widest block">PRICE TARGET</span>
                <span className="text-2xl font-black">₹32,000</span>
                <div className="w-16 h-1.5 bg-[#3b061a]/20 rounded-full mt-1 overflow-hidden">
                  <div className="w-4/5 h-full bg-[#3b061a] rounded-full" />
                </div>
              </div>

              <div>
                <span className="text-[9px] font-bold text-[#713245] uppercase tracking-widest block">FIBER PURITY</span>
                <span className="text-2xl font-black">100%</span>
                <div className="w-16 h-1.5 bg-[#3b061a]/20 rounded-full mt-1 overflow-hidden">
                  <div className="w-full h-full bg-[#3b061a] rounded-full" />
                </div>
              </div>

              <div>
                <span className="text-[9px] font-bold text-[#713245] uppercase tracking-widest block">CRAFT SCORE</span>
                <span className="text-2xl font-black">95</span>
                <div className="w-16 h-1.5 bg-[#3b061a]/20 rounded-full mt-1 overflow-hidden">
                  <div className="w-[95%] h-full bg-[#3b061a] rounded-full" />
                </div>
              </div>

              <div>
                <span className="text-[9px] font-bold text-[#713245] uppercase tracking-widest block">DIRECT PAY</span>
                <span className="text-2xl font-black">92%</span>
                <div className="w-full h-2 bg-[#3b061a]/20 rounded-full mt-1 overflow-hidden">
                  <div className="w-[92%] h-full bg-[#3b061a] rounded-full" />
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* NEW LAYER 2: GLOBAL BUYER DEMOGRAPHICS & COHORT DISTRIBUTION */}
      <div className="p-7 rounded-[32px] bg-white border border-stone-200 shadow-sm space-y-4">
        <h3 className="text-xl font-black text-stone-900">Global Buyer Cohort Distribution</h3>
        
        <div className="space-y-3">
          {buyerCohorts.map((cohort, i) => (
            <div key={i} className="space-y-1 text-xs font-sans">
              <div className="flex items-center justify-between font-bold">
                <span className="text-stone-900">{cohort.name}</span>
                <span className="font-mono text-stone-600">{cohort.pct}% ({cohort.rev})</span>
              </div>
              <div className="w-full h-3 rounded-full bg-stone-100 overflow-hidden">
                <div className={`h-full ${cohort.color} rounded-full`} style={{ width: `${cohort.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM TWO CARDS GRID (Green Matrix Table & Pink Demand Anomaly Chart) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Green Left Card (#B8CC34): Craft Correlations Matrix */}
        <div className="lg:col-span-6 p-7 rounded-[32px] bg-[#B8CC34] text-stone-900 shadow-sm space-y-6">
          <div>
            <h3 className="text-2xl font-black tracking-tight">Craft &amp; Provenance correlations:</h3>
            <p className="text-xs font-bold text-stone-800 mt-0.5">
              Correlation coefficient mapping crafts to provenance markers. Hover for interpretation.
            </p>
          </div>

          {/* Matrix Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-mono">
              <thead>
                <tr className="text-[9px] font-extrabold text-stone-800 uppercase tracking-wider">
                  <th className="pb-3">CRAFTS</th>
                  <th className="pb-3 px-1 text-center">PRICE</th>
                  <th className="pb-3 px-1 text-center">HOURS</th>
                  <th className="pb-3 px-1 text-center">AUTH</th>
                  <th className="pb-3 px-1 text-center">GI TAG</th>
                  <th className="pb-3 px-1 text-center">VOICE AI</th>
                  <th className="pb-3 px-1 text-center">DIRECT</th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                {correlationMatrix.map((row, i) => (
                  <tr key={i} className="border-t border-stone-900/10">
                    <td className="py-2.5 font-bold font-sans text-xs truncate max-w-[130px]">
                      {row.craft}
                    </td>
                    {[row.price, row.hours, row.auth, row.gi, row.voice, row.direct].map((val, j) => {
                      const metrics = ['PRICE', 'HOURS', 'AUTH', 'GI TAG', 'VOICE AI', 'DIRECT'];
                      const isHigh = val >= 0.85;
                      return (
                        <td key={j} className="py-2.5 px-1 text-center">
                          <button
                            onMouseEnter={() => setSelectedCell({ craft: row.craft, metric: metrics[j], val })}
                            className={`w-9 h-7 rounded-lg font-black text-xs transition-all ${
                              isHigh ? 'bg-stone-900 text-white shadow-sm' : 'bg-stone-900/20 text-stone-900'
                            }`}
                          >
                            {val.toFixed(2)}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Dynamic Cell Interpretation Box */}
          <div className="p-4 rounded-2xl bg-white/60 backdrop-blur-sm text-xs font-sans space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-stone-700 block">
              CORRELATION INTERPRETATION
            </span>
            <p className="font-extrabold text-stone-900">
              {selectedCell
                ? `${selectedCell.craft} × ${selectedCell.metric}: Strong ${selectedCell.val >= 0.85 ? 'positive' : 'moderate'} correlation (${selectedCell.val}). AI recommendation verified.`
                : 'Hover over matrix cells to query AI provenance feedback and coefficient interpretations.'}
            </p>
          </div>
        </div>

        {/* Pink Right Card (#F59EB7): Demand Anomaly History */}
        <div className="lg:col-span-6 p-7 rounded-[32px] bg-[#F59EB7] text-[#3b061a] shadow-sm space-y-6">
          <div>
            <h3 className="text-2xl font-black tracking-tight">Demand anomaly history:</h3>
            <p className="text-xs font-bold text-[#713245] mt-0.5">
              Longitudinal demand deviation score over 24 months. Click highlighted spike points for details.
            </p>
          </div>

          {/* Spike Chart */}
          <div className="h-56 relative pt-4">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 500 140">
              <line x1="0" y1="20" x2="500" y2="20" stroke="rgba(59,6,26,0.15)" strokeDasharray="3 3" />
              <line x1="0" y1="60" x2="500" y2="60" stroke="rgba(59,6,26,0.15)" strokeDasharray="3 3" />
              <line x1="0" y1="100" x2="500" y2="100" stroke="rgba(59,6,26,0.15)" strokeDasharray="3 3" />

              <path
                d="M 10,110 L 80,98 L 150,30 L 220,85 L 290,25 L 360,90 L 430,18 L 490,70"
                fill="none"
                stroke="#3b061a"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {[
                { x: 10, y: 110, label: 'Sep 24' },
                { x: 80, y: 98, label: 'Nov 24' },
                { x: 150, y: 30, label: 'Jan 25' },
                { x: 220, y: 85, label: 'Mar 25' },
                { x: 290, y: 25, label: 'May 25' },
                { x: 360, y: 90, label: 'Jul 25' },
                { x: 430, y: 18, label: 'Feb 26' },
                { x: 490, y: 70, label: 'May 26' }
              ].map((pt, idx) => {
                const isSpike = pt.y < 40;
                return (
                  <g
                    key={idx}
                    onClick={() => isSpike && setSelectedSpike(pt.label)}
                    className={isSpike ? 'cursor-pointer' : ''}
                  >
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isSpike ? 7 : 4}
                      fill={isSpike ? '#E11D48' : '#3b061a'}
                      stroke="#ffffff"
                      strokeWidth={isSpike ? 2.5 : 1}
                      className={isSpike ? 'hover:scale-125 transition-transform' : ''}
                    />
                  </g>
                );
              })}
            </svg>

            <div className="flex items-center justify-between text-[10px] font-mono font-bold text-[#713245] pt-2 px-1">
              <span>Sep 24</span>
              <span>Jan 25</span>
              <span>May 25</span>
              <span>Sep 25</span>
              <span>Jan 26</span>
              <span>May 26</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/60 backdrop-blur-sm text-xs font-sans space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#713245] block">
              ANOMALY DIAGNOSTICS BRIEF
            </span>
            <p className="font-extrabold text-[#3b061a]">
              {selectedSpike && spikeEvents[selectedSpike]
                ? `${selectedSpike}: ${spikeEvents[selectedSpike]}`
                : 'Click on a red spike point above (e.g. Jan 25, May 25, Feb 26) to read the anomaly diagnostics brief.'}
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
