import { decks } from '@/lib/decks';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import AllDecksClientPage from './AllDecksClientPage';

export default function DecksPage() {

  return (
    <div className="container mx-auto p-4 md:p-8">
        <AllDecksClientPage decks={decks} images={PlaceHolderImages} />
    </div>
  );
}
