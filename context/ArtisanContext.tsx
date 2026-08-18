'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ArtisanProfile {
  id: string;
  name: string;
  shortName: string;
  craft: string;
  region: string;
  craftScore: number;
  pendingListings: number;
}

export const ARTISANS_LIST: ArtisanProfile[] = [
  {
    id: 'artisan-1',
    name: 'Sita Devi Mithila',
    shortName: 'Sita Devi',
    craft: 'Madhubani Painting',
    region: 'Madhubani, Bihar',
    craftScore: 98,
    pendingListings: 1
  },
  {
    id: 'artisan-2',
    name: 'Ghulam Hassan Rather',
    shortName: 'Ghulam Hassan',
    craft: 'Royal Sozni Pashmina',
    region: 'Srinagar, J&K',
    craftScore: 95,
    pendingListings: 2
  },
  {
    id: 'artisan-3',
    name: 'Rameshwar Bhil',
    shortName: 'Rameshwar',
    craft: 'Tarpa Warli Art',
    region: 'Palghar, Maharashtra',
    craftScore: 92,
    pendingListings: 0
  },
  {
    id: 'artisan-4',
    name: 'Bastar Metal Guild',
    shortName: 'Bastar Guild',
    craft: 'Lost-Wax Brass Dhokra',
    region: 'Bastar, Chhattisgarh',
    craftScore: 94,
    pendingListings: 3
  }
];

interface ArtisanContextType {
  currentArtisan: ArtisanProfile;
  setArtisanById: (id: string) => void;
  artisans: ArtisanProfile[];
}

const ArtisanContext = createContext<ArtisanContextType>({
  currentArtisan: ARTISANS_LIST[0],
  setArtisanById: () => {},
  artisans: ARTISANS_LIST
});

export const ArtisanProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentArtisan, setCurrentArtisan] = useState<ArtisanProfile>(ARTISANS_LIST[0]);

  useEffect(() => {
    const savedId = localStorage.getItem('haath_active_artisan_id');
    if (savedId) {
      const found = ARTISANS_LIST.find(a => a.id === savedId);
      if (found) setCurrentArtisan(found);
    }
  }, []);

  const setArtisanById = (id: string) => {
    const found = ARTISANS_LIST.find(a => a.id === id);
    if (found) {
      setCurrentArtisan(found);
      localStorage.setItem('haath_active_artisan_id', id);
    }
  };

  return (
    <ArtisanContext.Provider value={{ currentArtisan, setArtisanById, artisans: ARTISANS_LIST }}>
      {children}
    </ArtisanContext.Provider>
  );
};

export const useArtisanProfile = () => useContext(ArtisanContext);
