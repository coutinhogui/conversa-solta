/**
 * Exemplos de como usar o novo sistema de decks dinâmicos
 * Coloque esses exemplos em seus componentes React
 */

// ============================================================
// EXEMPLO 1: Component que lista todos os decks
// ============================================================

import { useEffect, useState } from 'react';
import { Deck, loadDecks } from '@/lib/decks';

export function DecksList() {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDecks()
      .then(setDecks)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Carregando decks...</div>;

  return (
    <div>
      <h2>Todos os Decks</h2>
      {decks.map(deck => (
        <div key={deck.id} className="deck-card">
          <h3>{deck.title}</h3>
          <p>{deck.description}</p>
          <span className="badge">{deck.category}</span>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// EXEMPLO 2: Component que filtra por categoria
// ============================================================

import { getDeckCategories } from '@/lib/decks';
import {
  filterDecksByCategory,
  filterDecksByTags,
  sortDecksByFeatured,
} from '@/lib/deck-loader';

export function DecksInCategory() {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Social');
  const [decks, setDecks] = useState<Deck[]>([]);

  useEffect(() => {
    getDeckCategories().then(setCategories);
  }, []);

  useEffect(() => {
    loadDecks().then(allDecks => {
      const filtered = filterDecksByCategory(
        allDecks,
        selectedCategory as any
      );
      const sorted = sortDecksByFeatured(filtered);
      setDecks(sorted);
    });
  }, [selectedCategory]);

  return (
    <div>
      <select 
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <div className="decks-grid">
        {decks.map(deck => (
          <DeckCard key={deck.id} deck={deck} />
        ))}
      </div>
    </div>
  );
}

// ============================================================
// EXEMPLO 3: Component card individual
// ============================================================

interface DeckCardProps {
  deck: Deck;
  onOpen?: (deck: Deck) => void;
}

export function DeckCard({ deck, onOpen }: DeckCardProps) {
  const { countQuestions } = require('@/lib/deck-loader');

  return (
    <div 
      className="deck-card"
      onClick={() => onOpen?.(deck)}
      style={{
        opacity: deck.featured ? 1 : 0.8,
        border: deck.featured ? '2px solid gold' : '1px solid gray',
      }}
    >
      <img src={`/images/${deck.image}.svg`} alt={deck.title} />
      <h3>{deck.title}</h3>
      <p>{deck.description}</p>

      <div className="deck-info">
        <span className="category">{deck.category}</span>
        <span className="questions-count">
          {countQuestions(deck)} perguntas
        </span>
      </div>

      <div className="tags">
        {deck.tags.map(tag => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>

      {deck.featured && <span className="featured-badge">⭐ Destaque</span>}
    </div>
  );
}

// ============================================================
// EXEMPLO 4: Hook customizado para usar decks
// ============================================================

export function useDecks() {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadDecks()
      .then(setDecks)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  const getDeck = (id: string) => decks.find(d => d.id === id);
  const getByCategory = (category: Deck['category']) => 
    filterDecksByCategory(decks, category);
  const getByTags = (tags: string[]) => 
    filterDecksByTags(decks, tags);

  return {
    decks,
    loading,
    error,
    getDeck,
    getByCategory,
    getByTags,
  };
}

// Uso:
// const { decks, getDeck, getByCategory } = useDecks();

// ============================================================
// EXEMPLO 5: Component que carrega um deck específico
// ============================================================

export function DeckViewer({ deckId }: { deckId: string }) {
  const [deck, setDeck] = useState<Deck | null>(null);

  useEffect(() => {
    import('@/lib/decks').then(({ getDeckById }) => {
      getDeckById(deckId).then((loadedDeck) => {
        setDeck(loadedDeck ?? null);
      });
    });
  }, [deckId]);

  if (!deck) return <div>Carregando deck...</div>;

  return (
    <div>
      <h1>{deck.title}</h1>
      <p>{deck.description}</p>

      <div className="questions-list">
        {Object.entries(deck.questions).map(([key, question]) => (
          <div key={key} className="question">
            <strong>{key}:</strong> {question}
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// EXEMPLO 6: Usar em getStaticProps (Next.js)
// ============================================================

// pages/decks/index.tsx

export async function getStaticProps() {
  const { loadDecks } = await import('@/lib/decks');
  const decks = await loadDecks();

  return {
    props: { decks },
    revalidate: 3600, // Revalidar a cada hora
  };
}

interface DecksPageProps {
  decks: Deck[];
}

export default function DecksPage({ decks }: DecksPageProps) {
  return (
    <div>
      <h1>Todos os Decks</h1>
      {decks.map(deck => (
        <DeckCard key={deck.id} deck={deck} />
      ))}
    </div>
  );
}

// ============================================================
// EXEMPLO 7: Buscar de repositório remoto
// ============================================================

// lib/decks-remote.ts
export async function loadDecksFromGitHub(
  owner: string,
  repo: string,
  branch: string = 'main'
): Promise<Deck[]> {
  const baseUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}`;
  
  try {
    const response = await fetch(`${baseUrl}/index.json`);
    const ids: string[] = await response.json();

    const decks: Deck[] = [];
    for (const id of ids) {
      const res = await fetch(`${baseUrl}/${id}.json`);
      if (res.ok) {
        decks.push(await res.json());
      }
    }

    return decks;
  } catch (error) {
    console.error('Failed to load from GitHub:', error);
    return [];
  }
}

// Uso:
// const decks = await loadDecksFromGitHub('seu-usuario', 'conversa-solta-decks');

export type { Deck };
