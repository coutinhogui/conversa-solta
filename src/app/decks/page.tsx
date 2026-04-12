import { getDeckCategories, loadDecks } from '@/lib/decks';
import AllDecksClientPage from './AllDecksClientPage';

export default async function DecksPage() {
  const decks = await loadDecks();
  const categories = await getDeckCategories();

  return (
    <div className="container mx-auto p-4 md:p-8">
        <AllDecksClientPage decks={decks} categories={categories} />
    </div>
  );
}
