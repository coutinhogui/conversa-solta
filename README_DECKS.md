# ⚡ Resumo em 60 Segundos

## O que foi criado

Um sistema para adicionar decks em **3 passos**:

```
1. Copie: public/decks/TEMPLATE.json → public/decks/seu-deck.json
2. Edite: Coloque suas perguntas no JSON
3. Registre: Adicione "seu-deck" em public/decks/index.json
```

**Pronto!** Seu deck está carregado automaticamente. ✨

---

## Arquivos importantes

| Arquivo | O que faz |
|---------|----------|
| `public/decks/TEMPLATE.json` | Template para copiar |
| `public/decks/index.json` | Lista de decks |
| `src/lib/decks.ts` | Carrega os JSON (atualizado) |
| `src/lib/deck-loader.ts` | Funções úteis (novo) |
| `validate-decks.js` | Valida os JSON |

---

## Testar agora

```bash
# Validar
npm run validate-decks

# Rodar
npm run dev

# Deve funcionar!
```

---

## Usar em React

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

---

## Documentação

- 📖 **[DECKS_INDEX.md](DECKS_INDEX.md)** ← Comece aqui
- ⚡ **[DECKS_QUICKSTART.md](DECKS_QUICKSTART.md)** - Rápido
- 📚 **[DECKS_GUIDE.md](DECKS_GUIDE.md)** - Completo
- 💻 **[DECKS_EXAMPLES.tsx](DECKS_EXAMPLES.tsx)** - Código
- 📋 **[DECKS_REFERENCE.md](DECKS_REFERENCE.md)** - Referência

---

**Quer começar agora? Vá para [DECKS_INDEX.md](DECKS_INDEX.md)** 👈
