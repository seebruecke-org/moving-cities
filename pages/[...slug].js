import { useTranslation } from 'next-i18next';

import Approach from '@/components/Approach';
import BlockSwitch from '@/components/Blocks/BlockSwitch';
import Button from '@/components/Button';
import Columns from '@/components/Columns';
import CityHeader from '@/components/CityHeader';
import CountryContext from '@/components/CountryContext';
import Heading from '@/components/Heading';
import NetworksSummary from '@/components/Blocks/NetworksSummary';
import Paragraph from '@/components/Paragraph';
import Quote from '@/components/Blocks/Quote';
import Section from '@/components/Blocks/Section';
import SEO from '@/components/SEO';
import SidebarMenu from '@/components/SidebarMenu';

import { fetchCityBySlug, fetchAllCityPaths } from '@/lib/cities';
import { getTranslations } from '@/lib/global';

export default function CityPage({
  city: { name, subtitle, slug, content, report, approaches, takeaways, country }
}) {
  const { t } = useTranslation('approaches');
  const { t: tCity } = useTranslation('city');

  return (
    <div className="md:flex">
      <SEO title={name} />

      <SidebarMenu
        items={[
          {
            target: `/${slug}`,
            label: tCity('aboutTheCity'),
            active: true
          },

          {
            target: `/${slug}/${approaches?.[0]?.slug}`,
            label: t('inspiringApproaches'),
            items: approaches.map(({ title, slug: approachSlug }) => ({
              target: `/${slug}/${approachSlug}`,
              label: title
            }))
          }
        ]}
      />

      <article className="flex-grow pb-28">
        <CityHeader title={name} subtitle={subtitle} takeaways={takeaways} />

        <BlockSwitch
          blocks={content}
          renderers={{
            Quote,
            Section,
            NetworksSummary
          }}
        />

        {report?.url && (
          <Columns className="pl-8 md:pl-10 max-w-8xl md:mt-10">
            <Heading level={2}>{tCity('download.title')}</Heading>

            <div className="flex flex-col">
              <Paragraph>{tCity('download.intro')}</Paragraph>

              <Button href={report.url} priority className="self-start mt-8 w-auto">
                {tCity('download.cta')}
              </Button>
            </div>
          </Columns>
        )}

        {country && (
          <div className="max-w-8xl mt-12 md:mt-16 mb-12 md:mb-6">
            <CountryContext {...country} />
          </div>
        )}

        {approaches?.length > 0 && (
          <Columns className="px-8 md:px-10 max-w-8xl mt-8 md:mt-16">
            <Heading level={2}>{t('inspiringApproaches')}</Heading>

            <ul className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-6 mt-8 md:mt-0">
              {approaches.map(({ slug: approachSlug, ...approach }) => (
                <li>
                  <Approach {...approach} uri={`/${slug}/${approachSlug}`} />
                </li>
              ))}
            </ul>
          </Columns>
        )}
      </article>
    </div>
  );
}

export async function getStaticPaths({ locales }) {
  const cities = await Promise.all(locales.map(async (locale) => await fetchAllCityPaths(locale)));

  const paths = cities.flat().map(({ slug }) => ({
    params: { slug: [slug] }
  }));

  return {
    paths,
    fallback: 'blocking'
  };
}

export async function getStaticProps({ locale, params: { slug } }) {
  const translations = await getTranslations(locale, ['approaches', 'city']);
  const city = await fetchCityBySlug(slug[0], locale);

  if (!city) {
    return {
      notFound: true
    };
  }

  return {
    revalidate: 60,
    props: {
      ...translations,
      city
    }
  };
}
