import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import BlockSwitch from '@/components/Blocks/BlockSwitch';
import Button from '@/components/Button';
import Heading from '@/components/Heading';
import Richtext from '@/components/Blocks/Richtext';

import styles from './styles.module.css';

export default function NetworkPreview({ title, content, featuredCities, cities }) {
  const { t } = useTranslation('networks');

  return (
    <article
      className={clsx('bg-white h-full p-8 md:p-10 overflow-y-auto pb-28', styles.networkPreview)}
    >
      <Heading level={1} as={2}>
        {title}
      </Heading>

      <div className="mt-10 md:mt-28">
        <BlockSwitch blocks={content} renderers={{ Richtext }} />
      </div>

      {featuredCities?.length > 0 && (
        <>
          <Heading level={2} as={4} className="mb-8">
            {t('featuredCities')}
          </Heading>

          <ul className="flex flex-wrap">
            {featuredCities.map(({ name, slug }) => (
              <li className="mr-4 mb-4">
                <Button href={`/${slug}`}>{name}</Button>
              </li>
            ))}
          </ul>
        </>
      )}

      {cities?.length > 0 && (
        <>
          <Heading level={2} as={4} className="mt-10">
            {t('allCities')}
          </Heading>

          <ul>
            {cities.map(({ name }) => (
              <li>{name}</li>
            ))}
          </ul>
        </>
      )}
    </article>
  );
}
