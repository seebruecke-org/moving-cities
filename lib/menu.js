import { fetchAPI } from '@/lib/api';
import { mapFEToStrapiLocale } from '@/lib/i18n';

export async function fetchMenu(client, locale) {
  const { menu } = await fetchAPI(
    client,
    `
    query Menu($locale: I18NLocaleCode) {
      menu(locale: $locale) {
        data {
          attributes {
            items: item {
              about {
                data {
                  attributes {
                    title
                    slug
                  }
                }
              }
            }
            
            cta {
              data {
                attributes {
                  slug
                }
              }
            }
          }
        }
      }
    },
  `,
    { locale: mapFEToStrapiLocale(locale) }
  );

  return menu;
}
