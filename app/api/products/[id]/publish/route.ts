import { NextRequest, NextResponse } from 'next/server';
import { prisma, memoryStore } from '@/lib/prisma';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await req.json();
    const { platform, status } = body;

    let product = memoryStore.products.find(p => p.id === id);

    let updatedPlatformStatus: Record<string, string> = product?.platformStatus || {
      amazonKarigar: "not_listed",
      etsy: "not_listed",
      ondc: "not_listed",
      instagram: "not_listed"
    };

    if (platform) {
      updatedPlatformStatus = {
        ...updatedPlatformStatus,
        [platform]: status || (updatedPlatformStatus[platform] === 'published' ? 'not_listed' : 'published')
      };
    } else if (body.platformStatus) {
      updatedPlatformStatus = body.platformStatus;
    }

    const overallProductStatus = body.status || 'PUBLISHED';

    try {
      const updated = await prisma.product.update({
        where: { id },
        data: {
          platformStatus: updatedPlatformStatus as any,
          status: overallProductStatus
        }
      });
      return NextResponse.json(updated);
    } catch {
      if (product) {
        product.platformStatus = updatedPlatformStatus as any;
        product.status = overallProductStatus;
        product.updatedAt = new Date().toISOString();
        return NextResponse.json(product);
      }
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
