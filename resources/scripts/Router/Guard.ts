import Vue from 'vue'
import Router, {Route, RawLocation} from 'vue-router'
import middleware from '@/Modules/Auth/MiddlewareService'
import * as routes from '@/Router/Routes'

export default function (router: Router) {
  router.beforeEach(navigationGuard)
}

type Next = (to?: RawLocation | false | ((vm: Vue) => any) | void) => void

function navigationGuard(to: Route, from: Route, next: Next) {
  // Ignore all routes, where auth is not required
  if (!to.matched.some(r => r.meta.requiresAuth)) {
    return next()
  }

  // Check if user is logged in. If not, redirect to login page.
  if (!middleware.isAuthenticated()) {
    return next({...routes.login, query: {redirect: to.fullPath}})
  }

  // This route may require set of roles. If user has no access to route,
  // redirect him to home page with message code to display.
  const checkAll = to.matched.some(r => r.meta.requiresRoles)
  const checkAny = to.matched.some(r => r.meta.requiresAnyOfRoles)

  if (checkAll) {
    if (middleware.hasAllRoles(to.meta.requiresRoles)) return next()
    return next({...routes.home, params: {message: 'permission_denied'}})
  }

  if(checkAny) {
    if (middleware.hasAnyRole(to.meta.requiresRoles)) return next()
    return next({...routes.home, params: {message: 'permission_denied'}})
  }

  // No roles check required, simply user should be authorized to access next
  // route.
  return next()
}