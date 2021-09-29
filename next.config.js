const withPlugins = require('next-compose-plugins');
const withPreact = require('next-plugin-preact');

const { i18n } = require('./next-i18next.config');

module.exports = withPlugins([withPreact], {
  i18n,

  images: {
    domains: [process.env.NEXT_IMAGE_HOSTNAME]
  },

  experimental: {
    esmExternals: true
  }
});
