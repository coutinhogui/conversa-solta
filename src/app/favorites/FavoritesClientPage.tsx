'use client';

import { useMemo, useState } from 'react';
import type { Deck } from '@/lib/decks';
import DeckCard from '@/components/deck-card';
import { useFavorites } from '@/hooks/use-favorites';
import { Star, Search } from 'lucide-react';
import { siteConfig } from '@/lib/site';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface FavoritesClientPageProps {
  decks: Deck[];
}

export default function FavoritesClientPage({ decks }: FavoritesClientPageProps) {
  const { favorites, isLoaded } = useFavorites();
  const [filter, setFilter] = useState<string>(siteConfig.decksPage.allCategories);
  const [query, setQuery] = useState('');

  // 1. Get favorite decks
  const favoriteDecks = useMemo(() => {
    return decks.filter((deck) => favorites.includes(deck.id));
  }, [decks, favorites]);

  // 2. Get unique categories present only in favorites
  const favoriteCategories = useMemo(() => {
    const cats = favoriteDecks.map((deck) => deck.category);
    return Array.from(new Set(cats));
  }, [favoriteDecks]);

  // 3. Filter the favorite decks based on search & category
  const filteredDecks = useMemo(() => {
    return favoriteDecks.filter((deck) => {
      const matchesCategory =
        filter === siteConfig.decksPage.allCategories || deck.category === filter;

      const normalizedQuery = query.trim().toLocaleLowerCase('pt-BR');
      const haystack = [
        deck.title,
        deck.description,
        ...(deck.smartTags ?? []),
        ...(deck.tags ?? []),
      ]
        .join(' ')
        .toLocaleLowerCase('pt-BR');

      const matchesQuery =
        normalizedQuery.length === 0 || haystack.includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [favoriteDecks, filter, query]);

  if (!isLoaded) {
    // Show a loading state or skeleton screen
    return (
       <div className="container mx-auto p-4 md:p-8">
        <h1 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
            {siteConfig.favorites.loadingTitle}
        </h1>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="h-[400px] animate-pulse rounded-lg bg-muted"></div>
            ))}
        </div>
      </div>
    );
  }

  // Base state: user has never favorited anything
  if (favoriteDecks.length === 0) {
    return (
      <div className="container mx-auto p-4 md:p-8">
        <h1 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
          {siteConfig.favorites.title}
        </h1>
        <div className="mt-8 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-card p-12 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
            <Star className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold">{siteConfig.favorites.emptyTitle}</h2>
          <p className="mt-2 max-w-sm text-muted-foreground">
            {siteConfig.favorites.emptyDescription}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      {/* Header and Controls */}
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div className="max-w-3xl">
          <h1 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
            {siteConfig.favorites.title}
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            {siteConfig.favorites.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="secondary">{filteredDecks.length} favoritos</Badge>
            {filter !== siteConfig.decksPage.allCategories && (
              <Badge variant="outline">{filter}</Badge>
            )}
          </div>
        </div>
        <div className="grid w-full gap-3 md:w-auto md:grid-cols-[minmax(240px,1fr)_200px]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar nos favoritos..."
              className="pl-9"
            />
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder={siteConfig.decksPage.filterPlaceholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={siteConfig.decksPage.allCategories}>
                {siteConfig.decksPage.allCategories}
              </SelectItem>
              {favoriteCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Grid of favorited decks */}
      {filteredDecks.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredDecks.map((deck) => (
            <DeckCard
              key={deck.id}
              deck={deck}
              imageUrl={deck.imageMeta?.imageUrl ?? 'https://picsum.photos/seed/1/600/400'}
              imageHint={deck.imageMeta?.imageHint ?? 'abstract'}
            />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-lg border border-dashed border-border p-12 text-center text-muted-foreground">
          {siteConfig.decksPage.emptyState}
        </div>
      )}
    </div>
  );
}
