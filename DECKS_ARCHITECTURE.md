# 🏗️ Arquitetura do Sistema de Decks

## Fluxo de Dados

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (React)                         │
│                                                                 │
│  Componentes usam:                                              │
│  • loadDecks() → Carrega todos                                  │
│  • getDeckById(id) → Carrega específico                        │
│  • filterDecksByCategory() → Filtra                            │
│  • filterDecksByTags() → Busca por tags                        │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
        ┌────────────────────────────────┐
        │   src/lib/decks.ts             │
        │   (Loader Dinâmico)            │
        │                                │
        │ async loadDecks() {            │
        │   fetch('/decks/index.json')   │
        │   fetch('/decks/*.json')       │
        │ }                              │
        └────────────┬───────────────────┘
                     │
          ┌─────────┴──────────┐
          │                    │
          ▼                    ▼
    ┌──────────────┐   ┌─────────────────────┐
    │ Sucesso      │   │ Falha (Fallback)    │
    │              │   │                     │
    │ + Carrega    │   │ + Usa decks         │
    │   JSONs      │   │   hardcoded         │
    │ + Valida     │   │ + Log de erro       │
    │ + Cacheia    │   │ + Funciona do mesmo │
    │              │   │   jeito             │
    └──────────────┘   └─────────────────────┘
          │                    │
          └────────┬───────────┘
                   ▼
        ┌──────────────────────┐
        │  Deck[]              │
        │  Array de objetos    │
        │  {                   │
        │    id, title, ...    │
        │    questions: {}     │
        │  }                   │
        └──────────────────────┘
```

---

## Estrutura de Pastas

```
project/
│
├── 📂 public/
│   └── 📂 decks/                    ← ARMAZENAMENTO (JSON)
│       ├── index.json               ← Índice (lista de IDs)
│       ├── TEMPLATE.json            ← Template para copiar
│       ├── icebreakers.json         ← Deck 1
│       ├── deep-thoughts.json       ← Deck 2
│       ├── for-couples.json         ← Deck 3
│       ├── family-night.json        ← Deck 4
│       ├── team-builders.json       ← Deck 5
│       ├── would-you-rather.json    ← Deck 6
│       ├── first-date.json          ← Deck 7 (exemplo novo)
│       └── README.md                ← Docs
│
├── 📂 src/
│   ├── 📂 lib/
│   │   ├── decks.ts                 ← LOADER DINÂMICO (atualizado)
│   │   │   • loadDecks()
│   │   │   • getDeckById()
│   │   │   • getDeckCategories()
│   │   │
│   │   └── deck-loader.ts           ← UTILITÁRIOS (novo)
│   │       • validateDeck()
│   │       • filterDecksByCategory()
│   │       • filterDecksByTags()
│   │       • sortDecksByFeatured()
│   │       • countQuestions()
│   │
│   └── 📂 app/
│       └── components/ (seus componentes)
│
├── 📂 .github/
│   └── 📂 workflows/
│       └── validate-decks.yml       ← CI/CD (GitHub Actions)
│
├── DECKS_SUMMARY.md                 ← Este arquivo (visão geral)
├── DECKS_QUICKSTART.md              ← Rápido (5 min)
├── DECKS_GUIDE.md                   ← Completo (30 min)
├── DECKS_REFERENCE.md               ← Referência (cheat sheet)
├── DECKS_EXAMPLES.tsx               ← Exemplos do React
├── validate-decks.js                ← Script de validação
└── package.json                     ← npm scripts (atualizado)
```

---

## Formato JSON

```json
{
  "id": "kebab-case-id",
  "title": "Título",
  "description": "Descrição breve",
  "category": "Social|Pessoal|Relacionamentos|Diversao",
  "tags": ["tag1", "tag2", "tag3"],
  "questions": {
    "q1": "Pergunta 1?",
    "q2": "Pergunta 2?",
    "q3": "Pergunta 3?",
    "q4": "Pergunta 4?",
    "q5": "Pergunta 5?"
  },
  "featured": false,
  "image": "deck-image-name"
}
```

| Campo | Tipo | Obr | Descrição |
|-------|------|-----|-----------|
| id | string | ✅ | ID único (kebab-case) |
| title | string | ✅ | Título |
| description | string | ✅ | Descrição (1-2 linhas) |
| category | enum | ✅ | Uma de 4 categorias |
| tags | array | ✅ | Array de strings |
| questions | object | ✅ | `{q1, q2, ..., qN}` |
| featured | boolean | ❌ | Destaque (default: false) |
| image | string | ✅ | Nome da imagem |

---

## Ciclo de Vida de um Deck

```
1. CRIAÇÃO
   └─ Developer cria arquivo JSON em public/decks/novo.json
      └─ Adiciona ID em index.json

