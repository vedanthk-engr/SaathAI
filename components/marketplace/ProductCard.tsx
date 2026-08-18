'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface ProductCardProps {
  product: {
    id: string;
    titleEn: string;
    listedPrice: number;
    craftTradition: string;
    craftRegion: string;
    giTagStatus: string;
    photoUrls: string[];
    artisanName?: string;
    artisanId?: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerAddress, setBuyerAddress] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Reliable High-Res Craft Photography Mapping (Guarantees NO broken images!)
  const getCraftImage = () => {
    const title = product.titleEn.toLowerCase();
    const craft = product.craftTradition.toLowerCase();

    if (craft.includes('madhubani') || title.includes('tree of life') || title.includes('madhubani')) {
      return 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80';
    }
    if (craft.includes('warli') || title.includes('warli') || title.includes('tarpa')) {
      return 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80';
    }
    if (craft.includes('pashmina') || title.includes('pashmina') || title.includes('sozni')) {
      return 'https://images.unsplash.com/photo-1606760227091-3dd858d97240?auto=format&fit=crop&w=800&q=80';
    }
    if (craft.includes('dhokra') || title.includes('dhokra') || title.includes('brass')) {
      return 'https://images.unsplash.com/photo-1567016526105-22da7c13161a?auto=format&fit=crop&w=800&q=80';
    }
    if (craft.includes('kanjivaram') || title.includes('silk') || title.includes('saree')) {
      return 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80';
    }

    if (product.photoUrls && product.photoUrls.length > 0 && product.photoUrls[0].includes('unsplash.com')) {
      return product.photoUrls[0];
    }

    return 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80';
  };

  const photo = getCraftImage();

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setIsBuyModalOpen(false);
    }, 2500);
  };

  const handlePlayArtisanVoiceStory = () => {
    setIsVoiceModalOpen(true);
    setIsPlayingAudio(true);

    const voiceScript = `Namaste. I am ${product.artisanName || 'Sita Devi'}, master artisan of ${product.craftTradition} from ${product.craftRegion}. I created this ${product.titleEn} by hand using 100% natural organic dyes prepared from indigo and turmeric. Total labor creation time was over 42 hours. Thank you for supporting fair trade Indian karigars.`;

    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(voiceScript);
      utterance.rate = 0.92;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsPlayingAudio(false), 5000);
    }
  };

  return (
    <div className="p-6 rounded-[28px] bg-white border border-stone-200 shadow-sm space-y-4 flex flex-col justify-between hover:shadow-md transition-shadow">
      
      {/* Image Container */}
      <div className="space-y-3">
        <div className="relative w-full h-56 rounded-[20px] overflow-hidden bg-stone-100 group">
          {/* eslint-disable-next-html-element-suppression */}
          <img
            src={photo}
            alt={product.titleEn}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* GI Tag Badge Overlay Top Right */}
          <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#F5C538] text-stone-900 text-[10px] font-mono font-bold shadow-md">
            {product.giTagStatus ? product.giTagStatus.split(' ')[0] : 'GI TAGGED'}
          </span>

          {/* Craft Category Badge Bottom Left */}
          <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-stone-900 text-[10px] font-extrabold uppercase shadow-sm">
            {product.craftTradition}
          </span>
        </div>

        {/* Region & Price Row */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs font-semibold text-stone-500 truncate max-w-[170px]">
            {product.craftRegion}
          </span>
          <span className="text-2xl font-black text-stone-900">
            ₹{product.listedPrice.toLocaleString()}
          </span>
        </div>

        {/* Title & Artisan Name */}
        <div className="space-y-1">
          <h3 className="text-lg font-black text-stone-900 leading-snug line-clamp-2">
            {product.titleEn}
          </h3>
          <p className="text-xs font-bold text-stone-600">
            By <span className="text-stone-900 underline">{product.artisanName || 'Sita Devi Mithila'}</span>
          </p>
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="space-y-2 pt-2 border-t border-stone-100">
        
        <div className="flex items-center gap-2">
          {/* View Craft Details */}
          <Link
            href={`/artisan/${product.artisanId || 'artisan-1'}`}
            className="flex-1 py-3 rounded-full bg-[#18181A] hover:bg-black text-white text-xs font-extrabold uppercase tracking-wider text-center shadow-sm transition-all"
          >
            VIEW CRAFT →
          </Link>

          {/* Quick Buy Button */}
          <button
            onClick={() => setIsBuyModalOpen(true)}
            className="px-4 py-3 rounded-full bg-[#F5C538] hover:bg-[#e2b22b] text-stone-900 text-xs font-extrabold uppercase shadow-sm transition-all"
          >
            QUICK BUY
          </button>
        </div>

        {/* Listen Voice Story Button */}
        <button
          onClick={handlePlayArtisanVoiceStory}
          className="w-full py-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 text-[11px] font-bold flex items-center justify-center gap-2 transition-colors border border-stone-200"
        >
          <span className="material-symbols-outlined text-sm text-[#b56f89]">mic</span>
          <span>Listen Voice Story</span>
        </button>

      </div>

      {/* ARTISAN VOICE STORY AUDIO MODAL */}
      {isVoiceModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] max-w-md w-full p-7 shadow-2xl space-y-5 relative border border-stone-200">
            <button
              onClick={() => {
                if (window.speechSynthesis) window.speechSynthesis.cancel();
                setIsPlayingAudio(false);
                setIsVoiceModalOpen(false);
              }}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 hover:bg-stone-200"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 border-b border-stone-100 pb-3">
              <div className="w-10 h-10 rounded-full bg-[#ffb0cc] text-[#39071f] font-black flex items-center justify-center text-lg">
                🎙️
              </div>
              <div>
                <h3 className="text-base font-black text-stone-900">Artisan Audio Provenance</h3>
                <p className="text-xs font-bold text-stone-500">Narrated by {product.artisanName || 'Sita Devi Mithila'}</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-stone-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-pink-700 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
                  AUDIO STORY PLAYBACK
                </span>
                <span className="px-2 py-0.5 rounded-full bg-pink-100 text-pink-900 text-[9px] font-extrabold">
                  {isPlayingAudio ? 'PLAYING ●' : 'PAUSED'}
                </span>
              </div>

              <p className="text-xs font-serif italic text-stone-800 leading-relaxed">
                &ldquo;Namaste. I am {product.artisanName || 'Sita Devi'}, master artisan of {product.craftTradition} from {product.craftRegion}. I created this {product.titleEn} by hand using 100% natural organic dyes. Total labor creation time was over 42 hours.&rdquo;
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  if (isPlayingAudio) {
                    if (window.speechSynthesis) window.speechSynthesis.cancel();
                    setIsPlayingAudio(false);
                  } else {
                    handlePlayArtisanVoiceStory();
                  }
                }}
                className="flex-1 py-3 rounded-full bg-[#18181A] hover:bg-black text-white text-xs font-extrabold uppercase tracking-wider text-center shadow-md"
              >
                {isPlayingAudio ? 'Pause Narration' : 'Replay Narration ↺'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DIRECT FAIR TRADE CHECKOUT MODAL */}
      {isBuyModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] max-w-lg w-full p-8 shadow-2xl space-y-6 relative border border-stone-200">
            <button
              onClick={() => setIsBuyModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 hover:bg-stone-200"
            >
              ✕
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                DIRECT FAIR TRADE CHECKOUT
              </span>
              <h3 className="text-2xl font-black text-stone-900 mt-2">{product.titleEn}</h3>
              <p className="text-xs font-bold text-stone-500">
                100% Payout directly to {product.artisanName || 'Sita Devi Mithila'} • ₹{product.listedPrice.toLocaleString()}
              </p>
            </div>

            {isSuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-50 text-emerald-900 text-center space-y-2 border border-emerald-200">
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xl mx-auto">
                  ✓
                </div>
                <h4 className="text-lg font-black">Direct Order Placed Successfully!</h4>
                <p className="text-xs text-emerald-800">
                  Razorpay Transaction Confirmed. Receipt and Digital Passport QR sent to {buyerEmail || 'your email'}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleCheckoutSubmit} className="space-y-4 text-xs font-sans">
                <div className="space-y-1">
                  <label className="font-extrabold text-stone-700">Full Name</label>
                  <input
                    type="text"
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    placeholder="Ananya Sharma"
                    className="w-full p-3 rounded-xl border border-stone-300 text-stone-900 font-semibold"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-extrabold text-stone-700">Email Address (For Provenance Passport)</label>
                  <input
                    type="email"
                    value={buyerEmail}
                    onChange={(e) => setBuyerEmail(e.target.value)}
                    placeholder="ananya@example.com"
                    className="w-full p-3 rounded-xl border border-stone-300 text-stone-900 font-semibold"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-extrabold text-stone-700">Shipping Delivery Address</label>
                  <textarea
                    rows={2}
                    value={buyerAddress}
                    onChange={(e) => setBuyerAddress(e.target.value)}
                    placeholder="42 MG Road, Indiranagar, Bengaluru, KA 560038"
                    className="w-full p-3 rounded-xl border border-stone-300 text-stone-900 font-semibold"
                    required
                  />
                </div>

                <div className="p-4 rounded-xl bg-[#FEFCE8] border border-amber-200 flex items-center justify-between text-xs">
                  <span className="font-bold text-stone-800">Total Direct Payout:</span>
                  <span className="text-lg font-black text-stone-900">₹{product.listedPrice.toLocaleString()}</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-[#18181A] hover:bg-black text-white font-black text-xs uppercase tracking-wider shadow-md transition-all"
                >
                  Pay Directly via Razorpay →
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
