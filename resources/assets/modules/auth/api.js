import http from 'axios'
import settings from '../../settings'
import store from '../../store'
import Vue from 'vue'
import { i18n } from '../../lang/index'

export default {

  login (credentials) {
    return new Promise((resolve, reject) => {
      http.post(settings.apiUrl('authenticate'), credentials)
        .then(({data}) => {
          settings.setToken(data.token)
          this.getAuthUserDetails(resolve)
        }, ({data}) => {
          reject(data.error)
        })
    })
  },

  checkAuth () {
    if (settings.hasToken()) {
      this.getAuthUserDetails(_ => _)
    }
  },

  getAuthUserDetails (onResolved) {
    http.get(settings.apiUrl('authenticate'))
      .then(({data}) => {
        // update data before auth to make sure guard does
        // not redirect us as unauthorized users
        store.commit('updateAuthUserDetails', data)
        store.commit('authenticate')
        onResolved(data)
      }, r => {
        if (r.response.status === 401) {
          Vue.toasted.info(i18n.t('auth.token_expired'))
          store.commit('logout')
        } else { settings.handleError(r) }
      })
  },

  register (details) {
    return new Promise((resolve, reject) => {
      http.post(settings.apiUrl('register'), details)
        .then(({data}) => {
          settings.setToken(data.token)
          // update data before auth to make sure guard does
          // not redirect us as unauthorized users
          store.commit('updateAuthUserDetails', data)
          store.commit('authenticate')
          resolve(data)
        }, ({data}) => {
          reject(data)
        })
    })
  },

  sendResetLink (email) {
    return new Promise((resolve, reject) => {
      http.post(settings.apiUrl('password/email'), {email})
        .then(({data}) => {
          resolve(data.status)
        }, ({data}) => {
          reject(data)
        })
    })
  },

  reset (details) {
    return new Promise((resolve, reject) => {
      http.post(settings.apiUrl('password/reset'), details)
        .then(({data}) => {
          resolve(data.status)
        }, ({data}) => {
          reject(data)
        })
    })
  },

  middleware: {

    /**
     * Determines user authenticated sate
     * @returns {boolean}
     */
    isAuthenticated () {
      return store.state.auth.user.authenticated
    },

    /**
     * Determine has a auth user presented role
     * @param {string} role
     * @returns {boolean}
     */
    hasRole (role) {
      if (!this.isAuthenticated()) { return false }

      let check = (role) => !!~store.state.auth.roles.indexOf(role)

      // if user has an super_admin role, allow him to do anything
      if (check('SUPER_ADMIN')) { return true }

      return check(role)
    },

    /**
     * Determine has a auth user any of role presented in list of roles
     * @param {Array} roles List of roles to match
     * @returns {boolean}
     */
    hasAnyRole (roles) {
      if (!this.isAuthenticated()) { return false }

      for (let key in roles) {
        if (roles.hasOwnProperty(key) && this.hasRole(roles[key])) { return true }
      }

      return false
    },

    /**
     * Determine has a auth user all roles presented in list
     * @param {Array} roles List of roles to match
     * @returns {boolean}
     */
    hasAllRoles (roles) {
      if (!this.isAuthenticated()) {
        return false
      }

      for (let key in roles) {
        if (roles.hasOwnProperty(key) && !this.hasRole(roles[key])) {
          return false
        }
      }

      return true
    }

  }
}
