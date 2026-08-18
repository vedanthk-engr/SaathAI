'use client';

import React, { useState, useEffect } from 'react';
import { useArtisanProfile } from '@/context/ArtisanContext';

interface ChartPoint {
  month: string;
  y: number;
  revenue: string;
  crafts: number;
}

export default function PredictiveForecastPage() {
  const { currentArtisan, setArtisanById, artisans } = useArtisanProfile();

  const [toggleVoiceStory, setToggleVoiceStory] = useState(true);
  const [toggleGiHallmark, setToggleGiHallmark] = useState(true);
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(null);

  // Dynamic Artisan Predictive Forecast Data Profiles
  const artisanForecastProfiles: Record<string, any> = {
    'artisan-1': {
      artisanName: 'Sita Devi Mithila',
      craftTitle: 'Madhubani Painting',
      peakDemand: '+14% YoY Growth',
      topCraft: 'Sacred Tree of Life Canvas',
      trackedCount: '85 crafts tracked',
      growthDriver: 'Voice AI Intake',
      growthDriverStat: 'Up by 28% QoQ',
      bestIntervention: 'Direct Fair Trade',
      interventionStat: 'High efficacy rate',
      baseScore: 68,
      months: ['MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG'],
      baseY: [110, 95, 80, 68, 52, 30],
      baseRevenues: ['₹22.4k', '₹34.8k', '₹48.2k', '₹61.5k', '₹75.0k', '₹89.4k']
    },
    'artisan-2': {
      artisanName: 'Ghulam Hassan Rather',
      craftTitle: 'Royal Sozni Pashmina',
      peakDemand: '+28% YoY Growth',
      topCraft: 'Imperial Sozni Needle Shawl',
      trackedCount: '120 crafts tracked',
      growthDriver: 'GI Tag Hallmark',
      growthDriverStat: 'Up by 42% QoQ',
      bestIntervention: 'Luxury Fiber Audit',
      interventionStat: '99.8% Purity Score',
      baseScore: 75,
      months: ['MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG'],
      baseY: [140, 115, 90, 60, 35, 15],
      baseRevenues: ['₹65.0k', '₹110.0k', '₹165.0k', '₹210.0k', '₹265.0k', '₹320.0k']
    },
    'artisan-3': {
      artisanName: 'Rameshwar Bhil',
      craftTitle: 'Tarpa Warli Art',
      peakDemand: '+18% YoY Growth',
      topCraft: 'Tarpa Dance Circle Canvas',
      trackedCount: '64 crafts tracked',
      growthDriver: 'Etsy & ONDC Sync',
      growthDriverStat: 'Up by 35% QoQ',
      bestIntervention: 'Organic Rice Wash',
      interventionStat: 'Eco-Certified',
      baseScore: 64,
      months: ['MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG'],
      baseY: [120, 105, 90, 75, 58, 38],
      baseRevenues: ['₹12.0k', '₹18.5k', '₹26.0k', '₹34.2k', '₹42.8k', '₹54.2k']
    },
    'artisan-4': {
      artisanName: 'Bastar Metal Guild',
      craftTitle: 'Lost-Wax Brass Dhokra',
      peakDemand: '+21% YoY Growth',
      topCraft: 'Lost-Wax Brass Figurine',
      trackedCount: '92 crafts tracked',
      growthDriver: 'Export QR Passport',
      growthDriverStat: 'Up by 31% QoQ',
      bestIntervention: 'Lost-Wax Mold Audit',
      interventionStat: '100% Brass Purity',
      baseScore: 70,
      months: ['MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG'],
      baseY: [130, 110, 85, 60, 40, 20],
      baseRevenues: ['₹28.0k', '₹44.0k', '₹62.0k', '₹79.0k', '₹95.0k', '₹112.0k']
    }
  };

  const activeProfile = artisanForecastProfiles[currentArtisan.id] || artisanForecastProfiles['artisan-1'];

  // Calculate live reactive score based on toggles
  const voiceBonus = toggleVoiceStory ? 12 : 0;
  const hallmarkBonus = toggleGiHallmark ? 15 : 0;
  const liveCraftScore = Math.min(98, activeProfile.baseScore + voiceBonus + hallmarkBonus);

  // Calculate dynamic SVG Y coordinates for the curve
  const liftOffset = (toggleVoiceStory ? 12 : 0) + (toggleGiHallmark ? 15 : 0);
  const liveYPoints = activeProfile.baseY.map((y: number) => Math.max(15, y - liftOffset));

  const xCoords = [30, 140, 250, 360, 470, 580];
  const chartPoints: ChartPoint[] = liveYPoints.map((y: number, i: number) => ({
    month: activeProfile.months[i],
    y,
    revenue: activeProfile.baseRevenues[i],
    crafts: 14 + i * 3
  }));

  // Build SVG Path strings dynamically
  const pathD = `M ${xCoords[0]},${liveYPoints[0]} Q ${xCoords[2]},${liveYPoints[2]} ${xCoords[3]},${liveYPoints[3]} T ${xCoords[5]},${liveYPoints[5]}`;
  const fillD = `M ${xCoords[0]},${liveYPoints[0]} Q ${xCoords[2]},${liveYPoints[2]} ${xCoords[3]},${liveYPoints[3]} T ${xCoords[5]},${liveYPoints[5]} L ${xCoords[5]},140 L ${xCoords[0]},140 Z`;

  // Calculated percentage boost text
  const totalBoostPct = (toggleVoiceStory ? 14 : 0) + (toggleGiHallmark ? 18 : 0);

  return (
    <div className="space-y-8 font-sans pb-8 w-full">
      
      {/* Top Header Row — Predictive Forecast Title & Profile Selector Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-black text-stone-900 tracking-tight">Predictive Forecast:</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" /> OPTIMAL
            </span>
          </div>
          <p className="text-xs text-stone-500 font-medium mt-1">
            Multi-cohort projection and growth analysis based on current artisan &amp; craft market data.
          </p>
        </div>

        {/* IN-PAGE ARTISAN PROFILE SELECTOR BAR */}
        <div className="space-y-1">
          <span className="text-[9px] font-mono font-bold text-stone-400 uppercase tracking-widest block text-right">
            SELECT FORECAST ARTISAN PROFILE
          </span>
          <div className="flex items-center gap-1.5 bg-white border border-stone-200 p-1.5 rounded-full shadow-sm">
            {artisans.map((artisan) => {
              const isSelected = artisan.id === currentArtisan.id;
              return (
                <button
                  key={artisan.id}
                  onClick={() => setArtisanById(artisan.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#18181A] text-white shadow-md'
                      : 'bg-stone-50 hover:bg-stone-100 text-stone-700'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full font-black text-[10px] flex items-center justify-center ${
                    isSelected ? 'bg-[#ffb1c4] text-[#3b061a]' : 'bg-stone-300 text-stone-900'
                  }`}>
                    {artisan.name.charAt(0)}
                  </div>
                  <span>{artisan.shortName}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* TOP 4 BENTO CARDS (REACTS TO PROFILE SWITCHING) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        
        {/* Yellow Card (#F5C538) */}
        <div className="p-6 rounded-[28px] bg-[#F5C538] text-stone-900 shadow-sm flex flex-col justify-between min-h-[150px] space-y-2">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-stone-800 block">
            12-Month Peak Demand:
          </span>
          <div>
            <h3 className="text-2xl font-black text-stone-900 leading-tight truncate">
              {activeProfile.craftTitle}
            </h3>
            <p className="text-xs font-bold text-stone-900 font-mono mt-1">
              {activeProfile.peakDemand}
            </p>
          </div>
        </div>

        {/* Pink Card (#F59EB7) */}
        <div className="p-6 rounded-[28px] bg-[#F59EB7] text-[#3b061a] shadow-sm flex flex-col justify-between min-h-[150px] space-y-2">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#713245] block">
            Highest Revenue Craft:
          </span>
          <div>
            <h3 className="text-2xl font-black text-[#3b061a] leading-tight truncate">
              {activeProfile.topCraft}
            </h3>
            <p className="text-xs font-bold text-[#713245] font-mono mt-1">
              {activeProfile.trackedCount}
            </p>
          </div>
        </div>

        {/* Green Card (#B8CC34) */}
        <div className="p-6 rounded-[28px] bg-[#B8CC34] text-stone-900 shadow-sm flex flex-col justify-between min-h-[150px] space-y-2">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-stone-800 block">
            Top Growth Driver:
          </span>
          <div>
            <h3 className="text-2xl font-black text-stone-900 leading-tight truncate">
              {activeProfile.growthDriver}
            </h3>
            <p className="text-xs font-bold text-stone-900 font-mono mt-1">
              {activeProfile.growthDriverStat}
            </p>
          </div>
        </div>

        {/* Blue Card (#8EC0F2) */}
        <div className="p-6 rounded-[28px] bg-[#8EC0F2] text-stone-900 shadow-sm flex flex-col justify-between min-h-[150px] space-y-2">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-stone-800 block">
            Best Intervention:
          </span>
          <div>
            <h3 className="text-2xl font-black text-stone-900 leading-tight truncate">
              {activeProfile.bestIntervention}
            </h3>
            <p className="text-xs font-bold text-stone-900 font-mono mt-1">
              {activeProfile.interventionStat}
            </p>
          </div>
        </div>

      </div>

      {/* FULL-WIDTH TRAJECTORY FORECAST CARD (#F5C538) */}
      <div className="p-8 rounded-[32px] bg-[#F5C538] text-stone-900 shadow-sm space-y-6 relative overflow-hidden w-full">
        
        {/* Header: Title, Active Artisan Badge, and Live Reactive Score */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-stone-900/70 block">
              FORECAST FOR {activeProfile.artisanName.toUpperCase()}
            </span>
            <h2 className="text-3xl font-black tracking-tight text-stone-900 mt-0.5">Trajectory Forecast</h2>
            <p className="text-xs font-bold text-stone-800 mt-0.5">{activeProfile.craftTitle} Demand Progression &amp; Global Market Growth</p>
          </div>

          {/* Live Reactive Craft Score */}
          <div className="flex items-center gap-4">
            <div className="flex items-baseline gap-1 bg-white/60 backdrop-blur-md px-4 py-2 rounded-2xl shadow-sm border border-stone-900/10">
              <span className="text-4xl font-black text-stone-900 leading-none transition-all duration-300">
                {liveCraftScore}
              </span>
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-stone-800 leading-tight">
                CRAFT<br />SCORE
              </span>
            </div>
          </div>
        </div>

        {/* Legend Indicator Pills */}
        <div className="flex items-center gap-4 text-xs font-bold font-mono text-stone-900 border-b border-stone-900/10 pb-3">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#EC4899]" />
            Simulated Forecast ({totalBoostPct > 0 ? `+${totalBoostPct}% Boost` : 'Baseline'})
          </span>
          <span className="flex items-center gap-1.5 text-stone-700">
            <span className="w-4 h-0.5 bg-stone-900 border-t border-dashed border-stone-900" />
            Historical Baseline
          </span>
        </div>

        {/* Inner Sub-Card Container with Reactive SVG Curve & Y-Axis Labels */}
        <div className="p-6 rounded-[24px] bg-white/40 backdrop-blur-sm border border-stone-900/10 shadow-inner space-y-4">
          
          <div className="h-52 relative flex">
            
            {/* Y-Axis Labels Column */}
            <div className="flex flex-col justify-between text-[10px] font-mono font-bold text-stone-700 pr-3 border-r border-stone-900/10 py-1">
              <span>{activeProfile.baseRevenues[5]}</span>
              <span>{activeProfile.baseRevenues[4]}</span>
              <span>{activeProfile.baseRevenues[2]}</span>
              <span>{activeProfile.baseRevenues[0]}</span>
              <span>₹0</span>
            </div>

            {/* Main Graph SVG Container */}
            <div className="flex-1 relative ml-2">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 600 150">
                <defs>
                  <linearGradient id="pinkGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#EC4899" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="#F5C538" stopOpacity={0.0} />
                  </linearGradient>
                </defs>

                {/* Dotted Grid Lines */}
                <line x1="0" y1="20" x2="600" y2="20" stroke="rgba(28,28,30,0.12)" strokeDasharray="4 4" />
                <line x1="0" y1="55" x2="600" y2="55" stroke="rgba(28,28,30,0.12)" strokeDasharray="4 4" />
                <line x1="0" y1="90" x2="600" y2="90" stroke="rgba(28,28,30,0.12)" strokeDasharray="4 4" />
                <line x1="0" y1="125" x2="600" y2="125" stroke="rgba(28,28,30,0.12)" strokeDasharray="4 4" />

                {/* Reactive Gradient Fill Path */}
                <path
                  d={fillD}
                  fill="url(#pinkGradient)"
                  className="transition-all duration-500"
                />

                {/* Reactive Smooth Pink Curve Stroke */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="#EC4899"
                  strokeWidth="4"
                  strokeLinecap="round"
                  className="transition-all duration-500"
                />

                {/* Dashed Baseline Reference Line */}
                <path
                  d="M 30,120 Q 250,125 580,130"
                  fill="none"
                  stroke="#18181A"
                  strokeWidth="2.5"
                  strokeDasharray="6 6"
                  opacity={0.6}
                />

                {/* Interactive Data Dots on Curve */}
                {chartPoints.map((pt, i) => (
                  <g
                    key={i}
                    onMouseEnter={() => setHoveredPointIndex(i)}
                    onMouseLeave={() => setHoveredPointIndex(null)}
                    className="cursor-pointer transition-all duration-300 group"
                  >
                    <circle
                      cx={xCoords[i]}
                      cy={pt.y}
                      r={hoveredPointIndex === i ? 8 : 6}
                      fill="#ffffff"
                      stroke="#EC4899"
                      strokeWidth="3"
                      className="transition-all"
                    />

                    {/* Hover Tooltip Box */}
                    {hoveredPointIndex === i && (
                      <g className="animate-fadeIn">
                        <rect
                          x={xCoords[i] - 45}
                          y={pt.y - 38}
                          width="90"
                          height="28"
                          rx="6"
                          fill="#18181A"
                        />
                        <text
                          x={xCoords[i]}
                          y={pt.y - 20}
                          fill="#ffffff"
                          fontSize="10"
                          fontWeight="bold"
                          textAnchor="middle"
                        >
                          {pt.revenue} • {pt.crafts} items
                        </text>
                      </g>
                    )}
                  </g>
                ))}
              </svg>

              {/* X-Axis Months */}
              <div className="flex items-center justify-between text-xs font-mono font-bold text-stone-900 pt-2 px-2">
                {chartPoints.map((d) => (
                  <span key={d.month}>{d.month}</span>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Live Metrics Bar inside Graph Card */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-stone-900/10 text-xs font-bold">
          <div className="p-3 rounded-2xl bg-white/50 backdrop-blur-sm flex items-center justify-between">
            <span className="text-stone-700">Projected Revenue:</span>
            <span className="font-mono text-base text-stone-900 font-black">{activeProfile.baseRevenues[5]}</span>
          </div>
          <div className="p-3 rounded-2xl bg-white/50 backdrop-blur-sm flex items-center justify-between">
            <span className="text-stone-700">Annualized Growth:</span>
            <span className="font-mono text-base text-emerald-800 font-black">{activeProfile.peakDemand}</span>
          </div>
          <div className="p-3 rounded-2xl bg-white/50 backdrop-blur-sm flex items-center justify-between">
            <span className="text-stone-700">Direct Pay Rate:</span>
            <span className="font-mono text-base text-stone-900 font-black">100% Fair Trade</span>
          </div>
        </div>

      </div>

      {/* FULL-WIDTH INTERVENTION SIMULATOR CARD */}
      <div className="p-8 rounded-[32px] bg-white border border-stone-200 shadow-sm space-y-6 w-full">
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100/70 text-emerald-600 flex items-center justify-center font-bold">
            <span className="material-symbols-outlined text-xl">science</span>
          </div>
          <div>
            <h3 className="text-2xl font-black text-stone-900">Intervention Simulator</h3>
            <p className="text-xs text-stone-500 font-medium">Toggle AI interventions to see real-time graph trajectory &amp; craft score updates for {activeProfile.artisanName}</p>
          </div>
        </div>

        {/* Interactive Toggle Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          {/* Toggle 1: Voice Story Audio */}
          <div
            onClick={() => setToggleVoiceStory(!toggleVoiceStory)}
            className={`p-6 rounded-2xl border transition-all cursor-pointer flex items-center justify-between shadow-sm ${
              toggleVoiceStory ? 'bg-emerald-50/80 border-emerald-300' : 'bg-[#F9F9F7] border-stone-200'
            }`}
          >
            <div>
              <h4 className="font-extrabold text-stone-900 text-base">Add Voice Story Audio</h4>
              <p className="text-xs text-stone-500 font-medium mt-0.5">ElevenLabs Multilingual (+12 Score)</p>
            </div>
            <div
              className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 flex items-center ${
                toggleVoiceStory ? 'bg-emerald-500 justify-end' : 'bg-stone-300 justify-start'
              }`}
            >
              <span className="w-6 h-6 rounded-full bg-white shadow-md block" />
            </div>
          </div>

          {/* Toggle 2: GI Hallmark Badge */}
          <div
            onClick={() => setToggleGiHallmark(!toggleGiHallmark)}
            className={`p-6 rounded-2xl border transition-all cursor-pointer flex items-center justify-between shadow-sm ${
              toggleGiHallmark ? 'bg-emerald-50/80 border-emerald-300' : 'bg-[#F9F9F7] border-stone-200'
            }`}
          >
            <div>
              <h4 className="font-extrabold text-stone-900 text-base">Enable GI Hallmark Badge</h4>
              <p className="text-xs text-stone-500 font-medium mt-0.5">Official Digital Passport (+15 Score)</p>
            </div>
            <div
              className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 flex items-center ${
                toggleGiHallmark ? 'bg-emerald-500 justify-end' : 'bg-stone-300 justify-start'
              }`}
            >
              <span className="w-6 h-6 rounded-full bg-white shadow-md block" />
            </div>
          </div>

        </div>

        {/* Dynamic Simulated Outcome Box (#FEFCE8 Soft Yellow) */}
        <div className="p-6 rounded-2xl bg-[#FEFCE8] border border-amber-200 space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-800">
            DYNAMIC SIMULATED OUTCOME FOR {activeProfile.artisanName.toUpperCase()}
          </span>
          <p className="text-base font-extrabold text-stone-900 leading-relaxed">
            Projected <span className="text-[#EC4899]">{totalBoostPct > 0 ? `${totalBoostPct}% increase` : 'baseline steady trend'}</span> in global buyer inquiries and direct pay conversion for {activeProfile.craftTitle} over 6 months. Active Score: <span className="text-emerald-700 font-black">{liveCraftScore}</span>.
          </p>
        </div>

      </div>

    </div>
  );
}
