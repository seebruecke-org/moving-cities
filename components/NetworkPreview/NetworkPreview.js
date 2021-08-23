import { useTranslation } from 'react-i18next';

import BlockSwitch from '@/components/Blocks/BlockSwitch';
import Button from '@/components/Button';
import Heading from '@/components/Heading';
import Richtext from '@/components/Blocks/Richtext';

export default function NetworkPreview({ title, content, featuredCities, cities }) {
  const { t } = useTranslation('networks');

  return (
    <article className="bg-white h-full p-10 overflow-y-auto">
      <Heading level={1} as={2}>
        {title}
      </Heading>

      <BlockSwitch blocks={content} renderers={{ Richtext }} />

      {featuredCities && (
        <>
          <Heading level={2} as={3}>
            {t('featuredCities')}
          </Heading>

          {featuredCities.map(({ name, slug }) => (
            <Button href={`/${slug}`}>{name}</Button>
          ))}
        </>
      )}

      {cities && (
        <>
          <Heading level={2} as={3}>
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
