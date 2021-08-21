import { fetchAPI } from '@/lib/api';

export async function fetchIntro(locale) {
  const { intro } = await fetchAPI(
    `
    query Intro($locale: String = "en") {
      intro(locale: $locale) {
        title
        intro
      }
    }`,
    { locale }
  );

  return intro;
}
