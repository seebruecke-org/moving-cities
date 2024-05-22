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
            
            highlights {
              __typename
              ... on ComponentIntroHighlightApproach {
                title
                approach {
                  data {
                    attributes {
                      slug
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
              }
              ... on ComponentIntroHighlightCity {
                title
                city {
                  data {
                    attributes {
                      slug
                    }
                  }
                }
              }
              ... on ComponentIntroHighlightNetwork {
                title
                network {
                  data {
                    attributes {
                      slug
                    }
                  }
                }
              }
              ... on ComponentIntroHighlightNewsEntry {
                title
                news_entry {
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
      }
    }`,
    { locale: mapFEToStrapiLocale(locale) }
  );

  return data;
}
