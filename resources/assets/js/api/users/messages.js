import { http }     from 'vue'
import settings     from '../../settings'
import PagingResult from '../../ext/PagingResult'
import Message      from '../Message'

export default {
  /**
   * Get messages from the server
   *
   * @param {number} [page]
   * @param {number} [perPage]
   */
  get (page = 1, perPage = 25) {
    perPage = parseInt(perPage < 1 ? 5 : perPage)
    return new Promise((resolve, reject) => {
      const params = {page, per_page: perPage}
      const resolver = item => new Message(item)
      http.get(settings.apiUrl('user/messages', params))
        .then(
          ({data}) => resolve(PagingResult.handle(data, resolver)),
          response => settings.handleError(response, reject)
        )
    })
  },

  /**
   * Get unread message count
   *
   * @returns {Promise}
   */
  countUnread () {
    return new Promise((resolve, reject) => {
      http.get(settings.apiUrl('user/messages/count/unread'))
        .then(
          ({data}) => resolve(data),
          response => settings.handleError(response, reject)
        )
    })
  },

  /**
   * Mark message as read
   *
   * @param {Number} id
   */
  markAsRead (id) {
    return new Promise((resolve, reject) => {
      http.get(settings.apiUrl(`user/messages/read/${id}`))
        .then(
          ({data}) => resolve(data),
          response => settings.handleError(response, reject)
        )
    })
  }
}
