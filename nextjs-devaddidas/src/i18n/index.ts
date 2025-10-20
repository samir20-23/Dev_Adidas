import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next/initReactI18next';
import resourcesToBackend from 'i18next-resources-to-backend';

export const i18nConfig = {
  supportedLngs: ['en', 'ar'],
  fallbackLng: 'en',
  defaultNS: 'translation',
  react: {
    useSuspense: false,
  },
};

export async function useTranslation(lng: string, ns?: string) {
  const i18n = createInstance();
  await i18n
    .use(initReactI18next)
    .use(resourcesToBackend((language: string, namespace: string) => import(`../locales/${language}/${namespace}.json`)))
    .init({
      ...i18nConfig,
      lng,
      ns: ns ?? i18nConfig.defaultNS,
    });
  return {
    t: i18n.t,
    i18n,
  };
}
