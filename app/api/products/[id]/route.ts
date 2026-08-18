import { NextRequest, NextResponse } from 'next/server';
import { prisma, memoryStore } from '@/lib/prisma';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    let product: any = null;

    try {
      product = await prisma.product.findUnique({
        where: { id },
        include: { artisan: true, reviews: true }
      });
    } catch {
      product = memoryStore.products.find(p => p.id === id);
    }

    if (!product) {
      product = memoryStore.products.find(p => p.id === id);
    }

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Attach artisan details if missing
    if (!product.artisan) {
      const artisan = memoryStore.artisans.find(a => a.id === product.artisanId) || memoryStore.artisans[0];
      product = { ...product, artisan };
    }

    return NextResponse.json(product);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await req.json();

    try {
      const updated = await prisma.product.update({
        where: { id },
        data: body
      });
      return NextResponse.json(updated);
    } catch {
      const index = memoryStore.products.findIndex(p => p.id === id);
      if (index !== -1) {
        memoryStore.products[index] = {
          ...memoryStore.products[index],
          ...body,
          updatedAt: new Date().toISOString()
        };
        return NextResponse.json(memoryStore.products[index]);
      }
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    try {
      await prisma.product.delete({ where: { id } });
    } catch {
      const index = memoryStore.products.findIndex(p => p.id === id);
      if (index !== -1) {
        memoryStore.products.splice(index, 1);
      }
    }
    return NextResponse.json({ success: true, message: 'Product deleted' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
