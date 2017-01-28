import api from '../../api'
import Message from '../Message'

export default {
  /**
   * Get messages from the server
   *
   * @param {number} [page]
   * @param {number} [perPage]
   * @returns {Promise.<PagingResult>}
   */
  get (page = 1, perPage = 25) {
    return api.get('user/messages', item => new Message(item), page, perPage)
  },

  /**
   * Get unread message count
   *
   * @returns {Promise.<Number>}
   */
  countUnread () {
    return api.find('user/messages/count/unread', _ => _)
  },

  /**
   * Mark message as read
   *
   * @param {Number} id
   * @returns {Promise.<Message>}
   */
  markAsRead (id) {
    return api.find('user/messages/read', item => new Message(item), id)
  },

  /**
   * Make reply on message
   *
   * @param {Number} onId
   * @param {String} subject
   * @param {String} body
   */
  reply (onId, {subject, body}) {
    return api.save(`user/messages/reply/${onId}`, _ => _, {subject, body, id: 0})
  }
}