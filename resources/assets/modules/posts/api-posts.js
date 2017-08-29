import http from 'axios'
import PagingResult from './../../api/PagingResult'
import Post from './../../entities/Post'
import settings from './../../settings'

export default {
  /**
   * Get posts from the server
   * @param {Paging} paging
   * @param {array}  [locales]
   */
  get (paging, locales = null) {
    return new Promise((resolve, reject) => {
      const params = {
        ...paging.toUrlParams(),
        locales: locales ? locales.join(',') : ''
      }
      const resolver = item => new Post(item)
      http.get(settings.apiUrl('posts', params))
        .then(
          ({data}) => resolve(PagingResult.handle(data, resolver)),
          response => settings.handleError(response, reject)
        )
    })
  },

  /**
   * Get single post from the server
   * @param {number} id
   * @returns {Promise}
   */
  find (id) {
    return new Promise((resolve, reject) => {
      http.get(settings.apiUrl(`posts/${id}`))
        .then(
          ({data}) => resolve(new Post(data)),
          response => settings.handleError(response, reject)
        )
    })
  }
}
