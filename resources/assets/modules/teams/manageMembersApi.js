import AdminApi from '../../api/AdminApi'
import TeamMember from '../../entities/TeamMember'

class TeamMembersAdminApi extends AdminApi {
  constructor () {
    super('admin/teams/{teamId}/members')
  }

  entityResolver (data) {
    return new TeamMember(data)
  }
}

export default new TeamMembersAdminApi()
