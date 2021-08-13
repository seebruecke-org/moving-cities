import { fetchAPI } from "@/lib/api";

export async function fetchAllApproaches(locale) {
  const { approaches } = await fetchAPI(`
    query AllApproaches($locale: String = "en") {
      approaches(where: { locale: $locale }) {
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
    { locale }
  );

  return approaches;
}

export async function fetchApproachCategories(locale) {
  const { approchCategories } = await fetchAPI(`
    query AllApproachCategories($locale: String = "en") {
      approchCategories(where: { locale: $locale }) {
        title
        slug
      }
    }`,
    { locale }
  );

  return approchCategories;
}
