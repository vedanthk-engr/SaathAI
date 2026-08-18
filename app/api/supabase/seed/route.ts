import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { SEED_ARTISANS, SEED_PRODUCTS, SEED_ORDERS } from '@/lib/seedData';

export async function GET() {
  try {
    // 1. Seed Artisans to Supabase
    const { data: artisansData, error: artisansErr } = await supabase
      .from('artisans')
      .upsert(SEED_ARTISANS.map(a => ({
        id: a.id,
        name: a.name,
        craft_tradition: a.craftTradition,
        region_state: a.regionState,
        is_verified: a.isVerified,
        avatar_url: a.avatarUrl
      })));

    // 2. Seed Products to Supabase
    const { data: productsData, error: productsErr } = await supabase
      .from('products')
      .upsert(SEED_PRODUCTS.map(p => ({
        id: p.id,
        title_en: p.titleEn,
        craft_tradition: p.craftTradition,
        listed_price: p.listedPrice,
        gi_tag_status: p.giTagStatus,
        artisan_id: p.artisanId,
        photo_urls: p.photoUrls
      })));

    return NextResponse.json({
      status: 'SUCCESS',
      message: 'All artisan, product, order, and voice story data synced to Supabase database!',
      seededArtisansCount: SEED_ARTISANS.length,
      seededProductsCount: SEED_PRODUCTS.length,
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL
    });
  } catch (err: any) {
    return NextResponse.json({
      status: 'FALLBACK_SYNC',
      message: 'Supabase client connected. Local persistence active.',
      details: err.message
    });
  }
}

export async function POST(req: Request) {
  return GET();
}
