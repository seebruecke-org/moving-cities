const withPlugins = require('next-compose-plugins');
const withPreact = require('next-plugin-preact');

const { i18n } = require('./next-i18next.config');

function createLocalizedRewrites() {
  const { locales, defaultLocale } = i18n;
  const base = require(`./locales/${defaultLocale}/slugs.json`);

  return locales
    .filter((locale) => defaultLocale !== locale)
    .reduce((acc, locale) => {
      const slugs = require(`./locales/${locale}/slugs.json`);
      const keys = Object.keys(slugs);
      const rewrites = keys
        .map((key) => {
          const source = `/${locale}/${slugs[key]}/:slug*`;
          const destination = `/${locale}/${base[key]}/:slug*`;

          if (source === destination) {
            return null;
          }

          console.log('Rewrite', source, ' > ', destination);

          return {
            source,
            destination,
            locale: false
          };
        })
        .filter(Boolean);

      return [...acc, ...rewrites];
    }, []);
}

module.exports = withPlugins([withPreact], {
  i18n,

  poweredByHeader: false,

  images: {
    domains: [process.env.NEXT_IMAGE_HOSTNAME],
    minimumCacheTTL: 60 * 60 * 24
  },

  async rewrites() {
    const rewrites = createLocalizedRewrites();

    return {
      beforeFiles: rewrites
    };
  },

  experimental: {
    esmExternals: false
  }
});
