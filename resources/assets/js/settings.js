import {
  addToast,
  logout
} from './store/types'
import { login } from './router/routes'
import { error } from './ext/Log'
import router from './router'
import store from './store'
import Vue from 'vue'

export default {
  apiRoot: '/api/',

  /**
   * Logging placement area
   *
   * 'console' - logs all sections to the browser console
   * false     - disables all logs
   */
  logs: 'console',

  /**
   * List of enabled log sections
   *
   * To disable logs for some section, remove it from this list
   * To disable all logs, change logs property value to false or make logSections list empty
   */
  logSections: [
    'global',
    'error',
    'info'
    // // 'select2', // Uncomment this line to see all changes in select2 helper
  ],

  /**
   * Generate url to the application api
   *
   * @param {string}  path        Request path
   * @param {object} [params]     Parameters to be included in URL
   * @param {object} [urlReplace] Url placeholders should be replaced with variable values
   * @returns {string} Absolute API url
   */
  apiUrl (path, params = {}, urlReplace = {}) {
    let url = path.replace(new RegExp('^[\\/]+'), '')
    url = `${this.apiRoot}${url}`
    url = url.supplant(urlReplace)

    Object.keys(params).forEach(index => {
      let val = params[index]
      if (typeof val !== 'undefined' && val !== '') { url = this.addParameter(url, index, val) }
    })

    return url
  },

  /**
   * Global handler of Vue HTTP error responses
   *
   * @param {object} errorResponse
   * @param {function} [reject]
   */
  handleError (errorResponse, reject = _ => _) {
    if (reject && typeof reject === 'function') {
      if (errorResponse.status === 422) {
        reject(errorResponse.data)
      } else {
        reject({error: ['Unknown error']})
      }
    }

    switch (errorResponse.status) {
      case 401:
        error('settings.handleError -> unauthorized', errorResponse.data)
        store.commit(logout)
        router.push({...login, query: {redirect: router.currentRoute.fullPath}})
        break
      case 422:
        error('settings.handleError -> validation failed', errorResponse.data)
        break
      case 403:
      case 405:
        error('settings.handleError -> method not allowed', errorResponse)
        store.commit(addToast, {message: 'Action is not allowed', class: 'toast-error'})
        // TODO: send this as email to admin to be able detect users who is trying hack app
        //   or some places has not enough protection and simple user can open it and
        //   create not allowed requests
        break
      default:
        error('settings.handleError -> unknown', errorResponse)
      // TODO: send email as there happened something that we did not expected
    }
  },

  /**
   * Append new parameter to url
   *
   * @param {String} url Original URL
   * @param {String} param Parameter key
   * @param {String} value Parameter value
   * @returns {String} URL with appended parameter
   */
  addParameter (url, param, value) {
    // Using a positive lookahead (?=\=) to find the
    // given parameter, preceded by a ? or &, and followed
    // by a = with a value after than (using a non-greedy selector)
    // and then followed by a & or the end of the string
    const val = new RegExp('(\\?|\\&)' + param + '=.*?(?=(&|$))')
    const parts = url.toString().split('#')
    const hash = parts[1]
    const qstring = /\?.+$/
    let newURL = url = parts[0]

    // Check if the parameter exists
    if (val.test(url)) {
      // if it does, replace it, using the captured group
      // to determine & or ? at the beginning
      newURL = url.replace(val, '$1' + param + '=' + value)
    } else if (qstring.test(url)) {
      // otherwise, if there is a query string at all
      // add the param to the end of it
      newURL = url + '&' + param + '=' + value
    } else {
      // if there's no query string, add one
      newURL = url + '?' + param + '=' + value
    }

    if (hash) { newURL += '#' + hash }

    return newURL
  },

  /**
   * Set user auth token in storage for later usage
   *
   * @param token
   */
  setToken (token) {
    localStorage.setItem('token', token)

    Vue.http.interceptors.push((request, next) => {
      request.headers.set('Authorization', this.getAuthToken())
      next()
    })
  },

  /**
   * Determine storage token existence
   * If exists - reset to make sure it is in interceptors
   *
   * @returns {boolean}
   */
  hasToken () {
    let result = !!localStorage.getItem('token')
    if (result) {
      this.setToken(localStorage.getItem('token'))
    }

    return result
  },

  /**
   * Get auth header token value
   *
   * @returns {string}
   */
  getAuthToken () {
    return `Bearer ${localStorage.getItem('token')}`
  },

  /**
   * Delete token from storage
   */
  removeToken () {
    localStorage.removeItem('token')
  },

  /**
   * Get last user used locale from storage
   *
   * @returns {string}
   */
  getLocale () {
    return localStorage.getItem('locale')
  },

  /**
   * Set user locale to storage
   * @param locale
   */
  setLocale (locale) {
    localStorage.setItem('locale', locale)
  }
}
