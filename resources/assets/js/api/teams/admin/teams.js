import { AdminRepository } from '../../../ext/Repositories'
import Team                from '../../Team'

class TeamsAdminRepository extends AdminRepository {
  constructor () {
    super('admin/teams')
  }

  entityResolver (data) {
    return new Team(data)
  }
}

export default new TeamsAdminRepository()