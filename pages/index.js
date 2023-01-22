import dynamic from 'next/dynamic';
import SEO from '@/components/SEO';
const Intro = dynamic(() => import('@/components/Intro'));
import { createClient } from '@/lib/api';
import { fetchCounts } from '@/lib/cities';
import { fetchIntro } from '@/lib/intro';
import {getTranslations} from "@/lib/global";


export default function HomePage({ intro, counts }) {
  return (
    <>
      <SEO title={null} description={intro} metadata={intro?.metadata} />
      <Intro {...intro} {...counts} />
    </>
  );
}

export async function getStaticProps({ locale }) {
  const translations = await getTranslations(locale, ['intro']);
  const client = createClient();
  const data = await fetchIntro(client, locale);
  const counts = await fetchCounts(client, locale);

  return {
    revalidate: 360,
    props: {
      ...translations,
      ...data,
      counts
    }
  };
}
