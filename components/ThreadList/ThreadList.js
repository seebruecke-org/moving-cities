import { useState } from 'react';

import Item from './Item';
import PaneWrapper from './PaneWrapper';

export default function ThreadList({ pane, items }) {
  const Pane = pane;
  const [paneData, setPaneData] = useState(null);
  const [paneIndex, setPaneIndex] = useState(0);

  return (
    <nav className="md:h-full relative z-20 md:w-96 flex-grow-0 flex-shrink-0">
      <span className="absolute top-0 left-0 w-3 bg-gradient-to-r from-black h-full opacity-20 hidden md:block" />

      {!paneData && (
        <span className="absolute top-0 left-full w-3 bg-gradient-to-r from-black h-full opacity-20 hidden md:block" />
      )}

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
