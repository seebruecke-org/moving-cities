import { useEffect } from 'react';
import { appWithTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import { useCreateStore, Provider } from '@/lib/store';

import Menu from '@/components/Menu';

import '../lib/styles/tailwind.css';

let routeHasChanged = false;

function CustomApp({ Component, pageProps: { state, ...pageProps } }) {
  const createStore = useCreateStore(state);
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
    <Provider createStore={createStore}>
      <Menu />

      <main className="relative md:ml-24 md:h-screen">
        <Component {...pageProps} routeHasChanged={routeHasChanged} />
      </main>
    </Provider>
  );
}

export default appWithTranslation(CustomApp);
