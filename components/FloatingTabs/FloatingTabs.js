import { useEffect, useState, useRef } from 'react';
import clsx from 'clsx';

import Item from './Item';
import Tooltip from './Tooltip';

export default function FloatingTabs({ items, className }) {
  const itemRefs = useRef([]);
  const [activeItemIndex, setActiveItemIndex] = useState(items.findIndex((item) => item.active));
  const [tooltipPosition, setTooltipPosition] = useState({});

  useEffect(() => {
    const activeRef = itemRefs.current[activeItemIndex];

    if (activeRef) {
      const { offsetLeft, clientWidth } = activeRef;

      setTooltipPosition({
        left: offsetLeft + clientWidth / 2
      });
    }
  }, [activeItemIndex]);

  return (
    <div className={clsx('md:absolute md:top-12 md:right-12 z-10', className)}>
      <ul className="flex bg-white shadow-lg md:rounded-lg overflow-hidden">
        {items.map(({ tooltip, ...item }, index) => (
          <li className={clsx('w-2/3')}>
            <Item
              {...item}
              className={clsx(index > 0 && 'border-l border-grey-300')}
              ref={(ref) => (itemRefs.current[index] = ref)}
              onMouseEnter={() => {
                setActiveItemIndex(index);
              }}
              onMouseLeave={() => {
                setActiveItemIndex(index);
              }}
              onFocus={() => {
                setActiveItemIndex(index);
              }}
              onBlur={() => {
                setActiveItemIndex(index);
              }}
            />
          </li>
        ))}
      </ul>

      {activeItemIndex !== -1 && (
        <Tooltip style={tooltipPosition}>{items[activeItemIndex].tooltip}</Tooltip>
      )}
    </div>
  );
}
