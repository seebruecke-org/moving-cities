import { useTranslation } from 'next-i18next';

import Heading from '@/components/Heading';
import Paragraph from '@/components/Paragraph';

export default function Summary({ items }) {
  const { t } = useTranslation('approaches');

  return (
    <div className="md:border-2 md:border-black md:rounded-3xl md:px-8 md:py-12 md:mt-4">
      <Heading level={5}>{t('keyTakeaways')}</Heading>

      <ul className="border border-black md:border-0 rounded-2xl px-4 py-8 mt-4 flex flex-col md:flex-row md:space-x-8">
        {items.map((item, index) => (
          <li>
            <span className="font-raptor text-red-300 font-bold text-5xl">{index + 1}</span>

            <Paragraph>{item}</Paragraph>
          </li>
        ))}
      </ul>
    </div>
  );
}
