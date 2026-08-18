'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mic, Cpu, Globe, ArrowRight, Sparkles, Award } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      num: "I",
      icon: Mic,
      title: "Speak & Record",
      subtitle: "Voice-First Native Input",
      desc: "Artisan records a 60-second voice note in their native mother tongue (Hindi, Maithili, Tamil, Bengali, etc.). Zero typing or digital forms required.",
      img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80"
    },
    {
      num: "II",
      icon: Cpu,
      title: "AI Synthesis",
      subtitle: "Multi-Agent Vision & Text Engine",
      desc: "GPT-4o Vision identifies craft tradition & materials. Whisper transcribes speech. GPT-4o generates multilingual listings, fair prices & ElevenLabs audio stories.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Madhubani_art.jpg/800px-Madhubani_art.jpg"
    },
    {
      num: "III",
      icon: Globe,
      title: "Global Distribution",
      subtitle: "Multi-Platform Marketplace Sync",
      desc: "Listing goes live on Haath Global Marketplace & syncs to Amazon Karigar, Etsy, ONDC, and Instagram. Buyers pay direct with digital provenance certificates.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Dhokra_handicrafts_statue.jpg/800px-Dhokra_handicrafts_statue.jpg"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-[#231510] via-[#1C100B] to-[#150B07] text-[#F8F3E8] font-serif border-t border-[#C86A4B]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#C86A4B]/20 border border-[#C86A4B]/40 text-[#E8A598] text-xs font-sans font-semibold tracking-widest uppercase">
            <span>✴</span> 3-Step Living Heritage Process
          </div>
          <h2 className="font-serif font-light text-4xl sm:text-6xl text-[#F8F3E8] tracking-tight">
            How Karigars Reach The World
          </h2>
          <p className="font-serif italic text-base sm:text-xl text-[#F8F3E8]/70">
            Transforming raw spoken descriptions into production-grade global ecommerce listings in under 60 seconds.
          </p>
        </div>

        {/* 3 Steps Section (Inspiration Image Style: Sculpture Callouts + Golden Stamps) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="p-8 rounded-[24px] bg-[#2A1810]/80 border border-[#C86A4B]/30 hover:border-[#C86A4B] shadow-espresso-card relative flex flex-col justify-between group space-y-8"
              >
                
                {/* Golden Editor's Pick Starburst Stamp */}
                <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full gold-stamp flex items-center justify-center text-[#1C100B] font-serif font-bold text-[10px] uppercase tracking-tighter text-center leading-tight shadow-md">
                  VERIFIED
                </div>

                <div className="space-y-6">
                  
                  {/* Top Image Frame & Number */}
                  <div className="flex items-center justify-between">
                    <div className="w-16 h-20 rounded-full overflow-hidden border-2 border-[#C86A4B]/60 shadow-md">
                      <img src={step.img} alt={step.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <span className="font-serif text-4xl italic text-[#E5A83B] opacity-80">
                      {step.num}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] font-sans font-semibold text-[#E8A598] uppercase tracking-widest block">
                      {step.subtitle}
                    </span>
                    <h3 className="font-serif font-normal text-2xl text-[#F8F3E8]">
                      {step.title}
                    </h3>
                    <p className="font-sans text-xs text-[#F8F3E8]/70 leading-relaxed font-light">
                      {step.desc}
                    </p>
                  </div>

                </div>

                <div className="pt-4 border-t border-[#C86A4B]/20 flex items-center justify-between font-sans text-xs text-[#E8A598]">
                  <span>Step {idx + 1} of 3</span>
                  <ArrowRight className="w-4 h-4 text-[#E5A83B] group-hover:translate-x-1 transition-transform" />
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
