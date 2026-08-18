'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import CulturalStoryPlayer from '@/components/product/CulturalStoryPlayer';
import ProvenanceCertificate from '@/components/product/ProvenanceCertificate';
import AuthenticityBadge from '@/components/product/AuthenticityBadge';
import PlatformBadges from '@/components/product/PlatformBadges';
import { SEED_PRODUCTS } from '@/lib/seedData';
import { getCraftBadgeColor } from '@/lib/craftTraditions';
import { ShoppingBag, ArrowRight, ShieldCheck, MapPin, Award, CheckCircle2, UserCheck, Star, Heart } from 'lucide-react';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<any>(
    SEED_PRODUCTS.find(p => p.id === params.id) || SEED_PRODUCTS[0]
  );
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [langTab, setLangTab] = useState<'EN' | 'HI' | 'REGIONAL'>('EN');

  useEffect(() => {
    fetch(`/api/products/${params.id}`)
      .then(res => res.json())
      .then(data => {
        if (data && !data.error) {
          setProduct(data);
        }
      })
      .catch(() => {});
  }, [params.id]);

  const photos = product.photoUrls?.length ? product.photoUrls : [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Madhubani_art.jpg/800px-Madhubani_art.jpg"
  ];

  const badgeColor = getCraftBadgeColor(product.craftTradition);

  return (
    <div className="min-h-screen py-10 bg-parchment font-sans space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* TOP SECTION: Left 60% Photos / Right 40% Product Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT 60%: Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative rounded-3xl overflow-hidden bg-white border-2 border-stone-200 shadow-xl aspect-[4/3]">
              {/* eslint-disable-next-html-element-suppression */}
              <img
                src={photos[selectedPhotoIndex]}
                alt={product.titleEn || 'Product photo'}
                className="w-full h-full object-cover"
              />

              {product.giTagStatus && (
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-badge bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider shadow-md flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> {product.giTagStatus}
                </div>
              )}
            </div>

            {/* Thumbnail Strip */}
            {photos.length > 1 && (
              <div className="flex items-center gap-3">
                {photos.map((pUrl: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedPhotoIndex(idx)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedPhotoIndex === idx ? 'border-terracotta scale-105 shadow-md' : 'border-stone-200 opacity-70'
                    }`}
                  >
                    <img src={pUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT 40%: Product Overview & Purchase */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-white border-2 border-stone-200 shadow-xl space-y-6">
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span
                    className="px-3 py-1 rounded-badge text-white text-xs font-semibold shadow-sm"
                    style={{ backgroundColor: badgeColor }}
                  >
                    {product.craftTradition || 'Madhubani Painting'}
                  </span>
                  <span className="text-xs text-stone-500 font-mono flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-forest" /> {product.craftRegion || 'Bihar'}
                  </span>
                </div>

                <h1 className="font-serif font-bold text-2xl md:text-3xl text-stone-900 leading-tight">
                  {product.titleEn || 'Handcrafted Heritage Masterpiece'}
                </h1>

                {/* Artisan Link */}
                <div className="p-3 rounded-xl bg-parchment border border-parchment-border flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-7 h-7 rounded-full bg-stone-300 overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80" alt="Artisan" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-semibold text-stone-900">{product.artisan?.name || 'Sita Devi Mithila'}</p>
                      <p className="text-[10px] text-stone-500">Verified Master Practitioner</p>
                    </div>
                  </div>

                  <Link
                    href={`/artisan/${product.artisanId || 'artisan-1'}`}
                    className="text-xs font-semibold text-terracotta hover:underline"
                  >
                    View Profile →
                  </Link>
                </div>
              </div>

              {/* Price & Buy Now CTA */}
              <div className="p-4 rounded-2xl bg-stone-900 text-white flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-stone-400 font-bold">Direct Artisan Price</span>
                  <p className="font-serif font-bold text-3xl text-saffron">
                    ₹{(product.listedPrice || 5200).toLocaleString('en-IN')}
                  </p>
                </div>

                <Link
                  href={`/checkout/${product.id}`}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-terracotta to-saffron text-white font-semibold text-sm shadow-terracotta-glow hover:opacity-95 transition-all flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" /> Buy Now
                </Link>
              </div>

              {/* Bullet Highlights */}
              <div className="space-y-2 text-xs text-stone-700">
                <span className="font-bold uppercase tracking-wider text-stone-500">Key Features:</span>
                <ul className="space-y-1.5">
                  {(product.bulletPoints || [
                    "100% Handcrafted using authentic materials",
                    "Natural botanical and mineral pigments",
                    "Includes Official Certificate of Provenance"
                  ]).map((bp: string, i: number) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-terracotta flex-shrink-0" />
                      <span>{bp}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

        </div>

        {/* CULTURAL STORY PLAYER */}
        <CulturalStoryPlayer
          narrationUrl={product.audioNarrationUrl}
          provenanceNote={product.provenanceNote || "Origins trace back to sacred village traditions passed down through generations."}
          artisanName={product.artisan?.name || "Sita Devi"}
          craftTradition={product.craftTradition || "Madhubani Painting"}
        />

        {/* MULTILINGUAL DESCRIPTION & TAGS */}
        <div className="p-8 rounded-3xl bg-white border-2 border-stone-200 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-stone-200 pb-4">
            <h2 className="font-serif font-bold text-xl text-stone-900">
              Cultural Description & Details
            </h2>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setLangTab('EN')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${langTab === 'EN' ? 'bg-terracotta text-white' : 'bg-stone-100 text-stone-600'}`}
              >
                English
              </button>
              <button
                onClick={() => setLangTab('HI')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${langTab === 'HI' ? 'bg-terracotta text-white' : 'bg-stone-100 text-stone-600'}`}
              >
                हिंदी (Hindi)
              </button>
              <button
                onClick={() => setLangTab('REGIONAL')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${langTab === 'REGIONAL' ? 'bg-terracotta text-white' : 'bg-stone-100 text-stone-600'}`}
              >
                Regional
              </button>
            </div>
          </div>

          <p className="text-stone-700 text-base leading-relaxed">
            {langTab === 'EN' && (product.descriptionEn || "Handcrafted traditional artwork created with natural dyes and historical mastery.")}
            {langTab === 'HI' && (product.descriptionHi || "हाथ से बनी प्रामाणिक कलाकृति जिसमें प्राकृतिक रंगों का उपयोग किया गया है।")}
            {langTab === 'REGIONAL' && (product.descriptionRegional || product.descriptionEn)}
          </p>

          {/* Search Tags */}
          <div className="pt-4 border-t border-stone-100 flex flex-wrap gap-2">
            {(product.searchTags || ['madhubani', 'indian art', 'handicraft']).map((tag: string, i: number) => (
              <span key={i} className="px-3 py-1 rounded-badge bg-stone-100 text-stone-600 text-xs font-mono">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* PROVENANCE CERTIFICATE COMPONENT */}
        <ProvenanceCertificate
          productId={product.id}
          productTitle={product.titleEn || "Hand-painted Sacred Tree of Life"}
          craftTradition={product.craftTradition || "Madhubani Painting"}
          region={product.craftRegion || "Madhubani, Bihar"}
          artisanName={product.artisan?.name || "Sita Devi Mithila"}
          authenticityMarkers={product.authenticityMarkers || [
            "Double outline border with geometric filling",
            "Natural color bleeding variations",
            "Slight texture variations on handloom cotton"
          ]}
          giTagStatus={product.giTagStatus}
        />

        {/* AUTHENTICITY BADGES & MULTI-PLATFORM SYNC */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AuthenticityBadge
            authenticityStatement={product.authenticityStatement}
            authenticityMarkers={product.authenticityMarkers}
          />

          <PlatformBadges
            productId={product.id}
            initialPlatformStatus={product.platformStatus}
            interactive={false}
          />
        </div>

      </div>
    </div>
  );
}
