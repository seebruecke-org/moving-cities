import { format } from 'date-fns';
import { getTranslations } from '@/lib/global';
import { createClient } from '@/lib/api';
import {
  fetchAllNewsEntryPaths,
  fetchNewsEntryBySlug,
  fetchNewsLocalizationsBySlug
} from '@/lib/news';
import { fetchMenu } from '@/lib/menu';
import SidebarMenu from '@/components/SidebarMenu/SidebarMenu';
import { useTranslation } from 'next-i18next';
import Section from '@/components/Blocks/Section';
import DownloadSection from '@/components/Blocks/DownloadSection';
import Quote from '@/components/Blocks/Quote';
import BlockSwitch from '@/components/Blocks/BlockSwitch';
import BackTo from '@/components/BackTo';
import Media from '@/components/Blocks/Media';
import VideoEmbed from '@/components/Blocks/VideoEmbed';

export default function NewsEntryPage({ newsEntry }) {
  const { t: tSlugs } = useTranslation('slugs');
  const { t: tNews } = useTranslation('news');

  return (
    <div className="md:flex pb-10 md:pb-0">
      <SidebarMenu
        items={[
          {
            target: `/${tSlugs('news')}`,
            label: tNews('news'),
            items: [
              {
                target: `/${tSlugs('news')}`,
                label: tNews('backToOverview')
              }
            ]
          }
        ]}
        selectClassName="bg-yellow-300"
      />

      <article className="flex-grow">
        <header className="bg-gradient-to-br from-red-300 to-pink-300 grid py-20 pt-20 px-8 mb-6 md:px-40">
          <div className="mt-16 md:mt-0">
            <h1 className="font-raptor font-bold">
              {newsEntry?.region && (
                <span className="block text-3xl mb-6">{newsEntry?.region}</span>
              )}
              <span className="font-raptor text-2xl md:text-4xl font-bold leading-none">
                {newsEntry?.title}
              </span>
            </h1>
            <p className="mt-8 font-raptor text-s leading-normal">
              {tNews('createdAt', { date: format(new Date(newsEntry?.date), 'yyyy/MM/dd') })}
            </p>
          </div>
        </header>

        <BlockSwitch
          blocks={newsEntry?.content}
          renderers={{ Media, Section, Quote, DownloadSection, VideoEmbed }}
        />

        <BackTo
          title={tNews('backToOverview')}
          uri={`/${tSlugs('news')}`}
          className="mx-8 mt-20 md:mt-48"
        />
      </article>
    </div>
  );
}

export async function getStaticPaths() {
  const client = createClient();
  const newsEntries = await fetchAllNewsEntryPaths(client);

  const paths = newsEntries.flat().map(({ slug }) => ({
    params: { slug }
  }));

  return {
    paths: [...paths],
    fallback: 'blocking'
  };
}

export async function getStaticProps({ locale, params: { slug } }) {
  const translations = await getTranslations(locale, ['news']);
  const client = createClient();
  const newsEntry = await fetchNewsEntryBySlug(client, slug);
  const localizations = await fetchNewsLocalizationsBySlug(slug);
  const menu = await fetchMenu(client, locale);

  return {
    revalidate: 240,
    props: {
      ...translations,
      menu,
      newsEntry,
      localizations
    }
  };
}
