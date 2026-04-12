
export type Deck = {
  id: string;
  title: string;
  description: string;
  category: 'Social' | 'Personal' | 'Relationships' | 'Fun';
  tags: string[];
  questions: Record<string, string>;
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
    questions: {
      "q1": "If you could have any superpower, what would it be and why?",
      "q2": "What’s the best piece of advice you’ve ever received?",
      "q3": "What’s a hidden talent you have?",
      "q4": "If you could travel to any period in history, when would you go?",
      "q5": "What’s your go-to karaoke song?"
    },
    featured: true,
    image: 'deck-icebreakers',
  },
  {
    id: 'deep-thoughts',
    title: 'Deep Thoughts',
    description: 'For when you want to get philosophical.',
    category: 'Personal',
    tags: ['philosophy', 'introspection', 'serious'],
    questions: {
      "q1": "What does it mean to live a good life?",
      "q2": "Is happiness a choice?",
      "q3": "What do you think is the purpose of humanity?",
      "q4": "What is a belief you hold with which many people disagree?",
      "q5": "How do you define success?"
    },
    featured: true,
    image: 'deck-deep-thoughts',
  },
  {
    id: 'for-couples',
    title: 'For Couples',
    description: 'Strengthen your bond and learn more about each other.',
    category: 'Relationships',
    tags: ['love', 'partnership', 'intimacy'],
    questions: {
      "q1": "What is one of your favorite memories of us?",
      "q2": "In what ways have we grown together?",
      "q3": "What is something I can do to make you feel more loved?",
      "q4": "What future goal are you most excited to achieve with me?",
      "q5": "Describe a moment you felt proud of me."
    },
    featured: true,
    image: 'deck-couples',
  },
  {
    id: 'family-night',
    title: 'Family Night',
    description: 'Fun questions for all ages.',
    category: 'Social',
    tags: ['family', 'kids', 'fun'],
    questions: {
      "q1": "What was the best part of your day?",
      "q2": "If our family was a team of superheroes, what would our name be?",
      "q3": "What’s one rule you would make for our family for a day?",
      "q4": "What’s your favorite family tradition?",
      "q5": "If you could plan a perfect family vacation, where would we go?"
    },
    image: 'deck-family',
  },
  {
    id: 'team-builders',
    title: 'Team Builders',
    description: 'Get to know your coworkers on a new level.',
    category: 'Social',
    tags: ['work', 'team', 'corporate'],
    questions: {
      "q1": "What’s one professional skill you’re currently working on?",
      "q2": "Who in the company would you most like to swap jobs with for a day?",
      "q3": "What’s the most important lesson you’ve learned in your career?",
      "q4": "What does a productive day at work look like for you?",
      "q5": "What’s one thing that could improve our team’s collaboration?"
    },
    image: 'deck-work',
  },
  {
    id: 'would-you-rather',
    title: 'Would You Rather?',
    description: 'Hilarious and thought-provoking choices.',
    category: 'Fun',
    tags: ['party', 'funny', 'choices'],
    questions: {
        "q1": "Would you rather have the ability to fly or to be invisible?",
        "q2": "Would you rather live without music or without movies?",
        "q3": "Would you rather know all the secrets of the universe or have unlimited wealth?",
        "q4": "Would you rather be able to talk to animals or speak every human language?",
        "q5": "Would you rather have a personal chef or a personal driver?"
    },
    featured: true,
    image: 'deck-funny',
  },
];

export const deckCategories = Array.from(new Set(decks.map(d => d.category)));

// This is no longer needed as titles, descriptions, and questions are in the main decks array.
// export type QuestionKey = string;
// export const deckTranslations: Record<string, { title: string; description: string; questions: Record<QuestionKey, string> }> = {};
