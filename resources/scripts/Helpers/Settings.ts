import conf from '../Settings'

export type LocaleType = 'lv' | 'en'

export function getLocale(): LocaleType {
  let locale = localStorage.getItem('crip-cm-locale')
  if (locale === 'lv' || locale === 'en') {
    return locale as LocaleType
  }

  return conf.defaultLocale as LocaleType
}

export function setLocale(locale: LocaleType): void {
  localStorage.setItem('crip-cm-locale', locale)
}