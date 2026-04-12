
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

export const decks: Deck[] = [
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

export const deckCategories = Array.from(new Set(decks.map(d => d.category)));

// This is no longer needed as titles, descriptions, and questions are in the main decks array.
// export type QuestionKey = string;
// export const deckTranslations: Record<string, { title: string; description: string; questions: Record<QuestionKey, string> }> = {};
