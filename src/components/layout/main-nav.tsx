'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import type { MainNavItem } from '@/lib/types';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { siteConfig } from '@/lib/config';

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex">
      <NavigationMenu>
        <NavigationMenuList>
          {siteConfig.mainNav.map((item) => (
            <NavigationMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    'bg-transparent'
                  )}
                  active={pathname === item.href}
                >
                  {item.title}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
