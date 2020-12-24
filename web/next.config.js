const withFonts = require('next-fonts');
const withPlugins = require('next-compose-plugins');

module.exports = withPlugins([withFonts], {
  i18n: {
    locales: ['en', 'fr', 'de'],
    defaultLocale: 'en'
  },

  images: {
    domains: [process.env.NEXT_IMAGE_HOSTNAME]
  },

  env: {
    IMAGE_BASE: `http://${process.env.NEXT_IMAGE_DOMAIN}`
  },

  webpack(config) {
    // See: https://github.com/pmndrs/react-spring/issues/1078#issuecomment-743698325
    config.module.rules.push({
      test: /react-spring/,
      sideEffects: true
    });

    return config;
  }
});
