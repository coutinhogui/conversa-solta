# 🎴 Conversa Solta - Decks Library

Biblioteca de decks (baralhos de perguntas) para [Conversa Solta](https://github.com/seu-usuario/conversa-solta).

Cada deck é um arquivo JSON contendo um conjunto de perguntas para quebrar o gelo, ter conversas profundas, ou simplesmente se divertir em grupo.

## 📦 Decks Disponíveis

| Deck | Categoria | Descrição |
|------|-----------|-----------|
| **Quebra-gelo** | Social | Perfeito para começar papo com gente nova |
| **Papo Profundo** | Pessoal | Para reflexão e introspecção |
| **Entre nós dois** | Relacionamentos | Para casais se redescobrirem |
| **Noite em família** | Social | Perguntas leves e divertidas para toda a família |
| **Time sem script** | Social | Perguntas para aproximar colegas de trabalho |
| **O que você prefere?** | Diversão | Escolhas absurdas e engraçadas |
| **Primeiro encontro** | Relacionamentos | Perguntas para conhecer melhor |

## 🚀 Como Instalar no Seu Projeto

### Opção 1: Copiar manualmente

```bash
# Copie a pasta /decks para o seu projeto
cp -r decks/* /seu/projeto/public/decks/
```

### Opção 2: Git Subtree (recomendado)

```bash
# Adicionar como subtree
git subtree add --prefix public/decks \
  https://github.com/seu-usuario/conversa-solta-decks.git main

# Atualizar depois
git subtree pull --prefix public/decks \
  https://github.com/seu-usuario/conversa-solta-decks.git main
```

### Opção 3: Carregar de URL remota

```typescript
// Em src/lib/decks.ts
const decks = await loadDecks(
  'https://raw.githubusercontent.com/seu-usuario/conversa-solta-decks/main'
);
```

## 📝 Como Criar um Novo Deck

### 1. Clone este repositório

```bash
git clone https://github.com/seu-usuario/conversa-solta-decks.git
cd conversa-solta-decks
```

### 2. Copie o template

```bash
cp TEMPLATE.json meu-novo-deck.json
```

### 3. Edite o arquivo

```json
{
  "id": "meu-novo-deck",
  "title": "Título do Meu Deck",
  "description": "Uma descrição breve...",
  "category": "Social",
  "tags": ["tag1", "tag2"],
  "questions": {
    "q1": "Pergunta um?",
    "q2": "Pergunta dois?",
    "q3": "Pergunta três?",
    "q4": "Pergunta quatro?",
    "q5": "Pergunta cinco?"
  },
  "featured": false,
  "image": "deck-meu-novo-deck"
}
```

### 4. Atualize o índice

Adicione o ID do seu deck em `index.json`:

```json
[
  "existing-deck",
  "meu-novo-deck"
]
```

### 5. Faça um commit e push

```bash
git add meu-novo-deck.json index.json
git commit -m "Add: novo deck sobre [tema]"
git push origin main
```

## 📋 Formato de um Deck

Cada deck é um arquivo JSON com a seguinte estrutura:

```typescript
{
  id: string                           // ID único, sem espaços
  title: string                        // Título do deck
  description: string                  // Descrição breve
  category: 'Social' | 'Pessoal' | 
            'Relacionamentos' | 'Diversao'
  tags: string[]                       // Tags descritivas
  questions: {                         // Perguntas (q1, q2, ...)
    q1: string
    q2: string
    // ... mais perguntas
  }
  featured?: boolean                   // Deve aparecer em destaque?
  image: string                        // Nome do ícone/imagem
}
```

## 🎨 Categorias Disponíveis

- **Social**: Perguntas para conhecer pessoas, quebra-gelo
- **Pessoal**: Reflexão, introspecção, filosofia
- **Relacionamentos**: Para casais, amigos próximos
- **Diversão**: Jogos, perguntas engraçadas e absurdas

## 🔍 Validação

Todos os decks são validados automaticamente. Para validar localmente:

```bash
npm run validate-decks
```

(Requer script de validação configurado no package.json)

## 📄 Licença

Estes decks estão sob a mesma licença que [Conversa Solta](https://github.com/seu-usuario/conversa-solta).

## 🤝 Contribuindo

1. Fork este repositório
2. Crie uma branch para seu deck (`git checkout -b deck/novo-tema`)
3. Commit suas mudanças (`git commit -m 'Add: deck sobre novo tema'`)
4. Push para a branch (`git push origin deck/novo-tema`)
5. Abra um Pull Request

### Regras para contribuição

- Mínimo 5 perguntas por deck
- Pergunta clara e em português
- ID deve seguir o padrão `kebab-case`
- Categoria deve ser uma das 4 disponíveis
- Adicione tags relevantes

## 🐛 Reportar Problemas

Se encontrouistir um problema com algum deck, [abra uma issue](https://github.com/seu-usuario/conversa-solta-decks/issues).

## 💡 Ideias de Novos Decks

Alguns temas que ainda não temos:

- Viagens e destinos
- Gastronomia e receitas
- Hobbies e passatempos
- Educação e aprendizado
- Saúde e bem-estar
- Filmes e séries
- Música
- Empreendedorismo

Tem uma ideia? Crie uma issue ou envie um PR!

---

**Made with ❤️ for [Conversa Solta](https://github.com/seu-usuario/conversa-solta)**
