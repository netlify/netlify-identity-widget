import * as en from "./en.json";
import * as fr from "./fr.json";
import * as es from "./es.json";
import * as hu from "./hu.json";
import * as pt from "./pt.json";
import * as pl from "./pl.json";
import * as cs from "./cs.json";
import * as sk from "./sk.json";
import * as ru from "./ru.json";
import * as de from "./de.json";
import * as it from "./it.json";
import * as ar from "./ar.json";
import * as zhCN from "./zh-cn.json";
import * as nl from "./nl.json";
import * as sv from "./sv.json";
import * as sw from "./sw.json";

export type Locale =
  | "en"
  | "fr"
  | "es"
  | "hu"
  | "pt"
  | "pl"
  | "cs"
  | "sk"
  | "ru"
  | "de"
  | "it"
  | "ar"
  | "zhCN"
  | "nl"
  | "sv"
  | "sw";
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
  sk,
  ru,
  de,
  it,
  ar,
  zhCN,
  nl,
  sv,
  sw
};

export const getTranslation = (
  key: string,
  locale: Locale = defaultLocale
): string => {
  const translated = translations[locale]?.[key];
  return translated || translations[defaultLocale][key] || key;
};
