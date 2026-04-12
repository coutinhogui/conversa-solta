
import Image from 'next/image';
import Link from 'next/link';
import type { Deck } from '@/lib/decks';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import FavoriteButton from './favorite-button';

interface DeckCardProps {
  deck: Deck;
  imageUrl: string;
  imageHint: string;
}

export default function DeckCard({ deck, imageUrl, imageHint }: DeckCardProps) {
  return (
    <Card className="flex h-full flex-col overflow-hidden transition-shadow hover:shadow-lg">
      <CardHeader className="relative h-48 w-full p-0">
        <Image
          src={imageUrl}
          alt={`Cover image for ${deck.title}`}
          width={600}
          height={400}
          className="h-full w-full object-cover"
          data-ai-hint={imageHint}
        />
        <div className="absolute right-2 top-2">
          <FavoriteButton deckId={deck.id} />
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-4">
        <div className="mb-3 flex flex-wrap gap-2">
          <Badge variant="secondary">{deck.category}</Badge>
          {deck.taxonomy?.subcategory ? (
            <Badge variant="outline">{deck.taxonomy.subcategory}</Badge>
          ) : null}
        </div>
        <CardTitle className="text-xl font-bold font-headline">{deck.title}</CardTitle>
        <CardDescription className="mt-1 text-sm">
          {deck.description}
        </CardDescription>
        <div className="mt-4 flex flex-wrap gap-2">
          {(deck.smartTags ?? deck.tags.slice(0, 3)).map((tag) => (
            <Badge key={tag} variant="outline" className="bg-background/80">
              {tag}
            </Badge>
          ))}
        </div>
        {typeof deck.questionCount === 'number' ? (
          <p className="mt-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            {deck.questionCount} perguntas
          </p>
        ) : null}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <Link href={`/decks/${deck.id}`}>Abrir tema</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
