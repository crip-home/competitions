import api from '../../api'
import TeamMember from '../../entities/TeamMember'

const path = 'admin/teams/{teamId}/members'
const resolveEntity = (data) => new TeamMember(data)

export default {
  /**
   * Get list of team member entities from the server.
   * @param   {number} [page]
   * @param   {number} [perPage]
   * @param   {object} [urlReplace]
   * @returns {Promise<PagingResult>}
   */
  get (page = 1, perPage = 15, urlReplace = {}) {
    return api.get(path, resolveEntity, page, perPage, urlReplace)
  },

  /**
   * Get single team member entity from the server.
   * @param   {number} id
   * @param   {object} [urlReplace]
   * @returns {Promise<TeamMember>}
   */
  find (id, urlReplace = {}) {
    return api.find(path, resolveEntity, id, urlReplace)
  },

  /**
   * Store team member entity on the server.
   * @param   {object} entity
   * @param   {object} [urlReplace]
   * @returns {Promise<TeamMember>}
   */
  save (entity, urlReplace = {}) {
    return api.save(path, resolveEntity, entity, urlReplace)
  }
}
