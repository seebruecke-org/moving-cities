import { useRef, useEffect } from 'react';

export function useIsMounted() {
  const isMountRef = useRef(true);

  useEffect(() => {
    isMountRef.current = false;
  }, []);

  return isMountRef.current;
}
