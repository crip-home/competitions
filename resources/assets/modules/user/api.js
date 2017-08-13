import api from '../../api/index'
import User from '../../entities/User'

export default {
  profile (id = 0) {
    let url = 'user/profile' + (id > 0 ? `/${id}` : '')
    return api.find(url, data => new User(data))
  }
}
