'use client';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { deckCategories, decks } from '@/lib/decks';
import DeckCard from '@/components/deck-card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useTranslations } from 'next-intl';

export default function AllDecksClientPage() {
  const t = useTranslations('DecksPage');
  const [filter, setFilter] = useState('All');

  const filteredDecks =
    filter === 'All'
      ? decks
      : decks.filter((deck) => deck.category === filter);

  const getImage = (id: string) =>
    PlaceHolderImages.find((img) => img.id === id)?.imageUrl ||
    'https://picsum.photos/seed/1/600/400';
  const getHint = (id: string) =>
    PlaceHolderImages.find((img) => img.id === id)?.imageHint || 'abstract';

  return (
    <div className="w-full">
      <div className="mt-4 flex w-full justify-start md:justify-end">
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
      <div className="mt-8 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredDecks.map((deck) => (
          <DeckCard
            key={deck.id}
            deck={deck}
            imageUrl={getImage(deck.image)}
            imageHint={getHint(deck.image)}
          />
        ))}
      </div>
    </div>
  );
}
