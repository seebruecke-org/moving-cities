import { useEffect } from 'react';
import { appWithTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import Menu from '@/components/Menu';

import '../lib/styles/tailwind.css';

let routeHasChanged = false;

function CustomApp({ Component, pageProps: { state, ...pageProps } }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      routeHasChanged = true;
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, []);

  return (
    <>
      <Menu />

      <main className="relative md:pl-24">
        <Component {...pageProps} routeHasChanged={routeHasChanged} />
      </main>
    </>
  );
}

export default appWithTranslation(CustomApp);
