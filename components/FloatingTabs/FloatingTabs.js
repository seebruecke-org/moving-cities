import { useState } from 'react';
import clsx from 'clsx';

import Item from './Item';
import Tooltip from './Tooltip';

export default function FloatingTabs({ items, className }) {
  const [tooltip, setTooltip] = useState(items.find((item) => item.active)?.tooltip);

  return (
    <div className={clsx('md:absolute md:top-12 md:right-12 md:rounded-lg z-10', className)}>
      <ul className="flex bg-white shadow-lg">
        {items.map(({ tooltip, ...item }, index) => (
          <li className={clsx('w-2/3 md:w-auto')}>
            <Item
              {...item}
              className={clsx(index > 0 && 'border-l border-grey-300')}
              onMouseEnter={() => {
                setTooltip(tooltip);
              }}
              onMouseLeave={() => {
                setTooltip(items[0].tooltip);
              }}
            />
          </li>
        ))}
      </ul>

      {tooltip && <Tooltip>{tooltip}</Tooltip>}
    </div>
  );
}
