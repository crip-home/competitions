import AdminApi from '../../api/AdminApi'
import Team from '../../entities/Team'

class TeamsAdminApi extends AdminApi {
  constructor () {
    super('admin/teams')
  }

  entityResolver (data) {
    return new Team(data)
  }
}

export default new TeamsAdminApi()
