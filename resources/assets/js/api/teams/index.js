import api from '../../api'

export default {
  confirmInvitation (teamMemberId) {
    return api.find('user/teams/members/invitations/{teamMemberId}/confirm', _ => _, '', {teamMemberId})
  },

  declineInvitation (teamMemberId) {
    return api.find('user/teams/members/invitations/{teamMemberId}/decline', _ => _, '', {teamMemberId})
  }
}
