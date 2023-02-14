import { fetchAPI } from '@/lib/api';
import { mapFEToStrapiLocale } from '@/lib/i18n';

export async function fetchIntro(client, locale) {
  const data = await fetchAPI(
    client,
    `
    query Intro($locale: I18NLocaleCode) {
      intro(locale: $locale) {
        data {
          attributes {
            title
            intro
            
            metadata {
              title
              description
              image {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
          }
        }
      }
    }`,
    { locale: mapFEToStrapiLocale(locale) }
  );

  return data;
}
