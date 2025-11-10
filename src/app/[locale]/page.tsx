import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { decks } from '@/lib/decks';
import DeckCard from '@/components/deck-card';
import { Link } from '@/navigation';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {useTranslations} from 'next-intl';
import {unstable_setRequestLocale} from 'next-intl/server';

export default function Home({params: {locale}}: {params: {locale: string}}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('HomePage');
  const featuredDecks = decks.filter((deck) => deck.featured);

  const getImage = (id: string) =>
    PlaceHolderImages.find((img) => img.id === id)?.imageUrl ||
    'https://picsum.photos/seed/1/600/400';

  const getHint = (id: string) =>
    PlaceHolderImages.find((img) => img.id === id)?.imageHint || 'abstract';

  return (
    <div className="container mx-auto flex flex-1 flex-col items-center justify-center p-4 text-center md:p-8">
      <h1 className="font-headline text-4xl font-bold tracking-tight md:text-6xl">
        {t('title')}
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        {t('subtitle')}
      </p>

      <div className="my-8 w-full max-w-4xl">
        <h2 className="mb-4 text-2xl font-bold">{t('featuredDecks')}</h2>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {featuredDecks.map((deck) => (
              <CarouselItem key={deck.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <DeckCard
                    deck={deck}
                    imageUrl={getImage(deck.image)}
                    imageHint={getHint(deck.image)}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>

      <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
        <Link href="/decks">{t('exploreButton')}</Link>
      </Button>
    </div>
  );
}
