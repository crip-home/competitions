import api from '../../api'
import TeamMember from '../../entities/TeamMember'

const path = 'admin/teams/{teamId}/members'
const resolveEntity = (data) => new TeamMember(data)

export default {
  /**
   * Get list of entities from the server
   * @param {Number} [page]
   * @param {Number} [perPage]
   * @param {*}      [urlReplace]
   * @returns {Promise.<PagingResult>}
   */
  get (page = 1, perPage = 15, urlReplace = {}) {
    return api.get(path, resolveEntity, page, perPage, urlReplace)
  },

  /**
   * Get single entity from the server
   * @param {number}  id
   * @param {*}      [urlReplace]
   * @returns {Promise}
   */
  find (id, urlReplace = {}) {
    return api.find(path, resolveEntity, id, urlReplace)
  },

  /**
   * Store entity on the server
   * @param {object} entity
   * @param {*}      [urlReplace]
   * @returns {Promise}
   */
  save (entity, urlReplace = {}) {
    return api.save(path, resolveEntity, entity, urlReplace)
  }
}
