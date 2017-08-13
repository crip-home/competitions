import * as routes from '../../router/routes'

import Wrapper from '../../Wrapper.vue'
import Login from './Login.vue'
import Signup from './Signup.vue'
import EmailPassword from './EmailPassword.vue'
import ResetPassword from './ResetPassword.vue'

export default {
  path: '/auth',
  component: Wrapper,
  children: [
    {path: 'login', name: routes.login.name, component: Login},
    {path: 'register', name: routes.signup.name, component: Signup},
    {path: 'password/email', name: routes.emailPassword.name, component: EmailPassword},
    {path: 'password/reset/:token', name: routes.resetPassword.name, component: ResetPassword}
  ]
}
