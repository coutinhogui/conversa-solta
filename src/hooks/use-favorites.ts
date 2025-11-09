'use client';

import { useState, useEffect, useCallback } from 'react';

const FAVORITES_KEY = 'shuffle-talks-favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(FAVORITES_KEY);
      if (item) {
        setFavorites(JSON.parse(item));
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
