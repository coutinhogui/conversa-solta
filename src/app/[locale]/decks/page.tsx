import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import AllDecksClientPage from './AllDecksClientPage';

export default function DecksPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('DecksPage');

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
            {t('title')}
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            {t('subtitle')}
          </p>
        </div>
      </div>
      <AllDecksClientPage />
    </div>
  );
}
