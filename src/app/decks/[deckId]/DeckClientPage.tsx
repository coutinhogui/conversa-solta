
'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Deck } from '@/lib/decks';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RotateCw } from 'lucide-react';
import ShareButton from '@/components/share-button';
import { AnimatePresence, motion, useMotionValue, useTransform } from 'framer-motion';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { siteConfig } from '@/lib/site';
import confetti from 'canvas-confetti';

// Helper function to shuffle an array
const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

interface ConversationPageProps {
  deck: Deck;
}

export default function ConversationPage({ deck }: ConversationPageProps) {
  const [questionKeys, setQuestionKeys] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionKey, setSessionKey] = useState(0);
  const [shareUrl, setShareUrl] = useState('');
  const [isShuffled, setIsShuffled] = useState(true);

  // Motion values for swipe gesture
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-10, 10]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0.5, 0.8, 1, 0.8, 0.5]);

  // Reset x-position when the current question changes
  useEffect(() => {
    x.set(0);
  }, [currentIndex, x]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShareUrl(window.location.href);
    }
    if (deck) {
      const initialQuestionKeys = Object.keys(deck.questions);
      const shuffledKeys = isShuffled
        ? shuffleArray(initialQuestionKeys)
        : initialQuestionKeys;
      setQuestionKeys(shuffledKeys);
      setCurrentIndex(0);
    }
  }, [deck, sessionKey, isShuffled]);

  const handleNext = () => {
    if (currentIndex < questionKeys.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // End of deck, maybe show a summary or restart option
      setCurrentIndex(questionKeys.length); // Go to "end card"
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleReset = useCallback(() => {
    setSessionKey((prev) => prev + 1);
  }, []);

  const isFinished = currentIndex >= questionKeys.length;

  useEffect(() => {
    if (isFinished) {
      const duration = 2.5 * 1000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.85 },
          colors: ['#F59E0B', '#EF4444', '#10B981', '#3B82F6', '#8B5CF6'],
        });

        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.85 },
          colors: ['#F59E0B', '#EF4444', '#10B981', '#3B82F6', '#8B5CF6'],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      frame();
    }
  }, [isFinished]);

  const currentQuestionKey = questionKeys[currentIndex];
  const currentQuestion = deck.questions[currentQuestionKey];

  return (
    <div className="container mx-auto flex h-full max-w-2xl flex-1 flex-col items-center justify-center p-4">
      <div className="flex w-full flex-col items-start">
        <div className="mb-4 flex w-full flex-col items-start sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-col items-start gap-2">
             <Button asChild variant="ghost" className="p-0 h-auto">
              <Link href="/decks">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {siteConfig.conversation.backToDecks}
              </Link>
            </Button>
            <div className="flex items-center space-x-2">
              <Label htmlFor="shuffle-mode">{siteConfig.conversation.modeLabel}:</Label>
              <div className="flex items-center gap-2">
                <Switch
                  id="shuffle-mode"
                  checked={isShuffled}
                  onCheckedChange={setIsShuffled}
                />
                <Label htmlFor="shuffle-mode">{siteConfig.conversation.shuffleLabel}</Label>
              </div>
            </div>
          </div>
          {!isFinished && (
            <p className="text-sm text-muted-foreground self-end sm:self-center">
              {siteConfig.conversation.progress(currentIndex + 1, questionKeys.length)}
            </p>
          )}
        </div>

        <Card className="mb-6 w-full overflow-hidden">
          <div className="relative h-52 w-full">
            <Image
              src={deck.imageMeta?.imageUrl ?? 'https://picsum.photos/seed/1/1200/800'}
              alt={deck.imageMeta?.imageDescription ?? deck.title}
              fill
              className="object-cover"
              data-ai-hint={deck.imageMeta?.imageHint ?? 'abstract'}
            />
          </div>
          <CardContent className="p-6">
            <div className="mb-3 flex flex-wrap gap-2">
              <Badge variant="secondary">{deck.category}</Badge>
              {deck.taxonomy?.subcategory ? (
                <Badge variant="outline">{deck.taxonomy.subcategory}</Badge>
              ) : null}
              {typeof deck.questionCount === 'number' ? (
                <Badge variant="outline">{deck.questionCount} perguntas</Badge>
              ) : null}
            </div>
            <h1 className="font-headline text-3xl font-bold">{deck.title}</h1>
            <p className="mt-2 text-muted-foreground">{deck.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {(deck.smartTags ?? deck.tags.slice(0, 4)).map((tag) => (
                <Badge key={tag} variant="outline" className="bg-background/80">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex + sessionKey}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full touch-none"
            style={!isFinished ? { x, rotate, opacity } : undefined}
            drag={!isFinished ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.8}
            onDragEnd={(event, info) => {
              if (isFinished) return;
              if (info.offset.x < -100) {
                handleNext();
              } else if (info.offset.x > 100) {
                handlePrev();
              }
            }}
          >
            {isFinished ? (
              <Card className="flex min-h-[300px] w-full flex-col items-center justify-center text-center shadow-xl md:min-h-[400px]">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold font-headline">
                    {siteConfig.conversation.finishedTitle}
                  </CardTitle>
                  <CardDescription>
                    {siteConfig.conversation.finishedDescription}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <Button onClick={handleReset} size="lg">
                    <RotateCw className="mr-2 h-4 w-4" />
                    {siteConfig.conversation.startOver}
                  </Button>
                  <ShareButton
                    shareData={{
                      title: siteConfig.conversation.shareDeckTitle(deck.title),
                      text: deck.description,
                      url: shareUrl,
                    }}
                  />
                </CardContent>
              </Card>
            ) : (
              <Card className="relative w-full overflow-hidden shadow-xl">
                <div className="flex min-h-[300px] flex-col items-center justify-center p-6 text-center md:min-h-[400px]">
                  <p className="font-headline text-2xl font-medium md:text-3xl select-none">
                    {currentQuestion}
                  </p>
                  <p className="absolute bottom-4 text-xs text-muted-foreground animate-pulse hidden md:block">
                    Deslize para os lados para navegar ou use os botões abaixo
                  </p>
                </div>
                <div className="flex justify-between items-center gap-4 border-t bg-muted/50 p-4">
                  <Button
                    variant="outline"
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className="flex-1"
                  >
                    Voltar
                  </Button>
                  <Button
                    onClick={handleNext}
                    className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {siteConfig.conversation.nextQuestion}
                  </Button>
                </div>
              </Card>
            )}
          </motion.div>
        </AnimatePresence>
        {!isFinished && (
          <div className="mt-6 flex w-full items-center justify-center gap-4">
            <Button variant="outline" onClick={handleReset}>
              <RotateCw className="mr-2 h-4 w-4" />
              {siteConfig.conversation.restart}
            </Button>
            <ShareButton
              shareData={{
                title: siteConfig.conversation.shareDeckInvite(deck.title),
                text: deck.description,
                url: shareUrl,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
