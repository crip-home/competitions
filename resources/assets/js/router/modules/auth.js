import * as routes from './../routes'

import ChildHolderView from './../../components/ChildHolder.vue'
import LoginView from './../../components/auth/Login.vue'
import SignupView from './../../components/auth/Signup.vue'
import PasswordResetView from './../../components/auth/PasswordReset.vue'

export default {
    path: '/auth', component: ChildHolderView, children: [
        {path: 'login', name: routes.login.name, component: LoginView},
        {path: 'signup', name: routes.signup.name, component: SignupView},
        {path: 'password/reset', name: routes.password_reset.name, component: PasswordResetView},
    ]
};