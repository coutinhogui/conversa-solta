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
import TranslationSwitcher from '@/components/translation-switcher';
import { siteConfig } from '@/lib/site';

export default function SettingsPage() {
  return (
    <div className="container mx-auto max-w-2xl p-4 md:p-8">
      <h1 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
        {siteConfig.settings.title}
      </h1>
      <p className="mt-2 text-lg text-muted-foreground">
        {siteConfig.settings.description}
      </p>

      <div className="mt-8 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{siteConfig.settings.appearanceTitle}</CardTitle>
            <CardDescription>
              {siteConfig.settings.appearanceDescription}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{siteConfig.settings.themeLabel}</span>
              <ThemeToggle />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{siteConfig.settings.languageTitle}</CardTitle>
            <CardDescription>
              {siteConfig.settings.languageDescription}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-sm font-medium">{siteConfig.settings.activeLanguageLabel}</span>
              <TranslationSwitcher />
            </div>
            <div className="rounded-lg border p-4 text-sm text-muted-foreground">
              <p>
                <span className="font-medium text-foreground">
                  {siteConfig.settings.translationModeLabel}:
                </span>{' '}
                {siteConfig.settings.translationModeValue}
              </p>
              <p className="mt-2">{siteConfig.settings.translationFallback}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{siteConfig.settings.offlineTitle}</CardTitle>
            <CardDescription>
             {siteConfig.settings.offlineDescription}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{siteConfig.settings.connectivityLabel}</span>
              <ConnectivityStatus />
            </div>
            <div className="flex items-start gap-4 rounded-lg border p-4">
                <Smartphone className="h-6 w-6 flex-shrink-0 text-muted-foreground mt-1" />
                <div>
                    <h3 className="font-semibold">{siteConfig.settings.offlineUseTitle}</h3>
                    <p className="text-sm text-muted-foreground">
                        {siteConfig.settings.offlineUseDescription}
                    </p>
                </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
