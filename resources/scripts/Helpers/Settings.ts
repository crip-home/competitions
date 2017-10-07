import conf from '../Settings'

export type localeType = 'lv' | 'en'

export function getLocale(): localeType {
  let locale = localStorage.getItem('crip-cm-locale')
  if (locale === 'lv' || locale === 'en') {
    return locale as localeType
  }

  return conf.defaultLocale as localeType
}

export function setLocale(locale: localeType): void {
  localStorage.setItem('crip-cm-locale', locale)
}