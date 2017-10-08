import VueI18n from 'vue-i18n'
import Vue from 'vue'

Vue.use(VueI18n)

import {LocaleType, getLocale, setLocale} from '../Helpers/Settings'

import en from './en'
import lv from './lv'

const translations = {en, lv}

export interface Locale {
  key: LocaleType
  text: string
}

export const locales: {[TKey in LocaleType]: Locale} = {
  lv: {key: 'lv', text: lv.locale},
  en: {key: 'en', text: en.locale},
}

export const i18n = new VueI18n({
  locale: 'lv',
  fallbackLocale: 'en',
  messages: translations,
})

export const init = () => {
  const locale = getLocale()
  SetLocale(locale)
}

export const SetLocale = (locale: LocaleType = 'lv') => {
  setLocale(locale)
  i18n.locale = locale
}
