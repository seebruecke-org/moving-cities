import { fetchAPI } from "@/lib/api";

export default `
  networksSummaryTitle: title
  networksSummaryContent: content
`;

export async function sideload(data, context, locale) {
  async function fetchNetworksByCitySlug(slug, locale) {
    const data = await fetchAPI(
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

  const networks = await fetchNetworksByCitySlug(context.slug, locale);

  return {
    ...data,
    networks
  };
}
