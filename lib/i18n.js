const LOCALES = {
  gr: 'el'
};

export function mapFEToStrapiLocale(feLocale) {
  return LOCALES?.[feLocale] || feLocale;
}

export function mapStrapiToFELocale(strapiLocale) {
  return Object.keys(LOCALES).find((key) => LOCALES[key] === strapiLocale) || strapiLocale;
}
