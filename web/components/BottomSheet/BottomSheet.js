import { useSpring, animated, config } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import { useWindowSize } from 'react-use';
import { useEffect } from 'react';

import * as styles from './BottomSheet.style';

const BottomSheet = ({ children }) => {
  const { height: windowHeight, width: windowWidth } = useWindowSize();
  const [{ y }, set] = useSpring(() => ({ y: 0 }));
  const shouldAnimate = windowWidth && windowWidth < 768;

  useEffect(() => {
    if (shouldAnimate) {
      setTimeout(() => {
        reveal();
      }, 200)
    }
  });

  const close = (velocity = 0) => {
    set({ y: -40, immediate: false, config: { ...config.stiff, velocity } })
  }

  const open = (velocity = 0) => {
    set({ y: -windowHeight, immediate: false, config: { ...config.stiff, velocity } })
  }

  const reveal = () => {
    set({ y: -40, immediate: false, config: config.stiff })
  }

  const bind = useDrag(
    ({ last, vxvy: [, vy], movement: [, my], direction: [, dy] }) => {
      if (!last) {
        set({ y: my, immediate: true });
      } else {
        if (dy > 0) {
          close(vy);
        } else {
          open(vy);
        }
      }
    },
    { initial: () => [0, y.get()], filterTaps: true, rubberband: true }
  )

  if (shouldAnimate) {
    return <animated.div {...bind()} css={styles.container} style={{ y, touchAction: 'none' }}>
      {children}
    </animated.div>
  }

  return <div css={styles.container}>
    {children}
  </div>
}

export default BottomSheet;
