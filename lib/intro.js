import { fetchAPI } from '@/lib/api';

export async function fetchIntro(client, locale) {
  const data = await fetchAPI(
    client,
    `
    query Intro($locale: String = "en") {
      intro(locale: $locale) {
        title
        intro

        metadata {
          title
          description
          image {
            url
          }
        }
      }
    }`,
    { locale }
  );

  return data;
}
