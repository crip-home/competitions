import api from './../../api'
import Competition from './../../entities/Competition'

const path = 'admin/competitions'
const resolveEntity = (data) => new Competition(data)

export default {
  /**
   * Get list of competition entities from the server.
   * @param   {Paging} paging
   * @returns {Promise.<PagingResult>}
   */
  get (paging) {
    return api.get(path, resolveEntity, {}, paging.toUrlParams())
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
