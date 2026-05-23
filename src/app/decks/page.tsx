import { getDeckCategories, loadDecks } from '@/lib/decks';
import AllDecksClientPage from './AllDecksClientPage';
import { Suspense } from 'react';

export default async function DecksPage() {
  const decks = await loadDecks();
  const categories = await getDeckCategories();

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Suspense fallback={<div className="text-center py-12 text-muted-foreground animate-pulse">Carregando temas...</div>}>
        <AllDecksClientPage decks={decks} categories={categories} />
      </Suspense>
    </div>
  );
}
