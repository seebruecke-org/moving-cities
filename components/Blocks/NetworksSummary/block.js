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
      query NetworksByCitySlug($locale: String = "en", $slug: String) {
        cities(where: { locale: $locale, slug: $slug }) {
          networks {
            name
            slug
          }
        }
      }`,
      { locale, slug }
    );

    return data?.cities?.[0]?.networks;
  }

  const networks = await fetchNetworksByCitySlug(client, context.slug, locale);

  return {
    ...data,
    networks
  };
}
