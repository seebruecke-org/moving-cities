import { fetchAPI } from '@/lib/api';
import { getBlockFragments } from '@/lib/blocks';
import { mapFEToStrapiLocale } from '@/lib/i18n';

export async function fetchApproachBySlug(client, locale, slug) {
  const data = await fetchAPI(
    client,
    `
    query ApproachBySlug($locale: I18NLocaleCode, $slug: String) {
      approaches(locale: $locale, filters: { slug: { eq: $slug } }) {
        data {
          attributes {
            title
            slug

            summary {
              title
              content
            }

            city {
              data {
                attributes {
                  name
                  slug
                  icon

                  approaches {
                    data {
                      attributes {
                        title
                        slug

                        city {
                          data {
                            attributes {
                              name
                            }
                          }
                        }

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
            
            content {
              __typename
              ${getBlockFragments(['Section', 'Quote'])}
            }
            
            categories {
              data {
                attributes {
                  title
                  slug
                }
              }
            }
            
            related_approaches {
              data {
                attributes {
                  title
                  slug
                  
                  city {
                    data {
                      attributes {
                        name
                      }
                    }
                  }
                  
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

  if (!data) {
    return null;
  }

  const { approaches } = data;
  const approach = approaches[0];

  if (approach?.city?.approaches) {
    approach.city.approaches = approach.city.approaches.filter(
      (approach) => approach.slug !== slug
    );
  }

  return approaches[0];
}

export async function fetchAllApproaches(client, locale, filter) {
  let data = await fetchAPI(
    client,
    `
    query AllApproaches($locale: I18NLocaleCode, $slug: String) {
      approachesCount: approaches(locale: $locale) {
        meta {
          pagination {
            total
          }
        }
      }

      approaches(locale: $locale, filters: {categories: { slug: { eq: $slug } } }) {
        data {
          attributes {
            city {
              data {
                attributes {
                  name
                  slug
                }
              }
            }
    
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
    }`,
    { locale: mapFEToStrapiLocale(locale), slug: filter }
  );

  return {
    ...data,
    approachesCount: data.approachesCount?.meta?.pagination?.total
  };
}

export async function fetchApproachCategories(client, locale) {
  const { approachCategories } = await fetchAPI(
    client,
    `
    query AllApproachCategories($locale: I18NLocaleCode) {
      approachCategories(locale: $locale) {
        data {
          attributes {
            title
            slug
          }
        }
      }
    }`,
    { locale: mapFEToStrapiLocale(locale) }
  );

  return approachCategories;
}

export async function fetchAllApproachPaths(client, locale) {
  const { approaches } = await fetchAPI(
    client,
    `
    query ApproachPaths($locale: I18NLocaleCode) {
      approaches(locale: $locale) {
        data {
          attributes {
            slug
            locale

            city {
              data {
                attributes {
                  slug
                }
              }
            }
          }
        }
      }
    }`,
    { locale: mapFEToStrapiLocale(locale) }
  );

  return approaches;
}

export async function fetchAllApproachCategoriesPaths(client, locale) {
  const { approachCategories } = await fetchAPI(
    client,
    `
    query ApproachCategoriesPaths($locale: I18NLocaleCode) {
      approachCategories(locale: $locale) {
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

  return approachCategories;
}
