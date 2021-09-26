import { useTranslation } from 'next-i18next';

import Heading from '@/components/Heading';
import Markdown from '@/components/Markdown';

export default function Summary({ items }) {
  const { t } = useTranslation('approaches');

  return (
    <div className="md:border-2 md:border-black md:rounded-2xl md:px-6 md:pt-12 md:pb-4 md:mt-4">
      <Heading level={2}>{t('keyTakeaways')}</Heading>

      <ul className="border border-black md:border-0 rounded-xl md:rounded-2xl -mx-4 px-8 py-6 md:py-8 mt-4 flex flex-col md:flex-row md:space-x-8">
        {items.map(({ content }, index) => (
          <li className="md:w-2/3">
            <span className="font-raptor text-red-300 font-bold text-3xl md:text-4xl xl:text-5xl">
              {index + 1}
            </span>

            <div className="-mt-2 md:-mt-8">
              <Markdown isSmall>{content}</Markdown>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
