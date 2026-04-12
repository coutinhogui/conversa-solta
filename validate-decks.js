#!/usr/bin/env node

/**
 * Validar todos os decks em public/decks/
 * 
 * Uso: node validate-decks.js
 * Ou adicione ao package.json:
 *   "scripts": {
 *     "validate-decks": "node validate-decks.js"
 *   }
 */

const fs = require('fs');
const path = require('path');

const DECKS_DIR = path.join(__dirname, 'public', 'decks');
const VALID_CATEGORIES = ['Social', 'Pessoal', 'Relacionamentos', 'Diversao'];
const errors = [];
const warnings = [];

console.log('🔍 Validando decks...\n');

// Validar index.json
try {
  const indexPath = path.join(DECKS_DIR, 'index.json');
  const indexContent = fs.readFileSync(indexPath, 'utf-8');
  const indexData = JSON.parse(indexContent);

  if (!Array.isArray(indexData)) {
    errors.push({
      file: 'index.json',
      field: 'root',
      message: 'index.json deve ser um array',
    });
  }

  // Verificar se todos os IDs em index.json correspondem a arquivos reais
  indexData.forEach((id) => {
    const deckFile = path.join(DECKS_DIR, `${id}.json`);
    if (!fs.existsSync(deckFile)) {
      errors.push({
        file: 'index.json',
        field: id,
        message: `ID '${id}' referenciado em index.json mas arquivo não encontrado`,
      });
    }
  });

  console.log(`✓ index.json válido (${indexData.length} decks)\n`);
} catch (error) {
  errors.push({
    file: 'index.json',
    field: 'parse',
    message: `Erro ao parsear: ${error instanceof Error ? error.message : String(error)}`,
  });
}

// Validar cada deck individual
const deckFiles = fs.readdirSync(DECKS_DIR).filter(f => 
  f.endsWith('.json') && f !== 'index.json' && f !== 'TEMPLATE.json'
);

deckFiles.forEach(file => {
  const filePath = path.join(DECKS_DIR, file);
  
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const deck = JSON.parse(content);

    // Validar campos obrigatórios
    if (!deck.id || typeof deck.id !== 'string') {
      errors.push({
        file,
        field: 'id',
        message: 'ID é obrigatório e deve ser uma string',
      });
    } else if (!/^[a-z0-9-]+$/.test(deck.id)) {
      errors.push({
        file,
        field: 'id',
        message: 'ID deve conter apenas letras minúsculas, números e hífens',
      });
    } else if (deck.id !== file.replace('.json', '')) {
      warnings.push({
        file,
        field: 'id',
        message: `ID no arquivo ('${deck.id}') não corresponde ao nome do arquivo ('${file}')`,
      });
    }

    if (!deck.title || typeof deck.title !== 'string') {
      errors.push({ file, field: 'title', message: 'Título é obrigatório' });
    }

    if (!deck.description || typeof deck.description !== 'string') {
      errors.push({ file, field: 'description', message: 'Descrição é obrigatória' });
    }

    if (!VALID_CATEGORIES.includes(deck.category)) {
      errors.push({
        file,
        field: 'category',
        message: `Categoria inválida. Deve ser uma de: ${VALID_CATEGORIES.join(', ')}`,
      });
    }

    if (!Array.isArray(deck.tags) || deck.tags.length === 0) {
      errors.push({ file, field: 'tags', message: 'Tags deve ser um array não vazio' });
    }

    if (!deck.questions || typeof deck.questions !== 'object') {
      errors.push({
        file,
        field: 'questions',
        message: 'Questions é obrigatório e deve ser um objeto',
      });
    } else {
      const questionCount = Object.keys(deck.questions).length;
      if (questionCount === 0) {
        errors.push({
          file,
          field: 'questions',
          message: 'Deve haver pelo menos uma pergunta (q1, q2, ...)',
        });
      } else if (questionCount < 5) {
        warnings.push({
          file,
          field: 'questions',
          message: `Apenas ${questionCount} perguntas. Recomendado mínimo 5.`,
        });
      }

      Object.entries(deck.questions).forEach(([key, value]) => {
        if (typeof value !== 'string' || value.trim() === '') {
          errors.push({
            file,
            field: `questions.${key}`,
            message: 'Perguntas devem ser strings não vazias',
          });
        }
      });
    }

    if (!deck.image || typeof deck.image !== 'string') {
      errors.push({ file, field: 'image', message: 'Image é obrigatório' });
    }

    if (typeof deck.featured !== 'boolean' && deck.featured !== undefined) {
      warnings.push({
        file,
        field: 'featured',
        message: 'Featured deve ser boolean (omitir se false)',
      });
    }

    console.log(`✓ ${file}`);
  } catch (error) {
    errors.push({
      file,
      field: 'parse',
      message: `Erro ao parsear JSON: ${error instanceof Error ? error.message : String(error)}`,
    });
  }
});

// Exibir resultados
console.log('\n' + '='.repeat(50));

if (warnings.length > 0) {
  console.log('\n⚠️  Avisos:');
  warnings.forEach(w => {
    console.log(`  ${w.file}:${w.field} - ${w.message}`);
  });
}

if (errors.length > 0) {
  console.log('\n❌ Erros encontrados:');
  errors.forEach(e => {
    console.log(`  ${e.file}:${e.field} - ${e.message}`);
  });
  process.exit(1);
} else {
  console.log('\n✅ Todos os decks são válidos!');
  console.log(`\n📊 Resumo:`);
  console.log(`  - Decks validados: ${deckFiles.length}`);
  console.log(`  - Avisos: ${warnings.length}`);
  process.exit(0);
}
