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
      <details className="border-t-2 border-b-2 hover:border-red-300" onToggle={() => setIsOpen(!isOpen)} open={isOpen}>
        <summary
          className={clsx(
            styles.summary,
            isOpen && 'mb-10 border-b-2',
            'cursor-pointer pb-4'
          )}
        >
          <Heading level={2} className="px-8 md:px-10 pt-6 flex justify-between sm:items-center">
            {t('politicalContext', { name })}

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="23"
              fill="none"
              viewBox="0 0 40 23"
              className="text-red-300 mt-1 md:-mt-3"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-width="3"
                d="m2 2 18 18L38 2"
                className={clsx(
                  'transition-transform, origin-center',
                  isOpen && 'transform rotate-180'
                )}
              />
            </svg>
          </Heading>
        </summary>

        <div className="px-8 md:px-10 py-4 md:py-12">
          <BlockSwitch blocks={content} renderers={{ Richtext }} />
        </div>
      </details>
    </div>
  );
}
