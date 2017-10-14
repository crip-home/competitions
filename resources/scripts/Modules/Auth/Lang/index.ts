import {LocaleMessageObject} from 'vue-i18n'

export interface AuthLang extends LocaleMessageObject {
  login: {
    title: string
    error: string
    email: { label: string, placeholder: string }
    password: { label: string, placeholder: string }
    submit: { button: string, forgot: string }
  }
  signUp: {
    title: string
    name: { label: string, placeholder: string }
    email: { label: string, placeholder: string }
    password: { label: string, placeholder: string }
    password_confirmation: { label: string, placeholder: string }
    submit: { button: string }
  }
}