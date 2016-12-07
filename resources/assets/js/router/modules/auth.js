import * as routes from './../routes'

import ChildHolder from './../../components/ChildHolder.vue'
import Login from './../../components/auth/Login.vue'
import Signup from './../../components/auth/Signup.vue'
import EmailPassword from './../../components/auth/EmailPassword.vue'
import ResetPassword from './../../components/auth/ResetPassword.vue'

export default {
    path: '/auth', component: ChildHolder, children: [
        {path: 'login', name: routes.login.name, component: Login},
        {path: 'register', name: routes.signup.name, component: Signup},
        {path: 'password/email', name: routes.email_password.name, component: EmailPassword},
        {path: 'password/reset/:token', name: routes.reset_password.name, component: ResetPassword},
    ]
};