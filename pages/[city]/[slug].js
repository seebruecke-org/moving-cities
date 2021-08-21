import BlockSwitch from '@/components/Blocks/BlockSwitch';
import ProgramHeader from '@/components/ProgramHeader';
import Heading from '@/components/Heading';
import Quote from '@/components/Blocks/Quote';
import Paragraph from '@/components/Paragraph';
import SEO from '@/components/SEO';
import Section from '@/components/Blocks/Section';
import SidebarMenu from '@/components/SidebarMenu';

import { fetchApproachBySlug, fetchAllApproachPaths } from '@/lib/approaches';
import { getTranslations } from '@/lib/global';
import { useTranslation } from 'next-i18next';

const MENU_ITEMS = [
  {
    target: '/palermo',
    label: 'About the City'
  },

  {
    target: '/palermo/charter',
    label: 'Inspiring approaches',
    active: true,
    items: [
      {
        target: '/palermo/charter',
        label: 'The TOP Program',
        active: true
      },

      {
        target: '/palermo/open-harbors',
        label: 'Open Harbors Policy'
      }
    ]
  }
];

export default function CityProgramPage({
  approach: {
    title,
    intro,
    content,
    city: { name: cityName, slug: citySlug },
    categories
  }
}) {
  const { t } = useTranslation('approaches');

  return (
    <div className="md:flex">
      <SEO title={title} />

      <SidebarMenu items={MENU_ITEMS} />

      <article className="flex-grow">
        <ProgramHeader city={cityName} title={title} pills={categories.map(({ title }) => title)}>
          <Heading level={2}>{t('whatIsInspiring')}</Heading>

          <Paragraph className="font-bold">{intro}</Paragraph>
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

export async function getStaticProps({ locale, params: { slug } }) {
  const translations = await getTranslations(locale, 'approaches');
  const approach = await fetchApproachBySlug(locale, slug);

  return {
    revalidate: 60,
    props: {
      ...translations,
      approach
    }
  };
}
