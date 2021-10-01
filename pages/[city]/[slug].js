import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import BackTo from '@/components/BackTo';
import BlockSwitch from '@/components/Blocks/BlockSwitch';
import ProgramHeader from '@/components/ProgramHeader';
import Heading from '@/components/Heading';
import Quote from '@/components/Blocks/Quote';
import Paragraph from '@/components/Paragraph';
import SEO from '@/components/SEO';
import Section from '@/components/Blocks/Section';
import SidebarMenu from '@/components/SidebarMenu';

const Approach = dynamic(() => import('@/components/Approach'));
const Columns = dynamic(() => import('@/components/Columns'));

import { createClient } from '@/lib/api';
import { fetchApproachBySlug, fetchAllApproachPaths } from '@/lib/approaches';
import { fetchApproaches } from '@/lib/cities';
import { getTranslations } from '@/lib/global';
import { useTranslation } from 'next-i18next';

export default function CityProgramPage({
  approach: {
    title,
    summary,
    content,
    city: { name: cityName, slug: citySlug, icon: cityIcon, approaches: cityApproaches },
    categories,
    related_approaches,
    metadata
  },
  menu
}) {
  const { t } = useTranslation('approaches');
  const { t: tCity } = useTranslation('city');
  const { t: tSlugs } = useTranslation('slugs');
  const { query } = useRouter();

  const approaches = cityApproaches?.length >= 1 ? cityApproaches : related_approaches;

  return (
    <div className="md:flex pb-28 md:pb-0">
      <SEO title={title} metadata={metadata} />

      <SidebarMenu
        items={[
          {
            target: `/${citySlug}`,
            label: tCity('aboutTheCity')
          },

          {
            target: `/${citySlug}/${menu.approaches[0].slug}`,
            label: t('inspiringApproaches'),
            active: true,
            items: menu.approaches.map(({ title, title_short, slug: approachSlug }, index) => ({
              target: `/${citySlug}/${approachSlug}`,
              label: title_short || title,
              active: query.slug === approachSlug
            }))
          }
        ]}
        selectClassName="bg-yellow-300"
      />

      <article className="flex-grow">
        <ProgramHeader city={cityName} title={title} categories={categories} icon={cityIcon}>
          <Heading level={2}>{summary.title}</Heading>

          <Paragraph className="font-bold mt-8" isSmall={false}>
            {summary.content}
          </Paragraph>
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

  const paths = approaches.flat().map(({ slug, city: { slug: citySlug } }) => ({
    params: { city: citySlug, slug }
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
  const menu = await fetchApproaches(client, locale, city);

  return {
    revalidate: 30,
    props: {
      ...translations,
      approach,
      menu
    }
  };
}
