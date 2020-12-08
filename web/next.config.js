const withFonts = require('next-fonts');
const withPlugins = require('next-compose-plugins');

module.exports = withPlugins([withFonts], {
  i18n: {
    locales: ['en', 'fr', 'de'],
    defaultLocale: 'en',
  }});
