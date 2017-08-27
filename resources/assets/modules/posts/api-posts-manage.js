import api from './../../api'
import Post from './../../entities/Post'

const path = 'admin/posts'
const resolveEntity = (data) => new Post(data)

export default {
  /**
   * Get list of entities from the server
   * @param   {number} [page]
   * @param   {number} [perPage]
   * @returns {Promise.<PagingResult>}
   */
  get (page = 1, perPage = 15) {
    return api.get(path, resolveEntity, page, perPage)
  },

  /**
   * Get single entity from the server
   * @param   {number}  id
   * @returns {Promise}
   */
  find (id) {
    return api.find(path, resolveEntity, id)
  },

  /**
   * Store entity on the server
   * @param   {object} entity
   * @returns {Promise}
   */
  save (entity) {
    return api.save(path, resolveEntity, entity)
  }
}
