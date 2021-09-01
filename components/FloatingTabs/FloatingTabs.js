import { useEffect, useState, useRef } from 'react';
import clsx from 'clsx';

import Item from './Item';
import Tooltip from './Tooltip';

export default function FloatingTabs({ items, className }) {
  const activeRef = useRef();
  const [activeItemIndex, setActiveItemIndex] = useState(items.findIndex((item) => item.active));
  const [tooltipPosition, setTooltipPosition] = useState({});

  useEffect(() => {
    if (activeRef?.current) {
      const { offsetLeft, clientWidth } = activeRef.current;

      setTooltipPosition({
        left: offsetLeft + clientWidth / 2
      });
    }
  }, [activeItemIndex]);

  return (
    <div className={clsx('md:absolute md:top-12 md:right-12 md:rounded-lg z-10', className)}>
      <ul className="flex bg-white shadow-lg">
        {items.map(({ tooltip, ...item }, index) => (
          <li className={clsx('w-2/3 md:w-auto')}>
            <Item
              {...item}
              className={clsx(index > 0 && 'border-l border-grey-300')}
              ref={index === activeItemIndex && activeRef}
              onMouseEnter={() => {
                setActiveItemIndex(index);
              }}
              onMouseLeave={() => {
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
