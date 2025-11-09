import type { MainNavItem } from "./types";

export const siteConfig = {
    name: 'Shuffle Talks',
    mainNav: [
        {
            title: 'Home',
            href: '/',
        },
        {
            title: 'Decks',
            href: '/decks',
        },
        {
            title: 'Favorites',
            href: '/favorites',
        },
        {
            title: 'Settings',
            href: '/settings',
        }
    ] satisfies MainNavItem[],
}
