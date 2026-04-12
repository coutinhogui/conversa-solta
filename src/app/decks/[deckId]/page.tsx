import { decks } from '@/lib/decks';
import DeckClientPage from './DeckClientPage';

export function generateStaticParams() {
  return decks.map((deck) => ({ deckId: deck.id }));
}

export default async function DeckPage({
  params,
}: {
  params: Promise<{ deckId: string }>;
}) {
  const { deckId } = await params;

  return <DeckClientPage deckId={deckId} />;
}
