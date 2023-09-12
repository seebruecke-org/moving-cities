import { fetchAPI } from '@/lib/api';
import { getBlockFragments } from '@/lib/blocks';

export async function fetchNewsEntryBySlug(client, slug) {
  const data = await fetchAPI(
    client,
    `
            query NewsEntryBySlug($slug: String) {
                newsEntries(filters: { slug: { eq: $slug } }) {
                    data {
                        attributes {
                            createdAt
                            title
                            slug
                            region
                            
                            content {
                                __typename
                                ${getBlockFragments(['Section', 'Quote', 'DownloadSection'])}
                            }
                        }
                    }
                }
            }
        `,
    { slug }
  );

  if (!data) {
    return null;
  }

  const { newsEntries } = data;
  return newsEntries[0];
}

export async function fetchAllNewsEntries(client) {
  const { newsEntries } = await fetchAPI(
    client,
    `
        query AllNewsEntries {
            newsEntries: newsEntries {
                data {
                    attributes {
                        title
                        slug
                        region
                        teaser
                    }
                }
            }
        }
        `
  );

  return newsEntries;
}

export async function fetchAllNewsEntryPaths(client) {
  const { newsEntries } = await fetchAPI(
    client,
    `
        query AllNewsEntryPaths {
            newsEntries: newsEntries {
                data {
                    attributes {
                        slug
                    }
                }
            }
        }
        `
  );

  return newsEntries;
}
