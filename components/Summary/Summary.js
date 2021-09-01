import { useTranslation } from 'next-i18next';

import Heading from '@/components/Heading';
import Markdown from '@/components/Markdown';

export default function Summary({ items }) {
  const { t } = useTranslation('approaches');

  return (
    <div className="md:border-2 md:border-black md:rounded-2xl md:px-6 md:pt-12 md:pb-4 md:mt-4">
      <Heading level={2}>{t('keyTakeaways')}</Heading>

      <ul className="border border-black md:border-0 rounded-2xl px-4 py-8 mt-4 flex flex-col md:flex-row md:space-x-8">
        {items.map(({ content }, index) => (
          <li className="md:w-2/3">
            <span className="font-raptor text-red-300 font-bold text-5xl">{index + 1}</span>

            <div className="-mt-8">
              <Markdown isSmall>{content}</Markdown>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
