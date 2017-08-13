import AdminApi from '../../AdminApi'
import User from '../../../entities/User'

class UserAdminApi extends AdminApi {
  constructor () {
    super('admin/users')
  }

  static entityResolver (data) {
    return new User(data)
  }
}

export default new UserAdminApi()
