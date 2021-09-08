import { fetchAPI } from '@/lib/api';

export async function fetchIntro(locale) {
  const data = await fetchAPI(
    `
    query Intro($locale: String = "en") {
      intro(locale: $locale) {
        title
        intro
      }
    }`,
    { locale }
  );

  return data;
}
