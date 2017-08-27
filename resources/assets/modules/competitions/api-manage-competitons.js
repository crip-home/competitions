import api from './../../api'
import Competition from './../../entities/Competition'

const path = 'admin/competitions'
const resolveEntity = (data) => new Competition(data)

export default {
  /**
   * Get list of competition entities from the server.
   * @param   {number} [page]
   * @param   {number} [perPage]
   * @returns {Promise.<PagingResult>}
   */
  get (page = 1, perPage = 15) {
    return api.get(path, resolveEntity, page, perPage)
  },

  /**
   * Get single competition entity from the server.
   * @param   {number} id
   * @returns {Promise<Competition>}
   */
  find (id) {
    return api.find(path, resolveEntity, id)
  },

  /**
   * Store competition entity on the server.
   * @param   {object} entity
   * @returns {Promise}
   */
  save (entity) {
    return api.save(path, resolveEntity, entity)
  }
}
