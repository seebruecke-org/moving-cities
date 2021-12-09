const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de', 'it', 'gr', 'pl', 'fr'/*, 'es'*/]
  },

  localePath: path.resolve('./locales')
};
