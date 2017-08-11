import AdminRepository from '../../../data/AdminRepository'
import User from '../../../entities/User'

class UserAdminRepository extends AdminRepository {
  constructor () {
    super('admin/users')
  }

  entityResolver (data) {
    return new User(data)
  }
}

export default new UserAdminRepository()
