# 🚀 Guia Rápido - Sistema de Decks Dinâmicos

## O que foi feito

Você agora tem um sistema completo de **decks dinâmicos em JSON**:

✅ Decks em arquivos JSON individuais (`public/decks/*.json`)  
✅ Sistema de carregamento dinâmico que lê os JSONs  
✅ Compatibilidade com código existente (fallback automático)  
✅ Documentação completa  
✅ Exemplo de novo deck  
✅ Script de validação  
✅ Funções utilitárias (filtro, sorting, etc)  

## 📁 Estrutura criada

```
project/
├── public/
│   └── decks/
│       ├── index.json                    # Índice de decks
│       ├── TEMPLATE.json                 # Template para copiar
│       ├── icebreakers.json
│       ├── deep-thoughts.json
│       ├── for-couples.json
│       ├── family-night.json
│       ├── team-builders.json
│       ├── would-you-rather.json
│       ├── first-date.json               # Novo exemplo
│       └── README.md                     # Docs dos decks
├── src/
│   └── lib/
│       ├── decks.ts                      # Loader dinâmico (atualizado)
│       └── deck-loader.ts                # Utilitários novos
├── validate-decks.js                     # Script de validação
├── DECKS_GUIDE.md                        # Documentação detalhada
├── DECKS_EXAMPLES.tsx                    # Exemplos de uso
└── package.json                          # Script adicionado
```

## ⚡ Quem começa agora

### 1️⃣ Adicionar um novo deck

**Copiar o template:**
```bash
cp public/decks/TEMPLATE.json public/decks/meu-deck.json
```

**Editar o arquivo** com seu conteúdo

**Adicionar ao índice** em `public/decks/index.json`:
```json
[
  "existing-deck",
  "meu-deck"  // ← adicione aqui
]
```

**Validar:**
```bash
npm run validate-decks
```

✅ Pronto! O deck será carregado automaticamente.

---

### 2️⃣ Usar nos componentes React

**Importar e carregar:**
```tsx
import { loadDecks } from '@/lib/decks';

export function MyComponent() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    loadDecks().then(setDecks);
  }, []);

  return decks.map(d => <div key={d.id}>{d.title}</div>);
}
```

Veja mais exemplos em `DECKS_EXAMPLES.tsx`

---

### 3️⃣ Usar com GitHub (versionar decks)

**Opção A: Subtree**
```bash
git subtree add --prefix public/decks \
  https://github.com/seu-usuario/conversa-solta-decks.git main
```

**Opção B: Carregar do GitHub**
```typescript
const decks = await loadDecksFromGitHub(
  'seu-usuario', 
  'conversa-solta-decks'
);
```

---

## 📚 Documentação

| Arquivo | Conteúdo |
|---------|----------|
| `DECKS_GUIDE.md` | Guia completo: formato, como adicionar, GitHub, etc |
| `DECKS_EXAMPLES.tsx` | 7 exemplos práticos de componentes |
| `public/decks/README.md` | README para repositório externo |
| `src/lib/deck-loader.ts` | Funções utilitárias (validação, filtro, sort) |

---

## 🛠️ Funções disponíveis

```typescript
// Carregar todos os decks
const decks = await loadDecks();

// Obter um deck por ID
const deck = await getDeckById('icebreakers');

// Filtrar por categoria
const social = filterDecksByCategory(decks, 'Social');

// Filtrar por tags
const leve = filterDecksByTags(decks, ['leve']);

// Ordenar: featured primeiro
const sorted = sortDecksByFeatured(decks);

// Contar perguntas
const count = countQuestions(deckById);

// Validar JSON
const validation = validateDeck(jsonData);

// Fazer template
const template = generateDeckTemplate('novo-id');
```

---

## ✨ Próximas ideias

1. **GitHub Actions**: Sincronizar decks externos automaticamente
2. **API endpoint**: `GET /api/decks` e `GET /api/decks/:id`
3. **Busca**: Buscar decks por nome/tags
4. **Admin panel**: Interface para adicionar decks sem tocar em JSON
5. **i18n**: Suporacutomultiplos idiomas

---

## 🧪 Testar

```bash
# Validar todos os decks
npm run validate-decks

# Rodar o projeto
npm run dev

# Verificar TypeScript
npm run typecheck
```

---

## 📖 Próximos passos

1. Atualizar componentes existentes para usar `loadDecks()`
2. Testar carregamento dinâmico em desenvolvimento
3. *(Opcional)* Criar repositório separado para decks no GitHub
4. *(Opcional)* Adicionar GitHub Actions para sincronização

---

**Dúvidas?** Veja `DECKS_GUIDE.md` ou `DECKS_EXAMPLES.tsx`

Happy adding decks! 🎉
