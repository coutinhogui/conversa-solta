import { PlaceHolderImages } from './placeholder-images';

type DeckCategory = 'Social' | 'Pessoal' | 'Relacionamentos' | 'Diversao';

type DeckLike = {
  id: string;
  title: string;
  description: string;
  category: DeckCategory;
  tags: string[];
  questions: Record<string, string>;
  featured?: boolean;
  image: string;
};

export type DeckImageMeta = {
  imageUrl: string;
  imageHint: string;
  imageDescription: string;
};

export type DeckTaxonomy = {
  categoryLabel: string;
  categoryDescription: string;
  subcategory: string;
  subcategoryDescription: string;
  audience: string;
  tone: string;
};

export type DeckMetadata = {
  imageMeta: DeckImageMeta;
  taxonomy: DeckTaxonomy;
  smartTags: string[];
  searchableTags: string[];
  questionCount: number;
};

type TaxonomyRule = {
  label: string;
  description: string;
  audience: string;
  tone: string;
  keywords: string[];
  derivedTags: string[];
};

type TaxonomyConfig = {
  label: string;
  description: string;
  fallback: TaxonomyRule;
  rules: TaxonomyRule[];
};

const CATEGORY_COPY: Record<
  DeckCategory,
  TaxonomyConfig
> = {
  Social: {
    label: 'Social',
    description: 'Temas para grupo, reencontro e conversa leve fora do automatico.',
    fallback: {
      label: 'Conexoes leves',
      description: 'Temas sociais abertos para puxar conversa em qualquer roda.',
      audience: 'grupo',
      tone: 'quebra-gelo',
      keywords: [],
      derivedTags: ['grupo', 'conversa leve'],
    },
    rules: [
      {
        label: 'Amizades e reencontros',
        description: 'Memorias, afinidade e papo de quem ja dividiu alguma historia.',
        audience: 'amigos',
        tone: 'nostalgico',
        keywords: ['amigo', 'amizade', 'infancia', 'reencontro', 'turma', 'vizinhanca'],
        derivedTags: ['amizade', 'reencontro', 'nostalgia'],
      },
      {
        label: 'Trabalho e networking',
        description: 'Conversas para colegas, networking e ambientes mais profissionais.',
        audience: 'colegas',
        tone: 'humano',
        keywords: ['colega', 'networking', 'startup', 'trabalho', 'cafe', 'criativo', 'faculdade'],
        derivedTags: ['networking', 'trabalho', 'time'],
      },
      {
        label: 'Eventos e casa cheia',
        description: 'Temas para mesa grande, festa, bar e encontros mais soltos.',
        audience: 'grupo grande',
        tone: 'descontraido',
        keywords: ['festa', 'evento', 'bar', 'happy hour', 'almoco', 'casa cheia', 'domingo'],
        derivedTags: ['evento', 'grupo', 'descontracao'],
      },
      {
        label: 'Hobbies e comunidades',
        description: 'Ponto de partida para clubes, fandoms, hobbies e interesses em comum.',
        audience: 'comunidades',
        tone: 'curioso',
        keywords: ['clube', 'filme', 'livro', 'esporte', 'torcida', 'curiosa', 'curioso'],
        derivedTags: ['hobbies', 'interesses em comum', 'comunidade'],
      },
      {
        label: 'Viagens e contextos de vida',
        description: 'Temas sociais ligados a deslocamento, cidade, familia e novas fases.',
        audience: 'grupos mistos',
        tone: 'espontaneo',
        keywords: ['viagem', 'ferias', 'viajante', 'cidade', 'familia'],
        derivedTags: ['viagem', 'historia de vida', 'descoberta'],
      },
    ],
  },
  Pessoal: {
    label: 'Pessoal',
    description: 'Temas para reflexao, crescimento e leitura mais honesta de si.',
    fallback: {
      label: 'Reflexao pessoal',
      description: 'Perguntas de auto-observacao para sair da superficie.',
      audience: 'individual ou dupla',
      tone: 'reflexivo',
      keywords: [],
      derivedTags: ['reflexao', 'autoconhecimento'],
    },
    rules: [
      {
        label: 'Autoconhecimento',
        description: 'Identidade, valores, verdades internas e leituras de si.',
        audience: 'individual ou dupla',
        tone: 'introspectivo',
        keywords: ['verdades', 'identidade', 'autoconhecimento', 'valor', 'essencia'],
        derivedTags: ['autoconhecimento', 'identidade', 'verdade'],
      },
      {
        label: 'Emocional e maturidade',
        description: 'Perguntas sobre regulacao emocional, limites internos e maturidade.',
        audience: 'adultos',
        tone: 'honesto',
        keywords: ['emocional', 'maturidade', 'trabalho interno', 'cura', 'disciplina'],
        derivedTags: ['emocional', 'maturidade', 'trabalho interno'],
      },
      {
        label: 'Carreira e rotina',
        description: 'Vida pratica, trabalho, ritmo e construcao de habitos.',
        audience: 'adultos',
        tone: 'pragmatico',
        keywords: ['carreira', 'trabalho', 'rotina', 'produtividade', 'habito'],
        derivedTags: ['rotina', 'carreira', 'habitos'],
      },
      {
        label: 'Mudanca e coragem',
        description: 'Temas para transicoes, decisoes e coragem para se reposicionar.',
        audience: 'adultos',
        tone: 'desafiador',
        keywords: ['mudanca', 'coragem', 'risco', 'recomecar', 'escolha'],
        derivedTags: ['mudanca', 'coragem', 'decisao'],
      },
    ],
  },
  Relacionamentos: {
    label: 'Relacionamentos',
    description: 'Temas para casal, construcao afetiva e conversas delicadas com profundidade.',
    fallback: {
      label: 'Conexao a dois',
      description: 'Perguntas para fortalecer presenca, clareza e parceria.',
      audience: 'casal',
      tone: 'intimo',
      keywords: [],
      derivedTags: ['casal', 'conexao', 'parceria'],
    },
    rules: [
      {
        label: 'Inicio da relacao',
        description: 'Fase inicial, descoberta, definicao de ritmo e ajuste de expectativa.',
        audience: 'casal',
        tone: 'delicado',
        keywords: ['primeiros meses', 'namoro', 'inicio', 'reconquista'],
        derivedTags: ['inicio', 'descoberta', 'namoro'],
      },
      {
        label: 'Confianca e seguranca',
        description: 'Ciúmes, respeito, seguranca emocional e base de confianca.',
        audience: 'casal',
        tone: 'sensivel',
        keywords: ['ciumes', 'seguranca', 'confianca', 'respeito'],
        derivedTags: ['confianca', 'seguranca', 'respeito'],
      },
      {
        label: 'Comunicacao e conflitos',
        description: 'Conflitos, conversa dificil, limites e clareza sem desgaste extra.',
        audience: 'casal',
        tone: 'franco',
        keywords: ['comunicacao', 'conflitos', 'limites', 'clara'],
        derivedTags: ['comunicacao', 'conflito', 'limites'],
      },
      {
        label: 'Intimidade e afeto',
        description: 'Desejo, proximidade, linguagens do afeto e intimidade emocional.',
        audience: 'casal',
        tone: 'intimo',
        keywords: ['intimidade', 'desejo', 'afeto', 'proximidade', 'linguagens'],
        derivedTags: ['intimidade', 'afeto', 'proximidade'],
      },
      {
        label: 'Vida a dois',
        description: 'Rotina, parceria, dinheiro, rituais e o futuro pratico do casal.',
        audience: 'casal',
        tone: 'maduro',
        keywords: ['dinheiro', 'rituais', 'rotina', 'planos', 'parceria', 'recem casados', 'casados'],
        derivedTags: ['vida a dois', 'parceria', 'futuro'],
      },
      {
        label: 'Contextos delicados',
        description: 'Distancia, familias, saudade, reparacao e temas mais sensiveis.',
        audience: 'casal',
        tone: 'cuidadoso',
        keywords: ['distancia', 'familia', 'familias', 'saudade', 'cura'],
        derivedTags: ['distancia', 'familia', 'cuidado'],
      },
    ],
  },
  Diversao: {
    label: 'Diversao',
    description: 'Temas absurdos, leves ou improvisados para destravar o riso.',
    fallback: {
      label: 'Improviso e leveza',
      description: 'Perguntas para brincar, reagir rapido e manter a energia alta.',
      audience: 'qualquer grupo',
      tone: 'leve',
      keywords: [],
      derivedTags: ['leve', 'improviso'],
    },
    rules: [
      {
        label: 'Escolhas absurdas',
        description: 'Dilemas improvaveis, comparacoes engracadas e resposta rapida.',
        audience: 'qualquer grupo',
        tone: 'caotico',
        keywords: ['prefere', 'escolhas', 'absurdo', 'would you rather'],
        derivedTags: ['escolhas', 'absurdo', 'humor'],
      },
    ],
  },
};

