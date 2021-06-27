import * as en from "./en.json";
import * as fr from "./fr.json";
import * as es from "./es.json";
import * as hu from "./hu.json";
import * as pt from "./pt.json";
import * as pl from "./pl.json";
import * as cs from "./cs.json";
import * as sk from "./sk.json";

export const defaultLocale = "en";
const translations = { en, fr, es, hu, pt, pl, cs, sk };

export const getTranslation = (key, locale = defaultLocale) => {
  const translated = translations[locale] && translations[locale][key];
  return translated || translations[defaultLocale][key] || key;
};
