import _members from './api-members-manage'
import _teams from './api-teams-manage'
import api from '../../api'
import Team from '../../entities/Team'
import TeamMember from '../../entities/TeamMember'

export const manageMembers = _members

export const manageTeams = _teams

export const teams = {
  /**
   * Get team details by team id
   * @param teamId
   * @returns {Promise}
   */
  find (teamId) {
    return api.find('teams', entity => new Team(entity), teamId)
  }
}

export const members = {
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
    return api.get(
      'teams/{teamId}/members', member => new TeamMember(member), page,
      perPage, {teamId}
    )
  },

  confirmInvitation (teamMemberId) {
    return api.find(
      'user/teams/members/invitations/{teamMemberId}/confirm', _ => _, '',
      {teamMemberId}
    )
  },

  declineInvitation (teamMemberId) {
    return api.find(
      'user/teams/members/invitations/{teamMemberId}/decline', _ => _, '',
      {teamMemberId}
    )
  }
}
