import AdminApi from '../../api/AdminApi'
import User from '../../entities/User'

class UserAdminApi extends AdminApi {
  constructor () {
    super('admin/users')
  }

  entityResolver (data) {
    return new User(data)
  }
}

export default new UserAdminApi()
