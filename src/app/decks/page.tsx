'use client';

import { useState } from 'react';
import { decks, deckCategories } from '@/lib/decks';
import DeckCard from '@/components/deck-card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useTranslations } from 'next-intl';

export default function DecksPage() {
  const t = useTranslations('DecksPage');
  const [filter, setFilter] = useState('All');

  const filteredDecks =
    filter === 'All'
      ? decks
      : decks.filter((deck) => deck.category === filter);
  
  const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl || 'https://picsum.photos/seed/1/600/400';
  const getHint = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageHint || 'abstract';

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
            {t('title')}
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            {t('subtitle')}
          </p>
        </div>
        <div className="w-full md:w-auto">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder={t('filterPlaceholder')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">{t('allCategories')}</SelectItem>
              {deckCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredDecks.map((deck) => (
          <DeckCard key={deck.id} deck={deck} imageUrl={getImage(deck.image)} imageHint={getHint(deck.image)} />
        ))}
      </div>
    </div>
  );
}
