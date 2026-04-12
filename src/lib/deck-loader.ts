/**
 * Deck Loader Utilities
 * Helpers para carregar, validar e gerenciar decks
 */

import { Deck } from './decks';

interface DeckValidationError {
  field: string;
  message: string;
}

const VALID_CATEGORIES = ['Social', 'Pessoal', 'Relacionamentos', 'Diversao'];

/**
 * Valida se um deck JSON está no formato correto
 */
export function validateDeck(data: unknown): {
  valid: boolean;
  errors: DeckValidationError[];
} {
  const errors: DeckValidationError[] = [];

  if (!data || typeof data !== 'object') {
    return {
      valid: false,
      errors: [{ field: 'root', message: 'Deck deve ser um objeto' }],
    };
  }

  const deck = data as Record<string, unknown>;

  // Validar campos obrigatórios
  if (!deck.id || typeof deck.id !== 'string') {
    errors.push({ field: 'id', message: 'ID é obrigatório e deve ser uma string' });
  } else if (!/^[a-z0-9-]+$/.test(deck.id)) {
    errors.push({
      field: 'id',
      message: 'ID deve conter apenas letras minúsculas, números e hífens',
    });
  }

  if (!deck.title || typeof deck.title !== 'string') {
    errors.push({ field: 'title', message: 'Título é obrigatório' });
  }

  if (!deck.description || typeof deck.description !== 'string') {
    errors.push({ field: 'description', message: 'Descrição é obrigatória' });
  }

  if (!VALID_CATEGORIES.includes(deck.category as string)) {
    errors.push({
      field: 'category',
      message: `Categoria deve ser uma de: ${VALID_CATEGORIES.join(', ')}`,
    });
  }

  if (!Array.isArray(deck.tags)) {
    errors.push({ field: 'tags', message: 'Tags deve ser um array' });
  }

  if (!deck.questions || typeof deck.questions !== 'object') {
    errors.push({ field: 'questions', message: 'Questions é obrigatório e deve ser um objeto' });
  } else {
    const questions = deck.questions as Record<string, unknown>;
    if (Object.keys(questions).length === 0) {
      errors.push({
        field: 'questions',
        message: 'Deve haver pelo menos uma pergunta (q1, q2, ...)',
      });
    }

    for (const [key, value] of Object.entries(questions)) {
      if (typeof value !== 'string') {
        errors.push({
          field: `questions.${key}`,
          message: 'Todas as perguntas devem ser strings',
        });
      }
    }
  }

  if (!deck.image || typeof deck.image !== 'string') {
    errors.push({ field: 'image', message: 'Image é obrigatório' });
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Parse e valida um JSON de deck
 */
export function parseDeck(json: string): Deck | null {
  try {
    const data = JSON.parse(json);
    const validation = validateDeck(data);

    if (!validation.valid) {
      console.error('Validation errors:', validation.errors);
      return null;
    }

    return data as Deck;
  } catch (error) {
    console.error('Failed to parse deck JSON:', error);
    return null;
  }
}

/**
 * Gera um template de deck em JSON format
 */
export function generateDeckTemplate(
  id: string,
  category: Deck['category'] = 'Social'
): string {
  const template: Partial<Deck> = {
    id,
    title: 'Your Deck Title',
    description: 'Brief description here',
    category,
    tags: ['tag1', 'tag2'],
    questions: {
      q1: 'Question 1?',
      q2: 'Question 2?',
      q3: 'Question 3?',
      q4: 'Question 4?',
      q5: 'Question 5?',
    },
    featured: false,
    image: `deck-${id}`,
  };

  return JSON.stringify(template, null, 2);
}

/**
 * Filtra decks por categoria
 */
export function filterDecksByCategory(decks: Deck[], category: Deck['category']): Deck[] {
  return decks.filter(deck => deck.category === category);
}

/**
 * Filtra decks por tags
 */
export function filterDecksByTags(decks: Deck[], tags: string[]): Deck[] {
  const normalizedTags = tags.map((tag) => tag.toLowerCase());

  return decks.filter((deck) => {
    const searchableTags = deck.searchableTags ?? deck.tags.map((tag) => tag.toLowerCase());
    return normalizedTags.some((tag) => searchableTags.includes(tag));
  });
}

/**
 * Ordena decks por featured primeiro, depois por título
 */
export function sortDecksByFeatured(decks: Deck[]): Deck[] {
  return [...decks].sort((a, b) => {
    if (a.featured !== b.featured) {
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    }
    return a.title.localeCompare(b.title);
  });
}

/**
 * Conta perguntas em um deck
 */
export function countQuestions(deck: Deck): number {
  return Object.keys(deck.questions).length;
}
