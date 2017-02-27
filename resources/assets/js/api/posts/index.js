import { http } from 'vue'
import settings from '../../settings'
import PagingResult from '../PagingResult'
import Post from '../../entities/Post'

export default {

  /**
   * Get posts from the server
   * @param {number} [page]
   * @param {number} [perPage]
   * @param {array}  [locales]
   */
  get (page = 1, perPage = 5, locales = null) {
    perPage = parseInt(perPage < 1 ? 5 : perPage)
    return new Promise((resolve, reject) => {
      const params = {page, per_page: perPage, locales: locales ? locales.join(',') : ''}
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
