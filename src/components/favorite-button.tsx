'use client';

import { Star } from 'lucide-react';
import { useFavorites } from '@/hooks/use-favorites';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { Skeleton } from './ui/skeleton';
import { siteConfig } from '@/lib/site';

interface FavoriteButtonProps {
  deckId: string;
}

export default function FavoriteButton({ deckId }: FavoriteButtonProps) {
  const { isFavorite, addFavorite, removeFavorite, isLoaded } = useFavorites();

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite(deckId)) {
      removeFavorite(deckId);
    } else {
      addFavorite(deckId);
    }
  };

  if (!isLoaded) {
    return <Skeleton className="h-10 w-10 rounded-full" />;
  }

  const favorite = isFavorite(deckId);

  return (
    <Button
      variant="secondary"
      size="icon"
      onClick={handleFavorite}
      aria-label={favorite ? siteConfig.favoritesButton.remove : siteConfig.favoritesButton.add}
      className="rounded-full bg-background/70 hover:bg-background"
    >
      <Star
        className={cn(
          'h-5 w-5 transition-colors',
          favorite
            ? 'fill-accent text-accent'
            : 'text-foreground/60'
        )}
      />
    </Button>
  );
}
