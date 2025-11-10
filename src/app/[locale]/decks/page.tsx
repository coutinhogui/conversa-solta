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
import {unstable_setRequestLocale} from 'next-intl/server';

export default function DecksPage({params: {locale}}: {params: {locale: string}}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('DecksPage');

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
      </div>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {decks.map((deck) => (
          <DeckCard key={deck.id} deck={deck} imageUrl={getImage(deck.image)} imageHint={getHint(deck.image)} />
        ))}
      </div>
    </div>
  );
}
