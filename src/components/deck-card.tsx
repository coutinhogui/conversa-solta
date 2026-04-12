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
import { deckTranslations } from '@/lib/decks';

interface DeckCardProps {
  deck: Deck;
  imageUrl: string;
  imageHint: string;
}

export default function DeckCard({ deck, imageUrl, imageHint }: DeckCardProps) {
  const deckInfo = deckTranslations[deck.id] || { title: deck.id, description: '...' };

  return (
    <Card className="flex h-full flex-col overflow-hidden transition-shadow hover:shadow-lg">
      <CardHeader className="relative h-48 w-full p-0">
        <Image
          src={imageUrl}
          alt={`Cover image for ${deckInfo.title}`}
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
        <Badge variant="secondary" className="mb-2">
          {deck.category}
        </Badge>
        <CardTitle className="text-xl font-bold font-headline">{deckInfo.title}</CardTitle>
        <CardDescription className="mt-1 text-sm">
          {deckInfo.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <Link href={`/decks/${deck.id}`}>Start Conversation</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
