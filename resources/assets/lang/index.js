import Select2Options from '../components/forms/select2'
import settings from '../settings'
import VueI18n from 'vue-i18n'
import Vue from 'vue'
import en from './en'
import lv from './lv'

const translations = {en, lv}

Vue.use(VueI18n)

/**
 * Translator instance of the application.
 * @type {VueI18n}
 */
export const i18n = new VueI18n({
  locale: 'lv',
  fallbackLocale: 'en',
  messages: translations
})

/**
 * List of available locales in application.
 * @type {{lv: {key: string, text: string}, en: {key: string, text: string}}}
 */
export const locales = {
  lv: {key: 'lv', text: translations.lv.locale},
  en: {key: 'en', text: translations.en.locale}
}

/**
 * Select options of application available locales.
 * @returns {Select2Options}
 */
export const select = () => {
  let options = []
  Object.keys(locales)
    .forEach((locale) => options.push({
      id: locales[locale].key,
      text: locales[locale].text
    }))

  return (new Select2Options(options)).asSerchable(false)
}

/**
 * Initialize default locale for user.
 */
export function init () {
  const locale = settings.getLocale()
  if (locale) {
    setLocale(locale)
  }
}

/**
 * Set current locale for UI.
 * @param {String} locale
 */
export function setLocale (locale = 'lv') {
  // set locale only if it is in set of defined locales
  if (~Object.keys(locales).indexOf(locale)) {
    settings.setLocale(locale)
    i18n.locale = locale
  }
}
