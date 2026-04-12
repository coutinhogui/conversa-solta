'use client';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { deckCategories, type Deck } from '@/lib/decks';
import DeckCard from '@/components/deck-card';
import { type ImagePlaceholder } from '@/lib/placeholder-images';
import { siteConfig } from '@/lib/site';

interface AllDecksClientPageProps {
    decks: Deck[];
    images: ImagePlaceholder[];
}

export default function AllDecksClientPage({ decks, images }: AllDecksClientPageProps) {
  const [filter, setFilter] = useState<string>(siteConfig.decksPage.allCategories);

  const getImage = (id: string) =>
    images.find((img) => img.id === id)?.imageUrl ||
    'https://picsum.photos/seed/1/600/400';
  const getHint = (id: string) =>
    images.find((img) => img.id === id)?.imageHint || 'abstract';

  const filteredDecks = decks.filter(
    (deck) =>
      filter === siteConfig.decksPage.allCategories || deck.category === filter
  );

  return (
    <>
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
            <h1 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
                {siteConfig.decksPage.title}
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
                {siteConfig.decksPage.description}
            </p>
            </div>
            <div className="w-full md:w-auto">
                <Select value={filter} onValueChange={setFilter}>
                    <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder={siteConfig.decksPage.filterPlaceholder} />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value={siteConfig.decksPage.allCategories}>
                      {siteConfig.decksPage.allCategories}
                    </SelectItem>
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
            {filteredDecks.length > 0 ? (
              filteredDecks.map((deck) => (
                <DeckCard
                    key={deck.id}
                    deck={deck}
                    imageUrl={getImage(deck.image)}
                    imageHint={getHint(deck.image)}
                />
              ))
            ) : (
              <div className="col-span-full rounded-lg border border-dashed border-border p-8 text-center text-muted-foreground">
                {siteConfig.decksPage.emptyState}
              </div>
            )}
        </div>
    </>
  );
}
