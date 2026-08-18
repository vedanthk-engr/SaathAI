'use client';

import React, { useState } from 'react';

export default function ArtisanAlertCentrePage() {
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [sortUrgency, setSortUrgency] = useState('Urgency');
  const [reasoningModal, setReasoningModal] = useState<any | null>(null);

  const initialAlerts = [
    {
      id: 'alert-1',
      artisan: 'Sita Devi Mithila',
      artisanId: 'ART-00142',
      tag: 'PRICE GUARD UNDERCUT',
      urgencyScore: 9,
      bgCard: 'bg-[#F59EB7] text-[#3b061a]',
      boxBg: 'bg-white/40 border border-[#3b061a]/10',
      badgeBg: 'bg-[#3b061a] text-white',
      ackBtn: 'bg-[#3b061a] hover:bg-black text-white',
      reasonBtn: 'bg-white/60 hover:bg-white text-[#3b061a]',
      message: 'Price Guard Alert: Unauthorized reseller listing Madhubani Tree of Life 38% below fair trade minimum (₹3,200 vs ₹5,200). AI recommended price enforcement.',
      aiReasoning: 'GPT-4o Vision & Price Guard cross-referenced seller listing on third-party marketplace. Identified 38% price undercut breaking Geographical Indication (GI-145) fair trade agreement. Recommendation: Issue automated cease-and-desist and enforce ₹5,200 floor.'
    },
    {
      id: 'alert-2',
      artisan: 'Ghulam Hassan Rather',
      artisanId: 'ART-00284',
      tag: 'VOICE INTAKE REVIEW',
      urgencyScore: 5,
      bgCard: 'bg-[#F5C538] text-stone-900',
      boxBg: 'bg-white/50 border border-stone-900/10',
      badgeBg: 'bg-stone-900 text-white',
      ackBtn: 'bg-stone-900 hover:bg-black text-white',
      reasonBtn: 'bg-white/60 hover:bg-white text-stone-900',
      message: 'Voice AI Intake Note: Spoken Kashmiri audio transcript initialized via Whisper. High-altitude Pashmina fiber purity verified with 95% confidence.',
      aiReasoning: 'Kashmiri dialect Whisper model parsed 4.2 minutes of artisan audio. High-altitude Changthangi cashmere fiber density verified via spectral image analysis. Recommended action: Approve for global market listing.'
    },
    {
      id: 'alert-3',
      artisan: 'Bastar Metal Guild',
      artisanId: 'ART-00764',
      tag: 'DISPATCH PACKAGING',
      urgencyScore: 3,
      bgCard: 'bg-[#B8CC34] text-stone-900',
      boxBg: 'bg-white/50 border border-stone-900/10',
      badgeBg: 'bg-stone-900 text-white',
      ackBtn: 'bg-stone-900 hover:bg-black text-white',
      reasonBtn: 'bg-white/60 hover:bg-white text-stone-900',
      message: 'Order #9041 Packaging Complete: Custom brass Dhokra sculpture passed quality inspection and ready for international export dispatch.',
      aiReasoning: 'Lost-wax casting single-use mold verified authentic. QR provenance code attached to package. International DHL tracking code generated.'
    },
    {
      id: 'alert-4',
      artisan: 'Rameshwar Bhil',
      artisanId: 'ART-00399',
      tag: 'DIRECT PAYOUT SYNC',
      urgencyScore: 2,
      bgCard: 'bg-[#8EC0F2] text-stone-900',
      boxBg: 'bg-white/50 border border-stone-900/10',
      badgeBg: 'bg-stone-900 text-white',
      ackBtn: 'bg-stone-900 hover:bg-black text-white',
      reasonBtn: 'bg-white/60 hover:bg-white text-stone-900',
      message: 'Direct Pay Payout Initialized: ₹3,200 transferred directly to artisan UPI bank account with 0% middleman deduction.',
      aiReasoning: 'Razorpay Instant Payout API executed following buyer order confirmation for Tarpa Dance Warli Canvas. Bank confirmation code: TXN-884920.'
    }
  ];

  const [alerts, setAlerts] = useState(initialAlerts);

  const handleAcknowledge = (id: string) => {
    setAlerts(alerts.filter(a => a.id !== id));
  };

  const filteredAlerts = alerts
    .filter(a => filterCategory === 'ALL' || a.tag.includes(filterCategory))
    .sort((a, b) => sortUrgency === 'Urgency' ? b.urgencyScore - a.urgencyScore : a.urgencyScore - b.urgencyScore);

  return (
    <div className="space-y-8 font-sans pb-12 w-full">
      
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-black text-stone-900 tracking-tight">Alert Centre</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
              SYSTEM STATUS: OPTIMAL
            </span>
          </div>
          <p className="text-xs text-stone-500 font-medium mt-1">
            Review urgent craft notifications, price undercut anomalies, and AI pre-consultation reasoning.
          </p>
        </div>

        {/* Filter & Sort Control Pills (Matching Reference Screenshot) */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[#18181A] text-white px-4 py-2 rounded-full text-xs font-bold shadow-sm">
            <span className="text-stone-400">Filter:</span>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-transparent text-white font-black uppercase focus:outline-none cursor-pointer"
            >
              <option value="ALL" className="bg-stone-900 text-white">ALL</option>
              <option value="PRICE" className="bg-stone-900 text-white">PRICE GUARD</option>
              <option value="VOICE" className="bg-stone-900 text-white">VOICE AI</option>
              <option value="DISPATCH" className="bg-stone-900 text-white">DISPATCH</option>
            </select>
          </div>

          <div className="flex items-center gap-2 bg-[#18181A] text-white px-4 py-2 rounded-full text-xs font-bold shadow-sm">
            <span className="text-stone-400">Sort:</span>
            <select
              value={sortUrgency}
              onChange={(e) => setSortUrgency(e.target.value)}
              className="bg-transparent text-white font-black uppercase focus:outline-none cursor-pointer"
            >
              <option value="Urgency" className="bg-stone-900 text-white">Urgency (High → Low)</option>
              <option value="Ascending" className="bg-stone-900 text-white">Urgency (Low → High)</option>
            </select>
          </div>
        </div>
      </div>

      {/* STACKED ALERT CARDS (Matching Reference Screenshot Layout) */}
      <div className="space-y-6">
        {filteredAlerts.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-[32px] border border-stone-200 text-stone-500 font-semibold">
            🎉 All urgent alerts acknowledged! Your artisan platform is running optimally.
          </div>
        ) : (
          filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-8 rounded-[32px] ${alert.bgCard} shadow-sm space-y-6 relative overflow-hidden transition-all hover:scale-[1.01]`}
            >
              {/* Card Header & Urgency Score Circle */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-stone-900" />
                    <h3 className="text-2xl sm:text-3xl font-black">{alert.artisan}</h3>
                    <span className="px-3 py-1 rounded-full bg-white/70 text-stone-900 text-[10px] font-extrabold uppercase tracking-wider">
                      {alert.tag}
                    </span>
                  </div>
                  <p className="text-xs font-bold opacity-80 mt-1 pl-6">
                    ID: {alert.artisanId} • Active Outpatient
                  </p>
                </div>

                {/* Urgency Score Circle (Matching Reference Screenshot) */}
                <div className="flex flex-col items-center">
                  <div className={`w-14 h-14 rounded-full ${alert.badgeBg} flex items-center justify-center text-2xl font-black shadow-md`}>
                    {alert.urgencyScore}
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-widest opacity-80 mt-1">
                    Urgency Score
                  </span>
                </div>
              </div>

              {/* Inner Message Sub-Box (Matching Reference Screenshot) */}
              <div className={`p-5 rounded-[22px] ${alert.boxBg} backdrop-blur-sm text-sm sm:text-base font-bold leading-relaxed`}>
                {alert.message}
              </div>

              {/* Action Buttons Row (Acknowledge & Explain AI Reasoning) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <button
                  onClick={() => handleAcknowledge(alert.id)}
                  className={`py-3.5 rounded-full ${alert.ackBtn} font-black text-xs uppercase tracking-widest shadow-md transition-all text-center`}
                >
                  Acknowledge
                </button>
                <button
                  onClick={() => setReasoningModal(alert)}
                  className={`py-3.5 rounded-full ${alert.reasonBtn} font-black text-xs uppercase tracking-widest border border-stone-900/10 transition-all text-center`}
                >
                  Explain AI Reasoning
                </button>
              </div>

            </div>
          ))
        )}
      </div>

      {/* EXPLAIN AI REASONING MODAL */}
      {reasoningModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] max-w-lg w-full p-8 shadow-2xl space-y-6 relative border border-stone-200">
            <button
              onClick={() => setReasoningModal(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 hover:bg-stone-200"
            >
              ✕
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-pink-600">
                GPT-4o AI DIAGNOSTIC REASONING
              </span>
              <h3 className="text-2xl font-black text-stone-900">{reasoningModal.artisan}</h3>
              <p className="text-xs font-semibold text-stone-500">{reasoningModal.tag} • Urgency Score: {reasoningModal.urgencyScore}</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-stone-200 text-xs font-serif leading-relaxed italic text-stone-800">
              &ldquo;{reasoningModal.aiReasoning}&rdquo;
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3">
              <span className="material-symbols-outlined text-emerald-700">verified</span>
              <div>
                <p className="font-extrabold text-emerald-950 text-xs">Recommended Action</p>
                <p className="text-[11px] text-emerald-800 font-medium">Automated resolution queued for platform execution.</p>
              </div>
            </div>

            <button
              onClick={() => setReasoningModal(null)}
              className="w-full py-3 rounded-full bg-[#18181A] hover:bg-black text-white text-xs font-extrabold uppercase tracking-wider shadow-md"
            >
              Close Reasoning Brief
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
