import { useTranslation } from 'next-i18next';

import BackTo from '@/components/BackTo';
import CitiesNetworksList from '@/components/CitiesNetworksList';
import SEO from '@/components/SEO';

import { getTranslations } from '@/lib/global';
import { fetchAllCitiesByCountrySlug } from '@/lib/cities';
import { fetchAllCountryPaths } from '@/lib/networks';

export default function CitiesCountryPage({ country: { name, cities } }) {
  const { t } = useTranslation('networks');

  return (
    <article className="pb-48">
      <SEO title={name} />

      <BackTo title="All Cities" uri="/cities" />

      <h1 className="text-3xl font-bold font-raptor px-8 py-5 bg-yellow-300 shadow-xl z-20 relative">
        {name}
      </h1>
      <CitiesNetworksList cities={cities} className="z-10 pt-4" />
    </article>
  );
}

export async function getStaticPaths({ locales }) {
  const countries = await Promise.all(
    locales.map(async (locale) => await fetchAllCountryPaths(locale))
  );

  const paths = countries.flat().map(({ slug }) => ({
    params: { slug }
  }));

  return {
    paths,
    fallback: 'blocking'
  };
}

export async function getStaticProps({ locale, params: { slug } }) {
  const translations = await getTranslations(locale, ['city', 'networks']);
  const country = await fetchAllCitiesByCountrySlug(locale, slug);

  return {
    revalidate: 60,
    props: {
      ...translations,
      country
    }
  };
}
