import { useTranslation } from 'next-i18next';

import Heading from '@/components/Heading';
import SEO from '@/components/SEO';

import { createClient } from '@/lib/api';
import { getTranslations } from '@/lib/global';
import { fetchMenu } from '@/lib/menu';
import { fetchFooter } from '@/lib/footer';
import { fetchCounts } from '@/lib/cities';

export default function PageNotFound() {
  const { t } = useTranslation('404');

  return (
    <div className="md:flex pb-10 md:pb-0">
      <SEO title={t('title')} />

      <article>
        <Heading level={1} className="pl-8 md:pl-10 pt-10 md:pt-10 mb-4 md:mb-20 max-w-full">
          {t('title')}
        </Heading>
      </article>
    </div>
  );
}

export async function getStaticProps({ locale }) {
  const translations = await getTranslations(locale, ['404']);
  const client = createClient();
  const menu = await fetchMenu(client, locale);
  const footer = await fetchFooter(client, locale);
  const counts = await fetchCounts(client, locale);

  return {
    revalidate: 60,
    props: {
      ...translations,
      menu,
      footer,
      counts
    }
  };
}
