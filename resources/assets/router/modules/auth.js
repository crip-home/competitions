import * as routes from '../routes'

import Wrapper from '../../Wrapper.vue'
import Login from '../../modules/auth/Login.vue'
import Signup from '../../modules/auth/Signup.vue'
import EmailPassword from '../../modules/auth/EmailPassword.vue'
import ResetPassword from '../../modules/auth/ResetPassword.vue'

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
