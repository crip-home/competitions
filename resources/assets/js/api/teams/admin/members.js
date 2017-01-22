import { AdminRepository } from './../../../ext/Repositories'
import TeamMember          from './../../TeamMember'

class TeamMembersAdminRepository extends AdminRepository {
  constructor () {
    super('admin/teams/{team_id}/members')
  }

  entityResolver (data) {
    return new TeamMember(data)
  }
}

export default new TeamMembersAdminRepository()