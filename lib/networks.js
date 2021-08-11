export async function fetchAllNetworks(locale) {
  const { networks } = await fetchAPI(`
    query AllCitiesByCountry($locale: String = "en") {
      networks(where: { locale: $locale }) {
        name

        country {
          name
        }

        cities {
          name
        }
      }
    }`,
    { locale }
  );

  return networks;
}
