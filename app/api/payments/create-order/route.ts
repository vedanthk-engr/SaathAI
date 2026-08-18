import { NextRequest, NextResponse } from 'next/server';
import { createRazorpayOrder } from '@/lib/razorpay';
import { memoryStore } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { productId, amount, buyerDetails } = await req.json();

    if (!productId || !amount) {
      return NextResponse.json({ error: 'productId and amount are required' }, { status: 400 });
    }

    const receiptId = `rcpt_${Date.now()}`;
    const rzpOrder = await createRazorpayOrder(amount, receiptId);

    // Track pending order in memoryStore
    const newOrder = {
      id: `ord_${Date.now()}`,
      productId,
      buyerId: buyerDetails?.id || 'buyer-demo',
      buyerName: buyerDetails?.name || 'Artisan Craft Lover',
      buyerEmail: buyerDetails?.email || 'buyer@example.com',
      amount,
      status: 'PENDING',
      razorpayId: rzpOrder.id,
      shippingAddr: buyerDetails?.address || {
        street: '12 Heritage Lane',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001',
        country: 'India'
      },
      createdAt: new Date().toISOString()
    };

    memoryStore.orders.unshift(newOrder as any);

    return NextResponse.json({
      orderId: rzpOrder.id,
      amount: rzpOrder.amount,
      currency: rzpOrder.currency,
      keyId: process.env.RAZORPAY_KEY_ID || 'rzp_test_HaathKey123',
      internalOrderId: newOrder.id
    });
  } catch (error: any) {
    console.error('Error in create-order:', error);
    return NextResponse.json({ error: error.message || 'Payment initiation failed' }, { status: 500 });
  }
}
