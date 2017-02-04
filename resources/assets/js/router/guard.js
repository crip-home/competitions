import { t } from 'vue'
import router from './index'
import auth from './../api/auth'
import * as routes from './routes'
import * as types from '../store/types'
import store from '../store'

export default {
  init () {
    let middleware = auth.middleware

    router.beforeEach((to, from, next) => {
      if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!middleware.isAuthenticated()) {
          next({name: routes.login.name, query: {redirect: to.fullPath}})
        } else {
          // this route requires set of roles, check if has all of them
          // if not, redirect to home page and notify.
          if (to.matched.some(record => record.meta.requiresRoles)) {
            if (!middleware.hasAllRoles(to.meta.requiresRoles)) {
              store.commit(types.addToast, {
                message: t('app.permission_denied', {perm: to.meta.requiresRoles.join(', ')}),
                'class': 'toast-error'
              })
              next(routes.home.name)
            } else { next() }
          } else if (to.matched.some(r => r.meta.requiresAnyOfRoles)) {
            if (!middleware.hasAnyRole(to.meta.requiresAnyOfRoles)) {
              store.commit(types.addToast, {
                message: t('app.permission_denied', {perm: to.meta.requiresAnyOfRoles.join(', ')}),
                'class': 'toast-error'
              })
              next(routes.home.name)
            } else { next() }
          } else { next() }
        }
      } else { next() } // make sure to always call next()!
    })
  }
}
