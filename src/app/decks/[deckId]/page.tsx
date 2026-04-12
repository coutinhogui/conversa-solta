import DeckClientPage from './DeckClientPage';

export default function DeckPage({params}: {params: {deckId: string}}) {
  return <DeckClientPage deckId={params.deckId} />;
}
