import { NextRequest, NextResponse } from 'next/server';
import { prisma, memoryStore } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const buyerId = searchParams.get('buyerId');
    const artisanId = searchParams.get('artisanId');

    let orders: any[] = [];
    try {
      orders = await prisma.order.findMany({
        include: { product: true, buyer: true },
        orderBy: { createdAt: 'desc' }
      });
    } catch {
      orders = memoryStore.orders;
    }

    if (artisanId) {
      orders = orders.filter(o => {
        const prod = memoryStore.products.find(p => p.id === o.productId);
        return prod?.artisanId === artisanId;
      });
    } else if (buyerId) {
      orders = orders.filter(o => o.buyerId === buyerId);
    }

    return NextResponse.json(orders);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
