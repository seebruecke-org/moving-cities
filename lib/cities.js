import { fetchAPI } from '@/lib/api';
import { getBlockFragments, sideloadBlockData } from '@/lib/blocks';
import { toMapboxCoordinates, getBounds } from '@/lib/coordinates';
import { mapFEToStrapiLocale, mapStrapiToFELocale } from '@/lib/i18n';
import { i18n } from '../next-i18next.config';
import { getTranslations } from '@/lib/global';
import { createInstance } from 'i18next';

export async function fetchFeaturedCities(client, locale) {
  const { cities } = await fetchAPI(
    client,
    `
    query FeaturedCities($locale: I18NLocaleCode) {
      cities(locale: $locale, filters: { is_featured: { eq: true } }, sort: "name") {
        data {
          id
          
          attributes {
            name
            subtitle
            slug
            icon
            coordinates

            summary {
              title
              content
            }
            
            reportFile: report_file {
              data {
                attributes {
                  url
                }
              }
            }
    
            approaches {
              data {
                attributes {
                  title
                  slug
        
                  categories {
                    data {
                      attributes {
                        title
                      }
                    }
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

  const citiesWithCoordiantes = cities.map(({ coordinates, ...city }) => ({
    coordinates: toMapboxCoordinates(coordinates),
    ...city
  }));
  const bounds = getBounds(citiesWithCoordiantes.map(({ coordinates }) => coordinates));

  return {
    bounds,
    cities: citiesWithCoordiantes
  };
}

export async function fetchFeaturedCitiesLocalizations() {
  const { locales } = i18n;
  return await locales?.reduce(async (a, v) => {
    const { _nextI18Next: nextI18Next } = await getTranslations(v, []);
    const i18n = await createInstance({
      ...nextI18Next?.userConfig,
      lng: v,
      resources: nextI18Next?.initialI18nStore
    });
    await i18n.init();
    return { ...(await a), [v]: `/${v}/${i18n.t('featuredCities', { ns: 'slugs', lng: v })}` };
  }, {});
}

export async function fetchAllCitiesByCountry(client, locale, { active = null }) {
  const { countries } = await fetchAPI(
    client,
    `
    query AllCitiesByCountry($locale: I18NLocaleCode) {
      countries(locale: $locale, sort: "name") {
        data {
          id
          
          attributes {
            name
            slug

            cities {
              data {
                id
                
                attributes {
                  name
                  coordinates
                  reasoning
        
                  networks {
                    data {
                      attributes {
                        name
                        slug
                      }
                    }
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

  const countriesWithCoordiantes = countries.map(({ cities, slug, ...country }) => ({
    slug,
    active: active == slug,
    cities: cities
      .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
      .map(({ coordinates, ...city }) => ({
        coordinates: toMapboxCoordinates(coordinates),
        ...city
      })),
    ...country
  }));
  const bounds = getBounds(
    countriesWithCoordiantes.flatMap(({ cities }) => cities.map(({ coordinates }) => coordinates))
  );

  return {
    bounds,
    countries: countriesWithCoordiantes
  };
}

export async function fetchCountryLocalizationsBySlug(client, locale, slug) {
  if (slug && slug !== '') {
    const { countries } = await fetchAPI(
      client,
      `
      query CountryLocalizationsBySlug($locale: I18NLocaleCode, $slug: String) {
        countries(locale: $locale, filters: { slug: { eq: $slug } }) {
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
      { locale: mapFEToStrapiLocale(locale), slug }
    );

    if (countries?.length === 0) {
      return null;
    }

    const country = countries[0];

    return await country?.localizations?.reduce(async (a, v) => {
      const localizationLocale = mapStrapiToFELocale(v.locale);
      const { _nextI18Next: nextI18Next } = await getTranslations(localizationLocale, []);
      const i18n = await createInstance({
        ...nextI18Next?.userConfig,
        lng: localizationLocale,
        resources: nextI18Next?.initialI18nStore
      });
      await i18n.init();
      return {
        ...(await a),
        [localizationLocale]: `/${localizationLocale}/${i18n.t('cities', {
          ns: 'slugs',
          lng: localizationLocale
        })}/${v.slug}`
      };
    }, {});
  } else {
    const { locales } = i18n;
    return await locales?.reduce(async (a, v) => {
      const { _nextI18Next: nextI18Next } = await getTranslations(v, []);
      const i18n = await createInstance({
        ...nextI18Next?.userConfig,
        lng: v,
        resources: nextI18Next?.initialI18nStore
      });
      await i18n.init();
      return { ...(await a), [v]: `/${v}/${i18n.t('cities', { ns: 'slugs', lng: v })}` };
    }, {});
  }
}

export async function fetchCityBySlug(client, slug, locale) {
  const data = await fetchAPI(
    client,
    `
    query CityBySlug($locale: I18NLocaleCode, $slug: String) {
      cities(locale: $locale, filters: { slug: { eq: $slug } }) {
        data {
          attributes {
            name
            slug
            subtitle
            icon

            summary {
              title
              content
            }

            takeaways {
              content
            }

            report {
              title
              intro
            }
    
            reportFile: report_file {
              data {
                attributes {
                  url
                }
              }
            }

            content {
              __typename
              ${getBlockFragments(['Section', 'Quote', 'NetworksSummary', 'Media'])}
            }

            approaches {
              data {
                attributes {
                  title
                  title_short
                  slug
        
                  categories {
                    data {
                      attributes {
                        title
                      }
                    }
                  }
                }
              }
            }
    
            country {
              data {
                attributes {
                  name
                  content {
                    __typename
                    ${getBlockFragments(['Richtext'])}
                  }
                }
              }
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
    { locale: mapFEToStrapiLocale(locale), slug }
  );

  if (!data || !data?.cities?.length) {
    return null;
  }

  const { cities } = data;
  const city = cities[0];

  city.content = await sideloadBlockData(client, city?.content, city, locale);

  return city;
}

export async function fetchCityLocalizationsBySlug(client, slug, locale) {
  const { cities } = await fetchAPI(
    client,
    `
    query CityBySlug($locale: I18NLocaleCode, $slug: String) {
      cities(locale: $locale, filters: { slug: { eq: $slug } }) {
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
    { locale: mapFEToStrapiLocale(locale), slug }
  );

  if (cities?.length === 0) {
    return null;
  }

  const city = cities[0];

  return await city?.localizations?.reduce(async (a, v) => {
    const localizationLocale = mapStrapiToFELocale(v.locale);
    return { ...(await a), [localizationLocale]: `/${localizationLocale}/${v.slug}` };
  }, {});
}

export async function fetchApproaches(client, locale, slug) {
  const data = await fetchAPI(
    client,
    `
    query ApproachesBySlug($locale: I18NLocaleCode, $slug: String) {
      cities(locale: $locale, filters: { slug: { eq: $slug } }) {
        data {
          attributes {
            approaches {
              data {
                attributes {
                  title
                  title_short
                  slug
                }
              }
            }
          }
        }
      }
    }`,
    { locale: mapFEToStrapiLocale(locale), slug }
  );

  if (!data) {
    return null;
  }

  const { cities } = data;

  return cities[0];
}

export async function fetchAllCityPaths(client, locale) {
  const { cities } = await fetchAPI(
    client,
    `
    query FeaturedCityPaths($locale: I18NLocaleCode) {
      cities(locale: $locale, filters: { is_featured: { eq: true } }) {
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

  return cities;
}

export async function fetchNextCity(client, slug, locale) {
  const { cities } = await fetchAPI(
    client,
    `
    query AllCities($locale: I18NLocaleCode) {
      cities(locale: $locale, filters: { is_featured: { eq: true } }) {
        data {
          id
          
          attributes {
            slug
          }
        }
      }
    }`,
    { locale: mapFEToStrapiLocale(locale) }
  );

  const currentCityIndex = cities.data?.findIndex((city) => city.attributes?.slug === slug);
  const nextCity = cities[currentCityIndex + 1] || null;

  if (!nextCity) {
    return null;
  }

  const { city } = await fetchAPI(
    client,
    `
    query NextCities($id: ID!) {
      city(id: $id) {
        data {
          attributes {
            name
            subtitle
            slug
          }
        }
      }
    }`,
    { id: nextCity.id }
  );

  return city;
}

export async function fetchCounts(client, locale) {
  const counts = await fetchAPI(
    client,
    `
    query Counts($locale: I18NLocaleCode) {
      citiesCount: cities(locale: $locale) {
        meta {
          pagination {
            total
          }
        }
      }
      featuredCitiesCount: cities(locale: $locale, filters: { is_featured: { eq: true }}) {
        meta {
          pagination {
            total
          }
        }
      }
      networksCount: networks(locale: $locale) {
        meta {
          pagination {
            total
          }
        }
      }
      approachesCount: approaches(locale: $locale) {
        meta {
          pagination {
            total
          }
        }
      }
    }`,
    { locale: mapFEToStrapiLocale(locale) }
  );

  return {
    citiesCount: counts.citiesCount?.meta?.pagination?.total,
    featuredCitiesCount: counts.featuredCitiesCount?.meta?.pagination?.total,
    networksCount: counts.networksCount?.meta?.pagination?.total,
    approachesCount: counts.approachesCount?.meta?.pagination?.total
  };
}