const TECHNICAL_TAG_PATTERNS = [/^colecao-/, /^serie-\d+$/];

const CATEGORY_COLORS: Record<DeckCategory, [string, string, string]> = {
  Social: ['#f97316', '#facc15', '#1f2937'],
  Pessoal: ['#14b8a6', '#99f6e4', '#0f172a'],
  Relacionamentos: ['#ef4444', '#f9a8d4', '#3f1d2e'],
  Diversao: ['#8b5cf6', '#60a5fa', '#111827'],
};

function normalizeText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function slugToLabel(value: string): string {
  return value
    .split(/[\s-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function compactLabel(value: string): string {
  return value
    .split(/\s+/)
    .slice(0, 3)
    .join(' ');
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function isTechnicalTag(tag: string): boolean {
  return TECHNICAL_TAG_PATTERNS.some((pattern) => pattern.test(tag));
}

function uniqueLabels(values: string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const value of values) {
    const trimmed = value.trim();
    if (!trimmed) {
      continue;
    }

    const normalized = normalizeText(trimmed);
    if (seen.has(normalized)) {
      continue;
    }

    seen.add(normalized);
    result.push(trimmed);
  }

  return result;
}

function buildTitleTokens(deck: DeckLike): string[] {
  return `${deck.title} ${deck.id}`
    .split(/[^a-zA-Z0-9]+/)
    .map((token) => token.trim())
    .filter((token) => token.length > 2)
    .map((token) => slugToLabel(token.toLowerCase()));
}

function scoreRule(haystack: string, rule: TaxonomyRule): number {
  return rule.keywords.reduce((score, keyword) => {
    return haystack.includes(normalizeText(keyword)) ? score + 1 : score;
  }, 0);
}

function pickTaxonomy(deck: DeckLike): DeckTaxonomy {
  const categoryConfig = CATEGORY_COPY[deck.category];
  const haystack = normalizeText(
    [deck.id, deck.title, deck.description, ...deck.tags].join(' ')
  );

  let bestRule = categoryConfig.fallback;
  let bestScore = 0;

  for (const rule of categoryConfig.rules) {
    const score = scoreRule(haystack, rule);
    if (score > bestScore) {
      bestRule = rule;
      bestScore = score;
    }
  }

  return {
    categoryLabel: categoryConfig.label,
    categoryDescription: categoryConfig.description,
    subcategory: bestRule.label,
    subcategoryDescription: bestRule.description,
    audience: bestRule.audience,
    tone: bestRule.tone,
  };
}

function splitTitle(title: string): [string, string] {
  const words = title.split(/\s+/);
  if (words.length <= 2) {
    return [title, ''];
  }

  const middle = Math.ceil(words.length / 2);
  return [words.slice(0, middle).join(' '), words.slice(middle).join(' ')];
}

function buildGeneratedCover(deck: DeckLike, taxonomy: DeckTaxonomy): DeckImageMeta {
  const [lineOne, lineTwo] = splitTitle(deck.title);
  const [primary, secondary, ink] = CATEGORY_COLORS[deck.category];
  const safeTitle = escapeXml(deck.title);
  const safeLineOne = escapeXml(lineOne);
  const safeLineTwo = escapeXml(lineTwo);
  const safeCategory = escapeXml(taxonomy.categoryLabel.toUpperCase());
  const safeSubcategory = escapeXml(compactLabel(taxonomy.subcategory));
  const safeMeta = escapeXml(`${compactLabel(taxonomy.audience)}  |  ${compactLabel(taxonomy.tone)}`);
  const safeDescription = escapeXml(deck.description);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800" role="img" aria-label="${safeTitle}">
      <defs>
        <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="${primary}" />
          <stop offset="100%" stop-color="${secondary}" />
        </linearGradient>
      </defs>
      <rect width="1200" height="800" fill="url(#bg)" rx="48" />
      <circle cx="1010" cy="140" r="170" fill="rgba(255,255,255,0.12)" />
      <circle cx="155" cy="680" r="210" fill="rgba(255,255,255,0.08)" />
      <rect x="72" y="68" width="1056" height="664" rx="36" fill="rgba(17,24,39,0.16)" stroke="rgba(255,255,255,0.18)" />
      <text x="120" y="150" fill="white" font-family="Trebuchet MS, Arial, sans-serif" font-size="30" letter-spacing="3">${safeCategory}</text>
      <text x="120" y="220" fill="${ink}" font-family="Georgia, serif" font-size="74" font-weight="700">${safeLineOne}</text>
      ${lineTwo ? `<text x="120" y="300" fill="${ink}" font-family="Georgia, serif" font-size="74" font-weight="700">${safeLineTwo}</text>` : ''}
      <text x="120" y="404" fill="rgba(255,255,255,0.92)" font-family="Trebuchet MS, Arial, sans-serif" font-size="34">${safeSubcategory}</text>
      <text x="120" y="462" fill="rgba(255,255,255,0.82)" font-family="Trebuchet MS, Arial, sans-serif" font-size="24">${safeMeta}</text>
      <text x="120" y="614" fill="rgba(255,255,255,0.9)" font-family="Trebuchet MS, Arial, sans-serif" font-size="28">${safeDescription}</text>
    </svg>
  `.trim();

  return {
    imageUrl: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
    imageHint: normalizeText(`${deck.category} ${taxonomy.subcategory} ${taxonomy.tone}`),
    imageDescription: `${deck.title} - ${taxonomy.subcategory}`,
  };
}

function resolveImage(deck: DeckLike, taxonomy: DeckTaxonomy): DeckImageMeta {
  const existing = PlaceHolderImages.find((image) => image.id === deck.image);
  if (existing) {
    return {
      imageUrl: existing.imageUrl,
      imageHint: existing.imageHint,
      imageDescription: existing.description,
    };
  }

  return buildGeneratedCover(deck, taxonomy);
}

function buildSmartTags(deck: DeckLike, taxonomy: DeckTaxonomy): { smartTags: string[]; searchableTags: string[] } {
  const rawTags = deck.tags.filter((tag) => !isTechnicalTag(tag));
  const categoryConfig = CATEGORY_COPY[deck.category];
  const rule =
    categoryConfig.rules.find((item) => item.label === taxonomy.subcategory) ?? categoryConfig.fallback;

  const visibleTags = uniqueLabels([
    ...rawTags.map((tag) => slugToLabel(tag)),
    taxonomy.subcategory,
    taxonomy.audience,
    taxonomy.tone,
    ...rule.derivedTags.map((tag) => slugToLabel(tag)),
  ]).filter((tag) => normalizeText(tag) !== normalizeText(categoryConfig.label));

  const searchableTags = uniqueLabels([
    ...visibleTags,
    ...deck.tags,
    ...buildTitleTokens(deck),
    deck.category,
    taxonomy.categoryLabel,
    taxonomy.subcategory,
    taxonomy.audience,
    taxonomy.tone,
  ]).map((tag) => normalizeText(tag));

  return {
    smartTags: visibleTags.slice(0, 4),
    searchableTags,
  };
}

export function enrichDeck<T extends DeckLike>(deck: T): T & DeckMetadata {
  const taxonomy = pickTaxonomy(deck);
  const { smartTags, searchableTags } = buildSmartTags(deck, taxonomy);

  return {
    ...deck,
    imageMeta: resolveImage(deck, taxonomy),
    taxonomy,
    smartTags,
    searchableTags,
    questionCount: Object.keys(deck.questions).length,
  };
}

export function enrichDecks<T extends DeckLike>(decks: T[]): Array<T & DeckMetadata> {
  return decks.map((deck) => enrichDeck(deck));
}
