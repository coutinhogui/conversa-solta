'use client';

import { useState, useEffect, useCallback } from 'react';
import { siteConfig } from '@/lib/site';

const FAVORITES_KEY = siteConfig.favoriteStorageKey;
const LEGACY_FAVORITES_KEY = siteConfig.legacyFavoriteStorageKey;

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(FAVORITES_KEY);
      const legacyItem = window.localStorage.getItem(LEGACY_FAVORITES_KEY);
      const source = item ?? legacyItem;

      if (source) {
        const parsed = Array.from(new Set(JSON.parse(source))) as string[];
        setFavorites(parsed);
        window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(parsed));

        if (legacyItem) {
          window.localStorage.removeItem(LEGACY_FAVORITES_KEY);
        }
      }
    } catch (error) {
      console.error('Failed to load favorites from localStorage', error);
      setFavorites([]);
    } finally {
        setIsLoaded(true);
    }
  }, []);

  const saveFavorites = (newFavorites: string[]) => {
    try {
      setFavorites(newFavorites);
      window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Failed to save favorites to localStorage', error);
    }
  };

  const addFavorite = useCallback(
    (deckId: string) => {
      if (!favorites.includes(deckId)) {
        saveFavorites([...favorites, deckId]);
      }
    },
    [favorites]
  );

  const removeFavorite = useCallback(
    (deckId: string) => {
      saveFavorites(favorites.filter((id) => id !== deckId));
    },
    [favorites]
  );

  const isFavorite = useCallback(
    (deckId: string) => {
      return favorites.includes(deckId);
    },
    [favorites]
  );

  return { favorites, addFavorite, removeFavorite, isFavorite, isLoaded };
};
