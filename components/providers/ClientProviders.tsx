'use client';

import React from 'react';
import { ArtisanProvider } from '@/context/ArtisanContext';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return <ArtisanProvider>{children}</ArtisanProvider>;
}
