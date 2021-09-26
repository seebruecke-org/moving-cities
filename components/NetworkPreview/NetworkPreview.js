import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import BlockSwitch from '@/components/Blocks/BlockSwitch';
import Button from '@/components/Button';
import Heading from '@/components/Heading';
import Paragraph from '@/components/Paragraph';
import Richtext from '@/components/Blocks/Richtext';

import styles from './styles.module.css';

function AllCities({ cities }) {
  const MAX_CITIES_TO_SHOW = 7;
  const [showAll, setShowAll] = useState(cities?.length < MAX_CITIES_TO_SHOW);
  const { t } = useTranslation('networks');

  return (
    <>
      <Heading level={2} as={4} className="mt-8 md:mt-16">
        {t('allCities')}
      </Heading>

      <ul className="mt-6 mb-6">
        {cities
          .filter((city, index) => {
            return (!showAll && index <= MAX_CITIES_TO_SHOW) || showAll;
          })
          .map(({ name, country: { name: countryName } }) => (
            <li>
              <Paragraph>
                {name} ({countryName})
              </Paragraph>
            </li>
          ))}
      </ul>

      <button
        type="button"
        className="font-raptor font-bold text-s md:text-m"
        onClick={() => setShowAll(!showAll)}
      >
        <span className="underline">{t(`show_${showAll ? 'less' : 'more'}`)}</span>
        <span className="text-red-300 ml-2">{!showAll ? '↓' : '↑'}</span>
      </button>
    </>
  );
}

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
          <Heading level={2} as={4} className="mb-8 mt-6 md:mt-12">
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

      {cities?.length > 0 && <AllCities cities={cities} />}
    </article>
  );
}
