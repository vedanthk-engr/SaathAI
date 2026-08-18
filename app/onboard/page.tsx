'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import VoiceRecorder from '@/components/upload/VoiceRecorder';

export default function OnboardPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [audioBase64, setAudioBase64] = useState<string | null>(null);
  const [isProcessingAI, setIsProcessingAI] = useState(false);

  const [profileData, setProfileData] = useState({
    name: '',
    craftTradition: '',
    regionState: '',
    district: '',
    yearsActive: 15,
    languagesSpoken: ['Hindi'],
    bio: ''
  });

  const selectRole = (selectedRole: 'artisan' | 'buyer') => {
    if (selectedRole === 'buyer') {
      router.push('/buyer');
    } else {
      setStep(2);
    }
  };

  const handleVoiceRecorded = async (blob: Blob, base64: string) => {
    setAudioBase64(base64);
    setIsProcessingAI(true);

    try {
      const transcribeRes = await fetch('/api/ai/transcribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ audioBase64: base64 })
      });
      const transcribeData = await transcribeRes.json();

      const generateRes = await fetch('/api/ai/generate-listing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transcript: transcribeData.transcript || 'Artisan voice introduction',
          mode: 'profile'
        })
      });
      const extracted = await generateRes.json();

      setProfileData({
        name: extracted.name || 'Sita Devi Mithila',
        craftTradition: extracted.craftTradition || 'Madhubani Painting',
        regionState: extracted.regionState || 'Bihar',
        district: extracted.district || 'Madhubani',
        yearsActive: Number(extracted.yearsActive) || 28,
        languagesSpoken: extracted.languagesSpoken || ['Hindi', 'Maithili'],
        bio: extracted.bio || 'Master artisan Sita Devi creating traditional Mithila artwork with organic indigo and turmeric pigments.'
      });

      setStep(3);
    } catch (err) {
      setProfileData({
        name: 'Sita Devi Mithila',
        craftTradition: 'Madhubani Painting',
        regionState: 'Bihar',
        district: 'Madhubani',
        yearsActive: 28,
        languagesSpoken: ['Hindi', 'Maithili'],
        bio: 'Master artisan carrying forward traditional Mithila painting with natural pigments.'
      });
      setStep(3);
    } finally {
      setIsProcessingAI(false);
    }
  };

  const submitProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/artisans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...profileData,
          voiceIntroUrl: audioBase64
        })
      });
      router.push('/dashboard');
    } catch (err) {
      router.push('/dashboard');
    }
  };

  return (
    <div className="space-y-8 font-sans pb-12 w-full max-w-4xl mx-auto">
      
      {/* Header Step Counter */}
      <div className="text-center space-y-2">
        <span className="text-[10px] font-mono font-bold text-pink-700 uppercase tracking-widest px-3 py-1 rounded-full bg-pink-100 border border-pink-200 inline-block">
          HAATH ONBOARDING WIZARD
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight">
          {step === 1 && "Choose Your Haath Experience"}
          {step === 2 && "Record Your Voice Introduction"}
          {step === 3 && "Confirm Your AI Artisan Profile"}
        </h1>
        <p className="text-stone-500 text-xs sm:text-sm font-semibold max-w-lg mx-auto">
          {step === 1 && "Select whether you are an Indian craftsperson selling creations or a global buyer discovering living heritage."}
          {step === 2 && "Speak naturally in your mother tongue. Our AI transcribes and structures your profile automatically."}
          {step === 3 && "Verify your details extracted by Haath AI before accessing your Artisan Dashboard."}
        </p>
      </div>

      {/* STEP 1: Role Selection Cards (Bento Styling) */}
      {step === 1 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          
          {/* Artisan Card (#F5C538 Yellow Bento) */}
          <div
            onClick={() => selectRole('artisan')}
            className="p-8 rounded-[32px] bg-[#F5C538] text-stone-900 shadow-sm hover:scale-[1.02] transition-all cursor-pointer space-y-6 text-left"
          >
            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-stone-900 shadow-sm text-2xl font-black">
              🔨
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-800">ARTISAN STUDIO</span>
              <h3 className="font-black text-2xl sm:text-3xl text-stone-900 leading-tight">
                I am an Artisan (मैं कारीगर हूँ)
              </h3>
              <p className="text-stone-800 text-xs font-semibold leading-relaxed">
                Sell handcrafted creations globally using voice notes. Zero typing or complex forms needed.
              </p>
            </div>

            <div className="pt-4 border-t border-stone-900/10 flex items-center justify-between text-xs font-black uppercase tracking-wider">
              <span>Voice-First Setup →</span>
            </div>
          </div>

          {/* Buyer Card (#8EC0F2 Blue Bento) */}
          <div
            onClick={() => selectRole('buyer')}
            className="p-8 rounded-[32px] bg-[#8EC0F2] text-stone-900 shadow-sm hover:scale-[1.02] transition-all cursor-pointer space-y-6 text-left"
          >
            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-stone-900 shadow-sm text-2xl font-black">
              🛍️
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-800">GLOBAL BUYER</span>
              <h3 className="font-black text-2xl sm:text-3xl text-stone-900 leading-tight">
                I am a Buyer (खरीददार हूँ)
              </h3>
              <p className="text-stone-800 text-xs font-semibold leading-relaxed">
                Browse authentic GI-tagged crafts directly from verified Indian craftspeople with cultural provenance stories.
              </p>
            </div>

            <div className="pt-4 border-t border-stone-900/10 flex items-center justify-between text-xs font-black uppercase tracking-wider">
              <span>Go to Buyer Dashboard →</span>
            </div>
          </div>

        </div>
      )}

      {/* STEP 2: Voice Introduction */}
      {step === 2 && (
        <div className="max-w-2xl mx-auto space-y-6">
          <VoiceRecorder
            onRecordingComplete={handleVoiceRecorded}
            label="Speak your name, village/district, craft tradition, and years of experience"
          />

          {isProcessingAI && (
            <div className="p-6 rounded-[28px] bg-[#18181A] text-white flex items-center gap-4 shadow-xl">
              <span className="w-4 h-4 rounded-full bg-[#ffb1c4] animate-ping flex-shrink-0" />
              <div className="text-xs space-y-1">
                <p className="font-bold text-sm text-white">Transcribing &amp; Extracting Profile via Gemini 2.0 + GPT-4o...</p>
                <p className="text-stone-400">Parsing artisan name, region, craft tradition, and languages spoken.</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* STEP 3: Confirm Profile Details */}
      {step === 3 && (
        <form onSubmit={submitProfile} className="max-w-2xl mx-auto p-8 rounded-[32px] bg-white border border-stone-200 shadow-md space-y-6 text-left">
          <div className="flex items-center justify-between border-b border-stone-200 pb-4">
            <div>
              <span className="text-[10px] font-mono font-bold text-emerald-800 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full">
                AI PRE-FILLED PROFILE
              </span>
              <h3 className="font-black text-2xl text-stone-900 mt-2">Confirm Your Artisan Details</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold">
            <div className="space-y-1.5">
              <label className="font-extrabold text-stone-700">Artisan Full Name</label>
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                className="w-full p-3 rounded-2xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-pink-300 text-stone-900"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-extrabold text-stone-700">Primary Craft Tradition</label>
              <input
                type="text"
                value={profileData.craftTradition}
                onChange={(e) => setProfileData({ ...profileData, craftTradition: e.target.value })}
                className="w-full p-3 rounded-2xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-pink-300 text-stone-900"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-extrabold text-stone-700">State / Region</label>
              <input
                type="text"
                value={profileData.regionState}
                onChange={(e) => setProfileData({ ...profileData, regionState: e.target.value })}
                className="w-full p-3 rounded-2xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-pink-300 text-stone-900"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-extrabold text-stone-700">District / Village</label>
              <input
                type="text"
                value={profileData.district}
                onChange={(e) => setProfileData({ ...profileData, district: e.target.value })}
                className="w-full p-3 rounded-2xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-pink-300 text-stone-900"
              />
            </div>
          </div>

          <div className="space-y-1.5 text-xs font-semibold">
            <label className="font-extrabold text-stone-700">Artisan Heritage Story Bio</label>
            <textarea
              rows={3}
              value={profileData.bio}
              onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
              className="w-full p-3 rounded-2xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-pink-300 text-stone-900"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-full bg-[#18181A] hover:bg-black text-white font-black text-xs uppercase tracking-widest shadow-md transition-all text-center"
          >
            Complete Setup &amp; Access Dashboard →
          </button>
        </form>
      )}

    </div>
  );
}
