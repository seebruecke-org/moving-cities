import { useRouter } from 'next/router';

import BlockSwitch from '@/components/Blocks/BlockSwitch';
import ProgramHeader from '@/components/ProgramHeader';
import Heading from '@/components/Heading';
import Quote from '@/components/Blocks/Quote';
import Paragraph from '@/components/Paragraph';
import SEO from '@/components/SEO';
import Section from '@/components/Blocks/Section';
import SidebarMenu from '@/components/SidebarMenu';

import { fetchApproachBySlug, fetchAllApproachPaths } from '@/lib/approaches';
import { fetchApproaches } from '@/lib/cities';
import { getTranslations } from '@/lib/global';
import { useTranslation } from 'next-i18next';

export default function CityProgramPage({
  approach: {
    title,
    summary,
    content,
    city: { name: cityName, slug: citySlug, icon: cityIcon },
    categories
  },
  menu
}) {
  const { t } = useTranslation('approaches');
  const { t: tCity } = useTranslation('city');
  const { query } = useRouter();

  return (
    <div className="md:flex pb-28 md:pb-0">
      <SEO title={title} />

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
            items: menu.approaches.map(({ title, slug: approachSlug }, index) => ({
              target: `/${citySlug}/${approachSlug}`,
              label: title,
              active: (query.slug = approachSlug)
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
      </article>
    </div>
  );
}

export async function getStaticPaths({ locales }) {
  const approaches = await Promise.all(
    locales.map(async (locale) => await fetchAllApproachPaths(locale))
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
  const approach = await fetchApproachBySlug(locale, slug);
  const menu = await fetchApproaches(locale, city);

  return {
    revalidate: 60,
    props: {
      ...translations,
      approach,
      menu
    }
  };
}
