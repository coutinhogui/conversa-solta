# 🎯 Referência Rápida - Adicionar Novos Decks

## Um passo por vez

### Passo 1: Criar o arquivo JSON

Na pasta `public/decks/`, crie um novo arquivo com seu ID:

**Arquivo: `public/decks/seu-novo-deck.json`**

```json
{
  "id": "seu-novo-deck",
  "title": "Título Atrativo",
  "description": "Descrição breve em 1-2 linhas",
  "category": "Social",
  "tags": ["tag1", "tag2", "tag3"],
  "questions": {
    "q1": "Pergunta 1?",
    "q2": "Pergunta 2?",
    "q3": "Pergunta 3?",
    "q4": "Pergunta 4?",
    "q5": "Pergunta 5?"
  },
  "featured": false,
  "image": "deck-seu-novo-deck"
}
```

### Passo 2: Registrar no índice

Edite `public/decks/index.json` e adicione seu ID na lista:

```json
[
  "icebreakers",
  "deep-thoughts",
  "seu-novo-deck"  ← ADICIONE AQUI
]
```

### Passo 3: Validar

```bash
npm run validate-decks
```

Se tudo estiver verde ✅, você terminou!

---

## Categorias válidas

Escolha uma:
- `Social` - Quebra-gelo, conhecer pessoas
- `Pessoal` - Reflexão, filosofia, introspecção  
- `Relacionamentos` - Casais, amigos
- `Diversao` - Engraçado, absurdo, jogos

---

## Exemplo completo

**Arquivo: `public/decks/viagens.json`**

```json
{
  "id": "viagens",
  "title": "Histórias de Viagem",
  "description": "Perguntas sobre aventuras, destinos e experiências de viagem.",
  "category": "Social",
  "tags": ["viagem", "aventura", "conhecer"],
  "questions": {
    "q1": "Qual foi a viagem mais marcante da sua vida?",
    "q2": "Qual é o destino que você ainda sonha em conhecer?",
    "q3": "Qual foi o pior (e funniest) problema em uma viagem?",
    "q4": "Você prefere conhecer um lugar bem (deep) ou muitos lugares (surface)?",
    "q5": "Se pudesse viajar no tempo, para qual época iria?"
  },
  "featured": false,
  "image": "deck-travel"
}
```

Depois em `index.json`:

```json
["icebreakers", "deep-thoughts", ..., "viagens"]
```

---

## JSON válido vs inválido

### ❌ INVÁLIDO

```json
{
  "id": "Meu Deck",          ← espaços não permitidos
  "title": "...",
  "questions": {
    "q1": ""                 ← pergunta vazia
  }
}
```

### ✅ VÁLIDO

```json
{
  "id": "meu-deck",          ← kebab-case ✓
  "title": "Meu Deck",
  "questions": {
    "q1": "Qual é...?"       ← pergunta completa ✓
  }
}
```

---

## Dicas

- Use **kebab-case** para IDs: `meu-novo-deck` ✅ (não: `MeuNovoDeck`)
- Mínimo 5 perguntas por deck
- Mantenha as categorias definidas (não invente novas)
- Tags devem descrever o deck
- `featured: true` para decks em destaque
- Valide sempre antes de fazer commit

---

## Git workflow

```bash
# 1. Criar branch
git checkout -b feat/novo-deck-viagens

# 2. Adicionar arquivos
git add public/decks/viagens.json public/decks/index.json

# 3. Validar
npm run validate-decks

# 4. Commit
git commit -m "feat: add viagens deck com 5 perguntas"

# 5. Push e PR
git push origin feat/novo-deck-viagens
```

---

## Commands úteis

```bash
# Validar tudo
npm run validate-decks

# Ver estrutura
ls -la public/decks/

# Ver os IDs
cat public/decks/index.json

# Listar perguntas de um deck
jq '.questions' public/decks/icebreakers.json
```

---

## Erros comuns

| Erro | Solução |
|------|---------|
| "id deve conter apenas letras minúsculas" | Use `novo-deck` não `NovoDeck` |
| "Index referencia ID que não existe" | Certifique-se do nome do arquivo |
| "Deve haver pelo menos uma pergunta" | Adicione `q1`, `q2`, etc |
| "Categoria inválida" | Use: Social, Pessoal, Relacionamentos, Diversao |

---

**Tudo pronto? Faça o commit e envie um PR!** 🚀
