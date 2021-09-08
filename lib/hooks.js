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
