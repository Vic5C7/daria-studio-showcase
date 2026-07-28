import type { Language } from "../data/siteContent";

export const defaultLanguage: Language = "zh";

const storageKey = "dg-photography-language";

export function readSavedLanguage(): Language {
  if (typeof window === "undefined") {
    return defaultLanguage;
  }

  const savedLanguage = window.localStorage.getItem(storageKey);
  return savedLanguage === "en" || savedLanguage === "zh" ? savedLanguage : defaultLanguage;
}

export function saveLanguage(language: Language) {
  window.localStorage.setItem(storageKey, language);
  document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
}
