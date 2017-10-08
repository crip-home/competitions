import http from 'axios'
import conf from '../Settings'

const storageLocaleKey = 'crip-cm-locale'
const storageTokenKey = 'crip-cm-token'

export type LocaleType = 'lv' | 'en'

export function getLocale(): LocaleType {
  let locale = localStorage.getItem(storageLocaleKey)
  if (locale === 'lv' || locale === 'en') {
    return locale as LocaleType
  }

  return conf.defaultLocale as LocaleType
}

export function setLocale(locale: LocaleType): void {
  localStorage.setItem(storageLocaleKey, locale)
}

/**
 * Delete token from storage.
 * @returns {void}
 */
export function removeToken(): void {
  localStorage.removeItem(storageTokenKey)
  http.defaults.headers.common['Authorization'] = ''
}

/**
 * Set user auth token in storage for later usage.
 * @param {string} token
 * @returns {void}
 */
export function setToken(token: string): void {
  localStorage.setItem(storageTokenKey, token)
  http.defaults.headers.common['Authorization'] = getAuthToken()
}

/**
 * Get auth header token value.
 * @returns {string}
 */
export function getAuthToken(): string {
  return `Bearer ${localStorage.getItem(storageTokenKey)}`
}
