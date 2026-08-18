import { NextRequest, NextResponse } from 'next/server';
import { verifyRazorpaySignature } from '@/lib/razorpay';
import { sendEmail } from '@/lib/resend';
import { memoryStore } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, internalOrderId } = body;

    const isValid = verifyRazorpaySignature(
      razorpay_order_id || 'order_demo',
      razorpay_payment_id || 'pay_demo',
      razorpay_signature || 'sig_demo'
    );

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 });
    }

    // Update order status in memory store
    const order = memoryStore.orders.find(o => o.id === internalOrderId || o.razorpayId === razorpay_order_id);
    if (order) {
      order.status = 'PAID';
      (order as any).paymentId = razorpay_payment_id;
    }

    const product = memoryStore.products.find(p => p.id === order?.productId) || memoryStore.products[0];
    const artisan = memoryStore.artisans.find(a => a.id === product?.artisanId) || memoryStore.artisans[0];

    // Trigger transactional email notification
    await sendEmail({
      to: order?.buyerEmail || 'buyer@example.com',
      subject: `Order Confirmed: ${product.titleEn} (Haath Marketplace)`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #1A1A1A;">
          <h2 style="color: #C17D3C;">Your Haath Order is Confirmed!</h2>
          <p>Dear ${order?.buyerName || 'Valued Buyer'},</p>
          <p>Thank you for supporting traditional Indian craftspeople. Your payment of <strong>₹${order?.amount || product.listedPrice}</strong> has been successfully received.</p>
          <hr />
          <h3>Order Details:</h3>
          <p><strong>Item:</strong> ${product.titleEn}</p>
          <p><strong>Craft Tradition:</strong> ${product.craftTradition}</p>
          <p><strong>Artisan:</strong> ${artisan.name} (${artisan.regionState})</p>
          <p><strong>Order ID:</strong> ${order?.id || 'ord_123'}</p>
          <hr />
          <p>We are notifying ${artisan.name} to package your handcrafted item with care.</p>
        </div>
      `
    });

    return NextResponse.json({
      success: true,
      message: 'Payment verified and order updated to PAID',
      orderId: order?.id
    });
  } catch (error: any) {
    console.error('Payment verification error:', error);
    return NextResponse.json({ error: error.message || 'Payment verification failed' }, { status: 500 });
  }
}
