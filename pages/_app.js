import { Provider } from 'react-redux';
import { I18nProvider } from 'next-localization';
import { useRouter } from 'next/router';

import { useStore } from '../lib/store';

export default function App({ Component, pageProps }) {
  const { lngDict, initialReduxState, ...rest } = pageProps;
  const router = useRouter();
  const store = useStore(initialReduxState);

  return (
    <I18nProvider lngDict={lngDict} locale={router.locale}>
      <Provider store={store}>
        <Component {...rest} />
      </Provider>
    </I18nProvider>
  );
}
