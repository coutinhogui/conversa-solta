'use client';

import { useEffect, useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { type Deck } from '@/lib/decks';
import DeckCard from '@/components/deck-card';
import { siteConfig } from '@/lib/site';

interface AllDecksClientPageProps {
  decks: Deck[];
  categories: Deck['category'][];
}

type DeckGroup = {
  category: Deck['category'];
  categoryDescription: string;
  decks: Deck[];
  subgroups: Array<{
    subcategory: string;
    description: string;
    decks: Deck[];
  }>;
};

function sortDecks(items: Deck[]): Deck[] {
  return [...items].sort((left, right) => {
    if (left.featured !== right.featured) {
      return left.featured ? -1 : 1;
    }

    return left.title.localeCompare(right.title, 'pt-BR');
  });
}

function groupDecks(decks: Deck[]): DeckGroup[] {
  const grouped = new Map<Deck['category'], DeckGroup>();

  for (const deck of sortDecks(decks)) {
    const category = deck.category;
    const existingCategory = grouped.get(category) ?? {
      category,
      categoryDescription: deck.taxonomy?.categoryDescription ?? '',
      decks: [],
      subgroups: [],
    };

    existingCategory.decks.push(deck);

    const subcategory = deck.taxonomy?.subcategory ?? 'Geral';
    const existingSubgroup = existingCategory.subgroups.find(
      (item) => item.subcategory === subcategory
    );

    if (existingSubgroup) {
      existingSubgroup.decks.push(deck);
    } else {
      existingCategory.subgroups.push({
        subcategory,
        description: deck.taxonomy?.subcategoryDescription ?? '',
        decks: [deck],
      });
    }

    grouped.set(category, existingCategory);
  }

  return Array.from(grouped.values()).map((group) => ({
    ...group,
    subgroups: group.subgroups.sort((left, right) =>
      left.subcategory.localeCompare(right.subcategory, 'pt-BR')
    ),
  }));
}

export default function AllDecksClientPage({ decks, categories }: AllDecksClientPageProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [filter, setFilter] = useState<string>(
    () => searchParams.get('category') ?? siteConfig.decksPage.allCategories
  );
  const [themeFilter, setThemeFilter] = useState<string>(
    () => searchParams.get('theme') ?? siteConfig.decksPage.allThemes
  );
  const [query, setQuery] = useState(
    () => searchParams.get('q') ?? ''
  );

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (query.trim()) {
      params.set('q', query);
    } else {
      params.delete('q');
    }

    if (filter !== siteConfig.decksPage.allCategories) {
      params.set('category', filter);
    } else {
      params.delete('category');
    }

    if (themeFilter !== siteConfig.decksPage.allThemes) {
      params.set('theme', themeFilter);
    } else {
      params.delete('theme');
    }

    const currentString = searchParams.toString();
    const newString = params.toString();

    if (currentString !== newString) {
      const url = newString ? `${pathname}?${newString}` : pathname;
      router.replace(url, { scroll: false });
    }
  }, [filter, themeFilter, query, pathname, router, searchParams]);

  const thematicCategories = useMemo(
    () =>
      Array.from(
        new Set(decks.map((deck) => deck.taxonomy?.subcategory).filter(Boolean) as string[])
      ).sort((left, right) => left.localeCompare(right, 'pt-BR')),
    [decks]
  );

  const normalizedQuery = query.trim().toLocaleLowerCase('pt-BR');

  const filteredDecks = useMemo(
    () =>
      decks.filter((deck) => {
        const matchesCategory =
          filter === siteConfig.decksPage.allCategories || deck.category === filter;

        const matchesTheme =
          themeFilter === siteConfig.decksPage.allThemes ||
          deck.taxonomy?.subcategory === themeFilter;

        const haystack = [
          deck.title,
          deck.description,
          ...(deck.smartTags ?? []),
          ...(deck.searchableTags ?? []),
          ...(deck.tags ?? []),
          deck.taxonomy?.subcategory ?? '',
          deck.taxonomy?.audience ?? '',
          deck.taxonomy?.tone ?? '',
        ]
          .join(' ')
          .toLocaleLowerCase('pt-BR');

        const matchesQuery = normalizedQuery.length === 0 || haystack.includes(normalizedQuery);

        return matchesCategory && matchesTheme && matchesQuery;
      }),
    [decks, filter, themeFilter, normalizedQuery]
  );

  const groupedDecks = useMemo(() => groupDecks(filteredDecks), [filteredDecks]);
  const totalSubcategories = useMemo(
    () => groupedDecks.reduce((sum, group) => sum + group.subgroups.length, 0),
    [groupedDecks]
  );

  return (
    <>
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div className="max-w-3xl">
          <h1 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
            {siteConfig.decksPage.title}
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            {siteConfig.decksPage.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="secondary">{filteredDecks.length} temas</Badge>
            <Badge variant="outline">{totalSubcategories} subcategorias</Badge>
            <Badge variant="outline">{categories.length} categorias principais</Badge>
          </div>
        </div>
        <div className="grid w-full gap-3 md:w-auto md:grid-cols-[minmax(260px,1fr)_220px_220px]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={siteConfig.decksPage.searchPlaceholder}
              className="pl-9"
            />
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-full md:w-[220px]">
              <SelectValue placeholder={siteConfig.decksPage.filterPlaceholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={siteConfig.decksPage.allCategories}>
                {siteConfig.decksPage.allCategories}
              </SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={themeFilter} onValueChange={setThemeFilter}>
            <SelectTrigger className="w-full md:w-[220px]">
              <SelectValue placeholder={siteConfig.decksPage.thematicFilterPlaceholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={siteConfig.decksPage.allThemes}>
                {siteConfig.decksPage.allThemes}
              </SelectItem>
              {thematicCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <Badge
          variant={themeFilter === siteConfig.decksPage.allThemes ? 'secondary' : 'outline'}
          className="cursor-pointer"
          onClick={() => setThemeFilter(siteConfig.decksPage.allThemes)}
        >
          {siteConfig.decksPage.allThemes}
        </Badge>
        {thematicCategories.map((category) => (
          <Badge
            key={category}
            variant={themeFilter === category ? 'secondary' : 'outline'}
            className="cursor-pointer"
            onClick={() => setThemeFilter(category)}
          >
            {category}
          </Badge>
        ))}
      </div>

      {groupedDecks.length > 0 ? (
        <div className="mt-10 space-y-12">
          {groupedDecks.map((group) => (
            <section key={group.category} className="space-y-6">
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">
                    Categoria principal
                  </p>
                  <h2 className="mt-1 font-headline text-2xl font-bold">{group.category}</h2>
                  <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                    {group.categoryDescription}
                  </p>
                </div>
                <Badge variant="secondary">{group.decks.length} temas nessa area</Badge>
              </div>

              <div className="space-y-8">
                {group.subgroups.map((subgroup) => (
                  <div key={`${group.category}-${subgroup.subcategory}`} className="space-y-4">
                    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                      <div>
                        <h3 className="text-xl font-semibold">{subgroup.subcategory}</h3>
                        <p className="text-sm text-muted-foreground">
                          {subgroup.description}
                        </p>
                      </div>
                      <Badge variant="outline">{subgroup.decks.length} temas</Badge>
                    </div>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                      {subgroup.decks.map((deck) => (
                        <DeckCard
                          key={deck.id}
                          deck={deck}
                          imageUrl={
                            deck.imageMeta?.imageUrl ?? 'https://picsum.photos/seed/1/600/400'
                          }
                          imageHint={deck.imageMeta?.imageHint ?? 'abstract'}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-lg border border-dashed border-border p-8 text-center text-muted-foreground">
          {siteConfig.decksPage.emptyState}
        </div>
      )}
    </>
  );
}
