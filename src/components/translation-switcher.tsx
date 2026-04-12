'use client';

import { useEffect, useMemo, useState } from 'react';
import { Languages } from 'lucide-react';
import { siteConfig } from '@/lib/site';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

declare global {
  interface Window {
    google?: {
      translate?: {
        TranslateElement: new (
          options: Record<string, unknown>,
          elementId: string
        ) => unknown;
      };
    };
    googleTranslateElementInit?: () => void;
  }
}

const TRANSLATION_STORAGE_KEY = 'conversa-solta-language';
const GOOGLE_COOKIE_KEY = 'googtrans';
const SCRIPT_ID = 'google-translate-script';
const WIDGET_ID = 'google_translate_element';

type TranslationState = 'loading' | 'ready' | 'error';

function getGoogleCookie() {
  if (typeof document === 'undefined') {
    return null;
  }

  const entry = document.cookie
    .split('; ')
    .find((cookie) => cookie.startsWith(`${GOOGLE_COOKIE_KEY}=`));

  return entry ? decodeURIComponent(entry.split('=')[1]) : null;
}

function setGoogleCookie(language: string) {
  if (typeof document === 'undefined') {
    return;
  }

  if (language === siteConfig.sourceLanguage) {
    document.cookie = `${GOOGLE_COOKIE_KEY}=;path=/;max-age=0`;
    return;
  }

  const value = `/${siteConfig.sourceLanguage}/${language}`;
  document.cookie = `${GOOGLE_COOKIE_KEY}=${encodeURIComponent(value)};path=/;max-age=31536000`;
}

function getStoredLanguage() {
  if (typeof window === 'undefined') {
    return siteConfig.sourceLanguage;
  }

  const stored = window.localStorage.getItem(TRANSLATION_STORAGE_KEY);
  if (stored) {
    return stored;
  }

  const cookie = getGoogleCookie();
  if (cookie) {
    const [, language] = cookie.split(`/${siteConfig.sourceLanguage}/`);
    return language || siteConfig.sourceLanguage;
  }

  return siteConfig.sourceLanguage;
}

function persistLanguage(language: string) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(TRANSLATION_STORAGE_KEY, language);
  }

  setGoogleCookie(language);
  document.documentElement.lang =
    language === siteConfig.sourceLanguage ? siteConfig.locale : language;
}

export default function TranslationSwitcher() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>(siteConfig.sourceLanguage);
  const [status, setStatus] = useState<TranslationState>('loading');

  const languages = useMemo(
    () => [
      ...siteConfig.translation.commonLanguages,
      ...siteConfig.translation.extendedLanguages,
    ],
    []
  );

  useEffect(() => {
    const language = getStoredLanguage();
    setSelectedLanguage(language);
    persistLanguage(language);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.googleTranslateElementInit = () => {
      try {
        if (!window.google?.translate?.TranslateElement) {
          setStatus('error');
          return;
        }

        new window.google.translate.TranslateElement(
          {
            pageLanguage: siteConfig.sourceLanguage,
            includedLanguages: languages.map((language) => language.code).join(','),
            autoDisplay: false,
          },
          WIDGET_ID
        );

        setStatus('ready');
      } catch (error) {
        console.error('Falha ao iniciar tradutor', error);
        setStatus('error');
      }
    };

    if (window.google?.translate?.TranslateElement) {
      window.googleTranslateElementInit();
      return;
    }

    const existingScript = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (existingScript) {
      return;
    }

    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    script.onerror = () => setStatus('error');
    document.body.appendChild(script);

    const timeout = window.setTimeout(() => {
      if (!window.google?.translate?.TranslateElement) {
        setStatus('error');
      }
    }, 6000);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [languages]);

  const handleChange = (language: string) => {
    setSelectedLanguage(language);
    persistLanguage(language);
    window.location.reload();
  };

  const currentLanguage = languages.find((language) => language.code === selectedLanguage);

  return (
    <div className="flex min-w-0 items-center gap-2 rounded-full border border-border/70 bg-background/80 px-3 py-2">
      <div id={WIDGET_ID} className="hidden" />
      <Languages className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
      <label className="sr-only" htmlFor="translation-switcher">
        {siteConfig.translation.label}
      </label>
      <span className="hidden text-xs font-medium text-muted-foreground sm:inline">
        {siteConfig.translation.label}
      </span>
      <Select value={selectedLanguage} onValueChange={handleChange}>
        <SelectTrigger
          id="translation-switcher"
          className="h-auto min-w-0 max-w-[170px] border-0 bg-transparent px-0 py-0 text-sm font-medium text-foreground shadow-none ring-0 focus:ring-0 focus:ring-offset-0"
        >
          <SelectValue placeholder={siteConfig.translation.helper} />
        </SelectTrigger>
        <SelectContent className="max-h-80 min-w-[240px]">
          <SelectGroup>
            <SelectLabel>Mais usados</SelectLabel>
          {siteConfig.translation.commonLanguages.map((language) => (
            <SelectItem key={language.code} value={language.code}>
              {language.label}
            </SelectItem>
          ))}
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Outros idiomas</SelectLabel>
          {siteConfig.translation.extendedLanguages.map((language) => (
            <SelectItem key={language.code} value={language.code}>
              {language.label}
            </SelectItem>
          ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <span className="hidden text-xs text-muted-foreground xl:inline">
        {status === 'error'
          ? siteConfig.translation.unavailable
          : currentLanguage?.label ?? siteConfig.translation.helper}
      </span>
    </div>
  );
}
