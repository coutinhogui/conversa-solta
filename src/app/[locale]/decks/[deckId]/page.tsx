import {unstable_setRequestLocale} from 'next-intl/server';
import DeckClientPage from './DeckClientPage';

export default function DeckPage({params}: {params: {locale: string, deckId: string}}) {
  unstable_setRequestLocale(params.locale);

  return <DeckClientPage />;
}
