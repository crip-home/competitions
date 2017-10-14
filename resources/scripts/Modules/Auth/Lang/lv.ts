import {AuthLang} from './index'

export default {
  login: {
    title: 'Autorizācija',
    error: 'Autorizācijas kļūda. Lūdzu ievadiek korektus datus.',
    email: {placeholder: 'Ievadiet epasta adresi', label: 'E-pasta adrese'},
    password: {placeholder: 'Ievadiet paroli', label: 'Parole'},
    submit: {forgot: 'Aizmirsi paroli?', button: 'Ienākt'},
  },
  signUp: {
    title: 'Reģistrācija',
    name: {label: 'Vārds:', placeholder: 'Vārds un uzvārds'},
    email: {label: 'E-pasta adrese:', placeholder: 'E-pasta adrese'},
    password: {label: 'Parole:', placeholder: 'Parole'},
    password_confirmation: {
      label: 'Paroles apstiprinājums:',
      placeholder: 'Parole',
    },
    submit: {button: 'Reģistrēties'},
  },
} as AuthLang
