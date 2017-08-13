import AdminApi from '../../AdminApi'
import TeamMember from '../../../entities/TeamMember'

class TeamMembersAdminApi extends AdminApi {
  constructor () {
    super('admin/teams/{teamId}/members')
  }

  static entityResolver (data) {
    return new TeamMember(data)
  }
}

export default new TeamMembersAdminApi()
