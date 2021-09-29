import { useTranslation } from 'next-i18next';

import BlockSwitch from '@/components/Blocks/BlockSwitch';
import Follow from '@/components/Blocks/Follow';
import Heading from '@/components/Heading';
import Intro from '@/components/Blocks/Intro';
import LogoGrid from '@/components/Blocks/LogoGrid';
import Media from '@/components/Blocks/Media';
import Partner from '@/components/Blocks/Partner';
import Section from '@/components/Blocks/Section';
import SEO from '@/components/SEO';
import SidebarMenu from '@/components/SidebarMenu';

import { createClient } from '@/lib/api';
import { fetchAboutBySlug, fetchAllAboutPaths, fetchAllAbouts } from '@/lib/abouts';
import { getTranslations } from '@/lib/global';

export default function About({ navigation, about: { title, content, metadata } }) {
  const { t: tSlugs } = useTranslation('slugs');

  return (
    <div className="md:flex pb-28 md:pb-0">
      <SEO title={title} metadata={metadata} />

      <SidebarMenu
        items={navigation.map(({ title, slug, active }) => ({
          target: `/${tSlugs('about')}/${slug !== tSlugs('about') ? slug : ''}`,
          label: title,
          active
        }))}
      />

      <article>
        <Heading level={1} as={2} className="pl-8 md:pl-10 pt-10 md:pt-10 mb-4 md:mb-20 max-w-full">
          <span className="text-3xl md:text-6xl leading-none block">{title}</span>
        </Heading>

        <BlockSwitch
          blocks={content}
          renderers={{
            Follow,
            Intro,
            LogoGrid,
            Media,
            Partner,
            Section
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

  const paths = abouts.flat().map(({ slug }) => ({
    params: { slug: [slug] }
  }));

  return {
    paths,
    fallback: 'blocking'
  };
}

export async function getStaticProps({ locale, params: { slug } }) {
  const translations = await getTranslations(locale, ['city']);
  const client = createClient();
  const about = await fetchAboutBySlug(client, slug, locale);
  const navigation = await fetchAllAbouts(client, locale, { active: slug?.[0] });

  if (about === null) {
    return {
      notFound: true
    };
  }

  return {
    revalidate: 30,
    props: {
      ...translations,
      navigation,
      about
    }
  };
}
