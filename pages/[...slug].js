import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';

import Approach from '@/components/Approach';
import BlockSwitch from '@/components/Blocks/BlockSwitch';
import Button from '@/components/Button';
import Columns from '@/components/Columns';
import CityHeader from '@/components/CityHeader';
import CityNext from '@/components/CityNext';
import Heading from '@/components/Heading';
import Markdown from '@/components/Markdown';
import Media from '@/components/Blocks/Media';
import NetworksSummary from '@/components/Blocks/NetworksSummary';
import Quote from '@/components/Blocks/Quote';
import Section from '@/components/Blocks/Section';
import SEO from '@/components/SEO';
import SidebarMenu from '@/components/SidebarMenu';

const CountryContext = dynamic(() => import('@/components/CountryContext'));

import { buildCMSUrl } from '@/lib/api';
import { fetchCityBySlug, fetchAllCityPaths } from '@/lib/cities';
import { getTranslations } from '@/lib/global';

export default function CityPage({
  city: { name, subtitle, icon, slug, content, report, approaches, takeaways, country, summary }
}) {
  const { t } = useTranslation('approaches');
  const { t: tCity } = useTranslation('city');

  const menuItems = [
    {
      target: `/${slug}`,
      label: tCity('aboutTheCity'),
      active: true
    }
  ];

  if (approaches?.length > 0) {
    menuItems.push({
      target: `/${slug}/${approaches?.[0]?.slug}`,
      label: t('inspiringApproaches'),
      items: approaches.map(({ title, slug: approachSlug }) => ({
        target: `/${slug}/${approachSlug}`,
        label: title
      }))
    });
  }

  return (
    <div className="md:flex ob-28 md:pb-0">
      <SEO title={name} />

      <SidebarMenu items={menuItems} />

      <article className="flex-grow pb-28">
        <CityHeader title={name} subtitle={subtitle} takeaways={takeaways} icon={icon} />

        <BlockSwitch
          blocks={[
            {
              __typename: 'ComponentBlocksSection',
              title: summary.title,
              sectionContent: {
                content: summary.content
              }
            },
            ...content
          ]}
          renderers={{
            Quote,
            Section,
            Media,
            NetworksSummary
          }}
        />

        {report && (
          <Columns className="px-8 py-12 md:pl-10 max-w-8xl md:mt-10">
            <Heading level={2}>{report.title}</Heading>

            <div className="flex flex-col">
              <div className="mb-4">
                <Markdown>{report.intro}</Markdown>
              </div>

              <Button
                href={buildCMSUrl(report.file.url)}
                priority
                className="self-start mt-8 w-auto">
                {tCity('download.cta')}
                <span className="text-red-300 ml-4">⤓</span>
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
          <Columns className="px-8 md:px-10 max-w-8xl mt-8 md:mt-24">
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

        <div className="mt-48">
          <CityNext name="Marseille" subtitle="Solutions that benefit everyone" uri="/marseille" />
        </div>
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
