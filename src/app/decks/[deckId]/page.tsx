import DeckClientPage from './DeckClientPage';

export default async function DeckPage({
  params,
}: {
  params: Promise<{ deckId: string }>;
}) {
  const { deckId } = await params;

  return <DeckClientPage deckId={deckId} />;
}
