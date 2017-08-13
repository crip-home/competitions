import AdminApi from '../../AdminApi'
import Team from '../../../entities/Team'

class TeamsAdminApi extends AdminApi {
  constructor () {
    super('admin/teams')
  }

  static entityResolver (data) {
    return new Team(data)
  }
}

export default new TeamsAdminApi()
