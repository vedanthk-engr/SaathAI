import { NextRequest, NextResponse } from 'next/server';
import { prisma, memoryStore } from '@/lib/prisma';
import { generateEmbedding } from '@/lib/openai';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const craft = searchParams.get('craft');
    const region = searchParams.get('region');
    const giTagged = searchParams.get('giTagged');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const status = searchParams.get('status') || 'PUBLISHED';
    const artisanId = searchParams.get('artisanId');

    let products: any[] = [];
    try {
      const where: any = {};
      if (status !== 'ALL') where.status = status;
      if (artisanId) where.artisanId = artisanId;
      if (craft) where.craftTradition = { contains: craft, mode: 'insensitive' };
      if (region) where.craftRegion = { contains: region, mode: 'insensitive' };
      if (giTagged === 'true') where.giTagStatus = { not: null };

      products = await prisma.product.findMany({
        where,
        include: { artisan: true },
        orderBy: { createdAt: 'desc' }
      });
    } catch {
      products = memoryStore.products.filter(p => {
        if (status !== 'ALL' && p.status !== status) return false;
        if (artisanId && p.artisanId !== artisanId) return false;
        if (craft && !(p.craftTradition || '').toLowerCase().includes(craft.toLowerCase())) return false;
        if (region && !(p.craftRegion || '').toLowerCase().includes(region.toLowerCase())) return false;
        if (giTagged === 'true' && !p.giTagStatus) return false;
        if (minPrice && (p.listedPrice || 0) < Number(minPrice)) return false;
        if (maxPrice && (p.listedPrice || 0) > Number(maxPrice)) return false;
        return true;
      });
    }

    return NextResponse.json(products);
  } catch (error: any) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Generate text embedding for product listing
    const fullText = `${body.titleEn || ''} ${body.descriptionEn || ''} ${body.craftTradition || ''} ${(body.searchTags || []).join(' ')}`;
    const embedding = await generateEmbedding(fullText);

    const newProduct = {
      id: `prod_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      artisanId: body.artisanId || 'artisan-1',
      status: body.status || 'DRAFT',
      photoUrls: body.photoUrls || ['https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Madhubani_art.jpg/800px-Madhubani_art.jpg'],
      voiceNoteUrl: body.voiceNoteUrl || null,
      rawMaterialCost: Number(body.rawMaterialCost) || 500,

      titleEn: body.titleEn || 'Handcrafted Artisan Product',
      descriptionEn: body.descriptionEn || 'Exquisite traditional Indian craft product made with authentic materials.',
      titleHi: body.titleHi || 'हस्तनिर्मित शिल्प उत्पाद',
      descriptionHi: body.descriptionHi || 'प्रामाणिक पारंपरिक भारतीय हस्तशिल्प।',
      titleRegional: body.titleRegional || body.titleEn,
      descriptionRegional: body.descriptionRegional || body.descriptionEn,
      regionalLanguage: body.regionalLanguage || 'hi',

      bulletPoints: body.bulletPoints || ['100% Handcrafted', 'Authentic traditional craft'],
      searchTags: body.searchTags || ['handicraft', 'indian art'],
      instagramCaption: body.instagramCaption || 'Handcrafted with love by Indian artisans. #Haath',
      recommendedPriceMin: Number(body.recommendedPriceMin) || 1500,
      recommendedPriceMax: Number(body.recommendedPriceMax) || 2500,
      pricingRationale: body.pricingRationale || 'Fair trade artisan pricing based on material cost and craft complexity.',
      listedPrice: Number(body.listedPrice) || Number(body.recommendedPriceMin) || 2000,

      craftTradition: body.craftTradition || 'Madhubani Painting',
      craftRegion: body.craftRegion || 'Bihar, India',
      giTagStatus: body.giTagStatus || null,
      unescoStatus: body.unescoStatus || null,
      provenanceNote: body.provenanceNote || 'Handcrafted using traditional lineage techniques passed down through generations.',
      authenticityStatement: body.authenticityStatement || 'Certified authentic handcrafted piece.',
      authenticityMarkers: body.authenticityMarkers || ['Handmade texture variations', 'Natural color tone'],
      audioNarrationUrl: body.audioNarrationUrl || null,
      embedding: embedding,

      platformStatus: body.platformStatus || {
        amazonKarigar: "pending",
        etsy: "pending",
        ondc: "pending",
        instagram: "pending"
      },
      provenanceCertUrl: body.provenanceCertUrl || `/certs/cert-${Date.now()}.pdf`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    try {
      const created = await prisma.product.create({
        data: newProduct as any
      });
      return NextResponse.json(created, { status: 201 });
    } catch {
      memoryStore.products.unshift(newProduct as any);
      return NextResponse.json(newProduct, { status: 201 });
    }
  } catch (error: any) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
