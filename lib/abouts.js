import { fetchAPI } from '@/lib/api';
import { getBlockFragments } from '@/lib/blocks';
import {mapFEToStrapiLocale, mapStrapiToFELocale} from '@/lib/i18n';
import { createInstance } from 'i18next'
import {getTranslations} from "@/lib/global";

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
    
              ${getBlockFragments([
                'Intro',
                'Section',
                'Media',
                'Follow',
                'LogoGrid',
                'Partner',
                'BrevoNewsletterForm',
                'Team'
              ])}
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

export async function fetchAboutLocalizationsBySlug(client, slug, locale) {
  const normalizedSlug = slug?.[0];

  const data = await fetchAPI(
    client,
    `
    query AboutsLocalizationsBySlug($locale: I18NLocaleCode${normalizedSlug ? ', $slug: String' : ''}) {
      abouts(locale: $locale, filters: { ${
      normalizedSlug ? 'slug: { eq: $slug }' : 'menu_sort: { eq: 0 }'
    } }) {
        data {
          attributes {
            localizations {
              data {
                attributes {
                  slug
                  locale
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
  const about = abouts[0];

  return await about?.localizations?.reduce(async (a, v) => {
    const localizationLocale = mapStrapiToFELocale(v.locale);
    const { _nextI18Next: nextI18Next } = await getTranslations(localizationLocale, [])
    const i18n = await createInstance({
      ...nextI18Next?.userConfig,
      lng: localizationLocale,
      resources: nextI18Next?.initialI18nStore,
    });
    await i18n.init();
    return ({...await a, [localizationLocale]: `/${localizationLocale}/${i18n.t('about', { ns: 'slugs', lng: localizationLocale })}/${v.slug}`})
  }, {});
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
