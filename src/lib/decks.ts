
export type QuestionKey = string;

export type Deck = {
  id: string;
  category: 'Social' | 'Personal' | 'Relationships' | 'Fun';
  tags: string[];
  questionKeys: QuestionKey[];
  featured?: boolean;
  image: string;
};

export const decks: Deck[] = [
  {
    id: 'icebreakers',
    category: 'Social',
    tags: ['getting to know you', 'lighthearted'],
    questionKeys: [
      'icebreakers-q1',
      'icebreakers-q2',
      'icebreakers-q3',
      'icebreakers-q4',
      'icebreakers-q5',
    ],
    featured: true,
    image: 'deck-icebreakers',
  },
  {
    id: 'deep-thoughts',
    category: 'Personal',
    tags: ['philosophy', 'introspection', 'serious'],
    questionKeys: [
      'deep-thoughts-q1',
      'deep-thoughts-q2',
      'deep-thoughts-q3',
      'deep-thoughts-q4',
      'deep-thoughts-q5',
    ],
    featured: true,
    image: 'deck-deep-thoughts',
  },
  {
    id: 'for-couples',
    category: 'Relationships',
    tags: ['love', 'partnership', 'intimacy'],
    questionKeys: [
      'for-couples-q1',
      'for-couples-q2',
      'for-couples-q3',
      'for-couples-q4',
      'for-couples-q5',
    ],
    featured: true,
    image: 'deck-couples',
  },
  {
    id: 'family-night',
    category: 'Social',
    tags: ['family', 'kids', 'fun'],
    questionKeys: [
      'family-night-q1',
      'family-night-q2',
      'family-night-q3',
      'family-night-q4',
      'family-night-q5',
    ],
    image: 'deck-family',
  },
  {
    id: 'team-builders',
    category: 'Social',
    tags: ['work', 'team', 'corporate'],
    questionKeys: [
      'team-builders-q1',
      'team-builders-q2',
      'team-builders-q3',
      'team-builders-q4',
      'team-builders-q5',
    ],
    image: 'deck-work',
  },
  {
    id: 'would-you-rather',
    category: 'Fun',
    tags: ['party', 'funny', 'choices'],
    questionKeys: [
      'would-you-rather-q1',
      'would-you-rather-q2',
      'would-you-rather-q3',
      'would-you-rather-q4',
      'would-you-rather-q5',
    ],
    featured: true,
    image: 'deck-funny',
  },
];

export const deckCategories = Array.from(new Set(decks.map(d => d.category)));
