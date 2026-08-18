import { NextRequest, NextResponse } from 'next/server';
import { prisma, memoryStore } from '@/lib/prisma';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    let artisan: any = null;

    try {
      artisan = await prisma.artisanProfile.findUnique({
        where: { id },
        include: { products: true }
      });
    } catch {
      artisan = memoryStore.artisans.find(a => a.id === id);
    }

    if (!artisan) {
      artisan = memoryStore.artisans.find(a => a.id === id || a.userId === id);
    }

    if (!artisan) {
      return NextResponse.json({ error: 'Artisan not found' }, { status: 404 });
    }

    // Attach artisan products
    const products = memoryStore.products.filter(p => p.artisanId === artisan.id || p.artisanId === id);
    artisan = { ...artisan, products };

    return NextResponse.json(artisan);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
