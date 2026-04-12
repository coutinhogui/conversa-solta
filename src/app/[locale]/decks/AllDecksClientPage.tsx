'use client';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { deckCategories } from '@/lib/decks';
import { useTranslations } from 'next-intl';

export default function AllDecksClientPage() {
  const t = useTranslations('DecksPage');
  const [filter, setFilter] = useState('All');

  // Note: This component is now only responsible for the filter.
  // The actual rendering of decks is handled by the parent server component.
  // We would need to implement a mechanism to pass the filter value
  // up to the parent or use client-side filtering if decks were passed down.

  return (
    <div className="w-full md:w-auto">
      <Select value={filter} onValueChange={setFilter}>
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder={t('filterPlaceholder')} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">{t('allCategories')}</SelectItem>
          {deckCategories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
