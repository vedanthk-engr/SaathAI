import { NextRequest, NextResponse } from 'next/server';
import { generateEmbedding } from '@/lib/openai';
import { cosineSimilarity } from '@/lib/embeddings';
import { prisma, memoryStore } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();
    if (!query || typeof query !== 'string') {
      return NextResponse.json({ productIds: [], products: [] });
    }

    const queryVec = await generateEmbedding(query);
    let allProducts: any[] = [];

    try {
      allProducts = await prisma.product.findMany({
        where: { status: 'PUBLISHED' },
        include: { artisan: true }
      });
    } catch {
      allProducts = memoryStore.products.filter(p => p.status === 'PUBLISHED');
    }

    if (!allProducts || allProducts.length === 0) {
      allProducts = memoryStore.products;
    }

    const qLower = query.toLowerCase();

    const scored = allProducts.map((p) => {
      let score = 0;

      // 1. Text keyword relevance boost
      const titleMatch = (p.titleEn || '').toLowerCase().includes(qLower);
      const descMatch = (p.descriptionEn || '').toLowerCase().includes(qLower);
      const craftMatch = (p.craftTradition || '').toLowerCase().includes(qLower);
      const regionMatch = (p.craftRegion || '').toLowerCase().includes(qLower);
      const tagMatch = (p.searchTags || []).some((t: string) => t.toLowerCase().includes(qLower));

      if (titleMatch) score += 0.5;
      if (craftMatch) score += 0.4;
      if (tagMatch) score += 0.3;
      if (descMatch) score += 0.2;
      if (regionMatch) score += 0.2;

      // 2. Cosine similarity score
      if (p.embedding && Array.isArray(p.embedding) && p.embedding.length > 0) {
        const sim = cosineSimilarity(queryVec, p.embedding);
        score += sim;
      }

      return { product: p, score };
    });

    scored.sort((a, b) => b.score - a.score);

    const results = scored.slice(0, 20).map(s => s.product);
    const productIds = results.map(p => p.id);

    return NextResponse.json({
      query,
      productIds,
      products: results
    });
  } catch (error: any) {
    console.error('Error in /api/ai/search:', error);
    return NextResponse.json({ error: error.message || 'Search failed' }, { status: 500 });
  }
}
