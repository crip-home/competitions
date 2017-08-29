import api from './../../api'
import Post from './../../entities/Post'

const path = 'admin/posts'
const resolveEntity = (data) => new Post(data)

export default {
  /**
   * Get list of post entities from the server.
   * @param   {Paging} paging
   * @returns {Promise<PagingResult>}
   */
  get (paging) {
    return api.get(path, resolveEntity, {}, paging.toUrlParams())
  },

  /**
   * Get single post entity from the server.
   * @param   {number}  id
   * @returns {Promise<Post>}
   */
  find (id) {
    return api.find(path, resolveEntity, id)
  },

  /**
   * Store post entity on the server.
   * @param   {object} entity
   * @returns {Promise<Post>}
   */
  save (entity) {
    return api.save(path, resolveEntity, entity)
  }
}
