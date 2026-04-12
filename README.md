# Conversa Solta

Conversa Solta e um app web para quebrar o gelo, puxar assunto e abrir conversas inesperadas com perguntas prontas e traducao automatica no navegador.

Ideal para amigos, casais, encontros, equipes e qualquer situacao em que falta assunto ou sobra vontade de conversar.

## Stack

- Next.js 15
- React 18
- TypeScript
- Tailwind CSS
- componentes shadcn/Radix apenas no que o app realmente usa

## Funcionalidades

- temas de conversa com perguntas prontas
- favoritos salvos no navegador
- modo embaralhado nas perguntas
- traducao automatica client-side por seletor de idioma
- suporte PWA basico
- interface otimizada para uso rapido em celular e desktop

## Rodando localmente

```powershell
npm install
npm run dev
```

Abra [http://localhost:9002](http://localhost:9002).

## Scripts

```powershell
npm run dev
npm run build
npm run start
npm run typecheck
```

## Estrutura principal

- `src/app`: paginas do App Router
- `src/components`: componentes visuais e layout
- `src/lib/site.ts`: branding, copy e configuracoes publicas
- `src/lib/decks.ts`: dados dos temas e perguntas
- `public/manifest.json`: metadata do PWA

## Observacoes

- o idioma base do projeto e `pt-BR`
- a traducao automatica depende do carregamento do tradutor no navegador
- favoritos ficam no `localStorage`, com migracao automatica da chave antiga
