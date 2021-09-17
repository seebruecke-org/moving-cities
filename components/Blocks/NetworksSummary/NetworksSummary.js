import { useTranslation } from 'next-i18next';

import Button from '@/components/Button';
import Heading from '@/components/Heading';
import Markdown from '@/components/Markdown';

export default function NetworksSummary({
  networksSummaryTitle,
  networksSummaryContent,
  networks = []
}) {
  const { t } = useTranslation('city');
  const { t: tSlugs } = useTranslation('slugs');

  if (networks?.length === 0) {
    return null;
  }

  return (
    <section className="bg-yellow-300 pt-16 pb-16 px-8 md:px-28">
      <div className="max-w-8xl md:grid md:grid-cols-9">
        <div className="md:col-start-4 md:col-span-5">
          <Heading level={2}>{networksSummaryTitle}</Heading>

          <div className="mt-6 md:mt-12">
            <Markdown>{networksSummaryContent}</Markdown>
          </div>

          <Heading level={3} as={4} className="mt-16">
            {t('memberOfNetworks')}
          </Heading>

          <ul className="flex mt-6 max-w-full flex-wrap">
            {networks.map(({ name, slug }) => (
              <li className="mr-4 mb-4">
                <Button href={`/${tSlugs('networks')}/${slug}`}>{name}</Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
