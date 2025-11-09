import { Sparkles } from 'lucide-react';
import { MainNav } from './main-nav';
import { MobileNav } from './mobile-nav';
import { Link } from '@/navigation';
import { LanguageSwitcher } from '../language-switcher';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="hidden font-bold sm:inline-block font-headline">
            Shuffle Talks
          </span>
        </Link>
        <MainNav />
        <div className="flex flex-1 items-center justify-end space-x-2">
          <LanguageSwitcher />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
