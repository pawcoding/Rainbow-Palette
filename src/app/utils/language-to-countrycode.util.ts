export function languageToCountryCode(language: string): string {
  switch (language) {
    case 'en':
      return 'us'
    case 'de':
      return 'de'
    default:
      return 'us'
  }
}

export function countryCodeToLanguage(countryCode: string): string {
  switch (countryCode) {
    case 'us':
      return 'en'
    case 'de':
      return 'de'
    default:
      return 'en'
  }
}
