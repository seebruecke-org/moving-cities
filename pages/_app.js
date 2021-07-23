import { appWithTranslation } from 'next-i18next';

import Menu from '@/components/Menu';

import '../lib/styles/tailwind.css';

function CustomApp({ Component, pageProps }) {
  return (
    <div>
      <Menu />

      <main className="relative ml-12 md:h-screen">
        <Component {...pageProps} />
      </main>
    </div>
  );
}

export default appWithTranslation(CustomApp);
