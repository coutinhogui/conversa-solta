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

export default function SettingsPage() {
  return (
    <div className="container mx-auto max-w-2xl p-4 md:p-8">
      <h1 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
        Settings
      </h1>
      <p className="mt-2 text-lg text-muted-foreground">
        Manage your app preferences and view information.
      </p>

      <div className="mt-8 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>
              Customize the look and feel of the app.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Theme</span>
              <ThemeToggle />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>PWA & Offline</CardTitle>
            <CardDescription>
              Connectivity status and offline usage information.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Connectivity</span>
              <ConnectivityStatus />
            </div>
            <div className="flex items-start gap-4 rounded-lg border p-4">
                <Smartphone className="h-6 w-6 flex-shrink-0 text-muted-foreground mt-1" />
                <div>
                    <h3 className="font-semibold">Offline Use</h3>
                    <p className="text-sm text-muted-foreground">
                        This app is a PWA (Progressive Web App). You can install it on your device for easy access and offline use. Deck data is synced for availability even without an internet connection.
                    </p>
                </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
