import { Sparkles } from 'lucide-react';
import { MainNav } from './main-nav';
import { MobileNav } from './mobile-nav';
import Link from 'next/link';
import TranslationSwitcher from '@/components/translation-switcher';
import { siteConfig } from '@/lib/site';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex min-h-14 items-center gap-3 py-2">
        <Link href="/" className="mr-2 flex items-center space-x-2 sm:mr-6">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="hidden font-headline font-bold sm:inline-block">
            {siteConfig.name}
          </span>
        </Link>
        <MainNav />
        <div className="flex flex-1 items-center justify-end gap-2">
          <div className="hidden md:flex">
            <TranslationSwitcher />
          </div>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
