import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Item from './Item';
import PaneWrapper from './PaneWrapper';

export default function ThreadList({ pane, items }) {
  const Pane = pane;
  const [paneData, setPaneData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const activeItemIndex = items.findIndex(({ active }) => active === true);

    if (activeItemIndex !== -1) {
      setPaneData({
        index: activeItemIndex,
        ...items?.[activeItemIndex]?.data
      });
    }
  }, []);

  return (
    <nav className="md:h-full relative z-20 md:w-64 flex-grow-0 flex-shrink-0">
      <span className="absolute top-0 left-0 w-3 bg-gradient-to-r from-black h-full opacity-20 hidden md:block" />

      {!paneData && (
        <span className="absolute top-0 left-full w-3 bg-gradient-to-r from-black h-full opacity-20 hidden md:block" />
      )}

      <ul className="h-full">
        {items.map(({ className, __typename, ...item }, index) => {
          const isActive = paneData && index === paneData?.index;

          return (
            <li
              key={`thread-item-${index}`}
              className={clsx(paneData && !isActive && 'hidden md:flex')}>
              <Item
                {...item}
                className={className}
                active={isActive}
                onClick={(event) => {
                  event.preventDefault();

                  if (window.innerWidth > 768) {
                    setPaneData({
                      index,
                      ...item?.data
                    });
                  } else {
                    router.push(item.target);
                  }
                }}
              />
            </li>
          );
        })}
      </ul>

      {paneData && (
        <PaneWrapper>
          <Pane
            {...paneData}
            onClose={() => {
              setPaneData(null);
            }}
          />
        </PaneWrapper>
      )}
    </nav>
  );
}
