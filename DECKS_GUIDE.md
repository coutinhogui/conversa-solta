# 📋 Guia: Gerenciar Decks via JSON

## Visão geral

O projeto agora suporta **carregamento dinâmico de decks via JSON**. Você pode adicionar novos decks facilmente sem modificar código TypeScript, apenas criando arquivos JSON.

## Estrutura

Os decks estão organizados em:

```
public/
└── decks/
    ├── index.json              # Índice com lista de IDs dos decks
    ├── icebreakers.json        # Template: um deck
    ├── deep-thoughts.json
    ├── for-couples.json
    ├── family-night.json
    ├── team-builders.json
    └── would-you-rather.json
```

## Formato de um Deck (JSON)

```json
{
  "id": "seu-deck-id",
  "title": "Título do Deck",
  "description": "Descrição breve sobre o que é este deck.",
  "category": "Social",
  "tags": ["tag1", "tag2", "tag3"],
  "questions": {
    "q1": "Primeira pergunta?",
    "q2": "Segunda pergunta?",
    "q3": "Terceira pergunta?",
    "q4": "Quarta pergunta?",
    "q5": "Quinta pergunta?"
  },
  "featured": true,
  "image": "deck-image-name"
}
```

### Campos explicados:

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `id` | string | ✅ | Identificador único, sem espaços (use hífens: `meu-deck`) |
| `title` | string | ✅ | Título do deck |
| `description` | string | ✅ | Descrição breve (1-2 linhas) |
| `category` | enum | ✅ | Uma de: `Social`, `Pessoal`, `Relacionamentos`, `Diversao` |
| `tags` | array | ✅ | Lista de tags (ex: `["leve", "festa", "trabalho"]`) |
| `questions` | object | ✅ | Objeto com `q1`, `q2`, ... `qN` como perguntas |
| `featured` | boolean | ❌ | Se deve aparecer em destaque (default: `false`) |
| `image` | string | ✅ | Nome da imagem (sem extensão) |

## Como adicionar um novo deck

### 1. Criar o arquivo JSON

Crie um arquivo em `public/decks/seu-novo-deck.json`:

```json
{
  "id": "fiesta-games",
  "title": "Jogos de Festa",
  "description": "Perguntas divertidas e dinâmicas para animar qualquer festa.",
  "category": "Diversao",
  "tags": ["festa", "grupo", "energetico"],
  "questions": {
    "q1": "Qual o pior nome para uma pizzaria que você já ouviu?",
    "q2": "Se você fosse um alimento, qual seria?",
    "q3": "Qual é seu superpoder inútil?",
    "q4": "Que era você em uma vida passada?",
    "q5": "Se tivesse que escolher, viver sem internet ou sem TV?"
  },
  "featured": false,
  "image": "deck-party"
}
```

### 2. Atualizar o índice

Adicione o ID do novo deck em `public/decks/index.json`:

```json
[
  "icebreakers",
  "deep-thoughts",
  "for-couples",
  "family-night",
  "team-builders",
  "would-you-rather",
  "fiesta-games"
]
```

### 3. Pronto! ✅

O frontend carregará automaticamente o novo deck na próxima execução.

## Usando no código

### No frontend (React)

```tsx
import { loadDecks, getDeckById } from '@/lib/decks';

export default function MyComponent() {
  const [allDecks, setAllDecks] = useState<Deck[]>([]);

  useEffect(() => {
    loadDecks().then(setAllDecks);
  }, []);

  return (
    <div>
      {allDecks.map(deck => (
        <div key={deck.id}>{deck.title}</div>
      ))}
    </div>
  );
}
```

### Funções disponíveis

```typescript
// Carregar todos os decks
const decks = await loadDecks();

// Obter um deck específico
const deck = await getDeckById('icebreakers');

// Obter categorias (versão async)
const categories = await getDeckCategories();

// Usar diretamente (fallback estático)
import { decks, deckCategories } from '@/lib/decks';
```

## Armazenar no GitHub

Para versionar e compartilhar os decks:

### 1. Criar um repositório separado (recomendado)

```bash
# Criar repo vazio no GitHub
# Clone localmente
git clone https://github.com/seu-usuario/conversa-solta-decks.git
```

### 2. Copiar JSONs

```bash
cp -r public/decks/* /caminho/para/conversa-solta-decks/
```

### 3. Adicionar arquivo README

```markdown
# Conversa Solta - Decks Library

Coleção de decks de perguntas para o Conversa Solta.

## Como usar

Adicione um novo arquivo JSON nesta pasta e atualize `index.json`.

## Contribuindo

Faça um fork, adicione seu deck, e envie um PR!
```

### 4. Fazer push

```bash
cd conversora-solta-decks
git add .
git commit -m "Add multiple decks"
git push
```

## Carregar decks de URL remota

Você pode modificar `loadDecks()` para carregar de um repositório remoto:

```typescript
export async function loadDecks(remoteUrl?: string): Promise<Deck[]> {
  try {
    const baseUrl = remoteUrl || '/decks';
    const response = await fetch(`${baseUrl}/index.json`);
    // ... resto da lógica
  }
}
```

Uso:
```typescript
// Local
const decks = await loadDecks();

// Remoto (GitHub Raw)
const decks = await loadDecks(
  'https://raw.githubusercontent.com/seu-usuario/conversa-solta-decks/main'
);
```

## Validação

Os JSONs são validados automaticamente contra o tipo `Deck`. Erros causam fallback para decks hardcoded.

Para debug:
```bash
# No console do navegador
const decks = await loadDecks();
console.log(decks);
```

## Perguntas frequentes

**P: Posso ter mais de 5 perguntas por deck?**
Sim! Use `q1`, `q2`, ... `q10` ou quantas precisar.

**P: Posso adicionar novos atributos?**
Você precisa atualizar o tipo `Deck` em `src/lib/decks.ts` primeiro.

**P: Como faço update automático de decks remotos?**
Você pode usar uma GitHub Action ou webhook para sincronizar.

---

**Quer contribuir com novos decks?** Envie um PR ao repositório! 🎉
