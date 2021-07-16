import { appWithTranslation } from 'next-i18next';

import '@/lib/styles/tailwind.css';

function CustomApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default appWithTranslation(CustomApp);
