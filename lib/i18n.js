const LOCALES = {
  en: ['en', 'en_EN']
};

export function mapFEToStrapiLocale(feLocale) {
  const strapiLocale = LOCALES?.[feLocale];

  if (strapiLocale) {
    return strapiLocale[0];
  }

  return feLocale;
}
