import { useRef, useEffect, useState } from 'react';

export function useIsMounted() {
  const isMountRef = useRef(true);

  useEffect(() => {
    isMountRef.current = false;
  }, []);

  return isMountRef.current;
}

export function useForceUpdate() {
  const [value, setValue] = useState(0);

  return () => setValue((value) => value + 1);
}

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}
