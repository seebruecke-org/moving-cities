import { useEffect, useState, useRef } from 'react';
import clsx from 'clsx';

import Item from './Item';
import Tooltip from './Tooltip';

export default function FloatingTabs({ items, className, tooltipHidden }) {
  const itemRefs = useRef([]);
  const [activeItemIndex, setActiveItemIndex] = useState(items.findIndex((item) => item.active));
  const [tooltipPosition, setTooltipPosition] = useState({});
  const [forceDisplay, setForceDisplay] = useState(false);
  const text = items[activeItemIndex].tooltip;

  useEffect(() => {
    const activeRef = itemRefs.current[activeItemIndex];

    if (activeRef) {
      const { offsetLeft, clientWidth } = activeRef;

      setTooltipPosition({
        display: 'block',
        left: offsetLeft + clientWidth / 2
      });
    }
  }, [activeItemIndex]);

  return (
    <div className={clsx('md:fixed md:top-12 md:right-12 z-10', className)}>
      <ul className="flex bg-white shadow-lg md:rounded-lg overflow-hidden">
        {items.map(({ tooltip, ...item }, index) => (
          <li className={clsx('w-2/3')}>
            <Item
              {...item}
              className={clsx(index > 0 && 'border-l border-grey-300')}
              ref={(ref) => (itemRefs.current[index] = ref)}
              aria-description={tooltip}
              onMouseEnter={() => {
                setActiveItemIndex(index);
                setForceDisplay(true);
              }}
              onMouseLeave={() => {
                setActiveItemIndex(index);
                setForceDisplay(false);
              }}
              onFocus={() => {
                setActiveItemIndex(index);
                setForceDisplay(true);
              }}
              onBlur={() => {
                setActiveItemIndex(index);
                setForceDisplay(false);
              }}
            />
          </li>
        ))}
      </ul>

      {activeItemIndex !== -1 && (
        <Tooltip
          className={clsx(tooltipHidden && !forceDisplay && 'hidden')}
          style={tooltipPosition}
        >
          {text}
        </Tooltip>
      )}
    </div>
  );
}
