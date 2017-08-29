import http from 'axios'
import PagingResult from './PagingResult'
import settings from '../settings'
import Vue from 'vue'

export default {
  /**
   * Get list of entities from the server
   * @param {String}   path
   * @param {function} entityResolver
   * @param {*}        [urlReplace]
   * @param {*}        [params]
   * @returns {Promise.<PagingResult>}
   */
  async get (path, entityResolver, urlReplace = {}, params = {}) {
    const url = settings.apiUrl(path, params, urlReplace)

    try {
      const {data} = await http.get(url)
      const resolvedData = PagingResult.handle(data, entityResolver)
      Vue.log.group('api', 'debug')(url, resolvedData)
      return resolvedData
    } catch (error) {
      throw settings.handleError(error)
    }
  },

  /**
   * Find single entity from the server
   * @param {String}        path
   * @param {function<T>}      entityResolver
   * @param {Number|String} id
   * @param {*}             [urlReplace]
   * @param {*}             [urlParams]
   * @returns {Promise.<*>}
   */
  async find (path, entityResolver, id = '', urlReplace = {}, urlParams = {}) {
    let url = id === '' ? path : `${path}/${id}`
    url = settings.apiUrl(url, urlParams, urlReplace)

    try {
      const {data} = await http.get(url)
      let resolvedData = entityResolver(data)
      Vue.log.group('api', 'debug')(url, resolvedData)
      return resolvedData
    } catch (error) {
      throw settings.handleError(error)
    }
  },

  /**
   * Store entity on the server
   * @param   {String}   path
   * @param   {Function} entityResolver
   * @param   {Object}   entity
   * @param   {Number}   entity.id
   * @param   {*}        [urlReplace]
   * @param   {*}        [urlParams]
   * @returns {Promise.<*>}
   */
  async save (path, entityResolver, entity, urlReplace = {}, urlParams = {}) {
    let method = 'post'
    let url = path

    if (entity.id > 0) {
      method = 'put'
      url = `${path}/${entity.id}`
    }

    url = settings.apiUrl(url, urlParams, urlReplace)

    try {
      const {data} = await http[method](url, entity)
      let resolvedData = entityResolver(data)
      Vue.log.group('api', 'debug')(url, resolvedData)
      return resolvedData
    } catch (error) {
      throw settings.handleError(error)
    }
  }
}
