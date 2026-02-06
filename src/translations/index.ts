import * as en from "./en.json";
import * as fr from "./fr.json";
import * as es from "./es.json";
import * as hu from "./hu.json";
import * as pt from "./pt.json";
import * as pl from "./pl.json";
import * as cs from "./cs.json";
import * as sk from "./sk.json";

export type Locale = "en" | "fr" | "es" | "hu" | "pt" | "pl" | "cs" | "sk";
export type TranslationKey = keyof typeof en;

export const defaultLocale: Locale = "en";
const translations: Record<Locale, Record<string, string>> = {
  en,
  fr,
  es,
  hu,
  pt,
  pl,
  cs,
  sk
};

export const getTranslation = (
  key: string,
  locale: Locale = defaultLocale
): string => {
  const translated = translations[locale]?.[key];
  return translated || translations[defaultLocale][key] || key;
};
