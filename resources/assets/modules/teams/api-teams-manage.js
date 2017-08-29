import api from '../../api'
import Team from '../../entities/Team'

const path = 'admin/teams'
/**
 * Resolve team entity.
 * @param   {object} data
 * @returns {Team}
 */
const resolveEntity = (data) => new Team(data)

export default {
  /**
   * Get list of team entities from the server.
   * @param   {Paging} paging
   * @returns {Promise<PagingResult>}
   */
  get (paging) {
    return api.get(path, resolveEntity, {}, paging.toUrlParams())
  },

  /**
   * Get single team entity from the server.
   * @param   {number} id
   * @returns {Promise<Team>}
   */
  find (id) {
    return api.find(path, resolveEntity, id)
  },

  /**
   * Store team entity on the server.
   * @param   {object} entity
   * @returns {Promise.<Team>}
   */
  save (entity) {
    return api.save(path, resolveEntity, entity)
  }
}
