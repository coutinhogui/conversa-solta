import {unstable_setRequestLocale} from 'next-intl/server';
import FavoritesClientPage from './FavoritesClientPage';

export default function FavoritesPage({params: {locale}}: {params: {locale: string}}) {
  unstable_setRequestLocale(locale);

  return <FavoritesClientPage />;
}
