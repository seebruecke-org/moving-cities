import { useSpring, animated, config } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import { useWindowSize } from 'react-use';
import { useEffect } from 'react';

import * as styles from './BottomSheet.style';

const INITIAL_POSITION = -55;

const BottomSheet = ({ children }) => {
  const { height: windowHeight, width: windowWidth } = useWindowSize();
  const [{ y }, update] = useSpring(() => ({ y: 0 }));
  const shouldAnimate = windowWidth && windowWidth < 768;

  useEffect(() => {
    if (shouldAnimate) {
      setTimeout(() => {
        reveal();
      }, 400);
    }
  });

  const close = (velocity = 0) => {
    update({ y: INITIAL_POSITION, config: { ...config.stiff, velocity } });
  };

  const open = (velocity = 0) => {
    update({ y: -windowHeight, config: { ...config.stiff, velocity } });
  };

  const reveal = () => {
    update({ y: INITIAL_POSITION });
  };

  const bind = useDrag(
    ({ last, vxvy: [, vy], movement: [, my], direction: [, dy] }) => {
      if (!last) {
        update({ y: my, immediate: true });
      } else if (dy > 0) {
        close(vy);
      } else {
        open(vy);
      }
    },
    { initial: () => [0, y.get()], rubberband: true }
  );

  if (shouldAnimate) {
    return (
      <animated.div {...bind()} css={styles.container} style={{ y }}>
        {children}
      </animated.div>
    );
  }

  return <div css={styles.container}>{children}</div>;
};

export default BottomSheet;
