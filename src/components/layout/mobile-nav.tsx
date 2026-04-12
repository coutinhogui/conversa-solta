'use client';

import { useState } from 'react';
import { Menu, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { siteConfig } from '@/lib/site';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import TranslationSwitcher from '@/components/translation-switcher';

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const mainNav = siteConfig.navigation;

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Abrir menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="pr-0">
          <SheetTitle className="sr-only">Menu principal</SheetTitle>
          <Link
            href="/"
            className="flex items-center"
            onClick={() => setOpen(false)}
          >
            <Sparkles className="mr-2 h-4 w-4 text-primary" />
            <span className="font-bold font-headline">{siteConfig.name}</span>
          </Link>
          <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
            <div className="mb-3 pr-6">
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Idioma
              </p>
              <TranslationSwitcher />
            </div>
            <div className="mt-6 flex flex-col space-y-3">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'text-muted-foreground transition-colors hover:text-foreground',
                    pathname === item.href && 'text-foreground'
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
