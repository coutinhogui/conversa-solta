import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/providers/theme-provider';

export default function ConversationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex min-h-screen w-full flex-col">
        <main className="flex flex-1 flex-col">{children}</main>
        <Toaster />
      </div>
    </ThemeProvider>
  );
}
