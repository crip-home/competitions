import AdminRepository from '../../AdminRepository'
import User from '../../User'

class UserAdminRepository extends AdminRepository {
  constructor () {
    super('admin/users')
  }

  entityResolver (data) {
    return new User(data)
  }
}

export default new UserAdminRepository()
