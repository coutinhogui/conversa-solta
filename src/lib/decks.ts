
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

export const deckTranslations: Record<string, { title: string; description: string; questions: Record<QuestionKey, string> }> = {
  "icebreakers": {
    "title": "Icebreakers",
    "description": "Perfect for new friends or colleagues.",
    "questions": {
      "icebreakers-q1": "If you could have any superpower, what would it be and why?",
      "icebreakers-q2": "What’s the best piece of advice you’ve ever received?",
      "icebreakers-q3": "What’s a hidden talent you have?",
      "icebreakers-q4": "If you could travel to any period in history, when would you go?",
      "icebreakers-q5": "What’s your go-to karaoke song?"
    }
  },
  "deep-thoughts": {
    "title": "Deep Thoughts",
    "description": "For when you want to get philosophical.",
    "questions": {
      "deep-thoughts-q1": "What does it mean to live a good life?",
      "deep-thoughts-q2": "Is happiness a choice?",
      "deep-thoughts-q3": "What do you think is the purpose of humanity?",
      "deep-thoughts-q4": "What is a belief you hold with which many people disagree?",
      "deep-thoughts-q5": "How do you define success?"
    }
  },
  "for-couples": {
    "title": "For Couples",
    "description": "Strengthen your bond and learn more about each other.",
    "questions": {
      "for-couples-q1": "What is one of your favorite memories of us?",
      "for-couples-q2": "In what ways have we grown together?",
      "for-couples-q3": "What is something I can do to make you feel more loved?",
      "for-couples-q4": "What future goal are you most excited to achieve with me?",
      "for-couples-q5": "Describe a moment you felt proud of me."
    }
  },
  "family-night": {
    "title": "Family Night",
    "description": "Fun questions for all ages.",
    "questions": {
      "family-night-q1": "What was the best part of your day?",
      "family-night-q2": "If our family was a team of superheroes, what would our name be?",
      "family-night-q3": "What’s one rule you would make for our family for a day?",
      "family-night-q4": "What’s your favorite family tradition?",
      "family-night-q5": "If you could plan a perfect family vacation, where would we go?"
    }
  },
  "team-builders": {
    "title": "Team Builders",
    "description": "Get to know your coworkers on a new level.",
    "questions": {
      "team-builders-q1": "What’s one professional skill you’re currently working on?",
      "team-builders-q2": "Who in the company would you most like to swap jobs with for a day?",
      "team-builders-q3": "What’s the most important lesson you’ve learned in your career?",
      "team-builders-q4": "What does a productive day at work look like for you?",
      "team-builders-q5": "What’s one thing that could improve our team’s collaboration?"
    }
  },
  "would-you-rather": {
    "title": "Would You Rather?",
    "description": "Hilarious and thought-provoking choices.",
    "questions": {
      "would-you-rather-q1": "Would you rather have the ability to fly or to be invisible?",
      "would-you-rather-q2": "Would you rather live without music or without movies?",
      "would-you-rather-q3": "Would you rather know all the secrets of the universe or have unlimited wealth?",
      "would-you-rather-q4": "Would you rather be able to talk to animals or speak every human language?",
      "would-you-rather-q5": "Would you rather have a personal chef or a personal driver?"
    }
  }
};
