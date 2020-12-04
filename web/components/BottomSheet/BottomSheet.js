import { useState, useRef } from 'react';
import { useWindowSize } from 'react-use';
import Draggable from 'react-draggable';

import * as styles from './BottomSheet.style';

const BottomSheet = ({ children }) => {
  const ref = useRef(null);
  const { height: windowHeight } = useWindowSize();
  const fullscreenZone = windowHeight * 0.55;
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const checkForFullscreen = (event) => {
    const { clientY } = event;

    if (clientY < fullscreenZone) {
      setPosition({ x: 0, y: -1 * windowHeight });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  return <Draggable
      axis="y"
      position={position}
      onStop={(event) => checkForFullscreen(event)}
      nodeRef={ref}>
    <div css={styles.container} ref={ref}>
      <div css={styles.handle}></div>
      {children}
    </div>
  </Draggable>
}

export default BottomSheet;
