'use client';

import React, { useState, useMemo, useEffect, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { enrichDeck } from '@/lib/deck-metadata';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash, Download, FileJson, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

// Simple function to slugify text
function slugify(text: string): string {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

export default function AdminPage() {
  const [title, setTitle] = useState('');
  const [id, setId] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'Social' | 'Pessoal' | 'Relacionamentos' | 'Diversao'>('Social');
  const [tagsInput, setTagsInput] = useState('');
  const [featured, setFeatured] = useState(false);
  const [image, setImage] = useState('');
  const [questions, setQuestions] = useState<string[]>(['']);
  const [autoSlug, setAutoSlug] = useState(true);

  // Sync slug with title if autoSlug is active
  useEffect(() => {
    if (autoSlug && title) {
      let categoryPrefix = '';
      if (category === 'Social') categoryPrefix = 'social-';
      else if (category === 'Pessoal') categoryPrefix = 'pessoal-';
      else if (category === 'Relacionamentos') categoryPrefix = 'relacionamentos-';
      else if (category === 'Diversao') categoryPrefix = 'diversao-';

      setId(categoryPrefix + slugify(title));
    }
  }, [title, category, autoSlug]);

  const handleAddQuestion = () => {
    setQuestions((prev) => [...prev, '']);
  };

  const handleQuestionChange = (index: number, value: string) => {
    setQuestions((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const handleRemoveQuestion = (index: number) => {
    setQuestions((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      return updated.length === 0 ? [''] : updated;
    });
  };

  // Build the deck object matching requirements
  const deckData = useMemo(() => {
    const formattedQuestions: Record<string, string> = {};
    questions.forEach((q, idx) => {
      if (q.trim()) {
        formattedQuestions[`q${idx + 1}`] = q.trim();
      }
    });

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean);

    return {
      id: id.trim() || 'novo-tema-id',
      title: title.trim() || 'Título Atrativo',
      description: description.trim() || 'Descrição breve e convidativa.',
      category,
      tags: tags.length > 0 ? tags : ['conversa', 'perguntas'],
      questions: formattedQuestions,
      featured,
      image: image.trim() || `deck-${slugify(title) || 'custom'}`,
    };
  }, [id, title, description, category, tagsInput, questions, featured, image]);

  // Enrich the deck to get taxonomy and image cover SVG preview
  const enrichedDeck = useMemo(() => {
    try {
      return enrichDeck(deckData);
    } catch (e) {
      console.error(e);
      return null;
    }
  }, [deckData]);

  // Validation
  const errors = useMemo(() => {
    const list: string[] = [];
    if (!title.trim()) list.push('O título é obrigatório.');
    if (!id.trim()) list.push('O ID identificador do baralho é obrigatório.');
    if (!description.trim()) list.push('A descrição é obrigatória.');
    
    const validQuestions = questions.filter((q) => q.trim()).length;
    if (validQuestions === 0) {
      list.push('É necessário adicionar pelo menos uma pergunta válida.');
    }

    return list;
  }, [title, id, description, questions]);

  const handleDownload = () => {
    if (errors.length > 0) return;

    // Build perfect JSON output matching application schemas
    const jsonOutput = JSON.stringify(
      {
        id: deckData.id,
        title: deckData.title,
        description: deckData.description,
        category: deckData.category,
        tags: deckData.tags,
        questions: deckData.questions,
        featured: deckData.featured,
        image: deckData.image,
      },
      null,
      2
    );

    const blob = new Blob([jsonOutput], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${deckData.id}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-7xl">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight md:text-4xl flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-primary" />
            Criador de Decks
          </h1>
          <p className="text-muted-foreground text-lg">
            Crie novos temas de conversa de forma visual e exporte para o projeto.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/decks">Voltar para Temas</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* FORM COLUMN */}
        <div className="lg:col-span-7 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>1. Informações Básicas</CardTitle>
              <CardDescription>Estes dados definem o card e alimentam os motores de busca e filtros do app.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* TITLE */}
              <div className="space-y-2">
                <Label htmlFor="deck-title">Título do Tema</Label>
                <Input
                  id="deck-title"
                  placeholder="Ex: Altas Risadas, Perguntas profundas..."
                  value={title}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                />
              </div>

              {/* ID & AUTOMATIC SLUG SWITCH */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="deck-id">Identificador ID</Label>
                    <div className="flex items-center gap-1">
                      <Label htmlFor="auto-slug" className="text-xs text-muted-foreground cursor-pointer">Auto</Label>
                      <Switch
                        id="auto-slug"
                        checked={autoSlug}
                        onCheckedChange={setAutoSlug}
                      />
                    </div>
                  </div>
                  <Input
                    id="deck-id"
                    placeholder="Ex: social-altas-risadas"
                    value={id}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setId(e.target.value);
                      setAutoSlug(false);
                    }}
                  />
                </div>

                {/* CATEGORY */}
                <div className="space-y-2">
                  <Label htmlFor="deck-category">Categoria Principal</Label>
                  <Select
                    value={category}
                    onValueChange={(val) => setCategory(val as any)}
                  >
                    <SelectTrigger id="deck-category">
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Social">Social (Grupo/Festa)</SelectItem>
                      <SelectItem value="Pessoal">Pessoal (Introspecção)</SelectItem>
                      <SelectItem value="Relacionamentos">Relacionamentos (Casal)</SelectItem>
                      <SelectItem value="Diversao">Diversão (Absurdos/Leve)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* DESCRIPTION */}
              <div className="space-y-2">
                <Label htmlFor="deck-description">Descrição Breve</Label>
                <textarea
                  id="deck-description"
                  placeholder="Descreva em uma frase o clima destas perguntas..."
                  value={description}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-body"
                />
              </div>

              {/* TAGS & FEATURED SWITCH */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div className="space-y-2">
                  <Label htmlFor="deck-tags">Tags (separadas por vírgula)</Label>
                  <Input
                    id="deck-tags"
                    placeholder="Ex: amigos, engracado, escolhas"
                    value={tagsInput}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setTagsInput(e.target.value)}
                  />
                </div>

                <div className="flex items-center justify-between border rounded-lg p-3 mt-4 md:mt-0">
                  <div className="space-y-0.5">
                    <Label htmlFor="deck-featured" className="cursor-pointer">Destacar tema (Featured)</Label>
                    <p className="text-xs text-muted-foreground">Exibir em destaque no carrossel da Home.</p>
                  </div>
                  <Switch
                    id="deck-featured"
                    checked={featured}
                    onCheckedChange={setFeatured}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div>
                <CardTitle>2. Perguntas do Baralho</CardTitle>
                <CardDescription>Adicione as perguntas que farão parte deste tema.</CardDescription>
              </div>
              <Badge variant="secondary">{questions.filter(q => q.trim()).length} ativas</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              {questions.map((question, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <Badge variant="outline" className="h-10 w-10 flex items-center justify-center shrink-0 font-body">
                    {index + 1}
                  </Badge>
                  <Input
                    value={question}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleQuestionChange(index, e.target.value)}
                    placeholder={`Pergunta número ${index + 1}`}
                    className="flex-1 font-body"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveQuestion(index)}
                    className="text-muted-foreground hover:text-destructive shrink-0"
                    aria-label="Excluir pergunta"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              ))}

              <Button
                variant="outline"
                className="w-full flex items-center gap-2 border-dashed mt-4"
                onClick={handleAddQuestion}
              >
                <Plus className="h-4 w-4" />
                Adicionar Pergunta
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* PREVIEW COLUMN */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Capa do Tema (Live Preview)</CardTitle>
              <CardDescription>Sua capa SVG é gerada dinamicamente com base nas cores da categoria e taxonomia.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Card visual rendering */}
              <div className="w-full relative overflow-hidden rounded-xl border bg-card shadow-lg aspect-[1.5/1] max-w-[450px] mx-auto">
                {enrichedDeck?.imageMeta?.imageUrl ? (
                  <img
                    src={enrichedDeck.imageMeta.imageUrl}
                    alt={enrichedDeck.imageMeta.imageDescription}
                    className="w-full h-full object-cover select-none"
                    draggable={false}
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground animate-pulse">
                    Carregando preview...
                  </div>
                )}
              </div>

              {/* Status and warnings */}
              {errors.length > 0 ? (
                <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-4 text-sm text-destructive space-y-2">
                  <div className="flex items-center gap-2 font-semibold">
                    <AlertCircle className="h-4 w-4" />
                    Campos pendentes:
                  </div>
                  <ul className="list-disc list-inside pl-1 text-xs space-y-1">
                    {errors.map((err, i) => (
                      <li key={i}>{err}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-4 text-sm text-emerald-600 dark:text-emerald-400 space-y-1">
                  <div className="flex items-center gap-2 font-semibold">
                    <CheckCircle2 className="h-4 w-4" />
                    Baralho Prontinho!
                  </div>
                  <p className="text-xs">As especificações obedecem rigorosamente aos padrões de taxonomia e validação do app.</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <Button
                  onClick={handleDownload}
                  disabled={errors.length > 0}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center gap-2 py-6 text-base font-semibold"
                >
                  <Download className="h-5 w-5" />
                  Baixar JSON do Tema
                </Button>
              </div>

              {/* HELP GUIDE BOX */}
              <div className="rounded-lg border p-4 text-xs text-muted-foreground space-y-3 bg-muted/20">
                <h4 className="font-semibold text-foreground flex items-center gap-1.5 text-sm border-b pb-1.5 font-headline">
                  <FileJson className="h-4 w-4 text-primary" />
                  Como adicionar o tema ao site?
                </h4>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Clique em <strong>Baixar JSON do Tema</strong>.</li>
                  <li>Salve o arquivo baixado (ex: <code className="bg-muted px-1 py-0.5 rounded text-foreground font-semibold">{deckData.id}.json</code>) na pasta:
                    <div className="mt-1 font-mono bg-background p-1.5 rounded border border-border select-all break-all">
                      public/decks/
                    </div>
                  </li>
                  <li>Abra o arquivo <code className="bg-muted px-1 py-0.5 rounded text-foreground font-semibold">public/decks/index.json</code> e adicione o ID do tema (sem o .json) à lista:
                    <pre className="mt-1 p-2 rounded bg-background border border-border font-mono text-[10px] overflow-x-auto text-foreground">
{`[
  ...
  "${deckData.id}"
]`}
                    </pre>
                  </li>
                  <li>Com o arquivo salvo e registrado, o validador garantirá a integridade e o tema carregará <strong>automaticamente</strong>!</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
