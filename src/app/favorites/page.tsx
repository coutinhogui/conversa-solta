import { loadDecks } from '@/lib/decks';
import FavoritesClientPage from './FavoritesClientPage';

export default async function FavoritesPage() {
  const decks = await loadDecks();
  return <FavoritesClientPage decks={decks} />;
}
