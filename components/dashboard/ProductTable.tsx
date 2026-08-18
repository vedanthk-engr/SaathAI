'use client';

import React from 'react';
import Link from 'next/link';
import PlatformBadges from '../product/PlatformBadges';
import { Eye, Edit, Trash2, CheckCircle, Sparkles } from 'lucide-react';

interface ProductTableProps {
  products: any[];
  onDelete?: (id: string) => void;
}

export default function ProductTable({ products, onDelete }: ProductTableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl bg-white border border-stone-200 shadow-sm font-sans">
      <table className="w-full text-left text-sm text-stone-700">
        <thead className="bg-stone-50 text-xs text-stone-500 uppercase font-semibold border-b border-stone-200">
          <tr>
            <th className="px-6 py-4">Craft Product</th>
            <th className="px-4 py-4">Tradition</th>
            <th className="px-4 py-4">Price (₹)</th>
            <th className="px-4 py-4">Status</th>
            <th className="px-6 py-4">Global Platforms Sync</th>
            <th className="px-4 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-100">
          {products.map((p) => {
            const photo = p.photoUrls?.[0] || 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Madhubani_art.jpg/800px-Madhubani_art.jpg';

            return (
              <tr key={p.id} className="hover:bg-stone-50/80 transition-colors">
                
                {/* Product Photo & Title */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-stone-100 border border-stone-200 flex-shrink-0">
                      {/* eslint-disable-next-html-element-suppression */}
                      <img src={photo} alt={p.titleEn} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <Link href={`/marketplace/${p.id}`} className="font-serif font-bold text-stone-900 hover:text-terracotta transition-colors line-clamp-1">
                        {p.titleEn || 'Untitled Craft Item'}
                      </Link>
                      <span className="text-xs text-stone-400">ID: {p.id}</span>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-4 font-medium text-stone-800">
                  {p.craftTradition || 'Madhubani'}
                </td>

                <td className="px-4 py-4 font-mono font-bold text-stone-900">
                  ₹{(p.listedPrice || 0).toLocaleString('en-IN')}
                </td>

                <td className="px-4 py-4">
                  <span className={`px-2.5 py-1 rounded-badge text-xs font-semibold uppercase tracking-wider ${
                    p.status === 'PUBLISHED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {p.status || 'PUBLISHED'}
                  </span>
                </td>

                {/* Platforms toggle badges */}
                <td className="px-6 py-4">
                  <PlatformBadges productId={p.id} initialPlatformStatus={p.platformStatus} interactive={true} />
                </td>

                {/* Actions */}
                <td className="px-4 py-4 text-right space-x-2">
                  <Link
                    href={`/marketplace/${p.id}`}
                    className="p-2 rounded-lg text-stone-500 hover:bg-stone-100 hover:text-stone-900 inline-block"
                    title="View Product Story"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                  {onDelete && (
                    <button
                      onClick={() => onDelete(p.id)}
                      className="p-2 rounded-lg text-stone-400 hover:bg-red-50 hover:text-red-600 inline-block"
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </td>

              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
