import { useTranslation } from 'next-i18next';

import BlockSwitch from '@/components/Blocks/BlockSwitch';
import Follow from '@/components/Blocks/Follow';
import Heading from '@/components/Heading';
import Intro from '@/components/Blocks/Intro';
import LogoGrid from '@/components/Blocks/LogoGrid';
import Media from '@/components/Blocks/Media';
import Partner from '@/components/Blocks/Partner';
import Section from '@/components/Blocks/Section';
import BrevoNewsletterForm from '@/components/Blocks/BrevoNewsletterForm';
import Team from '@/components/Blocks/Team';
import SEO from '@/components/SEO';
import SidebarMenu from '@/components/SidebarMenu';

import { createClient } from '@/lib/api';
import {
  fetchAboutBySlug,
  fetchAboutLocalizationsBySlug,
  fetchAllAboutPaths,
  fetchAllAbouts
} from '@/lib/abouts';
import { getTranslations } from '@/lib/global';
import { mapStrapiToFELocale } from '@/lib/i18n';
import { fetchMenu } from '@/lib/menu';
import { fetchFooter } from '@/lib/footer';
import { fetchCounts } from '@/lib/cities';

export default function About({ navigation, about: { title, content, metadata, show_menu } }) {
  const { t: tSlugs } = useTranslation('slugs');

  return (
    <div className="md:flex pb-10 md:pb-0">
      <SEO title={title} metadata={metadata} />

      {show_menu !== false ? (
        <SidebarMenu
          items={navigation.map(({ title, slug, active, menu_sort }) => ({
            target: `/${tSlugs('about')}${menu_sort !== 0 ? `/${slug}` : ''}`,
            label: title,
            active
          }))}
        />
      ) : null}

      <article>
        <Heading level={1} className="pl-8 md:pl-10 pt-10 md:pt-10 mb-4 md:mb-20 max-w-full">
          {title}
        </Heading>

        <BlockSwitch
          blocks={content}
          renderers={{
            Follow,
            Intro,
            LogoGrid,
            Media,
            Partner,
            Section,
            BrevoNewsletterForm,
            Team
          }}
        />
      </article>
    </div>
  );
}

export async function getStaticPaths({ locales }) {
  const client = createClient();
  const abouts = await Promise.all(
    locales.map(async (locale) => await fetchAllAboutPaths(client, locale))
  );

  const paths = abouts
    .flat()
    .filter(({ slug }) => !!slug)
    .map(({ slug, locale }) => ({
      params: { slug: [slug] },
      locale: mapStrapiToFELocale(locale)
    }));

  return {
    paths: [...paths, ...locales.map((locale) => ({ params: { slug: null }, locale }))],
    fallback: 'blocking'
  };
}

export async function getStaticProps({ locale, params: { slug } }) {
  const translations = await getTranslations(locale, ['city', 'newsletter', 'team']);
  const client = createClient();
  const about = await fetchAboutBySlug(client, slug, locale);
  const localizations = await fetchAboutLocalizationsBySlug(client, slug, locale);
  const navigation = await fetchAllAbouts(client, locale, { active: slug?.[0] });
  const menu = await fetchMenu(client, locale);
  const footer = await fetchFooter(client, locale);
  const counts = await fetchCounts(client, locale);

  if (about === null) {
    return {
      notFound: true
    };
  }

  return {
    revalidate: 180,
    props: {
      ...translations,
      navigation,
      about,
      menu,
      footer,
      localizations,
      counts
    }
  };
}
