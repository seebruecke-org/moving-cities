import { fetchAPI } from '@/lib/api';
import { mapFEToStrapiLocale } from '@/lib/i18n';

export async function fetchIntro(client, locale) {
  const data = await fetchAPI(
    client,
    `
    query Intro($locale: String = "en") {
      intro(locale: $locale) {
        title
        intro
      }
    }`,
    { locale: mapFEToStrapiLocale(locale) }
  );

  return data;
}