2. VALIDAÇÃO
   └─ npm run validate-decks
      └─ Script verifica formato, campos, tipos
         └─ Sucesso ✅ ou Erro ❌

3. DEPLOY
   └─ Git push
      └─ GitHub Actions roda validação
         └─ Deploy automático (se válido)

4. CARREGAMENTO
   └─ Frontend chama loadDecks()
      └─ Sistema carrega de /decks/index.json
         └─ Para cada deck, busca /decks/{id}.json
            └─ Retorna array de Decks

5. USO
   └─ Componentes React usam decks
      └─ filterDecksByCategory()
      └─ filterDecksByTags()
      └─ sortDecksByFeatured()
         └─ Exibe no UI
```

---

## Padrão de Uso em React

```tsx
// 1. HOOK
import { useEffect, useState } from 'react';
import { loadDecks, Deck } from '@/lib/decks';

// 2. STATE
const [decks, setDecks] = useState<Deck[]>([]);
const [loading, setLoading] = useState(true);

// 3. EFFECT (carrega uma vez)
useEffect(() => {
  loadDecks()
    .then(setDecks)
    .finally(() => setLoading(false));
}, []);

// 4. RENDERIZAR
return loading ? (
  <p>Carregando...</p>
) : (
  <div>
    {decks.map(deck => (
      <div key={deck.id}>{deck.title}</div>
    ))}
  </div>
);
```

---

## Validação Automática

```
trigger: push/PR com changes em public/decks/**
   └─ GitHub Action rodar
      └─ node validate-decks.js
         ├─ Verifica index.json
         ├─ Verifica cada *.json
         ├─ Valida campos
         ├─ Valida tipos
         ├─ Valida relacionamentos
         └─ Resultado: ✅ ou ❌

   Se ✅: Permite merge
   Se ❌: Bloqueia PR + feedback
```

---

## Carregar de Repositório Remoto (Opcional)

```
Opção 1: Git Subtree
public/decks/ ←─ git subtree ─→ seu-repo/conversa-solta-decks

Opção 2: Fetch direto
loadDecksFromGitHub('user', 'repo')
   └─ https://raw.githubusercontent.com/user/repo/main/...
      └─ fetch /decks/index.json
      └─ fetch /decks/*.json (paralelo)
         └─ Retorna array de Decks
```

---

## Performance

```
❌ Sem cache
  fetch /index.json
  fetch /deck1.json
  fetch /deck2.json
  ...
  → Lento (N+1 requests)

✅ Com cache (implementado)
  1ª chamada: fetch tudo
  Armazenar em cachedDecks
  2ª+ chamadas: retorna do cache
  → Rápido! (local memory)

✨ Otimizações possíveis
  • Usar Service Worker
  • IndexedDB para persistência
  • Lazy load por categoria
  • CDN para /decks/
```

---

## Escalabilidade

Quanto mais decks, mais fácil! 🚀

```
Adicionar novo deck = 2 arquivo
1. public/decks/novo.json (copiar template + editar)
2. Atualizar public/decks/index.json (1 linha)

Sem mudanças em:
✗ src/lib/decks.ts
✗ Componentes React
✗ Compilação
✗ Build
✗ Deploy

Carrega automaticamente! ✨
```

---

## Arquitetura Resumida

```
JSON Files
    ↓
Loader (decks.ts)
    ↓
Cache (memory)
    ↓
React Components
    ↓
UI
```

Simples e escalável! 🎯
