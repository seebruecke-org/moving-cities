import { fetchAPI } from '@/lib/api';
import { mapFEToStrapiLocale } from '@/lib/i18n';

export async function fetchFooter(client, locale) {
  const { footer } = await fetchAPI(
    client,
    `
    query Footer($locale: I18NLocaleCode) {
      footer(locale: $locale) {
        data {
          attributes {
            instagram_url
            x_url
            
            main_items {
              title
              page {
                data {
                  attributes {
                    slug
                  }
                }
              }
            }
            
            secondary_items {
              title
              page {
                data {
                  attributes {
                    slug
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

  return footer;
}
