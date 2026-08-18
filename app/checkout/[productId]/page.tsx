'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SEED_PRODUCTS } from '@/lib/seedData';
import { ShoppingBag, ShieldCheck, CheckCircle2, Lock, ArrowRight, Loader2 } from 'lucide-react';

export default function CheckoutPage({ params }: { params: { productId: string } }) {
  const router = useRouter();
  const [product, setProduct] = useState<any>(
    SEED_PRODUCTS.find(p => p.id === params.productId) || SEED_PRODUCTS[0]
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  const [buyerData, setBuyerData] = useState({
    name: 'Ananya Sharma',
    email: 'ananya@example.com',
    phone: '+91 98765 43210',
    street: '42 MG Road, Indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560038'
  });

  useEffect(() => {
    fetch(`/api/products/${params.productId}`)
      .then(res => res.json())
      .then(data => {
        if (data && !data.error) setProduct(data);
      })
      .catch(() => {});
  }, [params.productId]);

  const handleRazorpayPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // 1. Create Order API
      const res = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          amount: product.listedPrice || 5200,
          buyerDetails: buyerData
        })
      });
      const orderInfo = await res.json();

      // 2. Simulate Razorpay Test Payment Modal Verification
      setTimeout(async () => {
        const verifyRes = await fetch('/api/payments/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            razorpay_order_id: orderInfo.orderId || 'order_demo',
            razorpay_payment_id: `pay_${Date.now()}`,
            razorpay_signature: 'sig_demo',
            internalOrderId: orderInfo.internalOrderId
          })
        });
        const verifyData = await verifyRes.json();

        setOrderId(verifyData.orderId || orderInfo.internalOrderId || `ord_${Date.now()}`);
        setIsProcessing(false);
        setOrderComplete(true);
      }, 1500);

    } catch (err) {
      console.error('Checkout error:', err);
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen py-16 bg-parchment font-sans flex flex-col justify-center">
      <div className="max-w-4xl mx-auto px-4 w-full space-y-8">
        
        {orderComplete ? (
          /* Order Confirmation Screen */
          <div className="p-10 rounded-3xl bg-white border-2 border-emerald-300 shadow-2xl text-center space-y-6 max-w-xl mx-auto">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest px-3 py-1 rounded-badge bg-emerald-50 border border-emerald-200">
                Payment Successful (Razorpay Test Mode)
              </span>
              <h1 className="font-serif font-bold text-3xl text-stone-900">
                Thank You For Your Order!
              </h1>
              <p className="text-sm text-stone-600">
                Your payment of <strong>₹{(product.listedPrice || 5200).toLocaleString('en-IN')}</strong> has been confirmed. Transactional confirmation email sent to <strong>{buyerData.email}</strong> via Resend API.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-left text-xs space-y-1.5 font-mono">
              <p><strong>Order ID:</strong> {orderId}</p>
              <p><strong>Product:</strong> {product.titleEn}</p>
              <p><strong>Artisan:</strong> {product.artisan?.name || 'Sita Devi Mithila'}</p>
              <p><strong>Shipping To:</strong> {buyerData.street}, {buyerData.city}, {buyerData.state} - {buyerData.pincode}</p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => router.push('/orders')}
                className="flex-1 py-3 rounded-xl bg-terracotta text-white font-semibold text-sm shadow-sm hover:bg-terracotta-600"
              >
                Track Order History
              </button>
              <button
                onClick={() => router.push('/marketplace')}
                className="flex-1 py-3 rounded-xl bg-stone-100 text-stone-800 font-semibold text-sm hover:bg-stone-200"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Shipping & Payment Form */}
            <div className="lg:col-span-7 p-8 rounded-3xl bg-white border-2 border-stone-200 shadow-xl space-y-6">
              <div className="border-b border-stone-200 pb-4">
                <span className="text-xs font-semibold text-terracotta uppercase tracking-widest">
                  Secure Razorpay Test Checkout
                </span>
                <h1 className="font-serif font-bold text-2xl text-stone-900 mt-1">
                  Shipping & Payment Details
                </h1>
              </div>

              <form onSubmit={handleRazorpayPayment} className="space-y-4 text-sm">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700">Full Buyer Name</label>
                  <input
                    type="text"
                    value={buyerData.name}
                    onChange={e => setBuyerData({ ...buyerData, name: e.target.value })}
                    className="w-full p-3 rounded-xl border border-stone-300 text-stone-900"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-700">Email Address</label>
                    <input
                      type="email"
                      value={buyerData.email}
                      onChange={e => setBuyerData({ ...buyerData, email: e.target.value })}
                      className="w-full p-3 rounded-xl border border-stone-300 text-stone-900"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-700">Phone Number</label>
                    <input
                      type="text"
                      value={buyerData.phone}
                      onChange={e => setBuyerData({ ...buyerData, phone: e.target.value })}
                      className="w-full p-3 rounded-xl border border-stone-300 text-stone-900"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700">Street Address</label>
                  <input
                    type="text"
                    value={buyerData.street}
                    onChange={e => setBuyerData({ ...buyerData, street: e.target.value })}
                    className="w-full p-3 rounded-xl border border-stone-300 text-stone-900"
                    required
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-700">City</label>
                    <input
                      type="text"
                      value={buyerData.city}
                      onChange={e => setBuyerData({ ...buyerData, city: e.target.value })}
                      className="w-full p-3 rounded-xl border border-stone-300 text-stone-900"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-700">State</label>
                    <input
                      type="text"
                      value={buyerData.state}
                      onChange={e => setBuyerData({ ...buyerData, state: e.target.value })}
                      className="w-full p-3 rounded-xl border border-stone-300 text-stone-900"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-700">Pincode</label>
                    <input
                      type="text"
                      value={buyerData.pincode}
                      onChange={e => setBuyerData({ ...buyerData, pincode: e.target.value })}
                      className="w-full p-3 rounded-xl border border-stone-300 text-stone-900"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-terracotta to-saffron text-white font-semibold text-base shadow-terracotta-glow hover:opacity-95 transition-all flex items-center justify-center gap-2 mt-4 cursor-pointer"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Processing Razorpay Order...
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" /> Pay ₹{(product.listedPrice || 5200).toLocaleString('en-IN')} via Razorpay
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-5 p-6 rounded-3xl bg-stone-900 text-white shadow-xl space-y-6">
              <h3 className="font-serif font-bold text-xl text-white border-b border-stone-800 pb-3">
                Order Summary
              </h3>

              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-stone-800 flex-shrink-0">
                  {/* eslint-disable-next-html-element-suppression */}
                  <img
                    src={product.photoUrls?.[0] || "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Madhubani_art.jpg/800px-Madhubani_art.jpg"}
                    alt={product.titleEn}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-base text-stone-100 line-clamp-2">{product.titleEn}</h4>
                  <p className="text-xs text-saffron">{product.craftTradition}</p>
                </div>
              </div>

              <div className="space-y-2 border-t border-b border-stone-800 py-4 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-stone-400">Craft Subtotal</span>
                  <span>₹{(product.listedPrice || 5200).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Artisan Direct Payout</span>
                  <span className="text-emerald-400">100%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Shipping & Insurance</span>
                  <span className="text-emerald-400">FREE</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-stone-800">
                  <span>Total Amount</span>
                  <span className="text-saffron">₹{(product.listedPrice || 5200).toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-stone-800/80 text-xs text-stone-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Includes Verified Haath Digital Provenance Certificate (PDF download available upon payment)</span>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
