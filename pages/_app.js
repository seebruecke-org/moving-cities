import { appWithTranslation } from 'next-i18next';
import { useCreateStore, Provider } from '@/lib/store';

import Menu from '@/components/Menu';

import '../lib/styles/tailwind.css';

function CustomApp({ Component, pageProps: { state, ...pageProps } }) {
  const createStore = useCreateStore(state);

  return (
    <Provider createStore={createStore}>
      <Menu />

      <main className="relative md:ml-20 md:h-screen">
        <Component {...pageProps} />
      </main>
    </Provider>
  );
}

export default appWithTranslation(CustomApp);
