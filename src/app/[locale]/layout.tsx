import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { unstable_setRequestLocale } from 'next-intl/server';
import Header from '@/components/layout/header';

const locales = ['en', 'pt'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
 
export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();
  
  // Enable static rendering
  unstable_setRequestLocale(locale);

  let messages;
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
 
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="flex min-h-screen w-full flex-col">
        <Header />
        <main className="flex flex-1 flex-col">{children}</main>
      </div>
    </NextIntlClientProvider>
  );
}
