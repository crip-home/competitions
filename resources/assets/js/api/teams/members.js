import api from '../index'
import TeamMember from '../TeamMember'

export default {
  find (id) {
    return api.find('user/team-members', member => new TeamMember(member), id)
  }
}
