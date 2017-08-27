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
   * @param   {number} [page]
   * @param   {number} [perPage]
   * @returns {Promise<PagingResult>}
   */
  get (page = 1, perPage = 15) {
    return api.get(path, resolveEntity, page, perPage)
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
