export type Question = string;

export type Deck = {
  id: string;
  title: string;
  description: string;
  category: 'Social' | 'Personal' | 'Relationships' | 'Fun';
  tags: string[];
  questions: Question[];
  featured?: boolean;
  image: string;
};

export const decks: Deck[] = [
  {
    id: 'icebreakers',
    title: 'Icebreakers',
    description: 'Perfect for new friends or colleagues.',
    category: 'Social',
    tags: ['getting to know you', 'lighthearted'],
    questions: [
      'If you could have any superpower, what would it be and why?',
      'What’s the best piece of advice you’ve ever received?',
      'What’s a hidden talent you have?',
      'If you could travel to any period in history, when would you go?',
      'What’s your go-to karaoke song?',
    ],
    featured: true,
    image: 'deck-icebreakers',
  },
  {
    id: 'deep-thoughts',
    title: 'Deep Thoughts',
    description: 'For when you want to get philosophical.',
    category: 'Personal',
    tags: ['philosophy', 'introspection', 'serious'],
    questions: [
      'What does it mean to live a good life?',
      'Is happiness a choice?',
      'What do you think is the purpose of humanity?',
      'What is a belief you hold with which many people disagree?',
      'How do you define success?',
    ],
    featured: true,
    image: 'deck-deep-thoughts',
  },
  {
    id: 'for-couples',
    title: 'For Couples',
    description: 'Strengthen your bond and learn more about each other.',
    category: 'Relationships',
    tags: ['love', 'partnership', 'intimacy'],
    questions: [
      'What is one of your favorite memories of us?',
      'In what ways have we grown together?',
      'What is something I can do to make you feel more loved?',
      'What future goal are you most excited to achieve with me?',
      'Describe a moment you felt proud of me.',
    ],
    featured: true,
    image: 'deck-couples',
  },
  {
    id: 'family-night',
    title: 'Family Night',
    description: 'Fun questions for all ages.',
    category: 'Social',
    tags: ['family', 'kids', 'fun'],
    questions: [
      'What was the best part of your day?',
      'If our family was a team of superheroes, what would our name be?',
      'What’s one rule you would make for our family for a day?',
      'What’s your favorite family tradition?',
      'If you could plan a perfect family vacation, where would we go?',
    ],
    image: 'deck-family',
  },
  {
    id: 'team-builders',
    title: 'Team Builders',
    description: 'Get to know your coworkers on a new level.',
    category: 'Social',
    tags: ['work', 'team', 'corporate'],
    questions: [
      'What’s one professional skill you’re currently working on?',
      'Who in the company would you most like to swap jobs with for a day?',
      'What’s the most important lesson you’ve learned in your career?',
      'What does a productive day at work look like for you?',
      'What’s one thing that could improve our team’s collaboration?',
    ],
    image: 'deck-work',
  },
  {
    id: 'would-you-rather',
    title: 'Would You Rather?',
    description: 'Hilarious and thought-provoking choices.',
    category: 'Fun',
    tags: ['party', 'funny', 'choices'],
    questions: [
      'Would you rather have the ability to fly or to be invisible?',
      'Would you rather live without music or without movies?',
      'Would you rather know all the secrets of the universe or have unlimited wealth?',
      'Would you rather be able to talk to animals or speak every human language?',
      'Would you rather have a personal chef or a personal driver?',
    ],
    featured: true,
    image: 'deck-funny',
  },
];

export const deckCategories = Array.from(new Set(decks.map(d => d.category)));
