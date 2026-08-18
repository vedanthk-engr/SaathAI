'use client';

import React, { useState } from 'react';
import { SEED_ARTISANS } from '@/lib/seedData';
import { UserCheck, Save, CheckCircle2 } from 'lucide-react';

export default function ProfilePage() {
  const [profile, setProfile] = useState(SEED_ARTISANS[0]);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen py-10 bg-parchment font-sans space-y-8">
      <div className="max-w-3xl mx-auto px-4 space-y-6">
        <div className="border-b border-stone-200 pb-6">
          <h1 className="font-serif font-bold text-3xl text-stone-900">
            Edit Artisan Public Profile
          </h1>
          <p className="text-xs text-stone-500">Manage your verified public heritage profile</p>
        </div>

        <form onSubmit={handleSave} className="p-8 rounded-3xl bg-white border border-stone-200 shadow-xl space-y-6">
          {saved && (
            <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold flex items-center gap-2 border border-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Artisan profile updated successfully!
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-700">Artisan Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={e => setProfile({ ...profile, name: e.target.value })}
                className="w-full p-3 rounded-xl border border-stone-300 text-stone-900"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-700">Craft Tradition</label>
              <input
                type="text"
                value={profile.craftTradition}
                onChange={e => setProfile({ ...profile, craftTradition: e.target.value })}
                className="w-full p-3 rounded-xl border border-stone-300 text-stone-900"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-700">State</label>
              <input
                type="text"
                value={profile.regionState}
                onChange={e => setProfile({ ...profile, regionState: e.target.value })}
                className="w-full p-3 rounded-xl border border-stone-300 text-stone-900"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-700">Years Active</label>
              <input
                type="number"
                value={profile.yearsActive}
                onChange={e => setProfile({ ...profile, yearsActive: Number(e.target.value) })}
                className="w-full p-3 rounded-xl border border-stone-300 text-stone-900"
              />
            </div>
          </div>

          <div className="space-y-1 text-sm">
            <label className="text-xs font-semibold text-stone-700">Biography & Cultural Lineage</label>
            <textarea
              rows={4}
              value={profile.bio}
              onChange={e => setProfile({ ...profile, bio: e.target.value })}
              className="w-full p-3 rounded-xl border border-stone-300 text-stone-900"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-terracotta hover:bg-terracotta-600 text-white font-semibold text-sm flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" /> Save Profile Changes
          </button>
        </form>
      </div>
    </div>
  );
}
