import { useEffect } from 'react';
import { appWithTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import Menu from '@/components/Menu';

import '../lib/styles/tailwind.css';

let routeHasChanged = false;

function CustomApp({ Component, pageProps: { state, ...pageProps } }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      // this tests, whether the changed route looks like a
      // language-change (e.g. /fr) in order to allow to toggle
      // the current language on the intro screen. Otherwise
      // a language-switch would count as a navigation and
      // therefore users might see the intro in the wrong language
      // only
      if (!/^\/[^\/]{0,2}$/.test(url)) {
        routeHasChanged = true;
      }
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
