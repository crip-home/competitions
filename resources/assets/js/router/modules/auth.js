import * as routes from './../routes'

import ChildHolderView from './../../components/ChildHolder.vue'
import LoginView from './../../components/auth/Login.vue'
import SignupView from './../../components/auth/Signup.vue'
import EmailPasswordView from './../../components/auth/EmailPassword.vue'

export default {
    path: '/auth', component: ChildHolderView, children: [
        {path: 'login', name: routes.login.name, component: LoginView},
        {path: 'register', name: routes.signup.name, component: SignupView},
        {path: 'password/email', name: routes.email_password.name, component: EmailPasswordView},
    ]
};