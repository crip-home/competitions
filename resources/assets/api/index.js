import http from 'axios'
import PagingResult from './PagingResult'
import settings from '../settings'
import Vue from 'vue'

export default {
  /**
   * Get list of entities from the server
   * @param {String}   path
   * @param {Function} entityResolver
   * @param {Number}   [page]
   * @param {Number}   [perPage]
   * @param {*}        [urlReplace]
   * @param {*}        [params]
   * @returns {Promise.<PagingResult>}
   */
  get (path, entityResolver, page = 1, perPage = 15, urlReplace = {}, params = {}) {
    perPage = parseInt(perPage < 1 ? 15 : perPage)
    return new Promise((resolve, reject) => {
      params = {page, per_page: perPage, ...params}
      let url = settings.apiUrl(path, params, urlReplace)
      http.get(url)
        .then(
          ({data}) => {
            let resolvedData = PagingResult.handle(data, entityResolver)
            Vue.log.group('api', 'debug')(url, resolvedData)
            resolve(resolvedData)
          }
        ).catch(response => settings.handleError(response, reject))
    })
  },

  /**
   * Find single entity from the server
   * @param {String}        path
   * @param {Function}      entityResolver
   * @param {Number|String} id
   * @param {*}             [urlReplace]
   * @param {*}             [urlParams]
   * @returns {Promise}
   */
  find (path, entityResolver, id = '', urlReplace = {}, urlParams = {}) {
    return new Promise((resolve, reject) => {
      let url = id === '' ? path : `${path}/${id}`
      url = settings.apiUrl(url, urlParams, urlReplace)
      http.get(url)
        .then(
          ({data}) => {
            let resolvedData = entityResolver(data)
            Vue.log.group('api', 'debug')(url, resolvedData)
            resolve(resolvedData)
          },
          response => settings.handleError(response, reject)
        )
    })
  },

  /**
   * Store entity on the server
   * @param   {String}   path
   * @param   {Function} entityResolver
   * @param   {Object}   entity
   * @param   {Number}   entity.id
   * @param   {*}        [urlReplace]
   * @param   {*}        [urlParams]
   * @returns {Promise}
   */
  save (path, entityResolver, entity, urlReplace = {}, urlParams = {}) {
    let method = 'post'
    let url = path

    if (entity.id > 0) {
      method = 'put'
      url = `${path}/${entity.id}`
    }

    url = settings.apiUrl(url, urlParams, urlReplace)

    return new Promise((resolve, reject) => {
      http[method](url, entity)
        .then(
          ({data}) => {
            let resolvedData = entityResolver(data)
            Vue.log.group('api', 'debug')(url, resolvedData)
            resolve(resolvedData)
          },
          response => settings.handleError(response, reject)
        )
    })
  }
}
