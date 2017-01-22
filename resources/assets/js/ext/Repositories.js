import { http }     from 'vue'
import settings     from '../settings'
import PagingResult from './PagingResult'

// All child classes should have methods:
// - entityResolver(data)

export class AdminRepository {
  constructor (path) {
    this.path = path
  }

  /**
   * Get list of entities from the server
   *
   * @param {Number} [page]
   * @param {Number} [per_page]
   * @param {*}      [urlReplace]
   * @returns {Promise.<PagingResult>}
   */
  get (page = 1, per_page = 15, urlReplace = {}) {
    per_page = parseInt(per_page < 1 ? 15 : per_page)
    return new Promise((resolve, reject) => {
      const params = {page, per_page}
      http.get(settings.apiUrl(this.path, params, urlReplace))
        .then(
          ({data}) => resolve(PagingResult.handle(data, this.entityResolver)),
          response => settings.handleError(response, reject)
        )
    })
  }

  /**
   * Get single entity from the server
   *
   * @param {number}  id
   * @param {*}      [urlReplace]
   * @returns {Promise}
   */
  find (id, urlReplace = {}) {
    return new Promise((resolve, reject) => {
      http.get(settings.apiUrl(`${this.path}/${id}`, {}, urlReplace))
        .then(
          ({data}) => resolve(this.entityResolver(data)),
          response => settings.handleError(response, reject)
        )
    })
  }

  /**
   * Store entity on the server
   *
   * @param {object} entity
   * @param {*}      [urlReplace]
   * @returns {Promise}
   */
  save (entity, urlReplace = {}) {
    let method = 'post'
    let url = this.path

    if (entity.id > 0) {
      method = 'put'
      url = `${this.path}/${entity.id}`
    }

    return new Promise((resolve, reject) => {
      http[method](settings.apiUrl(url, {}, urlReplace), entity)
        .then(
          ({data}) => resolve(this.entityResolver(data)),
          response => settings.handleError(response, reject)
        )
    })
  }
}