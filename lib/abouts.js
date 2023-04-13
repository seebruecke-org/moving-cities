import { fetchAPI } from '@/lib/api';
import { getBlockFragments } from '@/lib/blocks';
import { mapFEToStrapiLocale } from '@/lib/i18n';

export async function fetchAboutBySlug(client, slug, locale) {
  const normalizedSlug = slug?.[0];

  const data = await fetchAPI(
    client,
    `
    query AboutsBySlug($locale: I18NLocaleCode${normalizedSlug ? ', $slug: String' : ''}) {
      abouts(locale: $locale, filters: { ${
        normalizedSlug ? 'slug: { eq: $slug }' : 'menu_sort: { eq: 0 }'
      } }) {
        data {
          attributes {
            title
    
            content {
              __typename
    
              ${getBlockFragments(['Intro', 'Section', 'Media', 'Follow', 'LogoGrid', 'Partner'])}
            }
    
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
    { locale: mapFEToStrapiLocale(locale), slug: normalizedSlug }
  );

  if (data?.abouts?.length === 0) {
    return null;
  }

  const { abouts } = data;

  return abouts[0];
}

export async function fetchAllAbouts(client, locale, { active = null }) {
  const { abouts } = await fetchAPI(
    client,
    `
    query AboutsBySlug($locale: I18NLocaleCode) {
      abouts(locale: $locale, sort: "menu_sort:asc", filters: { show_in_menu: { eq: true } }) {
        data {
          attributes {
            title
            slug
            menu_sort
          }
        }
      }
    }`,
    { locale: mapFEToStrapiLocale(locale) }
  );

  return abouts.map(({ slug, ...about }) => ({
    ...about,
    active: slug === active || (about.menu_sort === 0 && !active),
    slug
  }));
}

export async function fetchAllAboutPaths(client, locale) {
  const { abouts } = await fetchAPI(
    client,
    `
    query AboutPaths($locale: I18NLocaleCode) {
      abouts(locale: $locale) {
        data {
          attributes {
            slug
            locale
          }
        }
      }
    }`,
    { locale: mapFEToStrapiLocale(locale) }
  );

  return abouts;
}
