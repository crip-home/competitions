import api from '../index'
import TeamMember from '../TeamMember'

export default {
  /**
   * Find team member
   * @param id
   * @returns {Promise}
   */
  find (id) {
    return api.find('user/team-members', member => new TeamMember(member), id)
  },

  /**
   * Paginate members for a team
   * @param {Number} teamId
   * @param {Number} page
   * @param {Number} perPage
   * @returns {Promise.<PagingResult>}
   */
  getForTeam (teamId, page = 1, perPage = 15) {
    return api.get('teams/{teamId}/members', member => new TeamMember(member), page, perPage, {teamId})
  }
}
