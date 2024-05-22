import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';

import BackTo from '@/components/BackTo';
import BlockSwitch from '@/components/Blocks/BlockSwitch';
import ProgramHeader from '@/components/ProgramHeader';
import Heading from '@/components/Heading';
import Quote from '@/components/Blocks/Quote';
import Markdown from '@/components/Markdown';
import SEO from '@/components/SEO';
import Section from '@/components/Blocks/Section';
import SidebarMenu from '@/components/SidebarMenu';

const Approach = dynamic(() => import('@/components/Approach'));
const Columns = dynamic(() => import('@/components/Columns'));

import { createClient } from '@/lib/api';
import {
  fetchApproachBySlug,
  fetchAllApproachPaths,
  fetchApproachLocalizationsBySlug
} from '@/lib/approaches';
import { fetchApproaches, fetchCounts } from '@/lib/cities';
import { getTranslations } from '@/lib/global';
import { mapStrapiToFELocale } from '@/lib/i18n';
import { fetchMenu } from '@/lib/menu';
import { fetchFooter } from '@/lib/footer';

export default function ApproachPage({
  approach: {
    title,
    summary,
    content,
    city: { name: cityName, slug: citySlug, icon: cityIcon, approaches: cityApproaches },
    categories,
    related_approaches,
    metadata
  },
  navigation
}) {
  const { t } = useTranslation('approaches');
  const { t: tCity } = useTranslation('city');
  const { t: tSlugs } = useTranslation('slugs');
  const { query } = useRouter();

  const approaches = cityApproaches?.length >= 1 ? cityApproaches : related_approaches;

  return (
    <div className="md:flex pb-10 md:pb-0">
      <SEO title={title} metadata={metadata} />

      <SidebarMenu
        items={[
          {
            target: `/${citySlug}`,
            label: tCity('aboutTheCity')
          },

          {
            target: `/${citySlug}/${navigation.approaches[0].slug}`,
            label: t('inspiringApproaches'),
            active: true,
            items: navigation.approaches.map(
              ({ title, title_short, slug: approachSlug }, index) => ({
                target: `/${citySlug}/${approachSlug}`,
                label: title_short || title,
                active: query.slug === approachSlug
              })
            )
          }
        ]}
        selectClassName="bg-yellow-300"
      />

      <article className="flex-grow">
        <ProgramHeader city={cityName} title={title} categories={categories} icon={cityIcon}>
          <Heading level={2}>{summary.title}</Heading>

          <Markdown
            isSmall={false}
            classNames={{
              p: 'font-bold mt-8'
            }}
          >
            {summary.content}
          </Markdown>
        </ProgramHeader>

        <BlockSwitch blocks={content} renderers={{ Section, Quote }} />

        {approaches?.length > 0 && (
          <Columns className="px-8 md:px-10 max-w-8xl mt-8 md:mt-24">
            <Heading level={2}>{t('inspiringApproachesOfCity')}</Heading>

            <ul className="flex flex-col md:flex-row flex-wrap mt-8 md:mt-0">
              {approaches.map(({ slug: approachSlug, ...approach }) => (
                <li className="md:pr-8 pb-8 w-full md:max-w-1/2">
                  <Approach {...approach} uri={`/${citySlug}/${approachSlug}`} />
                </li>
              ))}
            </ul>
          </Columns>
        )}

        <BackTo
          title={t('allInspiringApproaches')}
          uri={`/${tSlugs('approaches')}`}
          className="mx-8 mt-20 md:mt-48"
        />
      </article>
    </div>
  );
}

export async function getStaticPaths({ locales }) {
  const client = createClient();
  const approaches = await Promise.all(
    locales.map(async (locale) => await fetchAllApproachPaths(client, locale))
  );

  const paths = approaches
    .flat()
    .filter(({ city, slug }) => !!city?.slug && !!slug)
    .map(({ slug, locale, city: { slug: citySlug } }) => ({
      params: { city: citySlug, slug },
      locale: mapStrapiToFELocale(locale)
    }));

  return {
    paths,
    fallback: 'blocking'
  };
}

export async function getStaticProps({ locale, params: { city, slug } }) {
  const translations = await getTranslations(locale, ['approaches', 'city']);
  const client = createClient();
  const approach = await fetchApproachBySlug(client, locale, slug);
  const localizations = await fetchApproachLocalizationsBySlug(client, locale, slug);
  const navigation = await fetchApproaches(client, locale, city);
  const menu = await fetchMenu(client, locale);
  const footer = await fetchFooter(client, locale);
  const counts = await fetchCounts(client, locale);

  if (approach === null) {
    return {
      notFound: true,
      revalidate: 120
    };
  }

  return {
    revalidate: 240,
    props: {
      ...translations,
      approach,
      navigation,
      menu,
      footer,
      localizations,
      counts
    }
  };
}
