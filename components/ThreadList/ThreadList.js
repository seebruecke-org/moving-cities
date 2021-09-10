import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Item from './Item';
import PaneWrapper from './PaneWrapper';

export default function ThreadList({
  pane,
  items,
  onAfterOpen = () => {},
  onAfterClose = () => {}
}) {
  const Pane = pane;
  const activeItemIndex = items.findIndex(({ active }) => active);
  const hasActiveItem = activeItemIndex !== -1;

  const router = useRouter();
  const [paneData, setPaneData] = useState(null);

  function setActiveItem(index) {
    const item = items[index];

    setPaneData({
      index: index,
      ...item.data
    });
  }

  function resetActiveItem() {
    setPaneData(null);
    onAfterClose();
  }

  useEffect(() => {
    if (activeItemIndex !== -1) {
      setActiveItem(activeItemIndex);
    } else {
      resetActiveItem();
    }
  }, [activeItemIndex]);

  return (
    <nav className="md:h-full relative z-20 md:w-64 flex-grow-0 flex-shrink-0">
      <span className="absolute top-0 left-0 w-3 bg-gradient-to-r from-black h-full opacity-20 hidden md:block" />

      {!paneData && (
        <span className="absolute top-0 left-full w-3 bg-gradient-to-r from-black h-full opacity-20 hidden md:block" />
      )}

      <ul className="h-full">
        {items.map(({ className, __typename, ...item }, index) => {
          const isActive = paneData?.index === index;

          return (
            <li
              key={`thread-item-${index}`}
              className={clsx(hasActiveItem && !isActive && 'hidden md:flex')}>
              <Item
                {...item}
                className={className}
                active={isActive}
                onClick={(event) => {
                  event.preventDefault();

                  // On large screens the pane get's opened
                  if (window.innerWidth > 768) {
                    if (paneData && paneData?.index === index) {
                      resetActiveItem();
                    } else if ((paneData && paneData?.index !== index) || !paneData) {
                      setActiveItem(index);
                      onAfterOpen(items[index]);
                    }

                    // On small screens, a navigation to the target
                    // page is forced
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
              resetActiveItem();
            }}
          />
        </PaneWrapper>
      )}
    </nav>
  );
}
