'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function AIVoiceIntakePage() {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [isRecording, setIsRecording] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState('');
  const [audioVolume, setAudioVolume] = useState(0);
  const [isParsingAI, setIsParsingAI] = useState(false);
  const [biModelResult, setBiModelResult] = useState<any | null>(null);

  const recognitionRef = useRef<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const indianLanguages = [
    { name: 'English', langCode: 'en-US' },
    { name: 'Hindi', langCode: 'hi-IN' },
    { name: 'Maithili', langCode: 'hi-IN' },
    { name: 'Kashmiri', langCode: 'hi-IN' },
    { name: 'Marathi', langCode: 'mr-IN' },
    { name: 'Tamil', langCode: 'ta-IN' },
    { name: 'Telugu', langCode: 'te-IN' },
    { name: 'Bengali', langCode: 'bn-IN' },
    { name: 'Gujarati', langCode: 'gu-IN' },
    { name: 'Kannada', langCode: 'kn-IN' },
    { name: 'Malayalam', langCode: 'ml-IN' },
    { name: 'Odia', langCode: 'or-IN' },
    { name: 'Punjabi', langCode: 'pa-IN' },
  ];

  const prompts = [
    {
      label: 'Craft Story',
      text: 'I painted this Madhubani Tree of Life on natural paper using organic indigo dye. Total creation time 42 hours.'
    },
    {
      label: 'Fair Price',
      text: 'I spent 45 hours of fine hand-stitching on this Sozni Pashmina shawl, what is the fair price target?'
    },
    {
      label: 'GI Tag Hallmark',
      text: 'Verify my Geographical Indication certificate for Bastar Lost-Wax Brass Dhokra metalwork.'
    },
    {
      label: 'Audio Story',
      text: 'Generate an ElevenLabs cultural audio story narrated in Maithili for international buyers.'
    }
  ];

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (streamRef.current) streamRef.current.getTracks().forEach(track => track.stop());
      if (audioContextRef.current) audioContextRef.current.close();
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) {}
      }
    };
  }, []);

  const handleStartMic = async () => {
    if (isRecording) {
      // STOP RECORDING
      setIsRecording(false);
      
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) {}
      }

      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }

      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
      }
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      setAudioVolume(0);

      // Trigger AI Analysis with actual spoken/entered text
      const currentText = liveTranscript.trim();
      if (currentText) {
        triggerBiModelAnalysis(currentText);
      } else {
        alert("No spoken text detected yet. Please speak into your mic, or select one of the quick prompt pills below!");
      }
      return;
    }

    // START RECORDING
    setBiModelResult(null);
    setLiveTranscript('');
    setIsRecording(true);
    audioChunksRef.current = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      if (typeof MediaRecorder !== 'undefined') {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };
        mediaRecorder.start();
      }

      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const updateVolume = () => {
        analyser.getByteFrequencyData(dataArray);
        const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
        const vol = Math.min(100, Math.round(avg * 1.8));
        setAudioVolume(vol);
        animFrameRef.current = requestAnimationFrame(updateVolume);
      };
      updateVolume();
    } catch (err) {
      console.warn('Microphone permission or hardware access error:', err);
      alert('Microphone access requested. Please allow microphone access in your browser pop-up.');
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;

      const currentLangObj = indianLanguages.find(l => l.name === selectedLanguage);
      recognition.lang = currentLangObj ? currentLangObj.langCode : 'en-US';

      recognition.onresult = (event: any) => {
        let transcriptBuffer = '';
        for (let i = 0; i < event.results.length; i++) {
          transcriptBuffer += event.results[i][0].transcript;
        }
        if (transcriptBuffer.trim()) {
          setLiveTranscript(transcriptBuffer.trim());
        }
      };

      recognition.onerror = (e: any) => {
        console.warn('Speech recognition error:', e.error);
      };

      recognition.onend = () => {
        if (recognitionRef.current && isRecording) {
          try { recognition.start(); } catch (e) {}
        }
      };

      try {
        recognition.start();
        recognitionRef.current = recognition;
      } catch (e) {}
    } else {
      alert("Browser Speech Recognition is not supported on this browser. You can type your story directly into the box or select a prompt pill!");
    }
  };

  const triggerBiModelAnalysis = async (text: string) => {
    setIsParsingAI(true);
    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: text,
          language: selectedLanguage
        })
      });
      const data = await res.json();
      setBiModelResult(data);
    } catch (err) {
      // Fallback
    } finally {
      setIsParsingAI(false);
    }
  };

  const handleSelectPrompt = (promptText: string) => {
    setLiveTranscript(promptText);
    triggerBiModelAnalysis(promptText);
  };

  return (
    <div className="relative w-full min-h-[calc(100vh-6rem)] rounded-[32px] overflow-hidden flex flex-col font-sans bg-gradient-to-br from-[#ffd9e4]/30 via-[#faf9f5] to-[#fdcf49]/20 shadow-sm border border-white/60 text-stone-900">
      
      {/* Decorative Blur Blobs */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#ffb0cc]/30 rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-[#fdcf49]/20 rounded-full blur-3xl opacity-60 pointer-events-none" />

      {/* Top Header Row */}
      <header className="w-full flex justify-between items-center px-8 py-6 z-10">
        <div className="text-2xl font-bold text-stone-900 tracking-tight flex items-center gap-2">
          <span className="font-black text-3xl">haath</span>
          <span className="text-2xl font-bold text-[#b56f89]">+</span>
          <span className="text-xs font-bold text-[#b56f89] uppercase tracking-widest ml-2 bg-pink-100 px-3 py-1 rounded-full border border-pink-200">
            ⚡ Haath Artisan Intelligence Engine
          </span>
        </div>

        <Link
          href="/artisans"
          className="px-6 py-2.5 rounded-full bg-white/70 backdrop-blur-md border border-white/80 font-bold text-xs uppercase tracking-wider text-stone-800 flex items-center gap-2 hover:bg-white transition-colors shadow-sm"
        >
          <span className="material-symbols-outlined text-sm">close</span>
          Exit Voice Mode
        </Link>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-1 flex flex-col items-center justify-center relative z-10 px-8 pb-12">
        
        {/* Greeting Section */}
        <div className="text-center mb-6">
          <h1 className="text-4xl sm:text-5xl font-black text-stone-900 mb-2 tracking-tight">
            Hello Sita,
          </h1>
          <p className="text-lg text-stone-600 font-medium">
            How can I record your craft story today?
          </p>
        </div>

        {/* Multilingual Indian Language Selection Chips */}
        <div className="flex gap-2 mb-8 flex-wrap justify-center max-w-4xl">
          {indianLanguages.map((lang) => {
            const isSelected = selectedLanguage === lang.name;
            return (
              <button
                key={lang.name}
                onClick={() => setSelectedLanguage(lang.name)}
                className={`px-4 py-1.5 rounded-full font-bold text-xs transition-all ${
                  isSelected
                    ? 'bg-[#ffb0cc] text-[#39071f] shadow-md shadow-[#ffb0cc]/40 scale-105 border border-transparent font-black'
                    : 'border border-stone-300 text-stone-700 hover:bg-white/80 bg-white/50 backdrop-blur-sm'
                }`}
              >
                {lang.name}
              </button>
            );
          })}
        </div>

        {/* Central Voice Hero Mic Sphere & Audio Frequency Level */}
        <div className="relative flex flex-col items-center justify-center mb-8 space-y-4">
          
          {/* Main Glowing Mic Button */}
          <button
            onClick={handleStartMic}
            style={{
              boxShadow: isRecording
                ? `0 0 ${40 + audioVolume}px rgba(255, 176, 204, 0.9), 0 0 ${80 + audioVolume * 2}px rgba(255, 176, 204, 0.6)`
                : '0 0 40px rgba(255, 176, 204, 0.7), 0 0 80px rgba(255, 176, 204, 0.4)'
            }}
            className={`w-48 h-48 rounded-full bg-gradient-to-br from-[#ffb0cc] via-[#f59eb7] to-[#b56f89] flex flex-col items-center justify-center text-white transform hover:scale-105 transition-all duration-300 relative z-10 cursor-pointer shadow-2xl ${
              isRecording ? 'scale-110 ring-8 ring-[#ffb0cc]/80' : ''
            }`}
          >
            <span className="material-symbols-outlined text-5xl mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>
              mic
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest text-white">
              {isRecording ? 'STOP RECORDING' : 'SPEAK NOW'}
            </span>
          </button>

          {/* Live Mic Audio Volume Visualizer */}
          {isRecording && (
            <div className="flex items-center gap-1.5 h-6">
              <span className="text-[10px] font-mono font-bold text-pink-700 uppercase tracking-widest mr-2">
                AUDIO INPUT LEVEL:
              </span>
              {[20, 40, 60, 80, 100].map((level, i) => (
                <div
                  key={i}
                  className={`w-2 rounded-full transition-all duration-150 ${
                    audioVolume >= level ? 'bg-pink-600 h-6' : 'bg-pink-300/40 h-2'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Real-time Text Box */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.8)'
          }}
          className="rounded-[28px] p-6 max-w-2xl w-full text-center shadow-xl space-y-4 relative"
        >
          <div className="flex items-center justify-between border-b border-stone-200/60 pb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-ping" />
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#b56f89]">
                LIVE MICROPHONE STREAM TRANSCRIPT ({selectedLanguage.toUpperCase()})
              </span>
            </div>
            {isRecording && (
              <span className="px-2.5 py-0.5 rounded-full bg-pink-100 text-pink-900 text-[10px] font-extrabold animate-pulse">
                LIVE MIC ON ●
              </span>
            )}
          </div>

          {/* Live Spoken Words Container */}
          <div className="min-h-[60px] flex items-center justify-center px-4">
            {isParsingAI ? (
              <div className="flex items-center justify-center gap-2 text-stone-800 font-extrabold text-sm">
                <span className="w-3 h-3 rounded-full bg-[#b56f89] animate-ping" />
                ⚡ Executing Haath Spectral Provenance &amp; Fair Price Analysis...
              </div>
            ) : (
              <div className="w-full space-y-3">
                <p className="text-lg sm:text-xl font-bold text-stone-900 leading-relaxed font-sans min-h-[3rem] flex items-center justify-center">
                  {liveTranscript ? `“${liveTranscript}”` : isRecording ? "Listening to your mic... Speak now!" : "Click 'SPEAK NOW' and speak into your mic — or select a prompt below."}
                </p>

                <input
                  type="text"
                  value={liveTranscript}
                  onChange={(e) => setLiveTranscript(e.target.value)}
                  placeholder="Or type/edit your spoken story here directly..."
                  className="w-full p-3 rounded-xl bg-white border border-stone-300 text-xs font-semibold text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-pink-300 text-center shadow-inner"
                />
              </div>
            )}
          </div>

          {/* Quick Prompt Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-3 border-t border-stone-200/60">
            {prompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectPrompt(p.text)}
                className="px-3.5 py-1.5 rounded-full bg-white hover:bg-stone-900 hover:text-white text-stone-800 text-xs font-bold transition-all shadow-sm border border-stone-200"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* ARTISAN INTELLIGENCE RESULT CARD (Relevant vs Irrelevant Warning) */}
        {biModelResult && (
          biModelResult.isRelevant === false ? (
            /* OUT-OF-DOMAIN WARNING CARD */
            <div className="mt-6 max-w-2xl w-full p-7 rounded-[28px] bg-amber-50 border-2 border-amber-300 shadow-2xl space-y-4 animate-fadeIn text-left">
              <div className="flex items-center gap-3 border-b border-amber-200 pb-3">
                <span className="material-symbols-outlined text-amber-700 text-2xl">warning</span>
                <div>
                  <h3 className="text-base font-black text-amber-950">{biModelResult.warningTitle || '⚠️ Out-of-Domain Audio Input'}</h3>
                  <span className="text-[10px] font-bold text-amber-800 uppercase tracking-widest">IRRELEVANT CHATTER DETECTED</span>
                </div>
              </div>

              <p className="text-xs font-semibold text-amber-900 leading-relaxed">
                {biModelResult.warningMessage}
              </p>

              <div className="p-4 rounded-2xl bg-white/80 border border-amber-200 space-y-2">
                <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">💡 TRY ASKING A RELEVANT CRAFT QUESTION:</span>
                <ul className="text-xs font-semibold text-stone-800 space-y-1.5 list-disc pl-4">
                  <li>“I painted this Madhubani Tree of Life using organic indigo dye. Creation time 42 hours.”</li>
                  <li>“I spent 45 hours hand-stitching this Sozni Pashmina shawl, what is the fair price?”</li>
                  <li>“Verify my Geographical Indication certificate for Bastar Lost-Wax Brass Dhokra.”</li>
                </ul>
              </div>

              <button
                onClick={() => setBiModelResult(null)}
                className="w-full py-3 rounded-full bg-amber-900 hover:bg-amber-950 text-white font-extrabold text-xs uppercase tracking-wider transition-all text-center shadow-md"
              >
                Try Again with Craft Question →
              </button>
            </div>
          ) : (
            /* VALID CRAFT PROVENANCE & FAIR PRICE CARD */
            <div className="mt-6 max-w-2xl w-full p-7 rounded-[28px] bg-white border-2 border-purple-300 shadow-2xl space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-purple-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-purple-700 text-xl">auto_awesome</span>
                  <h3 className="text-base font-black text-stone-900">{biModelResult.engine}</h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-[10px] font-extrabold uppercase">
                  {biModelResult.consensusScore}
                </span>
              </div>

              {/* Extracted Entities Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-sans">
                <div className="p-3 rounded-xl bg-purple-50 border border-purple-200">
                  <span className="text-[9px] font-bold text-purple-900 uppercase block">ARTISAN</span>
                  <span className="font-extrabold text-stone-900">Sita Devi</span>
                </div>

                <div className="p-3 rounded-xl bg-purple-50 border border-purple-200">
                  <span className="text-[9px] font-bold text-purple-900 uppercase block">CRAFT</span>
                  <span className="font-extrabold text-stone-900">{biModelResult.craftName}</span>
                </div>

                <div className="p-3 rounded-xl bg-purple-50 border border-purple-200">
                  <span className="text-[9px] font-bold text-purple-900 uppercase block">LABOR</span>
                  <span className="font-extrabold text-stone-900">{biModelResult.laborHours}</span>
                </div>

                <div className="p-3 rounded-xl bg-purple-50 border border-purple-200">
                  <span className="text-[9px] font-bold text-purple-900 uppercase block">FAIR PRICE</span>
                  <span className="font-extrabold text-stone-900">{biModelResult.fairPriceTarget}</span>
                </div>
              </div>

              {/* Technical Spectral & Cryptographic Hashes */}
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="text-[9px] font-bold text-stone-400 uppercase block">SPECTRAL PURITY INDEX</span>
                  <span className="font-extrabold text-emerald-800">{biModelResult.spectralPurityIndex}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="text-[9px] font-bold text-stone-400 uppercase block">PROVENANCE BLOCK HASH</span>
                  <span className="font-extrabold text-stone-900 truncate block">{biModelResult.provenanceHash}</span>
                </div>
              </div>

              {/* Technical Insights Breakdown */}
              <div className="space-y-2 text-xs font-sans">
                <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-1">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-amber-800 block">
                    ✨ CRAFT SPECTRAL PROVENANCE INSIGHT
                  </span>
                  <p className="font-medium text-stone-900 italic">&ldquo;{biModelResult.geminiInsight}&rdquo;</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-1">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-800 block">
                    🛡️ FAIR PRICE GUARD &amp; MARKET INSIGHT
                  </span>
                  <p className="font-medium text-stone-900 italic">&ldquo;{biModelResult.gptInsight}&rdquo;</p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Link
                  href="/artisan/artisan-1"
                  className="flex-1 py-3.5 rounded-full bg-[#18181A] hover:bg-black text-white text-xs font-extrabold uppercase tracking-wider text-center shadow-md transition-all"
                >
                  Publish Listing
                </Link>
                <button
                  onClick={() => setBiModelResult(null)}
                  className="px-6 py-3.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs uppercase"
                >
                  Speak Again
                </button>
              </div>
            </div>
          )
        )}

      </main>

    </div>
  );
}
