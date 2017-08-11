import api from '../../api'
import Team from '../../entities/Team'

export default {
  confirmInvitation (teamMemberId) {
    return api.find('user/teams/members/invitations/{teamMemberId}/confirm', _ => _, '', {teamMemberId})
  },

  declineInvitation (teamMemberId) {
    return api.find('user/teams/members/invitations/{teamMemberId}/decline', _ => _, '', {teamMemberId})
  },

  /**
   * Get team details by team id
   * @param teamId
   * @returns {Promise}
   */
  find (teamId) {
    return api.find('teams', entity => new Team(entity), teamId)
  }
}
