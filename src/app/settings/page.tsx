import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ThemeToggle } from '@/components/theme-toggle';
import ConnectivityStatus from '@/components/connectivity-status';
import { Smartphone } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function SettingsPage() {
  const t = useTranslations('SettingsPage');
  return (
    <div className="container mx-auto max-w-2xl p-4 md:p-8">
      <h1 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
        {t('title')}
      </h1>
      <p className="mt-2 text-lg text-muted-foreground">
        {t('subtitle')}
      </p>

      <div className="mt-8 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('appearanceTitle')}</CardTitle>
            <CardDescription>
              {t('appearanceSubtitle')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{t('themeLabel')}</span>
              <ThemeToggle />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t('pwaTitle')}</CardTitle>
            <CardDescription>
             {t('pwaSubtitle')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{t('connectivityLabel')}</span>
              <ConnectivityStatus />
            </div>
            <div className="flex items-start gap-4 rounded-lg border p-4">
                <Smartphone className="h-6 w-6 flex-shrink-0 text-muted-foreground mt-1" />
                <div>
                    <h3 className="font-semibold">{t('offlineTitle')}</h3>
                    <p className="text-sm text-muted-foreground">
                        {t('offlineSubtitle')}
                    </p>
                </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
