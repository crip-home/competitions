import {LocaleMessageObject} from 'vue-i18n'

export interface NavLang extends LocaleMessageObject {
  login: string
  signup: string
  profile: string
  logout: string
  locale: string
}