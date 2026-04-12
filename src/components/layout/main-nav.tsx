'use client';

import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';

export function MainNav() {
  const pathname = usePathname();
  const mainNav = [
    { title: 'Home', href: '/' },
    { title: 'Decks', href: '/decks' },
    { title: 'Favorites', href: '/favorites' },
    { title: 'Settings', href: '/settings' },
  ];

  return (
    <div className="mr-4 hidden md:flex">
      <NavigationMenu>
        <NavigationMenuList>
          {mainNav.map((item) => (
            <NavigationMenuItem key={item.href}>
              <NavigationMenuLink asChild active={pathname === item.href}>
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
