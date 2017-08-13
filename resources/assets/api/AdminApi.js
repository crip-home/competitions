import api from './index'

// All child classes should have methods:
// - entityResolver(data)

export default class AdminApi {
  constructor (path) {
    this.path = path
  }

  /**
   * Get list of entities from the server
   * @param {Number} [page]
   * @param {Number} [perPage]
   * @param {*}      [urlReplace]
   * @returns {Promise.<PagingResult>}
   */
  get (page = 1, perPage = 15, urlReplace = {}) {
    return api.get(this.path, this.entityResolver, page, perPage, urlReplace)
  }

  /**
   * Get single entity from the server
   * @param {number}  id
   * @param {*}      [urlReplace]
   * @returns {Promise}
   */
  find (id, urlReplace = {}) {
    return api.find(this.path, this.entityResolver, id, urlReplace)
  }

  /**
   * Store entity on the server
   * @param {object} entity
   * @param {*}      [urlReplace]
   * @returns {Promise}
   */
  save (entity, urlReplace = {}) {
    return api.save(this.path, this.entityResolver, entity, urlReplace)
  }
}
