export async function getTranslations(locale) {
  const { default: lngDict = {} } = await import(`../locales/${locale}.json`);

  return lngDict;
}
