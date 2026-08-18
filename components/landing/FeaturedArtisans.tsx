'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SEED_ARTISANS } from '@/lib/seedData';
import { Award, MapPin, ArrowRight, CheckCircle2, Mic } from 'lucide-react';

export default function FeaturedArtisans() {
  return (
    <section className="py-24 bg-white border-b border-stone-200 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-xs font-semibold text-terracotta uppercase tracking-widest px-3 py-1 rounded-badge bg-terracotta/10 border border-terracotta/20 inline-block mb-3">
              Master Karigars & Lineage Bearers
            </span>
            <h2 className="font-serif font-bold text-3xl sm:text-5xl text-stone-900 tracking-tight">
              Featured Heritage Artisans
            </h2>
          </div>
          <Link
            href="/marketplace"
            className="text-terracotta font-semibold text-sm flex items-center gap-1.5 hover:gap-3 transition-all"
          >
            Explore All Artisans <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Artisans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SEED_ARTISANS.map((artisan, idx) => (
            <motion.div
              key={artisan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              viewport={{ once: true }}
              className="p-6 rounded-3xl bg-parchment border-2 border-parchment-border hover:border-terracotta/40 hover:shadow-card-hover transition-all duration-300 space-y-5 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-terracotta shadow-md flex-shrink-0">
                    {/* eslint-disable-next-html-element-suppression */}
                    <img src={artisan.avatarUrl} alt={artisan.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                    {artisan.isVerified && (
                      <div className="absolute bottom-0.5 right-0.5 bg-emerald-600 text-white rounded-full p-0.5" title="Verified Artisan">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="font-serif font-bold text-xl text-stone-900 group-hover:text-terracotta transition-colors">
                      {artisan.name}
                    </h3>
                    <p className="text-xs text-stone-600 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-forest" /> {artisan.district}, {artisan.regionState}
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-stone-200/80 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-stone-700">
                    <span className="font-semibold flex items-center gap-1 text-terracotta">
                      <Award className="w-3.5 h-3.5" /> {artisan.craftTradition}
                    </span>
                    <span className="font-mono text-stone-500">{artisan.yearsActive} Years Active</span>
                  </div>
                  <p className="text-stone-600 line-clamp-3 leading-relaxed">
                    &ldquo;{artisan.bio}&rdquo;
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-stone-200/60 flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-stone-500">
                  <Mic className="w-3.5 h-3.5 text-saffron" /> Voice Profile Verified
                </div>
                <Link
                  href={`/artisan/${artisan.id}`}
                  className="px-4 py-2 rounded-lg bg-stone-900 hover:bg-terracotta text-white font-medium text-xs transition-colors"
                >
                  View Profile & Crafts
                </Link>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
