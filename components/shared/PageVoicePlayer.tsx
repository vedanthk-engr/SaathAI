'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function PageVoicePlayer() {
  const pathname = usePathname();
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeStoryText, setActiveStoryText] = useState('');

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

  const getPageStoryByLang = (path: string, lang: string) => {
    if (lang === 'Hindi') {
      if (path === '/dashboard' || path === '/') return "हाथ आर्टिसन इंटेलिजेंस में आपका स्वागत है। यहां आप सीधे कारीगर भुगतानों, जीआई टैग प्रमाणपत्रों और सांस्कृतिक मांग का विश्लेषण कर सकते हैं।";
      if (path === '/marketplace') return "सत्यापित जीआई हेरिटेज मार्केटप्लेस में आपका स्वागत है। 0% बिचौलिया शुल्क के साथ कारीगरों को 100% सीधा भुगतान दिया जाता है।";
      if (path === '/artisans') return "भारत के मास्टर कारीगरों से मिलें। प्रत्येक प्रोफ़ाइल पीढ़ियों से सहेजी गई भारतीय हस्तशिल्प परंपराओं का प्रतिनिधित्व करती है।";
      return "हाथ एआई भारतीय पारंपरिक कारीगरों को वैश्विक बाजारों से जोड़ता है।";
    }

    if (lang === 'Maithili') return "हाथ आर्टिसन इंटेलिजेंस मे अहाँक स्वागत अछि। सीता देवीक 3,000 वर्ष प्राचीन मैथिली चित्रकला आ प्राकृतिक रंगोंक प्रामाणिकता देखू।";
    if (lang === 'Marathi') return "हाथ आर्टिसन इंटेलिजेंस मध्ये आपले स्वागत आहे. पालघरच्या वारली चित्रकलेची आणि तांदळाच्या पिठाच्या कलाकृतींची माहिती येथे पहा.";
    if (lang === 'Tamil') return "ஹாத் கைவினைஞர் நுண்ணறிவுக்கு உங்களை வரவேற்கிறோம். கைவினைஞர்களுக்கான நேரடி கட்டணங்கள் மற்றும் பாரம்பரிய சான்றிதழ்களை இங்கே காணலாம்.";
    if (lang === 'Telugu') return "హాథ్ హస్తకళాకారుల ఇంటెలిజెన్స్‌కు స్వాగతం. హస్తకళాకారులకు నేరుగా చెల్లింపులు మరియు సాంప్రదాయ ధృవీకరణ పత్రాలను ఇక్కడ చూడవచ్చు.";
    if (lang === 'Bengali') return "হাথ আর্টিসান ইন্টেলিজেন্সে আপনাকে স্বাগতম। ভারতীয় ঐতিহ্যবাহী কারিগরদের সাথে বিশ্ববাজারের সংযোগ।";
    if (lang === 'Gujarati') return "હાથ આર્ટિસન ઈન્ટેલિજન્સમાં આપનું સ્વાગત છે. ભારતીય પરંપરાગત કારીગરોને સીધું 100% ચુકવણું.";
    if (lang === 'Kannada') return "ಹಾಥ್ ಕುಶಲಕರ್ಮಿಗಳ ಇಂಟೆಲಿಜೆನ್ಸ್‌ಗೆ ಸುಸ್ವಾಗತ. ನೇರ ಶೇ.100 ರಷ್ಟು ಪಾವತಿ.";
    if (lang === 'Malayalam') return "ഹാത്ത് ആർട്ടിസാൻ ഇന്റലിജൻസിലേക്ക് സ്വാഗതം. പാരമ്പര്യ കരകൗശല വിദഗ്ദ്ധർക്ക് നേരിട്ടുള്ള പേയ്‌മെന്റ്.";
    if (lang === 'Kashmiri') return "हाथ प्लेटफॉर्मस मंज़ तोहिद ख़ैर मक़दम। गुलाम हसननुन सूज़नी पश्मीना काम तुएय वुछिव।";

    // Default English
    if (path === '/dashboard' || path === '/') {
      return "Welcome to Haath Artisan Intelligence. Track direct fair payouts, active GI tag certificates, and cultural demand metrics across Indian heritage craft guilds.";
    }
    if (path.startsWith('/artisan')) {
      return "Exploring Sita Devi's Madhubani painting studio. Certified 100% natural indigo, turmeric and neem dye pigments prepared using matriarchal 3,000-year-old recipes.";
    }
    if (path === '/artisans') {
      return "Meet India's master karigars. Each artisan profile represents generations of preserved heritage craft traditions with verified Geographical Indication tags.";
    }
    if (path === '/marketplace') {
      return "Welcome to the Verified GI Heritage Marketplace. 100% direct payout to artisans with zero middleman markup and digital QR passport certificates.";
    }
    if (path === '/dashboard/analytics') {
      return "Artisan Analytics engine monitoring craft material purity, demand anomalies, and international buyer cohort distribution.";
    }
    if (path === '/dashboard/earnings') {
      return "Predictive Earnings Trajectory forecasting artisan revenue targets and seasonal global buyer demand peaks.";
    }
    if (path === '/admin') {
      return "Price Guard Governance enforcing fair trade floor prices and blocking unauthorized reseller undercuts.";
    }
    if (path === '/dashboard/new') {
      return "Multilingual Voice Intake Studio powered by Google Gemini 2.0 Flash and Whisper AI for instant craft story transcription.";
    }
    if (path === '/buyer') {
      return "Welcome to your Global Buyer Heritage Dashboard. Track direct artisan payouts, digital QR passports, and shipping dispatches.";
    }
    return "Haath AI Artisan Intelligence uniting traditional Indian craftspeople with global luxury markets.";
  };

  const handleStartLanguageSelection = () => {
    if (isPlaying) {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      setIsPlaying(false);
      return;
    }
    setIsLangModalOpen(true);
  };

  const handlePlayInLanguage = (langName: string) => {
    setSelectedLanguage(langName);
    setIsLangModalOpen(false);

    const story = getPageStoryByLang(pathname, langName);
    setActiveStoryText(story);
    setIsPlaying(true);

    const langObj = indianLanguages.find(l => l.name === langName);
    const langCode = langObj ? langObj.langCode : 'en-US';

    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(story);
      utterance.lang = langCode;
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsPlaying(false), 5000);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 font-sans pointer-events-auto">
      
      {/* INDIAN LANGUAGES SELECTION MODAL POPOVER */}
      {isLangModalOpen && (
        <div className="max-w-md w-80 sm:w-96 p-5 rounded-[24px] bg-white border border-stone-200 shadow-2xl space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-stone-100 pb-2">
            <div>
              <span className="text-[9px] font-mono font-bold text-pink-600 uppercase tracking-widest block">
                ✨ HAATH INDIAN LANGUAGES NARRATOR
              </span>
              <h4 className="text-xs font-black text-stone-900">Select Audio Language</h4>
            </div>
            <button
              onClick={() => setIsLangModalOpen(false)}
              className="text-stone-400 hover:text-stone-700 text-xs"
            >
              ✕
            </button>
          </div>

          <p className="text-[11px] font-medium text-stone-600 leading-snug">
            Listens to AI audio guidance &amp; cultural provenance narration out loud in Indian regional languages:
          </p>

          <div className="grid grid-cols-3 gap-1.5 max-h-56 overflow-y-auto p-1">
            {indianLanguages.map((l) => (
              <button
                key={l.name}
                onClick={() => handlePlayInLanguage(l.name)}
                className={`py-2 px-2 rounded-xl text-[11px] font-extrabold transition-all border text-center ${
                  selectedLanguage === l.name
                    ? 'bg-[#ffb0cc] text-[#39071f] border-transparent shadow-sm'
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-800 border-stone-200'
                }`}
              >
                {l.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Expanded Audio Story Text Popover when playing */}
      {isPlaying && (
        <div className="max-w-xs p-4 rounded-[20px] bg-[#18181A] text-white text-xs shadow-2xl space-y-2 border border-stone-700 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-stone-800 pb-2">
            <span className="text-[9px] font-mono font-bold text-pink-300 uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-pink-400 animate-ping" />
              NARRATION ({selectedLanguage.toUpperCase()})
            </span>
            <button
              onClick={() => {
                if (window.speechSynthesis) window.speechSynthesis.cancel();
                setIsPlaying(false);
              }}
              className="text-stone-400 hover:text-white text-xs"
            >
              ✕
            </button>
          </div>
          <p className="font-serif italic leading-relaxed text-stone-200 text-xs">
            &ldquo;{activeStoryText}&rdquo;
          </p>
        </div>
      )}

      {/* Main Floating Voice Story Button */}
      <button
        onClick={handleStartLanguageSelection}
        className={`px-5 py-3 rounded-full font-black text-xs uppercase tracking-wider shadow-2xl flex items-center gap-2.5 transition-all transform hover:scale-105 ${
          isPlaying
            ? 'bg-pink-600 text-white ring-4 ring-pink-300 animate-pulse'
            : 'bg-[#18181A] hover:bg-black text-white border border-stone-700'
        }`}
      >
        <span className="material-symbols-outlined text-base text-[#ffb1c4]">
          {isPlaying ? 'graphic_eq' : 'mic'}
        </span>
        <span>{isPlaying ? `Playing (${selectedLanguage})...` : 'Play Page Story'}</span>
      </button>

    </div>
  );
}
