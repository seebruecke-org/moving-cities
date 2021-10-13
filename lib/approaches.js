import { fetchAPI } from '@/lib/api';
import { getBlockFragments } from '@/lib/blocks';
import { mapFEToStrapiLocale } from '@/lib/i18n';

export async function fetchApproachBySlug(client, locale, slug) {
  const data = await fetchAPI(
    client,
    `
    query ApproachBySlug($locale: String, $slug: String) {
      approaches(locale: $locale, where: { slug: $slug }) {
        title
        slug

        summary {
          title
          content
        }

        city {
          name
          slug
          icon

          approaches {
            title
            slug

            city {
              name
            }

            categories {
              title
            }
          }
        }

        content {
          __typename
          ${getBlockFragments(['Section', 'Quote'])}
        }

        categories {
          title
          slug
        }

        related_approaches {
          title
          slug

          city {
            name
          }

          categories {
            title
          }
        }

        metadata {
          title
          description
          image {
            url
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
  return await fetchAPI(
    client,
    `
    query AllApproaches($locale: String, $slug: String) {
      approachesCount(locale: $locale)

      approaches(locale: $locale, where: {categories: { slug: $slug } }) {
        city {
          name
          slug
        }

        title
        slug

        categories {
          title
        }
      }
    }`,
    { locale: mapFEToStrapiLocale(locale), slug: filter }
  );
}

export async function fetchApproachCategories(client, locale) {
  const { approachCategories } = await fetchAPI(
    client,
    `
    query AllApproachCategories($locale: String) {
      approachCategories(locale: $locale) {
        title
        slug
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
    query ApproachPaths($locale: String) {
      approaches(locale: $locale) {
        slug

        city {
          slug
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
    query ApproachCategoriesPaths($locale: String) {
      approachCategories(locale: $locale) {
        slug
      }
    }`,
    { locale: mapFEToStrapiLocale(locale) }
  );

  return approachCategories;
}
