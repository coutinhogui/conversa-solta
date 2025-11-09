'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { useTranslations } from 'next-intl';

export function MainNav() {
  const pathname = usePathname();
  const t = useTranslations('Navigation');
  const mainNav = [
    { title: t('home'), href: '/' },
    { title: t('decks'), href: '/decks' },
    { title: t('favorites'), href: '/favorites' },
    { title: t('settings'), href: '/settings' },
  ];

  return (
    <div className="mr-4 hidden md:flex">
      <NavigationMenu>
        <NavigationMenuList>
          {mainNav.map((item) => (
            <NavigationMenuItem key={item.href}>
              <NavigationMenuLink asChild active={pathname.endsWith(item.href)}>
                <Link
                  href={item.href}
                  className={cn(
                    navigationMenuTriggerStyle(),
                    'bg-transparent'
                  )}
                >
                  {item.title}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
