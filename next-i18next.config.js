const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de', /*'it',*/ 'gl' /*'pl', 'fr', 'es'*/],
    localeDetection: false
  },

  localePath: path.resolve('./locales')
};
