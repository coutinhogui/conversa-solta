'use client';

import { decks } from '@/lib/decks';
import DeckCard from '@/components/deck-card';
import { useFavorites } from '@/hooks/use-favorites';
import { Star } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useTranslations } from 'next-intl';

export default function FavoritesPage() {
  const t = useTranslations('FavoritesPage');
  const { favorites, isLoaded } = useFavorites();

  const favoriteDecks = decks.filter((deck) => favorites.includes(deck.id));
  
  const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl || 'https://picsum.photos/seed/1/600/400';
  const getHint = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageHint || 'abstract';

  if (!isLoaded) {
    // Show a loading state or skeleton screen
    return (
       <div className="container mx-auto p-4 md:p-8">
        <h1 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
            {t('title')}
        </h1>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="h-[400px] animate-pulse rounded-lg bg-muted"></div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
        {t('title')}
      </h1>
      {favoriteDecks.length > 0 ? (
        <>
          <p className="mt-2 text-lg text-muted-foreground">
            {t('subtitle')}
          </p>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {favoriteDecks.map((deck) => (
              <DeckCard key={deck.id} deck={deck} imageUrl={getImage(deck.image)} imageHint={getHint(deck.image)} />
            ))}
          </div>
        </>
      ) : (
        <div className="mt-8 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-card p-12 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
            <Star className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold">{t('noFavoritesTitle')}</h2>
          <p className="mt-2 max-w-sm text-muted-foreground">
            {t('noFavoritesSubtitle')}
          </p>
        </div>
      )}
    </div>
  );
}
