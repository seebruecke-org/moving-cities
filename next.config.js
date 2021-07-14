const withPlugins = require('next-compose-plugins');

module.exports = withPlugins([], {
  i18n: {
    locales: ['en'],
    defaultLocale: 'en'
  },

  images: {
    domains: [process.env.NEXT_IMAGE_HOSTNAME]
  },
});
