import { fetchAPI } from '@/lib/api';

export default `
  networksSummaryTitle: title
  networksSummaryContent: content
`;

export async function sideload(client, data, context, locale) {
  async function fetchNetworksByCitySlug(client, slug, locale) {
    const data = await fetchAPI(
      client,
      `
      query NetworksByCitySlug($locale: I18NLocaleCode = "en", $slug: String) {
        cities(locale: $locale, filters: { slug: { eq: $slug } }) {
          data {
            attributes {
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
      }`,
      { locale, slug }
    );

    return data?.cities?.[0]?.networks || null;
  }

  const networks = await fetchNetworksByCitySlug(client, context.slug, locale);

  return {
    ...data,
    networks
  };
}
