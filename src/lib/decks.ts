
import { deploymentBasePath } from './site';

export type Deck = {
  id: string;
  title: string;
  description: string;
  category: 'Social' | 'Pessoal' | 'Relacionamentos' | 'Diversao';
  tags: string[];
  questions: Record<string, string>;
  featured?: boolean;
  image: string;
};

type DeckCategory = Deck['category'];

// Fallback decks in case JSON loading fails
const fallbackDecks: Deck[] = [
  {
    id: 'icebreakers',
    title: 'Quebra-gelo',
    description: 'Perfeito para comecar papo com gente nova sem ficar travado.',
    category: 'Social',
    tags: ['conhecer pessoas', 'leve', 'inicio'],
    questions: {
      "q1": "Se voce pudesse ter qualquer superpoder, qual seria e por que?",
      "q2": "Qual foi o melhor conselho que voce ja recebeu?",
      "q3": "Qual talento escondido voce tem?",
      "q4": "Se pudesse viajar para qualquer epoca da historia, para qual iria?",
      "q5": "Qual musica voce sempre escolheria no karaoke?"
    },
    featured: true,
    image: 'deck-icebreakers',
  },
  {
    id: 'deep-thoughts',
    title: 'Papo profundo',
    description: 'Para quando a conversa pede mais reflexao e menos superficie.',
    category: 'Pessoal',
    tags: ['filosofia', 'introspeccao', 'reflexao'],
    questions: {
      "q1": "O que significa viver uma boa vida para voce?",
      "q2": "Felicidade e uma escolha?",
      "q3": "Qual voce acha que e o proposito da humanidade?",
      "q4": "Em que voce acredita e muita gente discorda?",
      "q5": "Como voce define sucesso?"
    },
    featured: true,
    image: 'deck-deep-thoughts',
  },
  {
    id: 'for-couples',
    title: 'Entre nos dois',
    description: 'Perguntas para casal sair do automatico e se redescobrir.',
    category: 'Relacionamentos',
    tags: ['amor', 'parceria', 'intimidade'],
    questions: {
      "q1": "Qual memoria nossa voce gosta de revisitar?",
      "q2": "De que maneiras voce acha que crescemos juntos?",
      "q3": "O que eu posso fazer para voce se sentir mais amado?",
      "q4": "Qual meta futura voce mais quer conquistar comigo?",
      "q5": "Descreva um momento em que voce se sentiu orgulhoso de mim."
    },
    featured: true,
    image: 'deck-couples',
  },
  {
    id: 'family-night',
    title: 'Noite em familia',
    description: 'Perguntas leves e divertidas para todo mundo participar.',
    category: 'Social',
    tags: ['familia', 'criancas', 'diversao'],
    questions: {
      "q1": "Qual foi a melhor parte do seu dia?",
      "q2": "Se nossa familia fosse um time de super-herois, qual seria o nome?",
      "q3": "Qual regra voce criaria para a nossa familia por um dia?",
      "q4": "Qual tradicao da familia voce mais gosta?",
      "q5": "Se pudesse planejar as ferias perfeitas em familia, para onde iriamos?"
    },
    image: 'deck-family',
  },
  {
    id: 'team-builders',
    title: 'Time sem script',
    description: 'Perguntas para aproximar colegas e tirar o papo do automatico.',
    category: 'Social',
    tags: ['trabalho', 'time', 'empresa'],
    questions: {
      "q1": "Qual habilidade profissional voce esta tentando desenvolver agora?",
      "q2": "Com quem da empresa voce trocaria de funcao por um dia?",
      "q3": "Qual foi a licao mais importante da sua carreira ate aqui?",
      "q4": "Como e um dia de trabalho realmente produtivo para voce?",
      "q5": "O que poderia melhorar a colaboracao do nosso time?"
    },
    image: 'deck-work',
  },
  {
    id: 'would-you-rather',
    title: 'O que voce prefere?',
    description: 'Escolhas absurdas, engracadas e capazes de render um papo otimo.',
    category: 'Diversao',
    tags: ['festa', 'engracado', 'escolhas'],
    questions: {
        "q1": "Voce preferiria voar ou ficar invisivel?",
        "q2": "Voce preferiria viver sem musica ou sem filmes?",
        "q3": "Voce preferiria saber todos os segredos do universo ou ter riqueza ilimitada?",
        "q4": "Voce preferiria falar com animais ou dominar todas as linguas humanas?",
        "q5": "Voce preferiria ter um chef particular ou um motorista particular?"
    },
    featured: true,
    image: 'deck-funny',
  },
];

