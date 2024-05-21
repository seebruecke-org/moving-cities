import { useState } from 'react';
import clsx from 'clsx';

import Heading from '@/components/Heading';
import Richtext from '@/components/Blocks/Richtext';

import styles from './styles.module.css';

export default function Collapsible({ collapsibleTitle, richtext, open = false }) {
  const [isOpen, setIsOpen] = useState(open);

  return (
    <div className="-mt-1">
      <details
        className="border-t-2 border-b-2 hover:border-red-300 relative hover:z-10"
        onToggle={() => setIsOpen(!isOpen)}
        open={isOpen}
      >
        <summary
          className={clsx(
            'max-w-8xl',
            styles.summary,
            isOpen && 'mb-10 border-b-2 border-red-300',
            'cursor-pointer pb-4'
          )}
        >
          <Heading level={2} className="px-8 md:px-10 pt-6 flex justify-between sm:items-center">
            {collapsibleTitle}

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
                strokeLinecap="round"
                strokeWidth="3"
                d="m2 2 18 18L38 2"
                className={clsx(
                  'transition-transform, origin-center',
                  isOpen && 'transform rotate-180'
                )}
              />
            </svg>
          </Heading>
        </summary>

        <div className="max-w-8xl px-8 md:px-10 py-4 md:py-12 lg:pr-48">
          <Richtext richtext={richtext} />
        </div>
      </details>
    </div>
  );
}
