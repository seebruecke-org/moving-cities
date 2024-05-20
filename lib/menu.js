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
            main_items {
              title
              page
            }
            
            secondary_items {
              title
              page
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
