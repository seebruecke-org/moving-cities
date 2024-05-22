import { useEffect } from 'react';
import { appWithTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import Menu from '@/components/Menu';

import '../lib/styles/tailwind.css';
import Footer from '@/components/Footer';

let routeHasChanged = false;
let previousRoute = '';

function CustomApp({ Component, pageProps: { state, ...pageProps } }) {
  const router = useRouter();
  const indexRegex = new RegExp(/^\/[^\/]{0,2}$/);

  useEffect(() => {
    const handleRouteChange = (url) => {
      // this tests, whether the changed route looks like a
      // language-change (e.g. /fr) in order to allow to toggle
      // the current language on the intro screen. Otherwise
      // a language-switch would count as a navigation and
      // therefore users might see the intro in the wrong language
      // only
      if (!indexRegex.test(url) && indexRegex.test(previousRoute)) {
        routeHasChanged = true;
      }

      previousRoute = url;
    };

    const handleRouteChangeComplete = () => {
      const links = document.querySelectorAll('a');
      links.forEach((link) => {
        const isInternalLink = link.href.startsWith(window.location.origin);
        if (!isInternalLink) {
          link.setAttribute('target', '_blank');
          link.setAttribute('rel', 'noopener noreferrer');
        }
      });
    };

    const trackRouteChange = (url) => {
      fetch(`/api/track?url=${url}`);
    };

    router.events.on('routeChangeStart', handleRouteChange);
    router.events.on('routeChangeComplete', trackRouteChange);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    handleRouteChangeComplete();

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
      router.events.off('routeChangeComplete', trackRouteChange);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Menu {...pageProps.menu} localizations={pageProps.localizations} counts={pageProps.counts} />

      <main className="relative flex-1">
        <Component {...pageProps} routeHasChanged={routeHasChanged} />
      </main>

      <Footer {...pageProps.footer} />
    </div>
  );
}

export default appWithTranslation(CustomApp);
