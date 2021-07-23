import { useState } from 'react';

import Item from './Item';
import PaneWrapper from './PaneWrapper';

export default function ThreadList({ pane, items }) {
  const Pane = pane;
  const [paneData, setPaneData] = useState(null);
  const [paneIndex, setPaneIndex] = useState(0);

  return (
    <nav className="h-full relative md:shadow-lg z-20 md:w-72 flex-grow-0 flex-shrink-0">
      <ul className="h-full">
        {items.map((item, index) => (
          <li key={`thread-item-${index}`}>
            <Item
              {...item}
              onClick={(event) => {
                if (window.innerWidth > 768) {
                  event.preventDefault();

                  if (paneData && paneIndex === index) {
                    setPaneData(null);
                    setPaneIndex(0);
                  } else {
                    setPaneData(item.data);
                    setPaneIndex(index);
                  }
                }
              }}
              active={paneData && index === paneIndex}
            />
          </li>
        ))}
      </ul>

      {paneData && (
        <PaneWrapper>
          <Pane
            {...paneData}
            onClose={() => {
              setPaneData(null);
              setPaneIndex(0);
            }}
          />
        </PaneWrapper>
      )}
    </nav>
  );
}