// Cache for loaded decks
let cachedDecks: Deck[] | null = null;

function getDecksBaseUrl(baseUrl?: string): string {
  if (baseUrl) {
    return baseUrl.replace(/\/$/, '');
  }

  return `${deploymentBasePath}/decks`;
}

async function loadDecksFromFilesystem(): Promise<Deck[]> {
  const [{ readFile }, path] = await Promise.all([
    import('node:fs/promises'),
    import('node:path'),
  ]);
  const decksDir = path.join(process.cwd(), 'public', 'decks');
  const indexPath = path.join(decksDir, 'index.json');
  const indexContent = await readFile(indexPath, 'utf-8');
  const deckIds = JSON.parse(indexContent) as string[];

  const loadedDecks = await Promise.all(
    deckIds.map(async (deckId) => {
      const deckPath = path.join(decksDir, `${deckId}.json`);
      const deckContent = await readFile(deckPath, 'utf-8');
      return JSON.parse(deckContent) as Deck;
    })
  );

  return loadedDecks;
}

async function loadDecksFromHttp(baseUrl?: string): Promise<Deck[]> {
  const decksBaseUrl = getDecksBaseUrl(baseUrl);
  const response = await fetch(`${decksBaseUrl}/index.json`, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`Failed to load deck index from ${decksBaseUrl}`);
  }

  const deckIds: string[] = await response.json();
  const deckResponses = await Promise.all(
    deckIds.map(async (deckId) => {
      const deckResponse = await fetch(`${decksBaseUrl}/${deckId}.json`, { cache: 'no-store' });
      if (!deckResponse.ok) {
        return null;
      }

      return (await deckResponse.json()) as Deck;
    })
  );

  return deckResponses.filter((deck): deck is Deck => deck !== null);
}

/**
 * Load decks from JSON files in /public/decks/
 * Can be used in browser (fetch) or during build/server rendering (fs)
 */
export async function loadDecks(baseUrl?: string): Promise<Deck[]> {
  if (!baseUrl && cachedDecks) {
    return cachedDecks;
  }

  try {
    const loadedDecks =
      typeof window === 'undefined' && !baseUrl
        ? await loadDecksFromFilesystem()
        : await loadDecksFromHttp(baseUrl);

    if (loadedDecks.length > 0) {
      if (!baseUrl) {
        cachedDecks = loadedDecks;
      }
      return loadedDecks;
    }
  } catch (error) {
    console.warn('Failed to load decks from JSON, using fallback:', error);
  }

  // Fallback to hardcoded decks
  if (!baseUrl) {
    cachedDecks = fallbackDecks;
  }
  return fallbackDecks;
}

/**
 * Get decks - synchronous for initial load, uses fallback
 */
export const decks: Deck[] = fallbackDecks;

/**
 * Get or load decks - prefer using loadDecks() in components
 */
export async function getDecks(): Promise<Deck[]> {
  return loadDecks();
}

/**
 * Get a single deck by ID
 */
export async function getDeckById(id: string): Promise<Deck | undefined> {
  const allDecks = await loadDecks();
  return allDecks.find(deck => deck.id === id);
}

/**
 * Get all unique categories from loaded decks
 */
export async function getDeckCategories(): Promise<DeckCategory[]> {
  const allDecks = await loadDecks();
  return Array.from(new Set(allDecks.map(d => d.category)));
}

// Export categories from fallback for immediate use (non-async)
export const deckCategories: DeckCategory[] = Array.from(new Set(fallbackDecks.map(d => d.category)));
