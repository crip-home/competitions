import {AuthLang} from './index'

export default {
  login: {
    title: 'Login',
    error: 'Authorization error. Please enter valid e-mail and password.',
    email: {label: 'E-Mail Address:', placeholder: 'Enter Your E-Mail Address'},
    password: {label: 'Password:', placeholder: 'Enter Your Password'},
    submit: {button: 'Login', forgot: 'Forgot Your Password?'},
  },
  signUp: {
    title: 'Sign Up',
    name: {label: 'Name:', placeholder: 'Full Name'},
    email: {label: 'E-Mail Address:', placeholder: 'E-Mail Address'},
    password: {label: 'Password:', placeholder: 'Password'},
    password_confirmation: {
      label: 'Password confirmation:',
      placeholder: 'Password',
    },
    submit: {button: 'Sign Up'},
  },
} as AuthLang
