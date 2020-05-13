import * as en from "./en.json";
import * as fr from "./fr.json";

export const defaultLocale = "en";
const translations = { en, fr };

export const getTranslation = (key, locale = defaultLocale) => {
  return translations[locale]
    ? translations[locale][key] || key
    : translations[defaultLocale][key] || key;
};
