import { useTranslation } from 'next-i18next';

import BackTo from '@/components/BackTo';
import BlockSwitch from '@/components/Blocks/BlockSwitch';
import Button from '@/components/Button';
import Heading from '@/components/Heading';
import Richtext from '@/components/Blocks/Richtext';
import SEO from '@/components/SEO';

import { getTranslations } from '@/lib/global';
import { fetchNetworksBySlug, fetchAllNetworkPaths } from '@/lib/networks';

export default function NetworkPage({ network: { name, content, cities } }) {
  const { t } = useTranslation('networks');

  const featuredCities = cities.filter(({ is_featured }) => is_featured);
  const allCities = cities.filter(({ is_featured }) => !is_featured);

  return (
    <article className="pb-48">
      <SEO title={name} />

      <BackTo title="All networks" uri="/networks" />

      <div className="px-8 mt-12">
        <Heading level={1}>{name}</Heading>

        <div className="mt-12">
          <BlockSwitch blocks={content} renderers={{ Richtext }} />
        </div>

        {featuredCities?.length > 0 && (
          <>
            <Heading level={2} className="mb-8">
              {t('featuredCities')}
            </Heading>

            <div className="flex flex-wrap">
              {featuredCities.map(({ name, slug }) => (
                <Button href={`/${slug}`}>{name}</Button>
              ))}
            </div>
          </>
        )}

        {allCities?.length > 0 && (
          <>
            <Heading level={2} className="mt-10">
              {t('allCities')}
            </Heading>

            <ul>
              {cities.map(({ name }) => (
                <li>{name}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </article>
  );
}

export async function getStaticPaths({ locales }) {
  const networks = await Promise.all(
    locales.map(async (locale) => await fetchAllNetworkPaths(locale))
  );

  const paths = networks.flat().map(({ slug }) => ({
    params: { slug }
  }));

  return {
    paths,
    fallback: 'blocking'
  };
}

export async function getStaticProps({ locale, params: { slug } }) {
  const translations = await getTranslations(locale, ['city', 'networks']);
  const network = await fetchNetworksBySlug(locale, slug);

  return {
    revalidate: 60,
    props: {
      ...translations,
      network
    }
  };
}
