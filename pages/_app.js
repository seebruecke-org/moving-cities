import { appWithTranslation } from 'next-i18next';

import Menu from '@/components/Menu';

import '../lib/styles/tailwind.css';

function CustomApp({ Component, pageProps }) {
  return (
    <div>
      <Menu />

      <main className="relative md:ml-16 md:h-screen">
        <Component {...pageProps} />
      </main>
    </div>
  );
}

export default appWithTranslation(CustomApp);
