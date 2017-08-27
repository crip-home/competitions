import api from '../../api'
import User from '../../entities/User'

const path = 'admin/users'
const resolveEntity = (data) => new User(data)

export default {
  /**
   * Get list of entities from the server.
   * @param   {number} [page]
   * @param   {number} [perPage]
   * @returns {Promise<PagingResult>}
   */
  get (page = 1, perPage = 15) {
    return api.get(path, resolveEntity, page, perPage)
  },

  /**
   * Get single user entity from the server.
   * @param   {number} id
   * @returns {Promise<User>}
   */
  find (id) {
    return api.find(path, resolveEntity, id)
  },

  /**
   * Store user entity on the server.
   * @param   {object} entity
   * @returns {Promise<User>}
   */
  save (entity) {
    return api.save(path, resolveEntity, entity)
  }
}
