import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import clsx from 'clsx';

import BlockSwitch from '@/components/Blocks/BlockSwitch';
import Heading from '@/components/Heading';
import Richtext from '@/components/Blocks/Richtext';

import styles from './styles.module.css';

export default function CountryContext({ name, content, open = false }) {
  const [isOpen, setIsOpen] = useState(open);
  const { t } = useTranslation('city');

  return (
    <div className="md:py-12">
      <details className="border-t-2 border-b-2" onToggle={() => setIsOpen(!isOpen)} open={isOpen}>
        <summary
          className={clsx(
            styles.summary,
            isOpen && 'mb-10 border-b-2',
            'cursor-pointer hover:bg-black hover:text-white pb-4'
          )}>
          <Heading level={2} className="px-10 pt-6">
            {t('politicalContext', { name })}
          </Heading>
        </summary>

        <div className="px-10 py-12">
          <BlockSwitch blocks={content} renderers={{ Richtext }} />
        </div>
      </details>
    </div>
  );
}
