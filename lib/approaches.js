import { fetchAPI } from '@/lib/api';
import { getBlockFragments } from '@/lib/blocks';

export async function fetchApproachBySlug(client, locale, slug) {
  const data = await fetchAPI(
    client,
    `
    query ApproachBySlug($locale: String = "en", $slug: String) {
      approaches(where: { locale: $locale, slug: $slug }) {
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
    { locale, slug }
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
  const { approaches } = await fetchAPI(
    client,
    `
    query AllApproaches($locale: String = "en", $slug: String) {
      approaches(where: { locale: $locale, categories: { slug: $slug } }) {
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
    { locale, slug: filter }
  );

  return approaches;
}

export async function fetchApproachCategories(client, locale) {
  const { approachCategories } = await fetchAPI(
    client,
    `
    query AllApproachCategories($locale: String = "en") {
      approachCategories(where: { locale: $locale }) {
        title
        slug
      }
    }`,
    { locale }
  );

  return approachCategories;
}

export async function fetchAllApproachPaths(client, locale) {
  const { approaches } = await fetchAPI(
    client,
    `
    query ApproachPaths($locale: String = "en") {
      approaches(where: { locale: $locale }) {
        slug

        city {
          slug
        }
      }
    }`,
    { locale }
  );

  return approaches;
}

export async function fetchAllApproachCategoriesPaths(client, locale) {
  const { approachCategories } = await fetchAPI(
    client,
    `
    query ApproachCategoriesPaths($locale: String = "en") {
      approachCategories(where: { locale: $locale }) {
        slug
      }
    }`,
    { locale }
  );

  return approachCategories;
}
