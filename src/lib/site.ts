export type TranslationLanguage = {
  code: string;
  label: string;
};

const commonLanguages: TranslationLanguage[] = [
  { code: 'pt', label: 'Portugues (original)' },
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Espanol' },
  { code: 'fr', label: 'Francais' },
  { code: 'de', label: 'Deutsch' },
  { code: 'it', label: 'Italiano' },
  { code: 'ja', label: 'Japanese' },
  { code: 'ko', label: 'Korean' },
  { code: 'zh-CN', label: 'Chinese (Simplified)' },
  { code: 'ar', label: 'Arabic' },
  { code: 'hi', label: 'Hindi' },
  { code: 'ru', label: 'Russian' },
];

const extendedLanguages: TranslationLanguage[] = [
  { code: 'nl', label: 'Nederlands' },
  { code: 'pl', label: 'Polish' },
  { code: 'sv', label: 'Swedish' },
  { code: 'tr', label: 'Turkish' },
  { code: 'uk', label: 'Ukrainian' },
  { code: 'id', label: 'Indonesian' },
  { code: 'vi', label: 'Vietnamese' },
  { code: 'th', label: 'Thai' },
];

export const siteConfig = {
  name: 'Conversa Solta',
  shortName: 'Conversa',
  locale: 'pt-BR',
  sourceLanguage: 'pt',
  description:
    'Perguntas e assuntos para quebrar o gelo, puxar papo e destravar conversas improvaveis.',
  favoriteStorageKey: 'conversa-solta-favorites',
  legacyFavoriteStorageKey: 'shuffle-talks-favorites',
  navigation: [
    { title: 'Inicio', href: '/' },
    { title: 'Temas', href: '/decks' },
    { title: 'Favoritos', href: '/favorites' },
    { title: 'Ajustes', href: '/settings' },
  ],
  home: {
    title: 'Puxe assunto sem forcar a barra',
    description:
      'Abra uma conversa do nada, quebre o gelo com leveza e descubra temas que talvez voces nunca levantariam sozinhos.',
    featuredTitle: 'Temas para destravar a conversa',
    featuredDescription:
      'Escolha um clima, embaralhe as perguntas e deixe o papo acontecer.',
    exploreButton: 'Ver todos os temas',
  },
  decksPage: {
    title: 'Temas para qualquer clima',
    description:
      'Escolha um baralho para quebrar o gelo, sair do obvio ou cair em um assunto inesperado.',
    filterPlaceholder: 'Filtrar por categoria',
    allCategories: 'Todas as categorias',
    emptyState: 'Nenhum tema combina com esse filtro.',
  },
  conversation: {
    backToDecks: 'Voltar para os temas',
    modeLabel: 'Modo',
    shuffleLabel: 'Embaralhar',
    progress: (current: number, total: number) => `Pergunta ${current} de ${total}`,
    finishedTitle: 'Esse assunto rendeu tudo o que dava',
    finishedDescription:
      'Reinicie para mudar a ordem ou compartilhe este tema para continuar o papo com outra pessoa.',
    startOver: 'Comecar de novo',
    nextQuestion: 'Proxima pergunta',
    restart: 'Reiniciar',
    shareDeckTitle: (title: string) => `Olha esse tema: ${title}`,
    shareDeckInvite: (title: string) => `Bora puxar assunto com o tema "${title}"?`,
  },
  favorites: {
    title: 'Temas salvos',
    loadingTitle: 'Carregando temas salvos',
    description: 'Sua colecao de cartas para salvar aqueles assuntos que sempre funcionam.',
    emptyTitle: 'Nenhum favorito por enquanto',
    emptyDescription:
      'Toque na estrela de qualquer tema para guardar ideias boas de conversa e voltar nelas rapido.',
  },
  settings: {
    title: 'Ajustes',
    description: 'Controle o visual, o idioma automatico e veja como o app se comporta offline.',
    appearanceTitle: 'Aparencia',
    appearanceDescription: 'Escolha como o app fica no seu dispositivo.',
    themeLabel: 'Tema',
    languageTitle: 'Idioma automatico',
    languageDescription:
      'A traducao acontece no navegador. Ela ajuda a quebrar a barreira de idioma, mas pode variar em qualidade.',
    activeLanguageLabel: 'Idioma atual',
    translationModeLabel: 'Modo de traducao',
    translationModeValue: 'Traducao automatica no navegador',
    translationFallback:
      'Se o tradutor externo nao carregar, o app continua funcionando normalmente em portugues.',
    offlineTitle: 'PWA e offline',
    offlineDescription: 'Status da conexao e informacoes de uso mesmo sem internet.',
    connectivityLabel: 'Conectividade',
    offlineUseTitle: 'Uso offline',
    offlineUseDescription:
      'Voce pode instalar o app para abrir mais rapido. Os temas continuam acessiveis mesmo quando a conexao falha.',
  },
  share: {
    button: 'Compartilhar',
    copiedTitle: 'Link copiado',
    copiedDescription: 'O link foi copiado para a sua area de transferencia.',
    errorTitle: 'Nao foi possivel copiar',
    errorDescription: 'Tente novamente ou compartilhe manualmente.',
  },
  favoritesButton: {
    add: 'Adicionar aos favoritos',
    remove: 'Remover dos favoritos',
  },
  status: {
    online: 'Online',
    offline: 'Offline',
  },
  theme: {
    toggle: 'Alternar tema',
    light: 'Claro',
    dark: 'Escuro',
    system: 'Sistema',
  },
  notFound: {
    title: 'Pagina nao encontrada',
    description: 'A pagina que voce tentou abrir nao existe ou ja mudou de lugar.',
    button: 'Voltar para o inicio',
  },
  translation: {
    label: 'Idioma',
    helper: 'Traducao automatica',
    unavailable: 'Tradutor indisponivel',
    unavailableDescription:
      'O seletor continua visivel, mas a traducao externa nao respondeu agora.',
    commonLanguages,
    extendedLanguages,
  },
} as const;
