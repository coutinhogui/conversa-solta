import { getDeckById, loadDecks } from '@/lib/decks';
import { notFound } from 'next/navigation';
import DeckClientPage from './DeckClientPage';

export async function generateStaticParams() {
  const decks = await loadDecks();
  return decks.map((deck) => ({ deckId: deck.id }));
}

export default async function DeckPage({
  params,
}: {
  params: Promise<{ deckId: string }>;
}) {
  const { deckId } = await params;
  const deck = await getDeckById(deckId);

  if (!deck) {
    notFound();
  }

  return <DeckClientPage deck={deck} />;
}
