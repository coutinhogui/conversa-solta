'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { siteConfig } from '@/lib/config';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';


export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="pr-0">
          <Link
            href="/"
            className="flex items-center"
            onClick={() => setOpen(false)}
          >
            <Sparkles className="mr-2 h-4 w-4 text-primary" />
            <span className="font-bold font-headline">{siteConfig.name}</span>
          </Link>
          <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
            <div className="flex flex-col space-y-3">
              {siteConfig.mainNav.map((item) => (
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
