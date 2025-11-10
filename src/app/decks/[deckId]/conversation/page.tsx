'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { notFound, useParams } from 'next/navigation';
import { Link } from '@/navigation';
import { decks, type QuestionKey } from '@/lib/decks';
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
import { AnimatePresence, motion } from 'framer-motion';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useTranslations } from 'next-intl';

// Helper function to shuffle an array
const shuffleArray = (array: QuestionKey[]): QuestionKey[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

export default function ConversationPage() {
  const t = useTranslations('ConversationPage');
  const tDecks = useTranslations('Decks');
  const params = useParams();
  const { deckId } = params;
  const deck = useMemo(() => decks.find((d) => d.id === deckId), [deckId]);

  const [questions, setQuestions] = useState<QuestionKey[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionKey, setSessionKey] = useState(0);
  const [shareUrl, setShareUrl] = useState('');
  const [isShuffled, setIsShuffled] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShareUrl(window.location.href);
    }
    if (deck) {
      const initialQuestions = isShuffled
        ? shuffleArray(deck.questionKeys)
        : deck.questionKeys;
      setQuestions(initialQuestions);
      setCurrentIndex(0);
    }
  }, [deck, sessionKey, isShuffled]);

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // End of deck, maybe show a summary or restart option
      setCurrentIndex(questions.length); // Go to "end card"
    }
  };

  const handleReset = useCallback(() => {
    setSessionKey((prev) => prev + 1);
  }, []);

  if (!deck) {
    return notFound();
  }

  const deckTitle = tDecks(`${deck.id}.title`);
  const deckDescription = tDecks(`${deck.id}.description`);

  const isFinished = currentIndex >= questions.length;

  return (
    <div className="container mx-auto flex h-full max-w-2xl flex-1 flex-col items-center justify-center p-4">
      <div className="flex w-full flex-col items-start">
        <div className="mb-4 flex w-full flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-4">
          <div className="flex flex-col items-start gap-2">
             <Button asChild variant="ghost" className="p-0 h-auto">
              <Link href="/decks">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t('backButton')}
              </Link>
            </Button>
            <div className="flex items-center space-x-2">
              <Label htmlFor="shuffle-mode">{t('modeLabel')}:</Label>
              <div className="flex items-center gap-2">
                <Switch
                  id="shuffle-mode"
                  checked={isShuffled}
                  onCheckedChange={setIsShuffled}
                />
                <Label htmlFor="shuffle-mode">{t('shuffleLabel')}</Label>
              </div>
            </div>
          </div>
          {!isFinished && (
            <p className="text-sm text-muted-foreground self-end sm:self-center">
              {t('questionProgress', { current: currentIndex + 1, total: questions.length })}
            </p>
          )}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex + sessionKey}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {isFinished ? (
              <Card className="flex min-h-[300px] w-full flex-col items-center justify-center text-center shadow-xl md:min-h-[400px]">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold font-headline">
                    {t('endTitle')}
                  </CardTitle>
                  <CardDescription>
                    {t('endSubtitle')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <Button onClick={handleReset} size="lg">
                    <RotateCw className="mr-2 h-4 w-4" />
                    {t('startOverButton')}
                  </Button>
                  <ShareButton
                    shareData={{
                      title: `Check out the '${deckTitle}' deck!`,
                      text: deckDescription,
                      url: shareUrl,
                    }}
                  />
                </CardContent>
              </Card>
            ) : (
              <Card className="relative w-full overflow-hidden shadow-xl">
                <div className="flex min-h-[300px] flex-col items-center justify-center p-6 text-center md:min-h-[400px]">
                  <p className="font-headline text-2xl font-medium md:text-3xl">
                    {questions[currentIndex]}
                  </p>
                </div>
                <div className="flex justify-center border-t bg-muted/50 p-4">
                  <Button
                    onClick={handleNext}
                    size="lg"
                    className="w-full md:w-auto"
                  >
                    {t('nextQuestionButton')}
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
              {t('restartButton')}
            </Button>
            <ShareButton
              shareData={{
                title: `Let's discuss with the '${deckTitle}' deck!`,
                text: deckDescription,
                url: shareUrl,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
