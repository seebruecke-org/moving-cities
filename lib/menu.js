import { fetchAPI } from '@/lib/api';
import { mapFEToStrapiLocale } from '@/lib/i18n';

export async function fetchMenu(client, locale) {
  const { menu } = await fetchAPI(
    client,
    `
    query Menu($locale: String) {
      menu(locale: $locale) {
        items: item {
          about {
            title
            slug
          }
        }

        cta {
          slug
        }
      }
    },
  `,
    { locale: mapFEToStrapiLocale(locale) }
  );

  return menu;
}
