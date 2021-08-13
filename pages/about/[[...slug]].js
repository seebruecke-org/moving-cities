import BlockSwitch from '@/components/Blocks/BlockSwitch';
import Heading from '@/components/Heading';
import Intro from '@/components/Blocks/Intro';
import Section from '@/components/Blocks/Section';
import SEO from '@/components/SEO';
import SidebarMenu from '@/components/SidebarMenu';

import { fetchAboutBySlug, fetchAllAboutPaths, fetchAllAbouts } from '@/lib/abouts';
import { getTranslations } from '@/lib/global';

export default function About({ navigation, about: { title, content }}) {
  return (
    <div className="md:flex">
      <SEO title="About" />

      <SidebarMenu items={navigation.map(({ title, slug }) => ({
        target: `/about/${slug}`,
        label: title
      }))} />

      <article>
        <Heading level={1} className="pl-8 md:pl-10 pt-10">
          {title}
        </Heading>

        <BlockSwitch blocks={content} renderers={{
          Intro,
          Section
        }} />
      </article>
    </div>
  );
}

export async function getStaticPaths({ locales }) {
  const abouts = await Promise.all(locales.map(async locale => await fetchAllAboutPaths(locale)));

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
  const about = await fetchAboutBySlug(slug, locale);
  const navigation = await fetchAllAbouts(locale);

  if (about === null) {
    return {
      notFound: true
    }
  }

  return {
    revalidate: 60,
    props: {
      ...translations,
      navigation,
      about
    }
  };
}
