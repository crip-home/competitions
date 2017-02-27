import AdminRepository from '../../../data/AdminRepository'
import Team from '../../../entities/Team'

class TeamsAdminRepository extends AdminRepository {
  constructor () {
    super('admin/teams')
  }

  entityResolver (data) {
    return new Team(data)
  }
}

export default new TeamsAdminRepository()
