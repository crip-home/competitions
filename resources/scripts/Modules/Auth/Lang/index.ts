import {LocaleMessageObject} from 'vue-i18n'

export interface AuthLang extends LocaleMessageObject {
  login: {
    title: string,
    email: {
      label: string,
      placeholder: string,
    },
    password: {
      label: string,
      placeholder: string,
    },
    submit: {
      button: string,
      forgot: string,
    },
  }
}