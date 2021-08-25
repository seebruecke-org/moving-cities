import { useState } from 'react';
import clsx from 'clsx';

import BlockSwitch from '@/components/Blocks/BlockSwitch';
import Heading from '@/components/Heading';
import Richtext from '@/components/Blocks/Richtext';

import styles from './styles.module.css';

export default function CountryContext({ name, content, open = false }) {
  const [isOpen, setIsOpen] = useState(open);

  return (
    <details className="border-t-2 border-b-2" onToggle={() => setIsOpen(!isOpen)} open={isOpen}>
      <summary
        className={clsx(
          styles.summary,
          isOpen && 'mb-10 border-b-2',
          'cursor-pointer hover:bg-black hover:text-white pb-3'
        )}>
        <Heading level={2} className="px-10 pt-5">
          Political Context of {name}
        </Heading>
      </summary>

      <div className="px-10 py-12">
        <BlockSwitch blocks={content} renderers={{ Richtext }} />
      </div>
    </details>
  );
}
